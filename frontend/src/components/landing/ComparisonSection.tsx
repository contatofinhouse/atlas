"use client";

import { Check, X } from "lucide-react";

const COMPARISON_DATA = [
    {
        feature: "Contexto de Projetos (Pastas)",
        luka: true,
        generic: false,
        description: "O Doqs mantém o contexto de todos os arquivos de um caso simultaneamente.",
    },
    {
        feature: "Extração Tabular em Lote",
        luca: true,
        generic: false,
        description: "Processe 50+ documentos de uma vez e exporte para Excel estruturado.",
    },
    {
        feature: "Workflows Jurídicos Fixos",
        luca: true,
        generic: false,
        description: "Garantia de que o processo de análise segue o rito do seu escritório.",
    },
    {
        feature: "Soberania de Dados (Brasil)",
        luca: true,
        generic: false,
        description: "Seus dados são processados e armazenados em servidores locais.",
    },
    {
        feature: "Controle de Versões",
        luca: true,
        generic: false,
        description: "Histórico claro de revisões e alterações em documentos Word.",
    },
];

export function ComparisonSection() {
    return (
        <section className="py-24 bg-white border-y border-gray-100">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium font-serif mb-4 text-slate-900">
                        Por que advogados preferem o Doqs?
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        IAs genéricas são ótimas para conversas rápidas, mas falham na complexidade e no rigor que um escritório de advocacia exige.
                    </p>
                </div>

                <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full border-collapse min-w-[500px]">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="py-6 px-4 text-left font-medium text-slate-900 w-1/2">Diferencial</th>
                                <th className="py-6 px-4 text-center font-medium text-slate-900 bg-slate-50/50">Doqs IA</th>
                                <th className="py-6 px-4 text-center font-medium text-slate-500">IAs Genéricas</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {COMPARISON_DATA.map((item, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="py-6 px-4">
                                        <div className="font-medium text-slate-900 mb-1">{item.feature}</div>
                                        <div className="text-xs text-slate-500">{item.description}</div>
                                    </td>
                                    <td className="py-6 px-4 text-center bg-slate-50/50">
                                        <div className="flex justify-center">
                                            <Check className="h-5 w-5 text-emerald-600" />
                                        </div>
                                    </td>
                                    <td className="py-6 px-4 text-center">
                                        <div className="flex justify-center">
                                            <X className="h-5 w-5 text-slate-300" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
