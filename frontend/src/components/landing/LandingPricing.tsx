"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingPricing() {
    const [cycle, setCycle] = useState<"monthly" | "quarterly" | "semiannual">("monthly");

    interface Plan {
        label: string;
        price: string;
        total: string;
        billing: string;
        discount?: string;
    }

    const prices: Record<"monthly" | "quarterly" | "semiannual", Plan> = {
        monthly: { label: "Mensal", price: "197", total: "/mês", billing: "Cobrado mensalmente" },
        quarterly: { label: "Trimestral", price: "177", total: "/mês", billing: "R$ 531 cobrado a cada 3 meses", discount: "10% OFF" },
        semiannual: { label: "Semestral", price: "157", total: "/mês", billing: "R$ 942 cobrado a cada 6 meses", discount: "20% OFF" },
    };

    const features = [
        "Ações ilimitadas (Uso Justo)",
        "Processamento Tabular em Lote",
        "Gestão de Projetos e Pastas",
        "Workflows de Análise Ilimitados",
        "Exportação Word/Excel",
        "Suporte Prioritário via WhatsApp",
        "Dados em Servidores Locais (BR)",
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium font-serif mb-4 text-slate-900">
                        Planos simples para crescer com você
                    </h2>
                    <p className="text-slate-500">
                        Comece grátis e faça o upgrade quando precisar de escala.
                    </p>
                </div>

                {/* Cycle Toggles */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-lg border border-slate-200 inline-flex shadow-sm">
                        {(["monthly", "quarterly", "semiannual"] as const).map((c) => (
                            <button
                                key={c}
                                onClick={() => setCycle(c)}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                                    cycle === c
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {prices[c].label}
                                {prices[c].discount && (
                                    <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase">
                                        {prices[c].discount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                        <div className="mb-8">
                            <h3 className="text-lg font-medium text-slate-900 mb-2">Grátis</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-serif font-bold text-slate-900">R$ 0</span>
                                <span className="text-slate-500">/mês</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Para experimentar o poder da IA</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                <Check className="h-4 w-4 text-emerald-600" />
                                20 ações por mês
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                <Check className="h-4 w-4 text-emerald-600" />
                                Gestão básica de Projetos
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-300">
                                <Check className="h-4 w-4" />
                                Funções Avançadas Bloqueadas
                            </li>
                        </ul>
                        <Link href="/login">
                            <Button variant="outline" className="w-full border-slate-200 text-slate-900 hover:bg-slate-50">
                                Começar Agora
                            </Button>
                        </Link>
                    </div>

                    {/* Pro Tier */}
                    <div className="bg-white p-8 rounded-2xl border-2 border-slate-900 shadow-xl flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                            Recomendado
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-medium text-slate-900 mb-2">Profissional</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-serif font-bold text-slate-900">R$ {prices[cycle].price}</span>
                                <span className="text-slate-500">{prices[cycle].total}</span>
                            </div>
                            <p className="text-xs text-emerald-600 font-medium mt-2">{prices[cycle].billing}</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-emerald-600" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/login">
                            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg">
                                Assinar Plano Pro
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
