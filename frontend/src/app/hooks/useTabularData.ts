"use client";

import { useEffect, useState } from "react";
import { listTabularReviews } from "@/app/lib/mikeApi";
import type { TabularReview } from "../components/shared/types";

const CACHE_TTL_MS = 30_000;

interface TabularCache {
    reviews: TabularReview[];
    fetchedAt: number;
}

let cache: TabularCache | null = null;

export function invalidateTabularCache() {
    cache = null;
}

export function useTabularData(enabled: boolean) {
    const [loading, setLoading] = useState(!cache);
    const [reviews, setReviews] = useState<TabularReview[]>(cache?.reviews ?? []);

    useEffect(() => {
        if (!enabled) return;

        const now = Date.now();
        if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
            setReviews(cache.reviews);
            setLoading(false);
            return;
        }

        if (!cache) setLoading(true);

        listTabularReviews()
            .then((res) => {
                cache = {
                    reviews: res,
                    fetchedAt: Date.now(),
                };
                setReviews(res);
            })
            .catch(() => setReviews([]))
            .finally(() => setLoading(false));
    }, [enabled]);

    return { loading, reviews, setReviews };
}
