"use client";

import Link from "next/link";
import Image from "next/image";
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
        <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <SiteLogo size="md" />
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                            Entrar
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-slate-900 text-white hover:bg-slate-800 h-9 px-5">
                                Começar Grátis
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center px-6 pt-32 pb-24 overflow-hidden bg-slate-50/50">
                    {/* Subtle Background Pattern (Optional, but keeping it clean as requested) */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
                    </div>

                    <div className="max-w-7xl mx-auto w-full relative z-10">
                        <div className="max-w-3xl text-left">
                            <h1 className="text-5xl md:text-8xl font-serif font-medium tracking-tight text-slate-900 mb-8 leading-[1.1]">
                                Inteligência Jurídica <br /> de Elite. <span className="text-slate-400">Escala sem precedentes.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-500 max-w-xl mb-12 leading-relaxed">
                                O <span className="font-semibold text-slate-900">Doqs</span> automatiza a análise documental com o rigor e a sofisticação que seu escritório exige.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Link href="/signup" className="w-full sm:w-auto">
                                    <Button className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 h-14 px-10 text-xl font-bold shadow-xl transition-transform hover:scale-105">
                                        Começar Agora
                                    </Button>
                                </Link>
                                <p className="text-sm text-slate-400 font-medium">20 créditos gratuitos por mês. Sem cartão.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Feature Highlight (Context) */}
                <section className="py-24 bg-slate-50 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:grid md:grid-cols-[1fr_1.4fr] gap-16 items-center">
                        {/* Image First on Mobile */}
                        <div className="relative group order-first md:order-last">
                            {/* Highlight Glow */}
                            <div className="absolute -inset-4 bg-emerald-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-0.5 aspect-[3/2] md:aspect-[16/10] overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)]">
                                <Image 
                                    src="/dashboard-preview.png" 
                                    alt="Doqs Dashboard"
                                    width={800}
                                    height={500}
                                    className="w-full h-full object-cover object-center"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            </div>
                            
                            {/* Decorative Badge */}
                            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 shadow-xl rounded-lg p-3 hidden lg:block animate-bounce-slow">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">Dashboard Oficial</span>
                                </div>
                            </div>
                        </div>

                        {/* Features with Timeline Line */}
                        <div className="relative">
                            <div className="mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                                    <FolderSearch className="h-3.5 w-3.5" />
                                    Contexto é tudo
                                </div>
                                <h2 className="text-4xl font-serif font-medium mb-6 text-slate-900 leading-tight">
                                    Pare de subir arquivos. <br />Comece a gerenciar casos.
                                </h2>
                            </div>

                            {/* Vertical Line Background */}
                            <div className="absolute left-6 top-40 bottom-8 w-px bg-slate-200 hidden md:block" />

                            <div className="space-y-12">
                                {[
                                    {
                                        title: "Projetos",
                                        desc: "Agrupe documentos por caso. A IA entende o conjunto da obra, cruzando informações entre múltiplos arquivos para análises contextuais profundas.",
                                        icon: <FolderSearch className="h-5 w-5" />
                                    },
                                    {
                                        title: "Análise Tabular",
                                        desc: "Extraia e compare dados de centenas de documentos em formato de tabela. Ideal para auditorias, due diligence e revisões em massa.",
                                        icon: <Server className="h-5 w-5" />
                                    },
                                    {
                                        title: "Modelos de Análise",
                                        desc: "Crie roteiros de análise personalizados para padronizar revisões contratuais e garantir que nenhum detalhe passe despercebido pelo seu time.",
                                        icon: <ShieldCheck className="h-5 w-5" />
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="relative flex gap-8 items-start group">
                                        {/* Timeline Dot/Icon */}
                                        <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 group-hover:border-emerald-500 group-hover:text-emerald-600 transition-all duration-300 shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
                                            <p className="text-slate-500 leading-relaxed text-base">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-12">
                                <Link href="/signup">
                                    <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-8">
                                        Experimentar na Prática &rarr;
                                    </Button>
                                </Link>
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

                {/* Law Areas Versatility */}
                <section className="py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-serif font-medium mb-12 text-slate-900">
                            Uma única inteligência para todas as suas áreas.
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                "Contencioso Cível", "Direito do Consumidor", "Trabalhista Patronal", 
                                "Tributário Estratégico", "Contratos e Societário", "Imobiliário",
                                "Família e Sucessões", "Propriedade Intelectual", "Ambiental"
                            ].map((area, i) => (
                                <span key={i} className="px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all cursor-default">
                                    {area}
                                </span>
                            ))}
                        </div>
                        <p className="mt-10 text-slate-400 text-sm">
                            O Doqs adapta seu raciocínio jurídico à doutrina e jurisprudência específica de cada ramo.
                        </p>
                    </div>
                </section>

                {/* Pricing Section */}
                <div id="pricing">
                    <LandingPricing />
                </div>

                {/* Final CTA */}
                <section className="py-32 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-serif font-medium mb-6 text-slate-900">
                            Pronto para dar escala ao seu escritório?
                        </h2>
                        <p className="text-slate-500 mb-10 text-lg">
                            Junte-se a advogados que já automatizaram o rito de análise documental com o Doqs.
                        </p>
                        <Link href="/signup">
                            <Button className="bg-slate-900 text-white hover:bg-slate-800 h-14 px-10 text-xl shadow-2xl">
                                Começar Gratuitamente
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Robustness & Compliance Trust Widget */}
            <div className="bg-slate-50 border-y border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h4 className="text-lg font-serif font-medium text-slate-900 mb-1 flex items-center justify-center lg:justify-start gap-2">
                                <ShieldCheck className="h-5 w-5 text-emerald-600 animate-pulse" />
                                Robustez & Garantia de Privacidade
                            </h4>
                            <p className="text-sm text-slate-500 max-w-xl">
                                Seus dados estão protegidos sob protocolos rígidos de segurança, com tráfego 100% criptografado e conformidade integral à LGPD.
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { label: "SSL/TLS", value: "Grade A+", status: "Ativo" },
                                { label: "Criptografia", value: "AES-256", status: "Bancário" },
                                { label: "Conformidade", value: "LGPD/GDPR", status: "100%" },
                                { label: "Servidor OCI", value: "São Paulo", status: "Uptime 99.9%" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3 min-w-[140px] text-center shadow-sm">
                                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">{stat.label}</div>
                                    <div className="text-base font-bold text-slate-800 leading-none mb-1">{stat.value}</div>
                                    <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter flex items-center justify-center gap-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        {stat.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

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
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Produto</h4>
                                <ul className="space-y-2 text-sm text-slate-500">
                                    <li><Link href="#pricing" className="hover:text-slate-900">Preços</Link></li>
                                    <li><Link href="/guia-ia" className="hover:text-slate-900 font-medium text-emerald-600">Guia: IA para Escritórios</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Legal</h4>
                                <ul className="space-y-2 text-sm text-slate-500">
                                    <li><Link href="/termos" className="hover:text-slate-900">Termos de Uso</Link></li>
                                    <li><Link href="/privacidade" className="hover:text-slate-900">Privacidade</Link></li>
                                    <li><Link href="#" className="hover:text-slate-900">LGPD</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-100">
                        <div className="bg-slate-50 p-4 rounded-lg mb-8">
                            <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                                <strong>DISCLAIMER:</strong> O Doqs é uma ferramenta de produtividade jurídica operada por inteligência artificial. Os resultados gerados devem ser validados e revisados por advogados qualificados. O Doqs não fornece aconselhamento jurídico ou consultoria legal e não substitui a atuação profissional do advogado. A Finhouse não se responsabiliza por erros decorrentes da má interpretação ou uso indevido da ferramenta.
                            </p>
                        </div>
                        <p className="text-xs text-slate-400 text-center font-medium">
                            © 2026 Doqs IA • CNPJ: 60.806.192/0001-50 • Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
