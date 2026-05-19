"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteLogo } from "@/components/site-logo";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ResetPasswordPage() {
    const router = useRouter();
    const { isAuthenticated, authLoading } = useAuth();
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // If they land here without a recovery session (e.g., they just typed /reset-password)
    // we should ideally redirect them if not authenticated, but since Supabase needs time to parse the hash,
    // we wait until authLoading is false.
    useEffect(() => {
        if (!authLoading && !isAuthenticated && !success) {
            router.replace("/login");
        }
    }, [authLoading, isAuthenticated, router, success]);

    const handleUpdatePassword = async (e: React.FormEvent) => {
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
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) throw error;
            
            setSuccess(true);
            setTimeout(() => {
                router.replace("/assistant");
            }, 2000);
        } catch (error: any) {
            setError(error.message || "Ocorreu um erro ao atualizar a senha");
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-dvh flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    if (!isAuthenticated && !success) {
        return null; // Will redirect via useEffect
    }

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
                            Defina sua nova senha.
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Escolha uma senha forte para manter o acesso seguro ao seu workspace.
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
                            Nova Senha
                        </h2>
                    </div>

                    {success ? (
                        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center">
                            <div className="mx-auto w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                            <h3 className="text-emerald-900 font-medium mb-2">Senha atualizada!</h3>
                            <p className="text-emerald-700 text-sm">
                                Redirecionando você para o painel...
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Nova senha
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Crie uma nova senha"
                                    required
                                    className="w-full h-12"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Confirmar nova senha
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirme sua nova senha"
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
                                disabled={loading || !password || !confirmPassword}
                                className="w-full h-12 mt-4 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md transition-all"
                            >
                                {loading ? "Atualizando..." : "Salvar e Acessar"}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
