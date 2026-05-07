import type { ColumnFormat } from "../shared/types";

export interface ColumnPreset {
    name: string;
    matches: RegExp;
    prompt: string;
    format: ColumnFormat;
    tags?: string[];
}

export const PROMPT_PRESETS: ColumnPreset[] = [
    {
        name: "Partes",
        matches: /\bpart(e|es)\b/i,
        format: "bulleted_list",
        prompt: 'Liste todas as partes deste contrato. Para cada parte, indique o nome legal completo, o tipo de entidade e o papel definido, por exemplo:\n• Empresa ABC, uma empresa brasileira ("Contratante")\n• João Silva ("Sócio")\nUma parte por marcador. Sem comentários adicionais.',
    },
    {
        name: "Lei de Regência / Foro",
        matches: /\blei( de regência)?\b|\bforo\b/i,
        format: "text",
        prompt: 'Indique apenas a lei de regência ou o foro deste acordo usando o nome de forma concisa, por exemplo "Lei Brasileira", "Foro de São Paulo". Sem outro texto.',
    },
    {
        name: "Data de Vigência",
        matches: /\bdata de vigência\b|\bvigência\b/i,
        format: "date",
        prompt: 'Indique apenas a data de vigência deste acordo no formato DD Mês AAAA, por exemplo "2 Jan 2026". Se não estiver explicitamente indicado, escreva "Não especificado".',
    },
    {
        name: "Prazo",
        matches: /\bprazo\b|\bduração\b/i,
        format: "text",
        prompt: 'Indique apenas a duração ou o prazo deste acordo de forma concisa, por exemplo "3 anos", "24 meses", "perpétuo". Sem outro texto.',
    },
    {
        name: "Rescisão",
        matches: /\brescisão\b|\bterminar\b|\bencerrar\b/i,
        format: "text",
        prompt: "Extraia as disposições sobre rescisão. Indique quem pode rescindir, os eventos desencadeadores, o período de aviso prévio obrigatório e as principais consequências da rescisão. Seja conciso.",
    },
    {
        name: "Mudança de Controle",
        matches: /\bmudança de controle\b/i,
        format: "text",
        prompt: "Identifique quaisquer disposições sobre mudança de controle. Resuma os eventos desencadeadores, consequências, requisitos de consentimento e quaisquer direitos de rescisão ou aceleração relacionados. Seja conciso.",
    },
    {
        name: "Confidencialidade",
        matches: /\bconfidencial(idade)?\b|\bsigilo\b/i,
        format: "text",
        prompt: "Resuma as obrigações de confidencialidade: escopo das informações confidenciais, divulgações permitidas, restrições de uso, duração e principais exceções.",
    },
    {
        name: "Cessão",
        matches: /\bcessão\b|\bceder\b/i,
        format: "yes_no",
        prompt: "A cessão deste contrato é permitida sem o consentimento da outra parte?",
    },
    {
        name: "Pagamento e Valores",
        matches: /\bpagamento(s)?\b|\btaxas?\b|\bvalor(es)?\b/i,
        format: "text",
        prompt: 'Indique as principais obrigações de pagamento de forma concisa: valor, prazo e moeda, por exemplo "BRL 10.000 pagável em 30 dias após a fatura". Observe as consequências do atraso no pagamento.',
    },
    {
        name: "Alteração / Aditivo",
        matches: /\balteração\b|\baditivo\b|\bmodificação\b/i,
        format: "text",
        prompt: "Resuma as disposições de alteração (aditivo): como as alterações podem ser feitas, quem deve consentir e quaisquer requisitos de formalidade, como documento por escrito ou assinatura.",
    },
    {
        name: "Indenização",
        matches: /\bindeniza(ção|ções)\b/i,
        format: "text",
        prompt: "Resuma as disposições de indenização: quem indeniza quem, o escopo das perdas indenizadas, quaisquer limites ou exclusões de responsabilidade e principais procedimentos de reivindicação.",
    },
    {
        name: "Garantias",
        matches: /\bgarantia(s)?\b|\bdeclarações?\b/i,
        format: "text",
        prompt: "Identifique e descreva as principais declarações e garantias fornecidas por qualquer parte, incluindo o escopo de tais garantias e quaisquer períodos ou condições específicas aplicáveis a elas. Destaque em particular quaisquer garantias incomuns.",
    },
    {
        name: "Força Maior",
        matches: /\bforça maior\b|\bcaso fortuito\b/i,
        format: "yes_no",
        prompt: "Este acordo contém uma cláusula de força maior ou caso fortuito?",
    },
];

export function getPresetConfig(
    title: string,
): Pick<ColumnPreset, "prompt" | "format" | "tags"> | null {
    const trimmed = title.trim();
    if (!trimmed) return null;
    const preset = PROMPT_PRESETS.find(({ matches }) => matches.test(trimmed));
    if (!preset) return null;
    return { prompt: preset.prompt, format: preset.format, tags: preset.tags };
}

export function getPresetPrompt(title: string): string | null {
    return getPresetConfig(title)?.prompt ?? null;
}
