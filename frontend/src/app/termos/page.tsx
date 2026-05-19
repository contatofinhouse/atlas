import React from "react";
import Link from "next/link";
import { ChevronLeft, Scale, ShieldAlert, Award, FileText } from "lucide-react";

export default function TermosPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <nav className="border-b border-gray-100 py-4 px-6 bg-white sticky top-0 z-50 shadow-xs">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <span className="font-serif text-xl text-slate-900 font-medium">Termos de Uso</span>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Scale className="h-8 w-8 text-slate-800" />
                        <h1 className="text-4xl font-serif text-slate-900">Termos e Condições de Uso</h1>
                    </div>
                    
                    <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
                        <p className="text-sm text-slate-400">Última atualização: 19 de Maio de 2026</p>

                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 text-sm leading-relaxed">
                            <strong>SUMÁRIO EXECUTIVO:</strong> Este documento rege o uso da plataforma Doqs. O Doqs é um assistente de produtividade jurídica por IA que agiliza a análise e elaboração de documentos. Ao utilizar nossa plataforma, você declara expressamente compreender que toda e qualquer sugestão, minuta ou análise gerada pela inteligência artificial <strong>deve passar por obrigatória e rigorosa revisão por profissional jurídico devidamente habilitado</strong> antes de qualquer utilização prática, não constituindo a plataforma aconselhamento legal ou representação jurídica.
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                <FileText className="h-5 w-5 text-slate-700" />
                                1. Objeto e Definições
                            </h2>
                            <p>
                                1.1. Estes Termos e Condições de Uso regem a relação comercial e civil entre a <strong>FINHOUSE CONSULTORIA E TECNOLOGIA (CNPJ: 60.806.192/0001-50)</strong>, doravante denominada simplesmente "FINHOUSE", e o Usuário da plataforma <strong>Doqs</strong> (disponível sob o domínio <code>doqs.com.br</code> e subdomínios associados).
                            </p>
                            <p>
                                1.2. O <strong>Doqs</strong> consiste em uma aplicação de software como serviço (SaaS) baseada em algoritmos de Inteligência Artificial voltados para a análise lógica, revisão formal, comparação tabular e estruturação de documentos, minutas e contratos jurídicos.
                            </p>
                        </section>

                        <section className="bg-amber-50/50 p-8 rounded-2xl border border-amber-200 space-y-4">
                            <h2 className="text-xl font-bold text-amber-950 uppercase tracking-wider flex items-center gap-2">
                                <ShieldAlert className="h-5 w-5 text-amber-800" />
                                2. Isenção de Responsabilidade Técnica (Disclaimer Jurídico)
                            </h2>
                            <p className="text-sm text-amber-900">
                                2.1. <strong>O DOQS NÃO É UM ESCRITÓRIO DE ADVOCACIA E NÃO PRESTA ASSESSORIA JURÍDICA.</strong> As análises, minutas, preenchimentos tabulares e respostas fornecidas pela inteligência artificial são automações estatísticas baseadas em modelos de linguagem avançados.
                            </p>
                            <p className="text-sm text-amber-900">
                                2.2. <strong>OBRIGATORIEDADE DE REVISÃO HUMANA:</strong> O Usuário, especialmente na qualidade de advogado ou profissional jurídico, concorda que é o único e exclusivo responsável técnico e civil perante seus clientes, órgãos reguladores e terceiros pela validação final e correção integral de quaisquer dados, cláusulas, petições ou prazos gerados, editados ou extraídos pelo Doqs.
                            </p>
                            <p className="text-sm text-amber-900">
                                2.3. <strong>AUSÊNCIA DE GARANTIAS DE INFALIBILIDADE:</strong> A tecnologia de Large Language Models (LLMs) está sujeita a limitações conceituais inerentes ao estado atual da arte tecnológica, podendo apresentar imprecisões ou omissões ("alucinações"). A FINHOUSE não garante que os materiais gerados estejam isentos de erro ou adequados para todas as teses judiciais possíveis, cabendo ao profissional o crivo técnico final.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Award className="h-5 w-5 text-slate-700" />
                                3. Planos, Faturamento e Stripe Checkout
                            </h2>
                            <p>
                                3.1. O acesso ao Doqs possui modalidades de planos com diferentes franquias de créditos mensais de inteligência artificial (Plano Grátis e Plano Pro), conforme detalhado no site corporativo.
                            </p>
                            <p>
                                3.2. As transações financeiras e a contratação do Plano Pro são operacionalizadas de maneira totalmente integrada através do gateway de pagamento internacional <strong>Stripe</strong>. A FINHOUSE não armazena dados confidenciais de cartão de crédito em seus servidores locais.
                            </p>
                            <p>
                                3.3. <strong>Renovação Automática e Cancelamento:</strong> O plano Pro é recorrente por padrão (mensal ou anual). O Usuário pode cancelar sua assinatura a qualquer momento de forma autônoma acessando o painel de faturamento (Stripe Customer Portal) no sistema, garantindo o acesso aos benefícios contratados até o final do ciclo de cobrança vigente.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                                4. Propriedade Intelectual e Licença de Uso
                            </h2>
                            <p>
                                4.1. <strong>Titularidade da Plataforma:</strong> Todos os direitos relativos à estrutura física, códigos-fonte, algoritmos, designs visuais, bancos de dados corporativos e marcas associadas ao Doqs são de propriedade intelectual exclusiva da FINHOUSE.
                            </p>
                            <p>
                                4.2. <strong>Propriedade dos Resultados:</strong> O conteúdo dos documentos enviados e a totalidade dos resultados e novos textos gerados a partir do processamento da IA no Doqs pertencem única e exclusivamente ao Usuário que realizou a operação, estando protegidos sob a respectiva esfera de confidencialidade técnica e profissional.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                                5. Limitação de Responsabilidade
                            </h2>
                            <p>
                                5.1. Na máxima extensão permitida pela legislação brasileira aplicável, a FINHOUSE em nenhuma hipótese responderá por lucros cessantes, perda de receita de honorários advocatícios, prejuízos processuais, multas aplicadas por perda de prazos em juízo, condenações por perdas e danos decorrentes de minutas geradas ou falhas decorrentes do uso da ferramenta jurídica Doqs.
                            </p>
                            <p>
                                5.2. O teto financeiro de qualquer pretensão indenizatória que o Usuário possa vir a alegar em decorrência do uso do Doqs está limitado contratualmente ao valor total das parcelas efetivamente pagas pelo Usuário à FINHOUSE nos 12 (doze) meses anteriores à ocorrência do suposto dano.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                                6. Foro e Legislação Aplicável
                            </h2>
                            <p>
                                6.1. Estes Termos de Uso são regidos e interpretados em conformidade com as Leis da República Federativa do Brasil, em particular o Código Civil, a Lei de Propriedade Intelectual e as disposições regulatórias vigentes.
                            </p>
                            <p>
                                6.2. Fica eleito o Foro da Comarca de São Paulo/SP para dirimir quaisquer dúvidas, controvérsias ou litígios decorrentes da interpretação ou execução destes Termos de Uso, com expressa renúncia de qualquer outro por mais privilegiado que seja.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
