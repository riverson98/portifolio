# Portfólio — Riverson Vicente

Site pessoal com apresentação de carreira, habilidades, experiências e um assistente de IA chamado RIV-E.

---

## O que é este projeto

Um portfólio desenvolvido com Next.js que exibe informações profissionais e inclui um chat interativo. O chat usa inteligência artificial para responder perguntas sobre a carreira do Riverson.

---

## Como rodar localmente

Você precisa ter o Node.js instalado (versão 18 ou superior).

**1. Instale as dependências**

```bash
npm install
```

**2. Configure a chave de API**

Crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo:

```
OPENROUTER_API_KEY=sua_chave_aqui
```

A chave é obtida em openrouter.ai após criar uma conta gratuita.

**3. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`.

---

## Como gerar a versão de produção

```bash
npm run build
npm run start
```

---

## Estrutura do projeto

```
app/
  page.tsx              — página principal (une todos os componentes)
  layout.tsx            — estrutura base (fonte, metadados)
  globals.css           — estilos globais e animações
  components/
    Navbar.tsx          — barra de navegação
    Hero.tsx            — seção inicial com nome e links
    About.tsx           — seção sobre mim
    Skills.tsx          — habilidades técnicas
    Experience.tsx      — experiência profissional
    Education.tsx       — formação e certificações
    Contact.tsx         — formas de contato
    Footer.tsx          — rodapé
    RiveChat.tsx        — chat flutuante com o RIV-E
  api/
    chat/route.ts       — endpoint que conecta ao OpenRouter
```

---

## O RIV-E

O RIV-E é o assistente de IA do portfólio. Ele responde perguntas sobre a carreira, stack técnica e experiências do Riverson.

O chat aparece como um botão flutuante no canto inferior direito da página. Clique nele para abrir a conversa.

Limites do chat:
- Máximo de 10 mensagens por minuto por usuário
- Máximo de 20 mensagens por conversa
- Máximo de 2000 caracteres por mensagem

---

## Tecnologias utilizadas

- **Next.js 16** — framework principal
- **TypeScript** — linguagem com verificação de tipos
- **Tailwind CSS 4** — estilos
- **Framer Motion** — animações
- **Lucide React** — ícones
- **OpenRouter** — acesso ao modelo de IA

---

## Variáveis de ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `OPENROUTER_API_KEY` | Chave de acesso ao OpenRouter | Sim |

Nunca compartilhe o arquivo `.env`. Ele já está protegido pelo `.gitignore`.
