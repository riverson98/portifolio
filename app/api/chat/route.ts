import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Rate limiting (C1) — in-memory, resets por janela de 1 minuto por IP
// ---------------------------------------------------------------------------
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 10;      // máximo de requisições por janela
const RATE_LIMIT_WINDOW = 60_000; // janela de 1 minuto em ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now >= record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// ---------------------------------------------------------------------------
// Validação de mensagens (C2)
// ---------------------------------------------------------------------------
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 2000;

type ChatMessage = { role: string; content: string };

function validateMessages(messages: unknown): messages is ChatMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  if (messages.length > MAX_MESSAGES) return false;

  return messages.every(
    (m) =>
      m !== null &&
      typeof m === "object" &&
      typeof (m as ChatMessage).role === "string" &&
      typeof (m as ChatMessage).content === "string" &&
      (m as ChatMessage).content.length <= MAX_CHARS_PER_MESSAGE
  );
}

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `Você é RIV-E, o assistente de IA pessoal do portfólio de Riverson Vicente. Responda perguntas sobre a carreira, habilidades e experiências dele com base EXCLUSIVAMENTE nas informações abaixo. Nada além disso.

## Perfil

- Engenheiro de Software Fullstack com 4 anos de experiência
- Localizado em Itajaí, Santa Catarina, Brasil
- Mentalidade Security First
- Apaixonado por longevidade de software, Clean Architecture e xadrez

## Qualyteam Gestão da Qualidade — Desenvolvedor de Software (Jul 2023 – Presente)

Produto SaaS de gestão da qualidade. Stack: ASP.NET (C#), TypeScript, Sass, Docker.

**O que faz no dia a dia:**
- Manutenção e correção de bugs do sistema
- Implementação de novas features nos módulos existentes
- Refatoração de código legado

**Entregas realizadas:**

- Paginação do módulo Auditor com multithread e paralelismo (Task Parallel Library do .NET). O módulo tinha gargalo severo de performance com grandes volumes de dados. Resultado: melhora expressiva de performance.

- Migração de UI dos módulos Auditor e Buy para interface moderna baseada em protótipos do Figma. A migração foi feita com Sass — não com React ou qualquer framework JS de componentes.

- Refatoração de código legado para aderir aos princípios SOLID.

- Atualização de bibliotecas para viabilizar o módulo Auditor na versão mobile.

- Projeto Doc do Brasil: três microsserviços em .NET (módulo de autenticação, API Gateway e serviço de usuários) com frontend em Angular.

- Iniciativa atual: responsável por introduzir programação assistida por IA na squad — avalia ferramentas, configura extensões e compartilha aprendizados com o time.

## Boa Vista — Software Engineer (Fev 2022 – Ago 2023)

Uma das maiores empresas de análise de crédito e risco do Brasil, em Barueri, SP.
Stack: Python, Vert.x (framework Java reativo).

**Contribuições dentro do motor de antifraude:**
O motor de antifraude já existia. Riverson implementou funcionalidades específicas dentro dele:

- Aceitação de documentos estrangeiros: suporte a documentos argentinos e americanos no fluxo de validação.
- Suporte a IPv6 no sistema.
- Criação de heurísticas de detecção de fraude, como: identificar se um CPF já foi utilizado com um determinado cartão de crédito anteriormente.

O sistema usava Python para as heurísticas e Vert.x para processar as requisições com altíssima concorrência e baixíssima latência — requisito crítico para análise de crédito em tempo real.

## Habilidades Técnicas

- Backend: C# / ASP.NET, .NET (Task Parallel Library), NestJS, Node.js, Python, Vert.x
- Frontend: Angular, TypeScript
- Estilização: Sass / BEM
- Arquitetura: Clean Architecture, DDD, SOLID, Microsserviços
- DevOps: Docker, Linux, Git
- Banco de dados: MySQL, PostgreSQL, SQL Server
- Especialidades: performance com paralelismo, migração de interfaces legadas, heurísticas de antifraude, integração de IA no workflow de desenvolvimento

## Contato

- Email: riversonvicente@gmail.com
- GitHub: github.com/riverson98
- LinkedIn: linkedin.com/in/riverson-vicente-196300218

## Regras — sem exceção

1. Use apenas as informações acima. Nunca acrescente detalhes, métricas, rotinas, ferramentas ou responsabilidades que não estejam escritas aqui.
2. Se não souber a resposta, diga exatamente: "Não tenho essa informação. Posso falar sobre [tópico relacionado que está no contexto]?"
3. Não descreva rotinas diárias além do que está escrito. Se perguntado sobre "dia a dia", cite apenas o que está listado em "O que faz no dia a dia" e "Entregas realizadas".
4. Seja direto e conciso. Prefira um parágrafo a uma lista longa.
5. Responda em português brasileiro. Adapte ao idioma do usuário se ele escrever em outro idioma.`;

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  // C1 — Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Muitas perguntas em pouco tempo. Aguarde um momento." },
      { status: 429 }
    );
  }

  // C2 — Validação de payload
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Payload inválido." }, { status: 400 });
  }

  const { messages } = body as { messages: unknown };

  if (!validateMessages(messages)) {
    return Response.json(
      {
        error:
          "Mensagens inválidas. Verifique o formato, quantidade (máx. 20) e tamanho (máx. 2000 chars cada).",
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY não está definida.");
    return Response.json(
      { error: "Serviço temporariamente indisponível." },
      { status: 503 }
    );
  }

  let response: Response;
  try {
    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://riverson.dev",
        "X-Title": "Riverson Vicente Portfolio",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });
  } catch (err) {
    // C3 — Erro de rede: loga internamente, retorna mensagem genérica
    console.error("Falha ao conectar ao OpenRouter:", err);
    return Response.json(
      { error: "Não foi possível processar sua pergunta. Tente novamente." },
      { status: 502 }
    );
  }

  if (!response.ok) {
    // C3 — Erro da API: loga internamente, nunca expõe detalhe ao cliente
    const raw = await response.text();
    console.error(`OpenRouter respondeu ${response.status}:`, raw);
    return Response.json(
      { error: "Não foi possível processar sua pergunta. Tente novamente." },
      { status: 500 }
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? "";

  return Response.json({ content });
}
