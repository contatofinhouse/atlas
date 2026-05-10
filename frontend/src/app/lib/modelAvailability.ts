import { MODELS, type ModelOption } from "../components/assistant/ModelToggle";

export type ModelProvider = "claude" | "gemini";

export function getModelProvider(modelId: string): ModelProvider | null {
    const model = MODELS.find((m) => m.id === modelId);
    if (!model) return null;
    return model.group === "Anthropic" ? "claude" : "gemini";
}

/**
 * All models are always available — API keys are global on the server (.env).
 * Users do NOT need to provide their own keys.
 */
export function isModelAvailable(
    _modelId: string,
    _apiKeys?: unknown,
): boolean {
    return true;
}

export function isProviderAvailable(
    _provider: ModelProvider,
    _apiKeys?: unknown,
): boolean {
    return true;
}

export function providerLabel(provider: ModelProvider): string {
    return provider === "claude" ? "Anthropic (Claude)" : "Google (Gemini)";
}

export function modelGroupToProvider(
    group: ModelOption["group"],
): ModelProvider {
    return group === "Anthropic" ? "claude" : "gemini";
}
