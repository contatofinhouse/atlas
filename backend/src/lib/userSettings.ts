import { createServerSupabase } from "./supabase";
import {
    resolveModel,
    DEFAULT_TITLE_MODEL,
    DEFAULT_TABULAR_MODEL,
    type UserApiKeys,
} from "./llm";

export type UserModelSettings = {
    title_model: string;
    tabular_model: string;
    api_keys: UserApiKeys;
};

/**
 * API keys are now global (from .env), not per-user.
 * Title generation always uses the cheapest Gemini model.
 */
export async function getUserModelSettings(
    userId: string,
    db?: ReturnType<typeof createServerSupabase>,
): Promise<UserModelSettings> {
    const client = db ?? createServerSupabase();
    const { data } = await client
        .from("user_profiles")
        .select("tabular_model")
        .eq("user_id", userId)
        .single();

    // Global keys — providers read directly from process.env
    const api_keys: UserApiKeys = { claude: null, gemini: null };

    return {
        title_model: DEFAULT_TITLE_MODEL,
        tabular_model: resolveModel(data?.tabular_model, DEFAULT_TABULAR_MODEL),
        api_keys,
    };
}

/**
 * API keys are now global (from .env). This function returns empty keys
 * since providers (gemini.ts, claude.ts) read directly from process.env.
 */
export async function getUserApiKeys(
    _userId: string,
    _db?: ReturnType<typeof createServerSupabase>,
): Promise<UserApiKeys> {
    return { claude: null, gemini: null };
}
