# Especificação Técnica de Design: Módulo 2 - Rede Social (AgenTEC)

## 1. Visão Geral
O **Módulo 2: Rede Social da AgenTEC** é o coração da interação estudantil e acadêmica do ecossistema Fatec / Centro Paula Souza (CPS). Inspirado na agilidade e dinamismo do Twitter/X, o módulo oferece uma experiência focada na comunidade acadêmica, com suporte a publicações rápidas, curtidas em tempo real, comentários, seguidores, badges de honra acadêmica, filtros de feed ("Para você" e "Seguindo") e sugestões de "Quem seguir na Fatec".

## 2. Arquitetura e Integração Desacoplada
Para operar em harmonia com os outros dois módulos em desenvolvimento paralelo:
- **Módulo 1 (Autenticação, Usuários, RBAC e Badges):** O Módulo 2 utiliza um `AuthProvider` e hook `useAuth()` modular, com chave para mock dinâmico e alternador de perfil (aluno, professor, empresa, master) em tempo de desenvolvimento, facilmente substituível por sessões/JWT da autenticação oficial.
- **Módulo 3 (Secretaria Acadêmica):** Permanece isolado, compartilhando a mesma base de dados e identificadores de usuário (`usuario_id`).
- **Banco de Dados Online:** MySQL 8.0 em nuvem hospedado em `sql.freedb.tech:3306` (`freedb_DmnP70mB`), gerenciado via pool de conexões otimizado (`mysql2/promise`) com migrations e scripts de seeding idempotentes.

## 3. Identidade Visual & Design System (`DESIGN.md`)
- **Assinatura da Marca:** "Conteúdo primeiro. Marca como assinatura".
- **Logos Oficiais:** Utilização exclusiva dos PNGs oficiais copiados para `public/brand/agentec/` e `public/brand/cps/`. No Desktop/Mobile Header: `01_agentec_logo_principal.png` ou `02_agentec_logo_principal_transparente.png` (e ícone `03_agentec_simbolo_jacare_transparente.png` em telas compactas).
- **Paleta de Cores:**
  - `AgenTEC Red`: `#B20000` (Hover: `#8F0000`) reservado para CTAs primários, botões de ação ("Publicar", botão seguir ativo, curtida preenchida, abas ativas).
  - `Surface / Cards`: `#FFFFFF` com borda de `1px solid #E1E1E3`.
  - `Background`: `#F5F5F5` (modo claro) e suporte a modo escuro coerente.
  - `Ink`: `#171717` (Texto principal de alto contraste).
  - `Muted`: `#666666` (Metadados, horários relativos e legendas).
  - `Soft Red`: `#FFF1F1` (Pills, badges sutis e estados ativos secundários).
- **Tipografia & Ícones:** Fonte Inter (`var(--font-sans)`), ícones Lucide React com traço entre `1.75px` e `2px`.
- **Layout Responsivo (Mobile-First):**
  - **Mobile (< 768px):** Header fixo compacto com logo AgenTEC, Bottom Navigation fixa (64px) com safe area e botão central flutuante `+` vermelho `#B20000` para publicar novo post.
  - **Desktop (>= 768px):** Layout em 3 colunas:
    1. **Sidebar Esquerda (260px):** Logo oficial AgenTEC, links de navegação (Feed, Perfil, Notificações, Explorar), seletor de usuário ativo (para testes/demo) e botão de publicação.
    2. **Feed Central (600px a 720px):** Criador de post (Composer), abas "Para você" e "Seguindo", lista de posts com scroll infinito/carregamento incremental.
    3. **Coluna Direita (320px):** "Quem seguir na Fatec" com botão de seguir rápido, "Tópicos e Comunidades Acadêmicas" (#HackathonFatec, #IniciaçãoCientifica, #VagasEstagio, #TCC).

## 4. Modelo de Dados (SQL)
- `usuarios`: id (UUID/VARCHAR), nome, email, tipo_usuario ('aluno', 'professor', 'empresa', 'master'), foto_perfil, bio, curso, criado_em.
- `badges`: id, nome, descricao, cor_icone.
- `usuario_badges`: id, usuario_id, badge_id, atribuido_por, atribuido_em.
- `posts`: id, usuario_id, conteudo, criado_em.
- `curtidas`: id, post_id, usuario_id, criado_em (UNIQUE post_id, usuario_id).
- `comentarios`: id, post_id, usuario_id, conteudo, criado_em.
- `seguidores`: id, seguidor_id, seguido_id, criado_em (UNIQUE seguidor_id, seguido_id, CHECK seguidor_id <> seguido_id).

## 5. Endpoints de API (Next.js App Router)
- `GET /api/feed?tab=for-you|following&userId=...`: Retorna posts com contagens, status de curtida pelo usuário, autor e badges.
- `POST /api/posts`: Cria novo post com validação de tamanho e sanitização.
- `DELETE /api/posts/[id]`: Remove post (com verificação de autoria).
- `POST /api/posts/[id]/like`: Toggle de curtida (curtir / descurtir).
- `GET /api/posts/[id]/comments`: Lista comentários de uma publicação.
- `POST /api/posts/[id]/comments`: Adiciona novo comentário.
- `POST /api/users/follow`: Toggle seguir/deixar de seguir.
- `GET /api/users/suggestions`: Lista sugestões de conexões na Fatec.
- `GET /api/users/[id]`: Dados de perfil, estatísticas e badges do usuário.

## 6. Critérios de Qualidade e Acessibilidade (UI/UX Pro Max)
- Touch targets mínimos de 44x44px em botões e links.
- Contraste de texto >= 4.5:1 em todos os elementos.
- Feedback instantâneo com estados otimistas (curtir, comentar e seguir).
- Skeletons animados durante o carregamento de dados.
- Empty states informativos com mensagens acolhedoras e referência ao mascote da Fatec.
