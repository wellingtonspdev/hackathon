<div align="center">

<img src="logos/AgenTEC/01_agentec_logo_principal.png" alt="AgenTEC Logo" width="380" />

# AgenTEC — Conecta a Fatec.

> **A plataforma social e acadêmica oficial feita por alunos e para o ecossistema Fatec & Centro Paula Souza.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CPS / Fatec](https://img.shields.io/badge/CPS_Fatec-Itaquera-B20000?style=for-the-badge)](https://www.cps.sp.gov.br/)

<br />

[Visão Geral](#-visão-geral) •
[Arquitetura](#-arquitetura-do-ecossistema) •
[Módulos do Sistema](#-módulos-do-sistema) •
[Design System](#-design-system--identidade-visual) •
[Modelo de Dados](#-modelo-de-dados-postgresql) •
[Instalação](#-instalação-e-execução-local) •
[Equipe & Roadmap](#-divisão-da-equipe--hackathon)

</div>

---

## 🐊 Visão Geral

A **AgenTEC** nasce para quebrar a frieza dos sistemas acadêmicos tradicionais e unir o ecossistema Fatec em um espaço vibrante, comunitário e colaborativo. Inspirada no dinamismo do microblogging (formato feed/Twitter) e equipada com utilitários essenciais de secretaria, a aplicação conecta **estudantes, professores, empresas parceiras e a gestão acadêmica**.

### 🎯 Proposta de Valor
- **Engajamento & Comunidade:** Troca de experiências acadêmicas, dúvidas de matérias, avisos de hackathons, oportunidades de estágio e caronas.
- **Transparência Institucional:** Publicações oficiais com selo de verificação da Fatec/CPS para informes em tempo real.
- **Centralização do Aluno:** Consulta descomplicada de notas, faltas/frequência e abertura de solicitações de documentos com status transparente.
- **Identidade Própria:** Inspirada na tradição do Centro Paula Souza (`#B20000`) e simbolizada pelo icônico **Jacaré** da Fatec Itaquera.

---

## 🏛 Arquitetura do Ecossistema

O sistema é construído como uma aplicação web moderna, responsiva (*mobile-first*), escalável e modular, separada em três frentes que convergem no mesmo banco de dados relacional otimizado:

```mermaid
flowchart TD
    subgraph Client["📱 Camada de Apresentação (Next.js 16 + React 19)"]
        UI_Feed["Feed & Microblogging\n(PostCard, Composer, Comentários)"]
        UI_Auth["Autenticação & Perfis\n(Login, Cadastro, Badges, RBAC)"]
        UI_Sec["Portal da Secretaria\n(Notas, Frequência, Documentos)"]
    end

    subgraph Core["⚙️ Core Application (Next.js App Router + Server Actions)"]
        Router["App Router & Middleware"]
        AuthService["Auth & Session Provider"]
        SocialService["Social Feed Engine"]
        AcademicService["Academic Record Engine"]
    end

    subgraph Data["💾 Camada de Persistência (PostgreSQL)"]
        DB_Users[("usuarios & badges")]
        DB_Social[("posts, curtidas,\ncomentarios, seguidores")]
        DB_Academic[("notas, frequencia,\nsolicitacoes_doc")]
    end

    Client --> Router
    Router --> AuthService
    Router --> SocialService
    Router --> AcademicService
    AuthService --> DB_Users
    SocialService --> DB_Social
    SocialService -.-> DB_Users
    AcademicService --> DB_Academic
    AcademicService -.-> DB_Users
```

---

## 📦 Módulos do Sistema

O projeto é estruturado em **3 pilares interdependentes e complementares**:

### 1. 🔐 Núcleo: Autenticação, Usuários & Permissões (RBAC)
*Desenvolvido em paralelo pela equipe de segurança e auth.*
- **Perfis de Acesso (4 papéis):**
  - `aluno`: consome o feed, interage com a comunidade e visualiza seus dados acadêmicos.
  - `professor`: publica avisos de aulas, tira dúvidas acadêmicas com badge de destaque.
  - `empresa`: divulga vagas de estágio, projetos de inovação e oportunidades no ecossistema.
  - `master`: gestão total, concessão de badges e moderação institucional.
- **Sistema de Badges & Autoridade:**
  - Identificação visual para usuários certificados (ex: *Oficial Fatec*, *Professor*, *Líder de Turma*, *Monitor*).
  - Governança de atribuição de insígnias pela conta master.

---

### 2. 💬 Módulo Social: Feed & Microblogging Acadêmico
*Foco do desenvolvimento do feed tipo Twitter/X da AgenTEC.*
- **Post Composer:** Publicação ágil de posts em texto puro (`char_length > 0`), limite de caracteres e tags acadêmicas.
- **Feed Dual:**
  - **Aba "Geral" (Para você):** Timeline completa em ordem cronológica reversa de toda a Fatec.
  - **Aba "Seguindo":** Posts selecionados exclusivamente dos perfis que o usuário acompanha.
- **Interações Otimistas:**
  - **Curtidas (Likes):** Toggle instantâneo com *Optimistic UI* e contadores reativos.
  - **Comentários:** Thread organizada por ordem de envio vinculada a cada publicação.
  - **Seguir / Deixar de Seguir:** Botão dinâmico em 1 clique, impedindo auto-seguimento (`CHECK seguidor_id <> seguido_id`).
- **Contadores em Tempo Real:** Totalizadores de likes, comentários, seguidores e seguindo.

---

### 3. 📑 Módulo Secretaria: Acadêmico & Gestão
*Portal integrado para desburocratizar a rotina estudantil.*
- **Notas:** Histórico visual de rendimento e médias por disciplina e semestre letivo.
- **Frequência:** Medidor de assiduidade com total de aulas e faltas registradas.
- **Solicitações de Documentos:** Abertura de pedidos (ex: *Histórico Escolar*, *Declaração de Matrícula*) com ciclo de vida rastreável:
  $$\text{pendente} \longrightarrow \text{em\_analise} \longrightarrow \text{pronto} \longrightarrow \text{entregue}$$
- **Painel Master Administrativo:** Tela para lançamento de notas, faltas e despacho de documentos solicitados.

---

## 🎨 Design System & Identidade Visual

A interface da AgenTEC segue os padrões estritos documentados em [`DESIGN.md`](./DESIGN.md), garantindo uma experiência premium e contemporânea:

> **Princípio Central:** *"Conteúdo primeiro. Marca como assinatura."*
> Os cards são limpos e brancos; o vermelho é reservado estritamente para ações, CTAs e destaque de autoridade.

### Paleta Cromática Oficial
| Cor | Hex | Uso Principal |
| :--- | :--- | :--- |
| **AgenTEC Red** | `#B20000` | CTA primário, botão publicar, tabs ativas, like ativo, focus |
| **AgenTEC Red Dark** | `#8F0000` | Hover states, áreas de ênfase escura |
| **AgenTEC Ink** | `#171717` | Títulos, corpos de texto com alto contraste |
| **AgenTEC Background** | `#F5F5F5` | Fundo principal da aplicação |
| **AgenTEC Surface** | `#FFFFFF` | Superfície dos cards de post, modais e menus |
| **AgenTEC Muted** | `#666666` | Timestamps, subtítulos e metadados |
| **AgenTEC Border** | `#E1E1E3` | Bordas sutis de 1px |
| **AgenTEC Soft Red** | `#FFF1F1` | Badges sutis, hover secundário |

### Diretrizes de Layout
- **Mobile-First (< 768px):** Bottom Navigation com altura de 60–68px e botão flutuante central `+` (Publicar) em vermelho com ícone branco. Todos os touch targets $\ge 44 \times 44\text{px}$.
- **Desktop ($\ge 768px$):** Sidebar fixa à esquerda com a logo AgenTEC + Feed central com largura de 600px a 720px + Coluna contextual direita com sugestões de "Quem seguir na Fatec".
- **Tipografia:** Família **Inter** nativa do Tailwind/Google Fonts.
- **Ícones:** **Lucide Icons** com traço `1.75px` a `2px`.

---

## 🗄 Modelo de Dados (PostgreSQL)

O banco foi desenhado com chaves primárias em **UUIDv4** (`gen_random_uuid()`), exclusões em cascata (`ON DELETE CASCADE`) e índices estratégicos para alto throughput:

```mermaid
erDiagram
    usuarios ||--o{ usuario_badges : possui
    badges ||--o{ usuario_badges : categoriza
    usuarios ||--o{ posts : publica
    usuarios ||--o{ curtidas : interage
    usuarios ||--o{ comentarios : opina
    posts ||--o{ curtidas : recebe
    posts ||--o{ comentarios : possui
    usuarios ||--o{ seguidores : "seguidor / seguido"
    usuarios ||--o{ notas : recebe
    usuarios ||--o{ frequencia : registra
    usuarios ||--o{ solicitacoes_doc : solicita

    usuarios {
        UUID id PK
        VARCHAR nome
        VARCHAR email UK
        VARCHAR senha_hash
        VARCHAR tipo_usuario
        VARCHAR foto_perfil
        TEXT bio
        TIMESTAMP criado_em
    }

    badges {
        UUID id PK
        VARCHAR nome
        VARCHAR descricao
        VARCHAR cor_icone
    }

    posts {
        UUID id PK
        UUID usuario_id FK
        TEXT conteudo
        TIMESTAMP criado_em
    }

    curtidas {
        UUID id PK
        UUID post_id FK
        UUID usuario_id FK
        TIMESTAMP criado_em
    }

    comentarios {
        UUID id PK
        UUID post_id FK
        UUID usuario_id FK
        TEXT conteudo
        TIMESTAMP criado_em
    }

    seguidores {
        UUID id PK
        UUID seguidor_id FK
        UUID seguido_id FK
        TIMESTAMP criado_em
    }

    notas {
        UUID id PK
        UUID aluno_id FK
        VARCHAR disciplina
        DECIMAL nota
        VARCHAR semestre
        UUID lancado_por FK
    }

    frequencia {
        UUID id PK
        UUID aluno_id FK
        VARCHAR disciplina
        INT total_aulas
        INT faltas
        VARCHAR semestre
    }

    solicitacoes_doc {
        UUID id PK
        UUID aluno_id FK
        VARCHAR tipo_documento
        VARCHAR status
        TEXT observacao
    }
```

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
- **Node.js:** Versão 20.x ou superior
- **Gerenciador de Pacotes:** `npm`, `pnpm` ou `yarn`
- **Banco de Dados:** Instância PostgreSQL ativa

### 1. Clonar o Repositório
```bash
git clone https://github.com/wellingtonspdev/hackathon.git
cd hackathon
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com os parâmetros de conexão:
```env
# Banco de Dados PostgreSQL
DATABASE_HOST="sql.freedb.tech"
DATABASE_USER="u_5ceDN5"
DATABASE_PASSWORD="SEU_PASSWORD"
DATABASE_NAME="freedb_DmnP70mB"
DATABASE_URL="postgresql://u_5ceDN5:SEU_PASSWORD@sql.freedb.tech:5432/freedb_DmnP70mB"

# URL da Aplicação
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 5. Scripts Disponíveis
| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor Next.js em modo de desenvolvimento |
| `npm run build` | Compila o projeto otimizado para produção |
| `npm run start` | Inicializa a aplicação compilada |
| `npm run lint` | Executa o ESLint para validação de boas práticas |
| `npm run typecheck` | Validação estrita de tipos via TypeScript |
| `npm run format` | Formatação de código via Prettier |

---

## 👥 Divisão da Equipe & Hackathon

| Módulo | Escopo & Responsabilidades | Status |
| :--- | :--- | :---: |
| **Módulo 1: Auth & Governança** | Cadastro, login, tokens, RBAC (`aluno`, `professor`, `empresa`, `master`) e badges | 🚧 Em progresso |
| **Módulo 2: Rede Social** | Feed dual (Geral / Seguindo), composer de posts, likes, comentários, follow/unfollow | 🚧 Em progresso |
| **Módulo 3: Secretaria Acadêmica** | Visualização de notas, faltas/frequência, pedidos de documentos e painel master | 🚧 Em progresso |

---

## 📜 Licença e Institucional

Projeto concebido e desenvolvido durante o Hackathon acadêmico com foco na **Fatec Itaquera** e nas unidades do **Centro Paula Souza (CPS)**, Governo do Estado de São Paulo.

<div align="center">
  <img src="logos/CPS/cps_logo_cor.png" height="38" alt="Centro Paula Souza" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="logos/CPS/fatec_itaquera_logo.png" height="38" alt="Fatec Itaquera" />
</div>
