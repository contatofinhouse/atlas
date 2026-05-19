"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                // Ensure it redirects to the reset password page
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;
            setSuccess(true);
        } catch (error: any) {
            setError(error.message || "Ocorreu um erro ao enviar o e-mail");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh flex flex-col md:flex-row bg-white">
            {/* Left Panel */}
            <div className="w-full md:w-[45%] lg:w-[40%] bg-slate-950 text-white flex flex-col justify-between p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-br from-emerald-900/20 to-transparent blur-3xl rounded-full" />
                </div>
                
                <div className="relative z-10">
                    <SiteLogo size="md" asLink invert />
                    <div className="mt-16 md:mt-24 max-w-md">
                        <h1 className="text-3xl md:text-4xl font-serif font-medium leading-tight mb-6">
                            Recupere seu acesso.
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Nós enviaremos instruções de recuperação para o seu e-mail corporativo cadastrado.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 mt-12 md:mt-0 flex flex-wrap gap-4 pt-8 border-t border-slate-800/50">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                        <ShieldCheck className="h-4 w-4" />
                        Acesso Seguro
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 relative">
                <div className="w-full max-w-[400px]">
                    <div className="mb-8">
                        <h2 className="text-2xl font-medium font-serif text-slate-900 mb-2">
                            Redefinir Senha
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Voltar para o <Link href="/login" className="text-emerald-700 hover:text-emerald-800 font-medium">Login</Link>
                        </p>
                    </div>

                    {success ? (
                        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center">
                            <div className="mx-auto w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                            <h3 className="text-emerald-900 font-medium mb-2">E-mail enviado!</h3>
                            <p className="text-emerald-700 text-sm">
                                Se o e-mail estiver cadastrado, você receberá um link de redefinição de senha em instantes.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleReset} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    E-mail da sua conta
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nome@escritorio.com.br"
                                    required
                                    className="w-full h-12"
                                />
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-2">
                                    <div className="mt-0.5">⚠️</div>
                                    <div>{error}</div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full h-12 mt-4 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md transition-all"
                            >
                                {loading ? "Enviando..." : "Enviar link de recuperação"}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
