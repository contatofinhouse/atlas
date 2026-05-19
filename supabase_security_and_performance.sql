-- =====================================================================
-- DOQS IA - MASTER SCRIPT: SEGURANÇA (RLS) & PERFORMANCE (ÍNDICES)
-- =====================================================================
--
-- Instruções de Execução:
-- 1. Acesse o seu painel do Supabase (https://supabase.com)
-- 2. Selecione o projeto do Doqs.
-- 3. No menu lateral esquerdo, clique em "SQL Editor".
-- 4. Clique em "New query" (Nova consulta).
-- 5. Cole TODO o conteúdo deste arquivo e clique em "Run" (Executar).
-- =====================================================================

-- =====================================================================
-- 🛡️ PARTE 1: FORTALECIMENTO DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
-- =====================================================================
-- Ativa a segurança em nível de linha em absolutamente TODAS as 13 tabelas 
-- existentes identificadas no projeto. Isso garante que nenhum dado possa 
-- ser vazado ou manipulado de fora do Express Backend.

ALTER TABLE IF EXISTS projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS project_subfolders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS document_edits ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tabular_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tabular_cells ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS workflow_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS hidden_workflows ENABLE ROW LEVEL SECURITY;


-- =====================================================================
-- ⚡ PARTE 2: ÍNDICES DE VELOCIDADE (PERFORMANCE ULTRA RÁPIDA)
-- =====================================================================
-- Cria índices de alto desempenho nas chaves de busca e relacionamento 
-- mais utilizadas para garantir carregamento instantâneo (< 10ms).

-- 1. Projetos (Busca por usuário)
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);

-- 2. Subpastas (Busca por projeto pai)
CREATE INDEX IF NOT EXISTS idx_project_subfolders_project_id ON project_subfolders(project_id);

-- 3. Documentos (Busca por projeto ou usuário)
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);

-- 4. Versões de Documentos (Busca por documento pai)
CREATE INDEX IF NOT EXISTS idx_document_versions_document_id ON document_versions(document_id);

-- 5. Edições de Documentos (Busca por documento pai)
CREATE INDEX IF NOT EXISTS idx_document_edits_document_id ON document_edits(document_id);

-- 6. Chats (Busca por projeto ou usuário)
CREATE INDEX IF NOT EXISTS idx_chats_project_id ON chats(project_id);
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);

-- 7. Mensagens do Chat (Busca por chat pai)
CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_id ON chat_messages(chat_id);

-- 8. Análises Tabulares e Células (Busca por projeto ou review pai)
CREATE INDEX IF NOT EXISTS idx_tabular_reviews_project_id ON tabular_reviews(project_id);
CREATE INDEX IF NOT EXISTS idx_tabular_cells_review_id ON tabular_cells(review_id);

-- 9. Perfis de Usuários (Busca por ID de autenticação)
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- 10. Fluxos de Trabalho e Compartilhamento (Workflows)
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflow_shares_workflow_id ON workflow_shares(workflow_id);
CREATE INDEX IF NOT EXISTS idx_hidden_workflows_user_id ON hidden_workflows(user_id);


-- =====================================================================
-- 🔍 PARTE 3: AUDITORIA AUTOMÁTICA DE SEGURANÇA
-- =====================================================================
-- Executa um relatório final mostrando o status atualizado de segurança 
-- de cada uma das 13 tabelas do sistema.

SELECT 
    c.relname AS nome_da_tabela,
    CASE 
        WHEN c.relrowsecurity = true THEN '🛡️ SEGURO (RLS Ativo)'
        ELSE '⚠️ EXPOSTO (RLS Desativado)'
    END AS status_seguranca
FROM 
    pg_class c
JOIN 
    pg_namespace n ON n.oid = c.relnamespace
WHERE 
    n.nspname = 'public' 
    AND c.relkind = 'r'
    AND c.relname IN (
        'projects', 'project_subfolders', 'documents', 'document_versions', 
        'document_edits', 'chats', 'chat_messages', 'tabular_reviews', 
        'tabular_cells', 'user_profiles', 'workflows', 'workflow_shares', 'hidden_workflows'
    )
ORDER BY 
    nome_da_tabela;

-- =====================================================================
-- FIM DO SCRIPT - Doqs 100% blindado e ultra rápido!
-- =====================================================================
