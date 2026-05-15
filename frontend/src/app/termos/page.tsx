"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermosPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <nav className="border-b border-gray-100 py-4 px-6 bg-white sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <span className="font-serif text-xl text-slate-900 font-medium">Termos de Uso</span>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
                    <h1 className="text-4xl font-serif text-slate-900 mb-8">Termos e Condições de Uso</h1>
                    
                    <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                        <p className="text-sm text-slate-400">Última atualização: 08 de Maio de 2026</p>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">1. Aceitação dos Termos</h2>
                            <p>
                                Ao acessar a plataforma Doqs, operada pela <strong>FINHOUSE (CNPJ: 60.806.192/0001-50)</strong>, você concorda em cumprir estes termos de serviço e todas as leis aplicáveis.
                            </p>
                        </section>

                        <section className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                            <h2 className="text-xl font-bold text-emerald-900 uppercase tracking-wider mb-2">2. Natureza do Serviço e Disclaimer</h2>
                            <p className="text-emerald-800">
                                <strong>IMPORTANTE:</strong> O Doqs é uma ferramenta de produtividade jurídica baseada em inteligência artificial. O sistema auxilia na análise de documentos e extração de dados, porém:
                            </p>
                            <ul className="list-disc pl-6 text-emerald-800 space-y-2 mt-4">
                                <li><strong>Não fornece aconselhamento jurídico:</strong> O Doqs não substitui a consultoria legal profissional.</li>
                                <li><strong>Responsabilidade Técnica:</strong> O usuário (advogado ou profissional qualificado) é o único responsável pela validação final de todos os resultados gerados pela IA.</li>
                                <li><strong>Possibilidade de Erros:</strong> Como qualquer modelo de linguagem, a IA pode cometer erros ou interpretações equivocadas. O uso da ferramenta pressupõe revisão humana obrigatória.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">3. Uso da Licença</h2>
                            <p>
                                É concedida permissão para baixar temporariamente uma cópia dos materiais na plataforma apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">4. Isenção de Responsabilidade</h2>
                            <p>
                                Os materiais na plataforma da Doqs são fornecidos 'como estão'. A Finhouse não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização ou adequação a um fim específico.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">5. Limitações</h2>
                            <p>
                                Em nenhum caso a Finhouse ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no Doqs.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
