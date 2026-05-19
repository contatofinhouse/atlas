"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated, authLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.replace("/assistant");
        }
    }, [authLoading, isAuthenticated, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/assistant");
        } catch (error: any) {
            setError(error.message || "Ocorreu um erro durante o login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh flex flex-col md:flex-row bg-white">
            {/* Left Panel - Branding (Hidden on very small mobile, visible as header on mobile, full side on md+) */}
            <div className="w-full md:w-[45%] lg:w-[40%] bg-slate-950 text-white flex flex-col justify-between p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-br from-emerald-900/20 to-transparent blur-3xl rounded-full" />
                </div>
                
                <div className="relative z-10">
                    <SiteLogo size="md" asLink invert />
                    <div className="mt-16 md:mt-24 max-w-md">
                        <h1 className="text-3xl md:text-4xl font-serif font-medium leading-tight mb-6">
                            Inteligência jurídica de elite.
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Projetado para escritórios e departamentos jurídicos que valorizam precisão técnica, velocidade e escalabilidade incomparável.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                "Contexto multidiomático e jurisprudencial",
                                "Processamento tabular estruturado",
                                "Soberania de dados e LGPD"
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

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 relative">
                <div className="w-full max-w-[400px]">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-medium font-serif text-slate-900">
                            Acessar conta
                        </h2>
                        <div className="flex text-sm font-medium">
                            <span className="text-slate-900 border-b-2 border-slate-900 pb-1 mr-4">
                                Entrar
                            </span>
                            <Link
                                href="/signup"
                                className="text-slate-500 hover:text-slate-900 pb-1 border-b-2 border-transparent transition-colors"
                            >
                                Cadastro
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                E-mail corporativo
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

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Senha
                                </label>
                                <Link 
                                    href="/forgot-password" 
                                    className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
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
                            disabled={loading}
                            className="w-full h-12 mt-4 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md transition-all"
                        >
                            {loading ? "Autenticando..." : "Entrar no Workspace"}
                        </Button>
                        
                        <p className="mt-8 text-center text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                            Ao entrar, você concorda com nossos{" "}
                            <Link href="/termos" className="text-slate-700 hover:text-slate-900 underline underline-offset-2">Termos de Uso</Link>
                            {" "}e{" "}
                            <Link href="/privacidade" className="text-slate-700 hover:text-slate-900 underline underline-offset-2">Política de Privacidade (LGPD)</Link>.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
