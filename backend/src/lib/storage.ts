/**
 * Supabase Storage utilities for Mike document management.
 * Replaced Cloudflare R2 with Supabase Storage.
 *
 * Required env vars:
 *   SUPABASE_URL
 *   SUPABASE_SECRET_KEY
 */

import { createServerSupabase } from "./supabase";

const BUCKET = process.env.SUPABASE_BUCKET_NAME ?? "mike";

export const storageEnabled = Boolean(
  process.env.SUPABASE_URL && (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
);

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

export async function uploadFile(
  key: string,
  content: ArrayBuffer,
  contentType: string,
): Promise<void> {
  const supabase = createServerSupabase();
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
    const supabase = createServerSupabase();
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
  const supabase = createServerSupabase();
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
  downloadFilename?: string,
): Promise<string | null> {
  if (!storageEnabled) return null;
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(key, expiresIn, {
        download: downloadFilename ? normalizeDownloadFilename(downloadFilename) : false
      });
    
    if (error || !data) return null;
    return data.signedUrl;
  } catch (err) {
    console.error(`[storage] signed url error for ${key}:`, err);
    return null;
  }
}

export function buildContentDisposition(
  type: "inline" | "attachment",
  filename: string,
): string {
  const escaped = filename.replace(/"/g, '\\"');
  const encoded = encodeURIComponent(filename).replace(/'/g, "%27");
  return `${type}; filename="${escaped}"; filename*=UTF-8''${encoded}`;
}

export function normalizeDownloadFilename(name: string): string {
  const trimmed = name.trim();
  const base = trimmed || "download";
  return base.replace(/[\x00-\x1F\x7F]/g, "_").replace(/[\\/]/g, "_");
}

// ---------------------------------------------------------------------------
// Storage key helpers
// ---------------------------------------------------------------------------

export function storageKey(
  userId: string,
  docId: string,
  filename: string,
): string {
  return `documents/${userId}/${docId}/source${storageExtension(filename, ".bin")}`;
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
  return `generated/${userId}/${docId}/generated${storageExtension(filename, ".docx")}`;
}

export function versionStorageKey(
  userId: string,
  docId: string,
  versionSlug: string,
  filename: string,
): string {
  return `documents/${userId}/${docId}/versions/${versionSlug}${storageExtension(filename, ".bin")}`;
}

function storageExtension(filename: string, fallback: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot < 0) return fallback;
  const ext = filename.slice(lastDot).toLowerCase();
  return /^\.[a-z0-9]{1,16}$/.test(ext) ? ext : fallback;
}
