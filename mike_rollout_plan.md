# LukaLex IA — Plano de Rollout (Visão Real)

Este documento reflete o progresso real e as etapas críticas restantes para o lançamento oficial da plataforma.

---

## 1. Status Geral ✅
- **Fundação & Inteligência:** Concluído (Smart Routing + Tier Limits).
- **Checkout & Monetização:** Concluído (Stripe Integration).
- **Branding & Interface:** Concluído (LukaLex Identity + Landing Page).
- **Performance & UX:** **Concluído Hoje** (Caching + Onboarding).
- **Infraestrutura:** Pendente (Oracle Cloud + Docker).

---

## 2. O que foi Concluído (Checklist Realizado)

### 🟢 Fase 1 a 3: Fundação, Branding e Stripe [DONE]
- [x] Nomeclatura LukaLex em 100% do app.
- [x] Integração completa com Stripe (Assinaturas e Portal do Cliente).
- [x] Smart Routing (Gemini Flash/Pro) para otimização de custo.

### 🔵 Fase 4: Otimização e "Polimento Premium" [DONE HOJE]
- [x] **Navegação Instantânea:** Implementação de cache global (TTL 30s) para eliminar delays entre abas.
- [x] **Onboarding Assistido:** Botão "Como usar?" com guia interativo para novos usuários.
- [x] **Refinamento de Conversão:** Reordenação estratégica do Sidebar (Suporte e Seja Pro).
- [x] **Fechamento de Brechas:** Créditos agora são contados corretamente em chats de projeto e gerações em lote.
- [x] **Estabilidade UI:** Correção de loops de renderização e erros de tipagem.
- [ ] **QA de Traduções:** Revisão final de todos os textos em pt-BR (Modais e Workflows).
- [ ] **Stress Test de Limites:** Validar se o bloqueio de 20 ações/mês funciona em todos os cenários (Chat, Projetos, Tabular).

---

## 3. O Que Falta (Reta Final para o Deploy)

### 🟡 Fase 5: Infraestrutura e Produção [EM BREVE]
**Objetivo:** Tirar o app do `localhost` e colocar no domínio oficial.

1.  **Dockerização:**
    - [ ] Criar `Dockerfile` otimizado para o Backend (Node/Express).
    - [ ] Criar `Dockerfile` para o Frontend (Next.js Standalone mode).
    - [ ] Configurar `docker-compose.yml` para orquestrar os serviços.

2.  **Oracle Cloud Setup:**
    - [ ] Provisionar instância ARM Ampere (Always Free tier).
    - [ ] Configurar regras de rede (Ingress/Egress) e Firewall.
    - [ ] Instalar Docker e Nginx (Reverse Proxy com SSL/Certbot).

3.  **Configuração de Produção:**
    - [ ] Migrar variáveis de ambiente (.env) para segredos de produção.
    - [ ] Apontar DNS do domínio definitivo para o IP da instância.
    - [ ] Teste de estresse final em ambiente de staging.

### 🟡 Fase 6: Melhorias de "QoL" (Opcional para V1)
- [ ] **Real-time Sync:** Trocar o `setInterval` do status dos documentos por Supabase Realtime.
- [ ] **Mobile Touch-up:** Verificação final de responsividade em telas ultra-pequenas.

---

## 4. Próximos Passos Imediatos
1. Testar exaustivamente o bloqueio de Tier Limit em conta Free.
2. Revisar traduções de novos modais e botões.
3. Gerar os arquivos Docker para teste local.
