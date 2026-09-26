# Plano de Implementação: Módulo 2 - Rede Social AgenTEC

## Objetivo
Implementar o Módulo 2 (Rede Social no estilo Twitter/feed acadêmico) da plataforma AgenTEC de ponta a ponta, conectado ao banco de dados online MySQL em `sql.freedb.tech`, integrando o Design System oficial (`DESIGN.md`, logos oficiais, cores institucionais `#B20000`, Inter e Lucide), e mantendo arquitetura desacoplada pronta para os Módulos 1 e 3.

---

### Fase 1: Camada de Dados e Migrações
- [ ] **Tarefa 1.1:** Criar módulo de conexão de banco de dados (`lib/db.ts`) com connection pool usando `mysql2/promise` e variáveis de ambiente.
- [ ] **Tarefa 1.2:** Criar script de migração e seeding (`lib/db-init.ts`) para inicializar as tabelas (`usuarios`, `badges`, `usuario_badges`, `posts`, `curtidas`, `comentarios`, `seguidores`) e popular com usuários realistas da Fatec, badges e posts iniciais.
- [ ] **Tarefa 1.3:** Executar a inicialização das tabelas e verificar integridade dos dados no banco online.

### Fase 2: Serviços e Endpoints da API (App Router)
- [ ] **Tarefa 2.1:** Implementar repositórios/queries SQL otimizadas (`lib/social-service.ts`) para feed ("Para você" e "Seguindo"), posts, comentários, curtidas, seguir e sugestões com badges associados.
- [ ] **Tarefa 2.2:** Criar rotas da API:
  - `app/api/feed/route.ts` (GET feed com abas 'for-you' e 'following')
  - `app/api/posts/route.ts` (POST para criar post)
  - `app/api/posts/[id]/route.ts` (DELETE para excluir post)
  - `app/api/posts/[id]/like/route.ts` (POST para alternar curtida)
  - `app/api/posts/[id]/comments/route.ts` (GET e POST de comentários)
  - `app/api/users/follow/route.ts` (POST para alternar seguidor)
  - `app/api/users/suggestions/route.ts` (GET sugestões de quem seguir)
  - `app/api/users/[id]/route.ts` (GET perfil do usuário)

### Fase 3: Camada de Autenticação Desacoplada e Estado
- [ ] **Tarefa 3.1:** Implementar `context/auth-context.tsx` provendo o usuário logado com seletor rápido para alternar entre perfis (Aluno, Professor, Empresa, Master), permitindo substituição imediata por sessão/JWT do Módulo 1.

### Fase 4: Componentes de Interface & Design System (`DESIGN.md`)
- [ ] **Tarefa 4.1:** Criar componentes base de marca e identidade:
  - Header Desktop e Mobile com logo oficial AgenTEC (`public/brand/agentec/02_agentec_logo_principal_transparente.png` ou `03_agentec_simbolo_jacare_transparente.png`).
  - Badges acadêmicos com cores e ícones (`components/social/academic-badge.tsx`).
- [ ] **Tarefa 4.2:** Implementar o criador de posts (`components/social/post-composer.tsx`):
  - Textarea com auto-expand, limite de caracteres (280/500), preview de badges do autor, botão de ação vermelho AgenTEC `#B20000`.
- [ ] **Tarefa 4.3:** Implementar o card de post (`components/social/post-card.tsx`):
  - Avatar, nome, tipo de usuário com pill institucional, badges de honra, data relativa.
  - Ações: Curtir com coração vermelho `#B20000` e contador, Comentários (gaveta retrátil), Compartilhar (copiar link), Excluir (se autor).
- [ ] **Tarefa 4.4:** Implementar a seção de comentários interativa (`components/social/comment-section.tsx`).
- [ ] **Tarefa 4.5:** Implementar a coluna lateral de recomendações (`components/social/who-to-follow.tsx` e `components/social/academic-trends.tsx`).
- [ ] **Tarefa 4.6:** Implementar a navegação mobile (Bottom Bar fixa com safe area e botão central de ação `+` em `#B20000`) e sidebar desktop fixa.

### Fase 5: Integração da Página Principal (`app/page.tsx`) e Validação
- [ ] **Tarefa 5.1:** Montar o layout de 3 colunas em `app/page.tsx` conectando todos os componentes ao feed interativo.
- [ ] **Tarefa 5.2:** Testar fluxo completo: criar post, curtir post, comentar, alternar abas 'Para você' e 'Seguindo', seguir/deixar de seguir usuários, e alternar usuário logado.
- [ ] **Tarefa 5.3:** Validar responsividade mobile e desktop, build (`npm run build`) e ausência de erros de TypeScript.
