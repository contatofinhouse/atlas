"use client";

import { useEffect, useState } from "react";
import { getProject, listProjects, listStandaloneDocuments } from "@/app/lib/mikeApi";
import type { MikeDocument, MikeProject } from "./types";

const CACHE_TTL_MS = 30_000;

interface DirectoryCache {
    standaloneDocuments: MikeDocument[];
    projects: MikeProject[];
    fetchedAt: number;
}

let cache: DirectoryCache | null = null;

export function invalidateDirectoryCache() {
    cache = null;
}

export function useDirectoryData(enabled: boolean) {
    const [loading, setLoading] = useState(!cache);
    const [standaloneDocuments, setStandaloneDocuments] = useState<MikeDocument[]>(
        cache?.standaloneDocuments ?? [],
    );
    const [projects, setProjects] = useState<MikeProject[]>(cache?.projects ?? []);

    useEffect(() => {
        if (!enabled) return;

        const now = Date.now();
        if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
            setStandaloneDocuments(cache.standaloneDocuments);
            setProjects(cache.projects);
            setLoading(false);
            return;
        }

        setLoading(true);
        Promise.all([listProjects(), listStandaloneDocuments()])
            .then(([ps, ds]) => {
                const sorted = [...ds].sort((a, b) =>
                    (b.created_at ?? "").localeCompare(a.created_at ?? ""),
                );
                cache = {
                    standaloneDocuments: sorted,
                    projects: ps,
                    fetchedAt: Date.now(),
                };
                setStandaloneDocuments(sorted);
                setProjects(ps);
            })
            .catch(() => {
                setStandaloneDocuments([]);
                setProjects([]);
            })
            .finally(() => setLoading(false));
    }, [enabled]);

    return { 
        loading, 
        standaloneDocuments, 
        projects,
        setProjects,
        setStandaloneDocuments
    };
}
