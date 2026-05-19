import React from "react";
import Link from "next/link";
import { ChevronLeft, Lock, Shield, Eye, Database } from "lucide-react";

export default function PrivacidadePage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <nav className="border-b border-gray-100 py-4 px-6 bg-white sticky top-0 z-50 shadow-xs">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <span className="font-serif text-xl text-slate-900 font-medium">Política de Privacidade e LGPD</span>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                        <Shield className="h-8 w-8 text-emerald-600 animate-pulse" />
                        <h1 className="text-4xl font-serif text-slate-900">Diretrizes de Privacidade e LGPD</h1>
                    </div>
                    
                    <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
                        <p className="text-sm text-slate-400">Última atualização: 19 de Maio de 2026</p>

                        <p className="leading-relaxed">
                            A sua privacidade e o sigilo de seus dados são pilares inegociáveis para nós. Esta política detalha como a <strong>FINHOUSE CONSULTORIA E TECNOLOGIA (CNPJ: 60.806.192/0001-50)</strong>, operadora da plataforma <strong>Doqs</strong>, coleta, armazena, protege e descarta informações confidenciais em conformidade absoluta com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)</strong> e as melhores práticas globais de segurança cibernética jurídica.
                        </p>

                        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <Lock className="h-5 w-5 text-emerald-600" />
                                1. Cláusula de Sigilo Profissional Absoluto
                            </h2>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                1.1. <strong>Vedações e Respeito ao Sigilo (Art. 7º, II, LGPD):</strong> A FINHOUSE declara ter plena ciência de que os documentos inseridos pelo Usuário na plataforma Doqs podem conter informações submetidas a segredo de justiça, sigilo comercial ou sigilo profissional advogado-cliente (Art. 7º do Estatuto da OAB).
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                1.2. <strong>ISOLAMENTO DO MODELO (NÃO-TREINAMENTO):</strong> Garantimos expressamente que <strong>nenhum dado, documento, trecho de minuta ou histórico de chat carregado no Doqs é utilizado para treinar ou aprimorar modelos públicos de inteligência artificial de terceiros</strong> (como OpenAI, Google ou Anthropic). Os dados são processados através de conexões corporativas fechadas (APIs privadas estruturadas) que impedem a retenção ou uso dos dados pelos provedores de base.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                1.3. <strong>Criptografia Bancária de Ponta a Ponta:</strong> Todos os arquivos transferidos para a plataforma são protegidos por criptografia de transporte em trânsito (SSL/TLS 1.3) e armazenados em bancos de dados em nuvem isolados logicamente com criptografia em repouso AES-256 bits de nível militar.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Database className="h-5 w-5 text-slate-700" />
                                2. Coleta e Finalidade dos Dados Coletados
                            </h2>
                            <p>
                                Coletamos dados apenas na estrita necessidade de viabilizar a prestação dos serviços SaaS e segurança da conta:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Dados de Conta (Usuário):</strong> E-mail corporativo ou pessoal e senha encriptada de forma unidirecional (Bcrypt), com finalidade exclusiva de autenticação segura na plataforma.</li>
                                <li><strong>Dados de Cobrança (Stripe):</strong> Nome completo, endereço e detalhes de pagamento processados de forma encriptada e isolada em conformidade internacional com o padrão de segurança PCI-DSS através da Stripe.</li>
                                <li><strong>Documentos Processados:</strong> Arquivos PDF e Word carregados pelo Usuário nos seus projetos pessoais. Estes dados permanecem em nuvem de forma privada até que o Usuário decida deletá-los.</li>
                                <li><strong>Metadados Técnicos:</strong> IP, navegador e registros de logs operacionais voltados única e exclusivamente para a prevenção de fraudes, monitoramento de abusos de taxa (Rate Limiting) e auditoria de erros técnicos.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Eye className="h-5 w-5 text-slate-700" />
                                3. Direitos dos Titulares de Dados (Art. 18 - LGPD)
                            </h2>
                            <p>
                                O Doqs disponibiliza mecanismos self-service em seu painel para assegurar os direitos previstos no artigo 18 da LGPD, garantindo ao Usuário a qualquer momento:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Confirmação e Acesso:</strong> Direito de obter a confirmação da existência de tratamento de seus dados pessoais.</li>
                                <li><strong>Correção:</strong> Direito de retificar ou atualizar dados cadastrais incompletos, inexatos ou desatualizados.</li>
                                <li><strong>Exclusão Definitiva (Direito ao Esquecimento):</strong> O Usuário possui o direito de deletar autonomamente qualquer projeto, chat ou documento na interface. O ato de exclusão remove o arquivo fisicamente do armazenamento em nuvem de forma imediata e irreversível.</li>
                                <li><strong>Cancelamento e Revogação:</strong> Revogar o consentimento ou solicitar o encerramento da conta diretamente na aba de configurações.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Shield className="h-5 w-5 text-slate-700" />
                                4. Compartilhamento e Operadores de Dados
                            </h2>
                            <p>
                                Para fornecer os serviços de inteligência de ponta do Doqs, compartilhamos dados estritamente limitados com as seguintes entidades terceiras qualificadas sob rígidos termos de privacidade:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Provedor de Nuvem e Banco de Dados (Supabase/AWS):</strong> Onde hospedamos nossos servidores, dados cadastrais protegidos por políticas robustas de Row-Level Security (RLS).</li>
                                <li><strong>Provedores de Gateway de Pagamento (Stripe):</strong> Operadora internacional que atua de forma autônoma para faturamento e gestão de assinaturas recorrentes com alto nível de segurança PCI-DSS.</li>
                                <li><strong>Provedores de API de IA (Google Gemini API e Anthropic API):</strong> Apenas dados contextuais do chat ou documentos são transmitidos via conexão segura e privada para processamento instantâneo de prompts, sem direito de armazenamento permanente ou treinamento por parte dos provedores.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                                5. Encarregado de Proteção de Dados (DPO) e Contato
                            </h2>
                            <p>
                                5.1. Para solicitações de relatórios formais de privacidade, exercício de direitos regulatórios ou reporte de qualquer dúvida sobre privacidade de dados, a FINHOUSE disponibiliza o contato oficial do Encarregado de Proteção de Dados (DPO):
                            </p>
                            <p className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm font-mono text-slate-800">
                                Encarregado LGPD / DPO Doqs IA<br />
                                Canal de Atendimento Regulatório: dpo@doqs.com.br<br />
                                Operado por: FINHOUSE CONSULTORIA E TECNOLOGIA LTDA
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
