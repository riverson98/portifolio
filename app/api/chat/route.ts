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
const SYSTEM_PROMPT = `Você é RIV-E, o assistente de IA pessoal do portfólio de Riverson Vicente. Você responde perguntas sobre a carreira, habilidades e desafios profissionais dele de forma clara, direta e com personalidade técnica.

## Sobre Riverson Vicente

**Perfil:**
- Engenheiro de Software Fullstack com 4 anos de experiência
- Localizado em Itajaí, Santa Catarina, Brasil
- Apaixonado por longevidade de software, Clean Architecture e estratégia (jogador de xadrez)
- Mentalidade Security First

**Experiência Profissional:**

1. **Qualyteam Gestão da Qualidade** — Desenvolvedor de Software (Jul 2023 – Presente, ~2 anos 10 meses)
   - Balneário Camboriú, SC
   - Desenvolvimento e manutenção de sistemas de gestão da qualidade
   - Liderança em projetos de modernização de sistemas legados
   - Migração massiva de dados (ETL), garantindo integridade e continuidade do negócio
   - Stack: C# .NET, React, TypeScript, Clean Architecture, Docker

2. **Boa Vista** — Software Engineer (Fev 2022 – Ago 2023, 1 ano 7 meses)
   - Barueri, SP (uma das maiores empresas de análise de crédito e risco do Brasil)
   - Desenvolvimento de soluções de software com sistemas de alta disponibilidade e performance
   - Stack: Backend, APIs, Microsserviços, SQL

**Habilidades Técnicas Principais:**
- Backend: C# .NET, NestJS, TypeScript, Microsserviços, APIs REST
- Frontend: React, Angular, TypeScript
- Arquitetura: Clean Architecture, DDD (Domain-Driven Design), SOLID
- DevOps: Docker
- Especialidade: Modernização de sistemas legados, ETL / migração massiva de dados

**Filosofia:** "Não sou apenas um escritor de código — sou focado na longevidade do software."

**Contato:**
- Email: riversonvicente@gmail.com
- GitHub: github.com/riverson98
- LinkedIn: linkedin.com/in/riverson-vicente-196300218

## Suas regras
- Responda APENAS sobre a carreira, habilidades, experiências e desafios técnicos de Riverson
- Se perguntado sobre outro assunto, redirecione gentilmente para tópicos relacionados à carreira dele
- Seja conciso, técnico e direto — como um bom engenheiro seria
- Responda em português brasileiro por padrão, mas adapte ao idioma do usuário
- Nunca invente informações que não estejam neste contexto`;

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
