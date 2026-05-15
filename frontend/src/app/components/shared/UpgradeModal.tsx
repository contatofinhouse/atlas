"use client";

import { useState } from "react";
import { Check, Loader2, Sparkles, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/contexts/UserProfileContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: Props) {
    const { user } = useAuth();
    const { profile } = useUserProfile();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cycle, setCycle] = useState<"monthly" | "quarterly" | "semiannual">("monthly");

    if (!isOpen) return null;

    interface PriceInfo {
        id?: string;
        label: string;
        price: string;
        total: string;
        discount?: string;
    }

    const prices: Record<string, PriceInfo> = {
        monthly: { id: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY, label: "Mensal", price: "R$ 197", total: "/mês" },
        quarterly: { id: process.env.NEXT_PUBLIC_STRIPE_PRICE_QUARTERLY, label: "Trimestral", price: "R$ 177", total: "/mês", discount: "10% OFF" },
        semiannual: { id: process.env.NEXT_PUBLIC_STRIPE_PRICE_SEMIANNUAL, label: "Semestral", price: "R$ 157", total: "/mês", discount: "20% OFF" },
    };

    const handleUpgrade = async () => {
        if (!user) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/stripe/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    userEmail: user.email,
                    priceId: prices[cycle].id,
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Erro ao iniciar checkout");
            }
        } catch (err: any) {
            console.error("Upgrade error:", err);
            setError(err.message || "Ocorreu um erro. Tente novamente.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header with Gradient */}
                <div className="h-28 bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col justify-end relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2 text-white mb-1">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                        <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">Plano Premium</span>
                    </div>
                    <h2 className="text-2xl font-serif text-white leading-none">Doqs Pro</h2>
                </div>

                <div className="p-6">
                    {/* Billing Cycle Toggle */}
                    <div className="flex p-1 bg-gray-50 rounded-xl mb-6">
                        {(["monthly", "quarterly", "semiannual"] as const).map((k) => (
                            <button
                                key={k}
                                onClick={() => setCycle(k)}
                                className={`flex-1 py-2 text-[11px] font-medium rounded-lg transition-all ${
                                    cycle === k 
                                        ? "bg-white text-black shadow-sm" 
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <div className="flex flex-col items-center">
                                    <span>{prices[k].label}</span>
                                    {prices[k].discount && (
                                        <span className="text-[9px] text-green-600 font-bold leading-none mt-0.5">{prices[k].discount}</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold tracking-tight">{prices[cycle].price}</span>
                            <span className="text-gray-500 text-sm">{prices[cycle].total}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            Acesso ilimitado a todos os recursos
                        </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                        {[
                            "Ações Ilimitadas (Análises e Chats)",
                            "Exportação para Excel (Tabular Review)",
                            "Prioridade no processamento (Gemini 1.5 Pro)",
                            "Criação de Modelos Customizados",
                        ].map((benefit, i) => (
                            <li key={i} className="flex items-center gap-3 text-[13px] text-gray-700">
                                <div className="h-4 w-4 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <Check className="h-2.5 w-2.5 text-blue-600" />
                                </div>
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>Assinar Plano {prices[cycle].label}</>
                            )}
                        </button>
                        <p className="text-[10px] text-gray-400 text-center">
                            Pagamento seguro via Stripe. Cancele a qualquer momento.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
