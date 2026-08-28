import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { getJwtSecret } from "@/lib/auth-server";
import { rateLimitMiddleware } from "@/lib/rate-limit";

/**
 * API route that proxies chat requests to the local llama.cpp server.
 *
 * Architecture:
 *   Browser ──► Next.js (/api/chat) ──► llama.cpp (localhost:8080)
 *                                          │
 *                                     Qwen2.5-3B-Q4
 *
 * The llama.cpp server should be running on the VPS as a systemd service.
 * During local development, this route returns a 503 and the frontend
 * falls back to the scripted chatbot responses.
 *
 * llama.cpp server command (VPS):
 *   /usr/local/bin/llama-server \
 *     -m /var/models/qwen2.5-3b-q4_k_m.gguf \
 *     -c 4096 \
 *     --port 8080 \
 *     --ctx-size 4096 \
 *     --n-gpu-layers 0 \
 *     --chat-template chatml \
 *     --embedding
 */

const LLAMA_SERVER_URL = process.env.LLAMA_SERVER_URL || "http://127.0.0.1:8080";
const LLAMA_SERVER_TIMEOUT = 30000; // 30 seconds max for a response (model is slow on 2-core CPU)

interface ChatRequest {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
  context?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate — require valid JWT Bearer token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    try {
      jwt.verify(authHeader.split(" ")[1], getJwtSecret());
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Rate limit: 20 requests per minute per IP
    const rateLimitResponse = rateLimitMiddleware(request, { maxRequests: 20, windowMs: 60000 })
    if (rateLimitResponse) return rateLimitResponse

    const body: ChatRequest = await request.json();

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build the system prompt for the tutoring context
    const systemPrompt = `You are the AI assistant for Lumaani, a multi-tenant practice platform with AI-powered question generation, mock exams, and progress analytics.

You help students, teachers, and parents with questions about:
- SAT, English, and Math practice
- Skills practice and mastery tracking
- Mock exams and test simulations
- Progress analytics and reporting
- Multi-tenant administration
- AI Question Factory

Key facts about Lumaani:
- Multi-tenant platform supporting schools and institutions
- Gold-certified question banks with versioned content
- Two-attempt instructional methodology
- Cross-device practice continuity
- AI-powered question generation (async)

Be friendly, professional, and helpful. Keep responses concise (2-4 sentences).
If you don't know something, say so honestly and offer to connect the user with a human.`;

    // Build the message array for llama.cpp chat completions endpoint
    const messages = [
      { role: "system", content: systemPrompt },
      ...(body.history || []),
      { role: "user", content: body.message },
    ];

    // Set up AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), LLAMA_SERVER_TIMEOUT);

    try {
      const response = await fetch(`${LLAMA_SERVER_URL}/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          temperature: 0.7,
          max_tokens: 512,
          stream: false,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`llama.cpp returned ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "";

      return NextResponse.json({
        reply,
        model: "llama.cpp-3b",
        source: "local",
      });
    } catch {
      clearTimeout(timeoutId);
      // llama.cpp is not running — return a signal that tells the frontend
      // to use its scripted fallback responses
      return NextResponse.json(
        {
          error: "AI server not available",
          fallback: true,
          message: "The AI assistant is currently offline. Using local responses.",
        },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}