-- =====================================================================
-- DOQS IA - PERFORMANCE INDEXES FOR SUPABASE (SQL EDITOR)
-- =====================================================================
--
-- Instruções:
-- 1. Acesse o seu painel do Supabase (https://supabase.com)
-- 2. Selecione o projeto do Doqs.
-- 3. No menu lateral esquerdo, clique em "SQL Editor".
-- 4. Clique em "New query" (Nova consulta).
-- 5. Cole o código SQL abaixo e clique no botão "Run" (Executar) no canto inferior direito.
--
-- O que isso faz?
-- Cria índices de banco de dados para acelerar buscas nas tabelas mais utilizadas
-- (projetos, documentos, chats e reviews). Isso garante que o dashboard do site 
-- carregue em menos de 10ms independente de quantos arquivos ou históricos o time utilize.
-- =====================================================================

-- 1. Índice para busca de projetos vinculados a um usuário
CREATE INDEX IF NOT EXISTS idx_projects_user_id 
ON projects(user_id);

-- 2. Índice para busca de documentos dentro de um projeto
CREATE INDEX IF NOT EXISTS idx_documents_project_id 
ON documents(project_id);

-- 3. Índice para busca de chats associados a um projeto específico
CREATE INDEX IF NOT EXISTS idx_chats_project_id 
ON chats(project_id);

-- 4. Índice para busca de revisões tabulares em um projeto
CREATE INDEX IF NOT EXISTS idx_tabular_reviews_project_id 
ON tabular_reviews(project_id);

-- 5. Índice opcional de subpastas do projeto
CREATE INDEX IF NOT EXISTS idx_project_subfolders_project_id 
ON project_subfolders(project_id);

-- =====================================================================
-- FIM DO SCRIPT - Executado com sucesso!
-- =====================================================================
