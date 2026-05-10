export const PRACTICE_OPTIONS = [
    "Transações Gerais",
    "Societário",
    "Financeiro",
    "Contencioso",
    "Imobiliário",
    "Tributário",
    "Trabalhista",
    "Propriedade Intelectual",
    "Concorrencial",
    "Transações de Tecnologia",
    "Project Finance",
    "EC/VC",
    "Private Equity",
    "Crédito Privado",
    "ECM",
    "DCM",
    "Lev Fin",
    "Arbitragem",
    "Outros",
] as const;

export type Practice = (typeof PRACTICE_OPTIONS)[number];
