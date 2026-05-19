# Doqs IA — Plano de Rollout (Visão Real)

Este documento reflete o progresso real e as etapas críticas restantes para o lançamento oficial da plataforma.

---

## 1. Status Geral ✅
- **Fundação & Inteligência:** Concluído (Smart Routing + Tier Limits).
- **Checkout & Monetização:** Concluído (Stripe Integration - Prontos para Produção).
- **Branding & Interface:** Concluído (Doqs Identity + Landing Page).
- **Performance & UX:** Concluído (Caching + Onboarding + Next/Image).
- **Segurança da Informação (Grade A+):** **Concluído Hoje** (Fortalecimento de Backend, Nginx, CORS, Rate Limiting e Banco de Dados).
- **Infraestrutura & Deploy da API:** **Concluído Hoje** (Docker + Nginx Oracle Cloud funcionando a 100%).
- **DNS & SSL Final:** **Concluído** (Domínio e SSL configurados e totalmente ativos).

---

## 2. O que foi Concluído (Checklist Realizado)

### 🟢 Fase 1 a 3: Fundação, Branding e Stripe [DONE]
- [x] Nomenclatura Doqs em 100% do app (Rebranding global de textos da interface, onboarding, guias e sidebar de *Luka/LukaLex* para *Doqs* finalizado).
- [x] Integração completa com Stripe (Checkout Session com redirecionamento automático inteligente para usuários que acessam com `?plan=pro`).
- [x] **Webhook de Produção Ativo:** Configurado endpoint seguro `https://api.doqs.com.br/stripe/webhook` ouvindo `checkout.session.completed` e promovendo usuários para o plano **Pro** no banco de dados automaticamente.
- [x] Smart Routing (Gemini Flash/Pro) para otimização de custo.

### 🔵 Fase 4: Otimização e "Polimento Premium" [DONE]
- [x] **Navegação Instantânea:** Implementação de cache global (TTL 30s) para eliminar delays entre abas.
- [x] **Onboarding Assistido:** Botão "Como usar?" com guia interativo para novos usuários (rebrandado para Doqs).
- [x] **Refinamento de Conversão:** Reordenação estratégica do Sidebar (Suporte e Seja Pro).
- [x] **UX de Cadastro Fluida:** Nova página de Signup split-screen com badge visual ("Grátis"), aviso de "Nenhum cartão exigido" e remoção da barreira de confirmação de e-mail para escala.
- [x] **UX de Checkout Sem Flash:** Correção do flash visual na tela `/assistant` enquanto a URL do Stripe era gerada em segundo plano.
- [x] **Fechamento de Brechas:** Créditos agora são contados corretamente em chats de projeto e gerações em lote.
- [x] **Estabilidade UI:** Correção de loops de renderização e erros de tipagem.
- [x] **QA de Traduções:** Revisão final de todos os textos em pt-BR (DocPanel, Modais e Workflows traduzidos).
- [x] **Otimização de Imagens (SEO/Core Web Vitals):** Substituição de tags cruas de imagem por `<Image />` do Next.js com `priority` pré-carregamento para velocidade LCP recorde.
- [x] **Stress Test de Limites:** Validado bloqueio de 20 ações/mês em todos os cenários.

### 🔴 Fase 5: Segurança da Informação & Hardening (Grade A+) [DONE]
- [x] **Segurança da Aplicação:** Integração de `helmet` e `express-rate-limit` (bloqueio de floods acima de 300 requisições/min por IP).
- [x] **CORS Fortalecido:** Servidor configurado para aceitar tráfego apenas das origens oficiais `doqs.com.br` e `www.doqs.com.br`.
- [x] **Segurança de Rede (Nginx):** Injeção de cabeçalhos estritos de proteção contra clickjacking (`X-Frame-Options: DENY`) e HSTS (`max-age=63072000` - HTTPS obrigatório por 2 anos).
- [x] **Segurança do Banco de Dados (Supabase RLS):** Mapeamento de todas as 13 tabelas do sistema e criação de script mestre de segurança RLS + 15 Índices de Performance.
- [x] **Widget de Robustez Visual:** Painel interativo de garantias de privacidade jurídica, criptografia bancária AES-256 e conformidade 100% LGPD/GDPR adicionado na Landing Page.

### 🟡 Fase 6: Dockerização & Servidor Oracle Cloud [DONE]
- [x] Criação de `Dockerfile` e `docker-compose.yml` otimizados para produção.
- [x] Instanciação e configuração de regras de rede (portas 80/443 abertas) na Oracle Cloud.
- [x] Docker e Nginx Reverse Proxy instalados e configurados no servidor.
- [x] Deploy completo do contêiner `lukalex-backend` com sincronização 100% do novo segredo de assinatura do webhook do Stripe (`whsec_...`).

---

## 3. DNS & SSL Final [DONE]

Toda a transição de domínio e provisionamento de certificados seguros de criptografia foi finalizada com sucesso. A plataforma está totalmente operável e no ar:

- [x] **Propagação de Nameservers Concluída:** O domínio `doqs.com.br` está totalmente sob gestão da Vercel.
- [x] **Apontamento de API:** Subdomínio `api.doqs.com.br` apontando via registro A para `147.15.24.214` (Oracle Cloud).
- [x] **Certificado SSL de Produção (HTTPS):** Certificado gerado via Certbot (Let's Encrypt) rodando ativamente na porta segura da API.
- [x] **Deploy de Produção do Frontend (Vercel):** Frontend no ar em `https://doqs.com.br` comunicando-se perfeitamente com a API segura em `https://api.doqs.com.br`.
- [x] **Vincular Branch de Produção:** Concluir a vinculação e deploy da branch de produção apontada para o domínio principal `doqs.com.br`.

---

## 4. Transição do Stripe para Produção (100% Pronto para Chaveamento)

Para tombar o sistema de pagamentos de **Testes** para **Produção Real**, siga estes passos quando o domínio estiver no ar:

1. **Dashboard do Stripe:**
   - Acesse o painel do Stripe e mude a chave seletora no canto superior direito de **Test Mode** (Modo de Teste) para **Live Mode** (Produção).
2. **Obter Chaves de Produção:**
   - Vá em *Developers* -> *API Keys* e colete:
     - **Publishable Key (Chave Pública):** prefixo `pk_live_...`
     - **Secret Key (Chave Secreta):** prefixo `sk_live_...`
3. **Configurar Produtos e Preços Reais:**
   - Crie o produto (assinatura mensal/anual do Doqs Pro) no catálogo do Stripe de Produção e copie a **ID do Preço** (prefixo `price_...`).
4. **Substituir Variáveis de Ambiente (.env):**
   - Atualize as seguintes chaves no arquivo `.env` de produção:
     - `STRIPE_SECRET_KEY=sk_live_...`
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
     - `STRIPE_PRO_PRICE_ID=price_...`
5. **Configurar Webhook Real:**
   - No painel do Stripe (produção), vá em *Webhooks* -> *Add Endpoint*.
   - URL do endpoint: `https://api.doqs.com.br/stripe/webhook`
   - Eventos para escutar: `checkout.session.completed` e `customer.subscription.deleted`.
   - Copie o *Signing Secret* gerado pelo Stripe (prefixo `whsec_...`) e salve na variável `STRIPE_WEBHOOK_SECRET` do backend.
6. **Reiniciar Contêiner Backend na Oracle:**
   - Execute `~/deploy.sh` na Oracle Cloud para recarregar o backend com as credenciais financeiras ativas!

---

## 5. Evolução para "Legal OS" (Roadmap V2)
**Objetivo:** Transformar a ferramenta de uma "IA Jurídica" para o Sistema Operacional central do escritório.

1. **Gestão de Prazos e Tarefas (Case Management):**
   - [ ] Módulo de calendário integrado aos projetos.
   - [ ] Extração automática de prazos de documentos jurídicos via IA.
2. **CRM e Base de Contatos:**
   - [ ] Diretório de clientes (CNPJ, endereço, representantes).
   - [ ] Injeção automática de dados do cliente na geração de minutas (generate_docx).
3. **Busca Semântica Global (Enterprise Search):**
   - [ ] Barra de busca unificada ("Omnibar") para pesquisar cláusulas e termos em todos os projetos e documentos do escritório simultaneamente.
4. **Assinaturas Eletrônicas:**
   - [ ] Integração com ZapSign/Clicksign para enviar documentos gerados diretamente para assinatura.
5. **Auditoria e RBAC (Controle de Acesso):**
   - [ ] Níveis de permissão granulares (Admin, Advogado, Estagiário).
   - [ ] Logs de auditoria (quem acessou/baixou qual documento).

