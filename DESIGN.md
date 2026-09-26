# DESIGN.md — AgenTEC

> **Documento mestre de identidade visual e UI/UX**
>
> Este arquivo é a fonte de verdade para humanos e LLMs que forem projetar, implementar, revisar ou evoluir a interface da **AgenTEC**.
>
> **Regra principal:** não reinventar a identidade visual. Toda implementação deve partir das decisões registradas neste documento e dos assets oficiais do projeto.

---

# 1. Visão geral da marca

## 1.1 Nome

**AgenTEC**

A grafia oficial deve preservar:

- `Agen` com inicial maiúscula;
- `TEC` em caixa alta;
- sem espaços;
- sem hífen;
- sem variações como `Agentech`, `Agentec`, `AGENTEC` ou `Agen Tec`.

### Uso textual correto

```text
AgenTEC
```

### Uso incorreto

```text
AGENTEC
Agentec
Agen Tec
Agen-Tech
NossaTEC
```

---

## 1.2 Tagline oficial

**Conecta a Fatec.**

Quando usada em materiais promocionais, pode aparecer sem ponto final em composições gráficas.

### Uso preferencial

```text
AgenTEC
Conecta a Fatec.
```

---

## 1.3 Proposta da marca

A AgenTEC é uma rede social acadêmica voltada ao ecossistema Fatec, criada para conectar:

- estudantes;
- cursos;
- comunidades;
- eventos;
- oportunidades;
- dúvidas;
- conteúdos acadêmicos;
- comunicação institucional;
- vida universitária.

A experiência não deve parecer um portal burocrático, um sistema administrativo ou uma intranet corporativa.

A interface deve transmitir:

- proximidade;
- pertencimento;
- dinamismo;
- confiança;
- energia jovem;
- tecnologia;
- vida acadêmica real.

---

# 2. Personalidade visual

A personalidade da AgenTEC é:

- **jovem**, sem ser infantil;
- **moderna**, sem depender de modismos visuais;
- **acadêmica**, sem ser burocrática;
- **tecnológica**, sem parecer futurismo genérico;
- **confiável**, sem perder espontaneidade;
- **comunitária**, sem parecer uma rede social genérica;
- **direta**, evitando excesso de elementos decorativos;
- **enérgica**, com uso forte e controlado do vermelho.

## 2.1 O que a marca deve parecer

Referências conceituais:

- produto digital moderno;
- rede social mobile-first;
- interface limpa;
- comunidade universitária;
- cultura Fatec;
- design shadcn/ui;
- linguagem visual atual;
- cards, tabs, chips e navegação leves;
- identidade institucional reinterpretada para um público jovem.

## 2.2 O que a marca NÃO deve parecer

Evitar:

- sistema governamental;
- portal escolar antigo;
- ERP acadêmico;
- painel administrativo denso;
- aplicativo infantil;
- estética gamer exagerada;
- cyberpunk;
- excesso de gradientes;
- neon;
- glassmorphism excessivo;
- skeuomorfismo;
- cópia direta de Instagram, X, Discord ou Reddit;
- uso exagerado do mascote dentro da UI;
- interface dominada por vermelho em grandes superfícies.

---

# 3. Origem visual da identidade

A identidade da AgenTEC deriva de três fundamentos principais.

## 3.1 Herança Fatec / CPS

A marca utiliza como principal herança visual o vermelho institucional do Centro Paula Souza.

```css
#B20000
```

Esse vermelho representa continuidade com o ecossistema Fatec/CPS.

Entretanto:

> A AgenTEC possui identidade própria e NÃO deve copiar, fundir ou deformar as marcas oficiais Fatec ou CPS.

As marcas Fatec/CPS devem ser tratadas como assinaturas institucionais separadas quando houver autorização e necessidade de uso.

---

## 3.2 Jacaré como ativo proprietário

O jacaré é o elemento proprietário mais importante da marca AgenTEC.

Ele surgiu a partir do mascote associado à Fatec Itaquera e foi transformado em dois níveis de identidade:

### A. Símbolo institucional

Um jacaré:

- geométrico;
- sólido;
- simplificado;
- forte;
- escalável;
- reconhecível em tamanhos pequenos.

Esse símbolo é usado na logo, favicon, ícone de aplicativo e avatar institucional.

### B. Mascote ilustrado

Um jacaré:

- humanoide;
- jovem;
- confiante;
- expressivo;
- amigável;
- competitivo;
- vestido de forma casual;
- relacionado à vida acadêmica.

Esse mascote é um elemento secundário.

Ele NÃO substitui o símbolo principal.

---

# 4. Logo oficial

## 4.1 Estrutura

A logo oficial combina:

1. símbolo geométrico do jacaré;
2. wordmark `AgenTEC`;
3. tagline `Conecta a Fatec.` quando houver espaço.

Visualmente:

- `Agen` utiliza cor escura em fundo claro;
- `TEC` utiliza vermelho;
- o jacaré utiliza vermelho, preto e branco conforme a versão;
- a tagline é secundária.

---

## 4.2 Hierarquia da logo

Ordem visual:

```text
símbolo do jacaré
        +
     AgenTEC
        +
 Conecta a Fatec.
```

O símbolo e o wordmark são os elementos principais.

A tagline nunca deve competir com `AgenTEC`.

---

# 5. Assets oficiais PNG

Os PNGs atualmente definidos como referência visual são:

```text
01_agentec_logo_principal.png
02_agentec_logo_principal_transparente.png
03_agentec_simbolo_jacare_transparente.png
04_agentec_logo_compacta.png
05_agentec_logo_monocromatica.png
06_agentec_logo_fundo_vermelho.png
07_agentec_logo_fundo_escuro.png
08_agentec_icone_app_vermelho.png
09_agentec_icone_app_claro.png
10_agentec_icone_app_escuro.png
```

## 5.1 Regra para LLMs e agentes

Se esses arquivos existirem no repositório:

> **NUNCA redesenhar ou substituir a logo automaticamente.**

O agente deve reutilizar os assets existentes.

Não gerar uma nova logo por CSS, SVG improvisado, emoji ou texto.

---

# 6. Variações oficiais da logo

## 6.1 Principal

Uso:

- páginas claras;
- landing page;
- header;
- apresentações;
- materiais institucionais.

Preferir fundo:

```css
#FFFFFF
#F5F5F5
```

---

## 6.2 Transparente

Ideal para:

- header;
- hero section;
- overlays;
- apresentações;
- materiais promocionais.

---

## 6.3 Símbolo isolado

Utilizar em:

- favicon;
- avatar da plataforma;
- app icon;
- botão institucional;
- loader;
- splash screen;
- watermark;
- elementos decorativos discretos.

---

## 6.4 Monocromática

Usar somente quando:

- impressão monocromática;
- documentação;
- superfícies que não permitem a paleta principal;
- requisitos técnicos exigirem uma cor única.

---

## 6.5 Fundo vermelho

Aplicar em:

- splash screen;
- campanhas;
- banners;
- hero promocional;
- materiais gráficos.

Evitar usar em todos os elementos da aplicação.

---

## 6.6 Fundo escuro

Aplicar em:

- dark mode;
- banners;
- capa;
- apresentações;
- rodapé institucional.

---

# 7. Regras de uso da logo

## 7.1 Não fazer

Não:

- esticar;
- comprimir;
- girar;
- inclinar;
- adicionar contorno;
- adicionar glow;
- colocar sombra pesada;
- trocar as cores arbitrariamente;
- aplicar gradientes não definidos;
- alterar os dentes do jacaré;
- alterar o formato do focinho;
- substituir o símbolo por mascote;
- misturar o símbolo com a marca oficial Fatec;
- inserir letras dentro do jacaré;
- recriar um `N` na cabeça do jacaré;
- redesenhar a marca em cada página.

---

## 7.2 Área de proteção

Ao redor da logo deve existir uma área vazia mínima equivalente a aproximadamente:

```text
25% da altura do símbolo
```

Nunca encostar a logo:

- em bordas;
- em cards;
- em outros logos;
- em textos;
- em fotografias visualmente carregadas.

---

# 8. Paleta oficial

## 8.1 Cores principais

### AgenTEC Red

```css
#B20000
```

Uso:

- identidade;
- CTA principal;
- estado ativo;
- tabs selecionadas;
- ícones ativos;
- links importantes;
- selo oficial;
- botão publicar;
- foco.

---

### AgenTEC Red Dark

```css
#8F0000
```

Uso:

- hover;
- pressed;
- áreas vermelhas escuras;
- banners;
- contraste.

---

### AgenTEC Ink

```css
#171717
```

Uso:

- títulos;
- textos principais;
- dark surfaces;
- ícones de alto contraste.

---

### AgenTEC White

```css
#FFFFFF
```

Uso:

- cards;
- superfícies;
- modal;
- dropdown;
- texto sobre vermelho/escuro.

---

### AgenTEC Background

```css
#F5F5F5
```

Uso:

- background da aplicação;
- áreas secundárias;
- zonas de separação.

---

### AgenTEC Muted

```css
#666666
```

Uso:

- subtítulos;
- timestamp;
- metadados;
- texto secundário;
- hints.

---

### AgenTEC Soft Red

```css
#FFF1F1
```

Uso:

- estado selecionado;
- hover leve;
- tag;
- background de aviso leve.

---

# 9. Tokens de cor

```css
:root {
  --agentec-red: #B20000;
  --agentec-red-dark: #8F0000;

  --agentec-ink: #171717;
  --agentec-white: #FFFFFF;

  --agentec-bg: #F5F5F5;
  --agentec-surface: #FFFFFF;

  --agentec-muted: #666666;
  --agentec-border: #E1E1E3;

  --agentec-soft-red: #FFF1F1;
}
```

---

# 10. Cores semânticas

Cores semânticas são complementares.

Elas NÃO substituem o vermelho como cor de marca.

```css
--success: #15803D;
--info: #2563EB;
--warning: #B45309;
--danger: #B91C1C;
--question: #7C3AED;
```

Uso:

| Contexto | Cor |
|---|---|
| Oficial | vermelho |
| Evento | azul |
| Oportunidade | âmbar |
| Acadêmico | verde |
| Dúvida | roxo |
| Erro | vermelho escuro |

---

# 11. Tipografia

## 11.1 Fonte principal

A fonte definida para a AgenTEC é:

```text
Inter
```

Fallback:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

---

## 11.2 Motivo

Inter foi escolhida por:

- legibilidade;
- aparência contemporânea;
- ótima leitura mobile;
- integração natural com interfaces React/shadcn;
- boa densidade visual;
- neutralidade suficiente para deixar a marca falar através do símbolo e das cores.

---

# 12. Escala tipográfica

```text
Display:
40px / 48px
800

H1:
32px / 40px
700

H2:
24px / 32px
700

H3:
18px / 28px
600

Body:
16px / 24px
400

Body Small:
14px / 20px
400

Label:
12px / 16px
600

Metadata:
12px / 16px
400
```

---

# 13. Tecnologia visual

O projeto deve utilizar como referência:

```text
shadcn/ui
```

e a experiência:

```text
https://ui.shadcn.com/create
```

## 13.1 Base recomendada

Preferir:

- shadcn/ui;
- Base UI;
- estilo próximo ao Nova;
- Inter;
- Lucide Icons;
- Tailwind CSS;
- CSS variables;
- mobile-first.

---

# 14. Princípio de UI

A AgenTEC deve seguir:

> **Conteúdo primeiro. Marca como assinatura.**

Isso significa:

- cards predominantemente brancos;
- fundos neutros;
- vermelho reservado para ações e identidade;
- tipografia forte;
- pouco ruído;
- bastante espaço respirável;
- iconografia consistente.

---

# 15. Border radius

O projeto deve ser mais arredondado que o sistema administrativo original da Fatec.

Tokens:

```css
--radius-xs: 6px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

Uso:

```text
botões       10–12px
inputs       10–12px
cards        12–16px
modal        16px
avatar       9999px
chips        9999px
```

---

# 16. Sombras

Usar sombras discretas.

Card padrão:

```css
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.04);
```

Elevado:

```css
box-shadow:
  0 8px 24px rgba(0, 0, 0, 0.08);
```

Evitar:

- sombras pretas pesadas;
- glow;
- sombras coloridas;
- neumorphism.

---

# 17. Bordas

Cor padrão:

```css
#E1E1E3
```

Espessura:

```css
1px
```

Focus:

```css
outline: 2px solid #B20000;
outline-offset: 2px;
```

---

# 18. Espaçamento

Utilizar escala consistente baseada em múltiplos de 4.

```text
4
8
12
16
20
24
32
40
48
64
```

Preferência:

- card padding mobile: 16px;
- card desktop: 20–24px;
- gap de lista: 12–16px;
- seções: 24–32px;
- grandes áreas: 48–64px.

---

# 19. Layout geral

## 19.1 Mobile-first

A prioridade é smartphone.

O produto deve funcionar completamente em:

```text
320px+
```

Breakpoint principal:

```text
768px
```

---

## 19.2 Desktop

Desktop não deve ser simplesmente o mobile esticado.

Preferir:

```text
sidebar + feed + coluna contextual
```

ou:

```text
sidebar + feed central
```

Largura recomendada do feed:

```text
600–720px
```

---

# 20. Navegação mobile

Bottom navigation obrigatória.

Itens:

1. Início
2. Explorar
3. Publicar
4. Comunidades
5. Perfil

Estrutura:

```text
Home   Search     +     Groups    Profile
```

O `+` deve ser visualmente prioritário.

Exemplo:

```css
background: #B20000;
color: #FFFFFF;
border-radius: 9999px;
```

---

# 21. Navegação desktop

Sidebar recomendada:

```text
AgenTEC

Início
Explorar
Comunidades
Eventos
Acadêmico
Oportunidades
Dúvidas
Salvos
Perfil

+ Publicar
```

---

# 22. Feed

O feed é o elemento central da aplicação.

## 22.1 Card de post

Estrutura:

```text
Avatar Nome
Curso • semestre • tempo

Conteúdo do post

Imagem / link / mídia opcional

Tags

Curtir  Comentar  Salvar  Compartilhar
```

---

## 22.2 Aparência

```css
background: #FFFFFF;
border: 1px solid #E1E1E3;
border-radius: 12px;
```

Evitar sombras fortes.

---

# 23. Categorias

As categorias podem ser:

- Oficial
- Evento
- Oportunidade
- Acadêmico
- Dúvida

Representação preferencial:

```text
chips / badges
```

Não usar cards totalmente coloridos.

---

# 24. Post oficial

Posts oficiais devem ser claramente distinguíveis.

Elementos:

- avatar institucional;
- badge `Oficial`;
- verificação;
- nome da Fatec/unidade;
- timestamp;
- conteúdo;
- fonte quando necessário.

Exemplo:

```text
Fatec Itaquera   ✓ Oficial
há 2 horas

Semana de Tecnologia 2026...
```

Não transformar o post inteiro em vermelho.

---

# 25. Comunidades

Comunidades representam grupos de interesse.

Exemplos:

```text
ADS
DSM
Eventos
Estágios
Dúvidas
Caronas
Hackathons
Projetos
```

Cada comunidade pode possuir:

- ícone;
- nome;
- quantidade de membros;
- botão Entrar;
- descrição;
- feed próprio.

---

# 26. Eventos

Card de evento deve conter:

- nome;
- categoria;
- data;
- hora;
- local;
- descrição curta;
- CTA;
- organização.

Exemplo:

```text
Semana de Tecnologia

15–19 Outubro
Auditório — Fatec Itaquera

[Tenho interesse]
```

---

# 27. Perfil

Perfil deve enfatizar pertencimento acadêmico.

Elementos:

```text
foto
nome
curso
semestre
bio
Fatec
posts
seguidores
seguindo
```

Evitar gamificação exagerada no MVP.

---

# 28. Busca

Search bar:

```text
Buscar na AgenTEC...
```

Características:

- fundo neutro;
- borda discreta;
- ícone Lucide;
- mínimo 44px de altura;
- foco vermelho.

---

# 29. Botões

## Primário

```css
background: #B20000;
color: #FFFFFF;
```

## Hover

```css
background: #8F0000;
```

## Secundário

```css
background: #FFFFFF;
border: 1px solid #E1E1E3;
color: #171717;
```

## Ghost

Uso para ações leves.

---

# 30. Iconografia

Biblioteca:

```text
Lucide Icons
```

Regras:

```text
stroke 1.75–2px
20–24px
```

Ativo:

```css
color: #B20000;
```

Inativo:

```css
color: #4B5563;
```

Não misturar:

- Material Icons;
- Font Awesome;
- emojis;
- Heroicons;
- Lucide;

na mesma superfície.

---

# 31. Avatar

Formato:

```css
border-radius: 9999px;
```

Tamanhos:

```text
32px — metadata
40px — post
48px — lista/perfil
96px+ — perfil principal
```

---

# 32. Mascote

O mascote é secundário.

## Usar

- login;
- onboarding;
- campanhas;
- empty state;
- evento;
- banner;
- sucesso;
- conquista;
- material promocional;
- apresentação do hackathon.

## Não usar

- em cada post;
- dentro de todo card;
- em todos os botões;
- substituindo ícones;
- no header permanentemente;
- como fundo de toda tela.

---

# 33. Personalidade do mascote

Deve ser:

- confiante;
- jovem;
- esperto;
- competitivo;
- carismático.

Não deve ser:

- assustador demais;
- infantil;
- agressivo;
- violento;
- grotesco.

O meio-termo aprovado é:

> **marcante, confiante e levemente intimidador, mas simpático.**

---

# 34. Fotografia

Preferir:

- alunos reais;
- Fatec;
- corredores;
- laboratórios;
- hackathons;
- eventos;
- trabalhos em equipe;
- tecnologia;
- projetos.

Evitar:

- stock photos corporativas;
- executivos genéricos;
- imagens excessivamente posadas.

---

# 35. Pattern da marca

O símbolo do jacaré pode gerar padrões gráficos abstratos.

Uso:

- banner;
- background promocional;
- hero;
- apresentação;
- capa.

Nunca comprometer legibilidade.

Opacity sugerida:

```text
4%–12%
```

---

# 36. Dark mode

Tokens:

```css
.dark {
  --background: #0D0D0E;
  --surface: #151516;
  --surface-2: #1C1C1E;

  --border: #2B2B2D;

  --foreground: #F5F5F5;
  --muted: #A1A1AA;

  --primary: #D52929;
}
```

No dark mode, o vermelho pode ser levemente mais claro para preservar contraste.

---

# 37. Acessibilidade

A interface deve atender no mínimo:

```text
WCAG 2.1 AA
```

Requisitos:

- touch targets de pelo menos 44×44px;
- contraste mínimo 4.5:1;
- foco visível;
- navegação por teclado;
- labels;
- ARIA quando necessário;
- alt em imagens;
- ícones decorativos com `aria-hidden`;
- não depender apenas de cor;
- suporte a zoom;
- layout responsivo.

---

# 38. Motion

Motion deve ser curto e funcional.

Durações:

```text
hover      120–160ms
feedback   160–200ms
modal      180–240ms
navigation 180–240ms
```

Evitar:

- bounce excessivo;
- zoom;
- parallax pesado;
- animação constante;
- animação em conteúdo principal.

Respeitar:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 39. Componentes shadcn/ui prioritários

Preferir reutilizar:

```text
Avatar
Badge
Button
Card
Dialog
DropdownMenu
Input
Popover
ScrollArea
Separator
Sheet
Skeleton
Tabs
Textarea
Tooltip
Toast / Sonner
```

Não construir versões próprias se o shadcn já fornece base adequada.

---

# 40. CSS base recomendado

```css
:root {
  --background: 0 0% 96%;
  --foreground: 0 0% 9%;

  --card: 0 0% 100%;
  --card-foreground: 0 0% 9%;

  --primary: 0 100% 35%;
  --primary-foreground: 0 0% 100%;

  --secondary: 0 0% 96%;
  --secondary-foreground: 0 0% 9%;

  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 40%;

  --border: 240 3% 89%;

  --radius: 0.75rem;
}
```

---

# 41. Tailwind tokens sugeridos

```ts
colors: {
  agentec: {
    red: "#B20000",
    redDark: "#8F0000",
    ink: "#171717",
    white: "#FFFFFF",
    bg: "#F5F5F5",
    muted: "#666666",
    border: "#E1E1E3",
    softRed: "#FFF1F1",
  },
}
```

---

# 42. Mobile bottom navigation

Altura aproximada:

```text
60–68px
```

Safe area:

```css
padding-bottom: env(safe-area-inset-bottom);
```

Fixa no viewport.

No desktop deve desaparecer.

---

# 43. Touch targets

Todo elemento clicável importante:

```css
min-width: 44px;
min-height: 44px;
```

Isso inclui:

- botão;
- tab;
- like;
- bookmark;
- ícone;
- navegação;
- avatar clicável.

---

# 44. Estados

Todo componente interativo deve prever:

```text
default
hover
focus
active
disabled
loading
error
success
empty
```

LLMs não devem implementar somente o happy path.

---

# 45. Empty states

Empty state pode ser uma das principais áreas de uso do mascote.

Exemplo:

```text
Ainda não há posts por aqui.

Entre em uma comunidade ou publique algo para começar.
```

Mascote pequeno ou ilustração simples.

---

# 46. Skeleton

Feeds devem carregar com skeleton.

Nunca mostrar:

```text
Loading...
```

como única experiência.

---

# 47. Linguagem textual

Tom:

- direto;
- jovem;
- humano;
- curto;
- acolhedor.

Evitar gírias forçadas.

## Exemplos

Bom:

```text
O que está rolando?
```

```text
Compartilhe com a comunidade.
```

```text
Encontre sua galera.
```

Ruim:

```text
E aí, parça! Bora bombar sua facul?
```

---

# 48. Microcopy

## Publicação

```text
No que você está pensando?
```

ou

```text
Compartilhe algo com a Fatec.
```

## Busca

```text
Buscar na AgenTEC...
```

## Comunidades

```text
Encontre sua comunidade.
```

---

# 49. Login

Login deve ser simples.

Visual:

```text
logo AgenTEC

Conecta a Fatec.

[ Entrar com Microsoft ]

ou

[ Entrar com e-mail ]
```

O mascote pode aparecer como elemento secundário.

---

# 50. Co-branding com Fatec / CPS

Se forem utilizadas marcas Fatec ou CPS:

- não modificar;
- não recriar;
- não fundir com AgenTEC;
- não inserir dentro do jacaré;
- manter distância;
- tratar como parceiros/assinatura institucional.

Exemplo:

```text
AgenTEC

Projeto desenvolvido na Fatec Itaquera

[logo Fatec]  [logo CPS]
```

Somente quando apropriado.

---

# 51. Prioridade visual

Hierarquia geral:

```text
conteúdo
↓
ações
↓
identidade AgenTEC
↓
elementos decorativos
```

A marca não deve prejudicar o consumo do feed.

---

# 52. Princípios mobile

1. uma mão deve conseguir navegar;
2. ações principais próximas ao polegar;
3. bottom nav;
4. botão publicar destacado;
5. feed vertical;
6. modal virar sheet quando necessário;
7. nenhum hover indispensável;
8. evitar tabelas;
9. preferir cards;
10. mensagens curtas.

---

# 53. Princípios desktop

1. manter feed relativamente estreito;
2. sidebar fixa;
3. informações auxiliares em terceira coluna somente quando úteis;
4. não esticar posts até ocupar 100% da viewport;
5. preservar densidade de rede social.

---

# 54. Performance visual

Evitar:

- grandes imagens não otimizadas;
- animações desnecessárias;
- blur pesado;
- background videos;
- múltiplas fontes.

Assets devem possuir:

```text
WebP/AVIF para fotos
SVG para ícones/logos quando disponível
PNG apenas quando necessário
```

---

# 55. Regras para LLMs

Esta seção é obrigatória para agentes que forem editar o front-end.

## 55.1 Antes de implementar

O agente deve:

1. localizar este `DESIGN.md`;
2. localizar assets AgenTEC;
3. verificar componentes existentes;
4. reutilizar design tokens;
5. evitar criar outro design system paralelo.

---

## 55.2 O agente NÃO deve

- trocar a logo;
- recriar a logo;
- mudar a paleta;
- inventar outra fonte;
- adicionar azul como cor principal;
- usar gradiente roxo;
- transformar o mascote em logo;
- usar o mascote em excesso;
- usar o vermelho como fundo de todos os cards;
- instalar outra biblioteca de ícones sem necessidade;
- criar componentes incompatíveis com shadcn;
- alterar radius global sem justificativa;
- aplicar estilos aleatórios por página.

---

## 55.3 O agente DEVE

- utilizar tokens;
- reutilizar componentes;
- seguir mobile-first;
- manter acessibilidade;
- garantir dark mode quando aplicável;
- usar Lucide;
- manter Inter;
- preservar logo;
- usar vermelho com moderação;
- implementar estados;
- respeitar touch target.

---

# 56. Checklist visual de PR

Antes de considerar uma tela pronta:

```text
[ ] usa os assets oficiais AgenTEC
[ ] não redesenha a logo
[ ] usa #B20000 como primary
[ ] usa Inter
[ ] usa Lucide
[ ] usa shadcn quando adequado
[ ] é responsiva
[ ] funciona em mobile
[ ] touch targets >= 44px
[ ] contraste adequado
[ ] focus visível
[ ] cards não estão excessivamente vermelhos
[ ] mascote não está sendo usado como decoração excessiva
[ ] possui empty/loading/error states
[ ] segue radius e spacing
[ ] não cria outro design system
```

---

# 57. Estrutura recomendada de assets

```text
src/
└── assets/
    └── brand/
        └── agentec/
            ├── logo-primary.png
            ├── logo-transparent.png
            ├── logo-compact.png
            ├── logo-monochrome.png
            ├── logo-red-bg.png
            ├── logo-dark-bg.png
            ├── symbol.png
            └── app-icon.png
```

Alternativamente:

```text
public/
└── brand/
    └── agentec/
```

Escolher somente uma estratégia.

---

# 58. Nomenclatura de componentes

Exemplos:

```text
PostCard
PostComposer
OfficialBadge
CommunityCard
EventCard
BottomNavigation
DesktopSidebar
UserAvatar
FeedTabs
CategoryBadge
ProfileHeader
SearchBar
```

Evitar nomes genéricos:

```text
Box1
Container2
ComponentNew
Thing
```

---

# 59. Telas prioritárias do MVP

1. Login
2. Feed
3. Criar post
4. Comunidades
5. Eventos
6. Perfil
7. Explorar

A identidade deve permanecer consistente entre todas.

---

# 60. Feed MVP recomendado

Exemplo conceitual:

```text
AgenTEC                       🔔 ●

Buscar na AgenTEC...

[Todos] [Oficial] [Eventos] [Estágios]

┌─────────────────────────────┐
│ Gabriel Lima                │
│ ADS • 4º semestre • 1h      │
│                             │
│ Alguém já fez a atividade   │
│ de Banco de Dados?          │
│                             │
│ #Dúvida                     │
│                             │
│ ♡ 12    ◯ 8           🔖    │
└─────────────────────────────┘
```

---

# 61. Elementos que representam a AgenTEC

A marca é sustentada por:

```text
jacaré
vermelho
AgenTEC
comunidade
feed
Fatec
tecnologia
estudantes
conexão
oportunidades
```

Não é sustentada por:

```text
IA
metaverso
futurismo
holograma
cyberpunk
neon
criptomoedas
```

Mesmo que tecnologias futuras sejam incorporadas, elas não devem redefinir a identidade visual.

---

# 62. Critério para novas features

Qualquer nova feature deve responder:

1. isso fortalece a comunidade?
2. funciona bem no mobile?
3. é visualmente simples?
4. reutiliza padrões existentes?
5. usa a identidade AgenTEC sem exagero?
6. é compreensível por um aluno em poucos segundos?

Se a resposta for não, rever a solução.

---

# 63. Fonte da verdade

Em caso de conflito entre:

- preferência de um agente;
- defaults de biblioteca;
- exemplos encontrados na internet;
- design gerado automaticamente;
- este arquivo;

**este `DESIGN.md` prevalece**, exceto quando houver uma decisão humana posterior explicitamente documentada.

---

# 64. Resumo executivo para LLMs

```text
PROJETO: AgenTEC
TIPO: rede social acadêmica Fatec
ESTILO: moderno, jovem, minimalista, confiável
PRIMARY: #B20000
INK: #171717
BACKGROUND: #F5F5F5
SURFACE: #FFFFFF
FONT: Inter
UI: shadcn/ui + Tailwind
ICONS: Lucide
RADIUS BASE: 12px
LAYOUT: mobile-first
LOGO: jacaré geométrico + AgenTEC
MASCOTE: secundário
BOTTOM NAV: obrigatório mobile
FEED: foco principal
RED: destaque, nunca dominar toda interface
ACCESSIBILITY: WCAG 2.1 AA
TOUCH TARGET: mínimo 44x44
TAGLINE: Conecta a Fatec.
```

---

# 65. Regra final

A implementação deve parecer:

> **uma rede social moderna construída para estudantes da Fatec**

e não:

> **um sistema administrativo da Fatec com um feed adicionado.**

A identidade da AgenTEC deve permanecer reconhecível mesmo quando a logo não estiver visível, através de:

- tipografia;
- espaçamento;
- vermelho;
- cards;
- badges;
- navegação;
- linguagem;
- iconografia;
- consistência.

---

**Documento:** `DESIGN.md`  
**Marca:** AgenTEC  
**Tagline:** Conecta a Fatec.  
**Status:** identidade visual consolidada para desenvolvimento  
