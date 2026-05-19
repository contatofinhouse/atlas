"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { ShieldCheck, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan");
    const cycle = searchParams.get("cycle") || "monthly";

    const { isAuthenticated, authLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isRedirectingCheckout, setIsRedirectingCheckout] = useState(false);

    useEffect(() => {
        if (!authLoading && isAuthenticated && !success && !isRedirectingCheckout) {
            router.replace("/assistant");
        }
    }, [authLoading, isAuthenticated, router, success, isRedirectingCheckout]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/assistant`,
                }
            });

            if (error) throw error;

            const user = data.user;
            if (user && data.session) {
                const trimmedName = name.trim();
                const trimmedOrg = organisation.trim();
                if (trimmedName || trimmedOrg) {
                    const { error: profileError } = await supabase
                        .from("user_profiles")
                        .update({
                            ...(trimmedName && { display_name: trimmedName }),
                            ...(trimmedOrg && { organisation: trimmedOrg }),
                            updated_at: new Date().toISOString(),
                        })
                        .eq("user_id", user.id);
                    if (profileError) {
                        console.error("[signup] failed to persist profile fields", profileError);
                    }
                }
            }

            // Auto-redirect to Stripe if plan=pro
            if (plan === "pro" && user) {
                setIsRedirectingCheckout(true);
                let priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY;
                if (cycle === "quarterly") priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_QUARTERLY;
                if (cycle === "semiannual") priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_SEMIANNUAL;

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"}/stripe/create-checkout-session`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user.id,
                        userEmail: user.email,
                        priceId,
                    }),
                });

                const checkoutData = await response.json();
                if (checkoutData.url) {
                    window.location.href = checkoutData.url;
                    return; // Prevent normal flow
                } else {
                    console.error("Failed to create checkout session", checkoutData);
                    // Fallback to normal success flow
                }
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/assistant");
            }, 2000);
        } catch (error: any) {
            setError(error.message || "Ocorreu um erro durante o cadastro");
        } finally {
            if (!isRedirectingCheckout) {
                setLoading(false);
            }
        }
    };

    if (success || isRedirectingCheckout) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 relative h-full">
                <div className="w-full max-w-[400px]">
                    <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
                        <div className="mx-auto w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                            {isRedirectingCheckout ? (
                                <Loader2 className="h-6 w-6 text-emerald-600 animate-spin" />
                            ) : (
                                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                            )}
                        </div>
                        <h2 className="text-2xl font-serif text-slate-900 mb-3">
                            {isRedirectingCheckout ? "Preparando checkout..." : "Conta criada!"}
                        </h2>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            {isRedirectingCheckout 
                                ? "Redirecionando para a página de pagamento seguro."
                                : "Verifique seu e-mail para confirmar a conta e acessar o painel."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 relative overflow-y-auto">
            <div className="w-full max-w-[400px] my-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-medium font-serif text-slate-900 flex items-center gap-2">
                        {plan === "pro" ? "Criar conta Pro" : "Criar conta"}
                        {plan !== "pro" && (
                            <span className="text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full mt-1">
                                Grátis
                            </span>
                        )}
                    </h2>
                    <div className="flex text-sm font-medium">
                        <Link
                            href="/login"
                            className="text-slate-500 hover:text-slate-900 pb-1 border-b-2 border-transparent transition-colors mr-4"
                        >
                            Entrar
                        </Link>
                        <span className="text-slate-900 border-b-2 border-slate-900 pb-1">
                            Cadastro
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1.5">
                                Nome <span className="text-slate-400 font-normal">(opcional)</span>
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome"
                                className="w-full h-10"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="organisation" className="block text-xs font-medium text-slate-700 mb-1.5">
                                Escritório <span className="text-slate-400 font-normal">(opcional)</span>
                            </label>
                            <Input
                                id="organisation"
                                type="text"
                                value={organisation}
                                onChange={(e) => setOrganisation(e.target.value)}
                                placeholder="Sua empresa"
                                className="w-full h-10"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1.5">
                            E-mail corporativo
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nome@escritorio.com.br"
                            required
                            className="w-full h-10"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-slate-700 mb-1.5">
                            Senha
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Crie uma senha (mín. 6 caracteres)"
                            required
                            className="w-full h-10"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-medium text-slate-700 mb-1.5">
                            Confirmar Senha
                        </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme sua senha"
                            required
                            className="w-full h-10"
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-xs bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-2 mt-2">
                            <div className="mt-0.5">⚠️</div>
                            <div>{error}</div>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 mt-6 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md transition-all"
                    >
                        {loading ? "Processando..." : (plan === "pro" ? "Continuar para Pagamento" : "Criar Conta Gratuitamente")}
                    </Button>
                    
                    {plan !== "pro" && (
                        <p className="text-center text-xs text-slate-400 mt-2 font-medium">
                            Nenhum cartão de crédito é exigido.
                        </p>
                    )}
                    
                    <p className="mt-8 text-center text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                        Ao se cadastrar, você concorda com nossos{" "}
                        <Link href="/termos" className="text-slate-700 hover:text-slate-900 underline underline-offset-2">Termos de Uso</Link>
                        {" "}e{" "}
                        <Link href="/privacidade" className="text-slate-700 hover:text-slate-900 underline underline-offset-2">Política de Privacidade (LGPD)</Link>.
                    </p>
                </form>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <div className="h-dvh flex flex-col md:flex-row bg-white">
            {/* Left Panel - Branding */}
            <div className="w-full md:w-[45%] lg:w-[40%] bg-slate-950 text-white flex flex-col justify-between p-8 md:p-12 relative overflow-hidden shrink-0">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-br from-emerald-900/20 to-transparent blur-3xl rounded-full" />
                </div>
                
                <div className="relative z-10">
                    <SiteLogo size="md" asLink invert />
                    <div className="mt-12 md:mt-24 max-w-md">
                        <h1 className="text-3xl md:text-4xl font-serif font-medium leading-tight mb-6">
                            Eleve o padrão do seu escritório.
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Junte-se a bancas que já utilizam a IA jurídica de mais alta performance do mercado.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                "Aumento de produtividade em até 70%",
                                "Revisão e extração de dados sem erros manuais",
                                "Armazenamento soberano e conformidade com LGPD"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-12 md:mt-0 flex flex-wrap gap-4 pt-8 border-t border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                        <ShieldCheck className="h-4 w-4" />
                        AES-256
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                        <Lock className="h-4 w-4" />
                        SSL A+
                    </div>
                </div>
            </div>

            {/* Right Panel - Form with Suspense for SearchParams */}
            <Suspense fallback={
                <div className="flex-1 flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
                </div>
            }>
                <SignupForm />
            </Suspense>
        </div>
    );
}
