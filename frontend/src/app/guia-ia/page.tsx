"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, Scaling, Zap, ShieldCheck } from "lucide-react";

export default function GuiaIAPage() {
    return (
        <main className="min-h-screen bg-white">
            <nav className="border-b border-gray-100 py-4 px-6 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <span className="font-serif text-xl text-slate-900 font-medium">LukaLex Insights</span>
                </div>
            </nav>

            <article className="max-w-4xl mx-auto px-6 py-16">
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <BookOpen className="h-3.5 w-3.5" />
                        Guia de Tecnologia Jurídica
                    </div>
                    <h1 className="text-5xl font-serif font-medium text-slate-900 mb-6 leading-tight">
                        Como escolher a Inteligência Artificial certa para o seu escritório
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Aprenda a diferenciar ferramentas genéricas de soluções verticais e como a IA pode ser o motor de escala do seu escritório.
                    </p>
                </header>

                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-12">
                    <section>
                        <h2 className="text-3xl font-serif text-slate-900 mb-4">1. IA Genérica vs. IA Vertical</h2>
                        <p>
                            Muitos advogados começam pelo ChatGPT ou outras ferramentas genéricas. Embora impressionantes, elas possuem uma falha crítica para o Direito: a **amnésia contextual**. No momento em que você sobe o décimo documento ou o chat fica longo, a IA começa a "alucinar" ou esquecer detalhes do início do processo.
                        </p>
                        <p>
                            Uma IA Vertical como o LukaLex é projetada para manter o contexto vivo em **Projetos**. Ela não lê apenas um arquivo; ela entende o caso completo, cruzando dados entre petições, sentenças e provas de forma persistente.
                        </p>
                    </section>

                    <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                        <h2 className="text-3xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                            <Scaling className="h-8 w-8 text-emerald-600" />
                            2. O Poder da Padronização
                        </h2>
                        <p>
                            O maior gargalo de um escritório que cresce é a **variabilidade da qualidade**. Cada advogado júnior ou associado tem um estilo e um rigor diferente.
                        </p>
                        <p className="font-medium text-slate-800">
                            A IA permite a padronização absoluta através de Modelos de Análise.
                        </p>
                        <p>
                            Ao criar um modelo no LukaLex, você define exatamente o que deve ser conferido em cada contrato ou processo. Isso transforma o rito de análise em um processo industrial de alta precisão. O resultado é o mesmo, seja o advogado com 20 anos de casa ou um estagiário operando a ferramenta.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-serif text-slate-900 mb-4">3. Ganhos de Escala Reais</h2>
                        <p>
                            Escalar um escritório tradicionalmente significava contratar mais pessoas (e aumentar o custo fixo linearmente). Com a IA Vertical, você quebra essa relação.
                        </p>
                        <ul className="list-disc pl-6 space-y-4">
                            <li><strong>Análise Tabular:</strong> O que levava semanas em uma due diligence agora leva minutos.</li>
                            <li><strong>Redução de Erro Humano:</strong> A IA não cansa e não pula cláusulas na sexta-feira às 18h.</li>
                            <li><strong>Foco no Estratégico:</strong> Seu time para de "procurar informação" e passa a "tomar decisões".</li>
                        </ul>
                    </section>

                    <section className="border-t border-slate-100 pt-12">
                        <h2 className="text-3xl font-serif text-slate-900 mb-4">4. Segurança e LGPD</h2>
                        <p>
                            Para escritórios de advocacia, a segurança não é opcional. Certifique-se de que a ferramenta escolhida não utilize seus dados para treinar modelos públicos. No LukaLex, seus dados são criptografados e isolados, garantindo o sigilo profissional exigido pela OAB e pela LGPD.
                        </p>
                    </section>
                </div>

                <footer className="mt-20 p-12 bg-slate-900 rounded-[2.5rem] text-center text-white">
                    <h3 className="text-3xl font-serif mb-6">Pronto para padronizar sua operação?</h3>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                        Comece hoje mesmo a transformar seu escritório em uma operação de escala com o LukaLex.
                    </p>
                    <Link href="/login">
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 h-14 px-10 text-xl font-bold">
                            Experimentar Gratuitamente
                        </Button>
                    </Link>
                </footer>
            </article>
        </main>
    );
}
