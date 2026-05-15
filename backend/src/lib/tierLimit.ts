import { createServerSupabase } from "./supabase";

export interface TierInfo {
    tier: string;
    creditsUsed: number;
    resetDate: string;
}

export async function getUserTierInfo(userId: string): Promise<TierInfo> {
    const db = createServerSupabase();
    const { data, error } = await db
        .from("user_profiles")
        .select("tier, message_credits_used, credits_reset_date")
        .eq("user_id", userId)
        .single();

    if (error || !data) {
        return { tier: "Free", creditsUsed: 0, resetDate: new Date().toISOString() };
    }

    let creditsUsed = data.message_credits_used;
    let resetDate = new Date(data.credits_reset_date);
    const now = new Date();

    // Reset credits if past reset date
    if (now > resetDate) {
        creditsUsed = 0;
        resetDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        await db
            .from("user_profiles")
            .update({
                message_credits_used: 0,
                credits_reset_date: resetDate.toISOString(),
            })
            .eq("user_id", userId);
    }

    return {
        tier: data.tier,
        creditsUsed,
        resetDate: resetDate.toISOString(),
    };
}

export async function incrementUsage(userId: string) {
    const db = createServerSupabase();
    // Single atomic update — avoids the race condition of read-then-write
    // and eliminates one DB round-trip vs. the old SELECT + UPDATE approach.
    const { error } = await db.rpc("increment_message_credits", { p_user_id: userId });
    if (error) {
        // Fallback: if the RPC doesn't exist yet, use a standard update.
        // This is slightly racy but functional until the RPC is deployed.
        const { data } = await db
            .from("user_profiles")
            .select("message_credits_used")
            .eq("user_id", userId)
            .single();
        await db
            .from("user_profiles")
            .update({ message_credits_used: (data?.message_credits_used || 0) + 1 })
            .eq("user_id", userId);
    }
}


export const FREE_TIER_LIMIT = 20;

/**
 * Smart Routing logic:
 * Gemini Flash for simple/short tasks.
 * Gemini Pro for complex/large tasks or workflows.
 */
export function resolveSmartModel(params: {
    messages: any[];
    hasWorkflow?: boolean;
    docCount?: number;
}): string {
    // If it's a workflow, it's technical analysis -> Pro
    if (params.hasWorkflow) return "gemini-3.1-pro-preview";

    // If we have many documents (> 2), use Pro for better cross-referencing
    if ((params.docCount || 0) > 2) return "gemini-3.1-pro-preview";

    // If history is long, use Pro
    if (params.messages.length > 8) return "gemini-3.1-pro-preview";

    // Default to Flash
    return "gemini-3-flash-preview";
}
