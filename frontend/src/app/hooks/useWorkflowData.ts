"use client";

import { useEffect, useState } from "react";
import { listWorkflows, listHiddenWorkflows } from "@/app/lib/mikeApi";
import type { MikeWorkflow } from "../components/shared/types";

const CACHE_TTL_MS = 30_000;

interface WorkflowCache {
    workflows: MikeWorkflow[];
    hiddenIds: string[];
    fetchedAt: number;
}

let cache: WorkflowCache | null = null;

export function invalidateWorkflowCache() {
    cache = null;
}

export function useWorkflowData(enabled: boolean) {
    const [loading, setLoading] = useState(!cache);
    const [workflows, setWorkflows] = useState<MikeWorkflow[]>(cache?.workflows ?? []);
    const [hiddenIds, setHiddenIds] = useState<string[]>(cache?.hiddenIds ?? []);

    useEffect(() => {
        if (!enabled) return;

        const now = Date.now();
        if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
            setWorkflows(cache.workflows);
            setHiddenIds(cache.hiddenIds);
            setLoading(false);
            return;
        }

        if (!cache) setLoading(true);

        Promise.all([
            listWorkflows("assistant"),
            listWorkflows("tabular"),
            listHiddenWorkflows(),
        ])
            .then(([assistant, tabular, hidden]) => {
                const all = [...assistant, ...tabular];
                cache = {
                    workflows: all,
                    hiddenIds: hidden,
                    fetchedAt: Date.now(),
                };
                setWorkflows(all);
                setHiddenIds(hidden);
            })
            .catch(() => {
                setWorkflows([]);
                setHiddenIds([]);
            })
            .finally(() => setLoading(false));
    }, [enabled]);

    return { loading, workflows, hiddenIds, setWorkflows, setHiddenIds };
}
