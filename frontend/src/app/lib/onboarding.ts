import type { MikeMessage } from "../components/shared/types";

export const ONBOARDING_MESSAGES: MikeMessage[] = [
    {
        role: "user",
        content: "Como usar o Doqs?",
    },
    {
        role: "assistant",
        content: `### Bem-vindo ao Doqs! ⚖️
Aqui está como você pode extrair o máximo da nossa inteligência jurídica:

1. **Organize por Projetos** 📁
Comece criando um **Projeto** para cada caso ou cliente. Isso mantém seus documentos, chats e análises organizados em um só lugar.

2. **Suba seus Arquivos** 📄
Aceitamos **PDF e Word**. O Doqs processa e converte tudo automaticamente para que você possa ler, pesquisar e analisar na hora, com citações diretas do texto.

3. **Analise com o Assistente** 💬
Abra um chat dentro do projeto para fazer perguntas complexas:
* *"Quais os riscos desta cláusula?"*
* *"Resuma os pontos principais deste contrato"*
* *"Encontre contradições entre estes dois arquivos"*

4. **Análise Tabular** 📊
Use a **Análise Tabular** para comparar múltiplos documentos de uma vez. Defina colunas específicas (como "Data de Validade", "Foro", "Valor da Multa") e o Doqs preencherá a tabela automaticamente para você.

5. **Modelos de Análise (Workflows)** 🛠️
Use nossos modelos pré-definidos para garantir que todas as suas revisões sigam o mesmo padrão de qualidade e rigor jurídico.

**Dica:** Você pode clicar em qualquer citação nas respostas do Doqs para abrir o documento exatamente na página e parágrafo mencionado!`,
    },
];
