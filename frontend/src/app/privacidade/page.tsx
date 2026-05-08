"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Lock, Shield } from "lucide-react";

export default function PrivacidadePage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <nav className="border-b border-gray-100 py-4 px-6 bg-white sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <span className="font-serif text-xl text-slate-900 font-medium">Privacidade</span>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="h-8 w-8 text-emerald-600" />
                        <h1 className="text-4xl font-serif text-slate-900">Política de Privacidade</h1>
                    </div>
                    
                    <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                        <p className="text-sm text-slate-400">Última atualização: 08 de Maio de 2026</p>

                        <p>
                            A sua privacidade é importante para nós. É política da <strong>FINHOUSE (CNPJ: 60.806.192/0001-50)</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar na plataforma LukaLex.
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">1. Coleta de Informações</h2>
                            <p>
                                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                            </p>
                        </section>

                        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                2. Sigilo Profissional e Dados Jurídicos
                            </h2>
                            <p>
                                Entendemos que os documentos enviados ao LukaLex são protegidos por sigilo profissional. Por isso:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Isolamento de Dados:</strong> Seus documentos e conversas são armazenados de forma isolada e criptografada.</li>
                                <li><strong>Sem Treinamento Público:</strong> O LukaLex NÃO utiliza seus documentos ou interações para treinar modelos de inteligência artificial de terceiros ou modelos públicos.</li>
                                <li><strong>Acesso Restrito:</strong> Nenhum funcionário da Finhouse tem acesso ao conteúdo dos seus arquivos, a menos que solicitado expressamente por você para suporte técnico.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">3. Retenção de Dados</h2>
                            <p>
                                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, os protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">4. LGPD (Lei Geral de Proteção de Dados)</h2>
                            <p>
                                Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O LukaLex está em total conformidade com a LGPD, garantindo ao usuário o direito de exclusão total de seus dados a qualquer momento através da plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">5. Contato</h2>
                            <p>
                                Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco através do suporte oficial da Finhouse.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
