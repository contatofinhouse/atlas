"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/site-logo";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { LandingPricing } from "@/components/landing/LandingPricing";
import { ShieldCheck, Zap, FolderSearch, Users, Lock, Server } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            redirect("/assistant");
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <SiteLogo size="md" />
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                            Entrar
                        </Link>
                        <Link href="/login">
                            <Button className="bg-slate-900 text-white hover:bg-slate-800 h-9 px-5">
                                Começar Grátis
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>            <main className="pt-32">
                {/* Hero Section */}
                <section className="px-6 mb-24">
                    <div className="max-w-5xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-slate-900 mb-8 leading-[1.1]">
                            Escalabilidade industrial para <br /> sua prática jurídica.
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                            O <span className="font-medium text-slate-900">LukaLex</span> organiza seus casos por pastas e executa fluxos de análise complexos com o rigor que seu escritório exige.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/login">
                                <Button className="bg-slate-900 text-white hover:bg-slate-800 h-12 px-8 text-lg shadow-xl">
                                    Começar Agora Gratuitamente
                                </Button>
                            </Link>
                            <p className="text-sm text-slate-400">20 créditos gratuitos por mês. Sem cartão.</p>
                        </div>
                    </div>
                </section>

                {/* Main Feature Highlight (Context) */}
                <section className="py-24 bg-slate-50 border-y border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                                <FolderSearch className="h-3.5 w-3.5" />
                                Contexto é tudo
                            </div>
                            <h2 className="text-4xl font-serif font-medium mb-6 text-slate-900 leading-tight">
                                Pare de subir arquivos. <br />Comece a gerenciar casos.
                            </h2>
                            <p className="text-slate-600 text-lg mb-8">
                                IAs genéricas esquecem o contexto em chats longos. No LukaLex, seus arquivos são organizados em pastas de projetos. O Luka entende o conjunto da obra, cruzando informações entre múltiplos documentos de um mesmo caso simultaneamente.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Memória persistente por projeto",
                                    "Cruzamento de dados entre documentos",
                                    "Organização idêntica ao seu arquivo físico/digital",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <Zap className="h-4 w-4 text-emerald-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 aspect-[4/3] overflow-hidden group">
                                <div className="h-full w-full bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-serif text-lg text-center p-8">
                                    {/* Placeholder for real screenshot */}
                                    Visualização do Dashboard LukaLex
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <ComparisonSection />

                {/* Security Section */}
                <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                            <Lock className="h-3.5 w-3.5" />
                            Segurança Nível Bancário
                        </div>
                        <h2 className="text-4xl font-serif font-medium mb-8 leading-tight">
                            Soberania de dados e sigilo absoluto.
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Server className="h-8 w-8 mb-6 text-white" />
                                <h3 className="text-lg font-medium mb-3">Servidores Locais</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Seus dados são processados e armazenados em solo brasileiro, garantindo conformidade e baixa latência.
                                </p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <ShieldCheck className="h-8 w-8 mb-6 text-white" />
                                <h3 className="text-lg font-medium mb-3">Criptografia de Ponta</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Utilizamos AES-256 para dados em repouso e TLS 1.3 em trânsito. O acesso é restrito apenas ao seu usuário.
                                </p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Users className="h-8 w-8 mb-6 text-white" />
                                <h3 className="text-lg font-medium mb-3">Privacidade Enterprise</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Garantia contratual de que seus documentos e interações nunca são usados para treinar modelos de terceiros.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <LandingPricing />

                {/* Final CTA */}
                <section className="py-32 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-serif font-medium mb-6 text-slate-900">
                            Pronto para dar escala ao seu escritório?
                        </h2>
                        <p className="text-slate-500 mb-10 text-lg">
                            Junte-se a advogados que já automatizaram o rito de análise documental com o Luka.
                        </p>
                        <Link href="/login">
                            <Button className="bg-slate-900 text-white hover:bg-slate-800 h-14 px-10 text-xl shadow-2xl">
                                Começar Gratuitamente
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-16 border-t border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        <div className="space-y-6">
                            <SiteLogo size="md" />
                            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                                Inteligência jurídica de alta performance para escritórios que buscam escala e precisão. 
                                Operado por Finhouse.
                            </p>
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                                CNPJ: 60.806.192/0001-50
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Produto</h4>
                                <ul className="space-y-2 text-sm text-slate-500">
                                    <li><Link href="/login" className="hover:text-slate-900">Entrar</Link></li>
                                    <li><Link href="/login" className="hover:text-slate-900">Preços</Link></li>
                                    <li><Link href="/tabular-reviews" className="hover:text-slate-900">Análise Tabular</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Legal</h4>
                                <ul className="space-y-2 text-sm text-slate-500">
                                    <li><Link href="#" className="hover:text-slate-900">Termos de Uso</Link></li>
                                    <li><Link href="#" className="hover:text-slate-900">Privacidade</Link></li>
                                    <li><Link href="#" className="hover:text-slate-900">LGPD</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-100">
                        <div className="bg-slate-50 p-4 rounded-lg mb-8">
                            <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                                <strong>DISCLAIMER:</strong> O LukaLex é uma ferramenta de assistência e produtividade baseada em inteligência artificial. Os resultados gerados devem ser revisados por profissionais qualificados. O LukaLex não fornece aconselhamento jurídico, consultoria legal ou substitui, sob qualquer hipótese, a atuação de um advogado devidamente inscrito na OAB.
                            </p>
                        </div>
                        <p className="text-xs text-slate-400 text-center font-medium">
                            © {new Date().getFullYear()} LukaLex IA. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
