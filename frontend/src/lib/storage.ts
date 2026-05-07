/**
 * Supabase Storage utilities for Mike document management.
 * Replaced Cloudflare R2 with Supabase Storage.
 */

import { supabase } from "./supabase";

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME ?? "mike";

export const storageEnabled = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

export async function uploadFile(
    key: string,
    content: ArrayBuffer,
    contentType: string,
): Promise<void> {
    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(key, content, {
            contentType,
            upsert: true,
        });
    if (error) {
        console.error(`[storage] upload error for ${key}:`, error);
        throw error;
    }
}

// ---------------------------------------------------------------------------
// Download
// ---------------------------------------------------------------------------

export async function downloadFile(key: string): Promise<ArrayBuffer | null> {
    if (!storageEnabled) return null;
    try {
        const { data, error } = await supabase.storage.from(BUCKET).download(key);
        if (error || !data) return null;
        return await data.arrayBuffer();
    } catch (err) {
        console.error(`[storage] download error for ${key}:`, err);
        return null;
    }
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export async function deleteFile(key: string): Promise<void> {
    if (!storageEnabled) return;
    const { error } = await supabase.storage.from(BUCKET).remove([key]);
    if (error) {
        console.error(`[storage] delete error for ${key}:`, error);
        throw error;
    }
}

// ---------------------------------------------------------------------------
// Signed URL
// ---------------------------------------------------------------------------

export async function getSignedUrl(
    key: string,
    expiresIn = 3600,
): Promise<string | null> {
    if (!storageEnabled) return null;
    try {
        const { data, error } = await supabase.storage
            .from(BUCKET)
            .createSignedUrl(key, expiresIn);
        
        if (error || !data) return null;
        return data.signedUrl;
    } catch (err) {
        console.error(`[storage] signed url error for ${key}:`, err);
        return null;
    }
}

// ---------------------------------------------------------------------------
// Storage key helpers
// ---------------------------------------------------------------------------

export function storageKey(
    userId: string,
    docId: string,
    filename: string,
): string {
    return `documents/${userId}/${docId}/${filename}`;
}

export function pdfStorageKey(
    userId: string,
    docId: string,
    stem: string,
): string {
    return `documents/${userId}/${docId}/${stem}.pdf`;
}

export function generatedDocKey(
    userId: string,
    docId: string,
    filename: string,
): string {
    return `generated/${userId}/${docId}/${filename}`;
}
