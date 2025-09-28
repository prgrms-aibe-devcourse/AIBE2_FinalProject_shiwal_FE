// FE → AI/BE 채팅 호출 (AI_BASE 우선, 실패/스텁이면 API_BASE로 폴백)

export interface ChatReq {
  session_id: string;
  message: string;
  user_id: number;
}
export interface ChatRes {
  reply: string;
  safetyFlags?: string[];
}

const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8080";

const AI_BASE =
  (import.meta.env.VITE_AI_BASE as string | undefined)?.replace(/\/$/, "") || "";

const AI_KEY = (import.meta.env.VITE_AI_KEY as string | undefined) || "";

// 고정 스텁 탐지
function looksLikeStub(reply: string): boolean {
  return /^지금 숨 한 번 고르고/.test(reply);
}

async function callOnce(base: string, req: ChatReq): Promise<{ data: ChatRes; base: string }> {
  // 8001(AI)일 때만 x-api-key 헤더 추가
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (base === AI_BASE && AI_KEY) headers["x-api-key"] = AI_KEY;

  const resp = await fetch(`${base}/v1/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify(req),
  });

  const text = await resp.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* no-op */
  }

  if (!resp.ok) {
    throw new Error(`POST ${base}/v1/chat -> ${resp.status} ${text || "(no body)"}`);
  }
  if (!data || typeof (data as { reply?: unknown }).reply !== "string") {
    throw new Error(`Invalid response from ${base}: ${text || "(no body)"}`);
  }
  return { data: data as ChatRes, base };
}

/** AI_BASE → API_BASE 순서로 시도. 스텁이면 다음 타겟 재시도. */
export async function postChatSmart(req: ChatReq): Promise<{ res: ChatRes; usedBase: string }> {
  const candidates: string[] = [];
  if (AI_BASE) candidates.push(AI_BASE);
  candidates.push(API_BASE);

  let last: { res: ChatRes; usedBase: string } | null = null;
  const errors: string[] = [];

  for (const b of candidates) {
    try {
      const { data, base } = await callOnce(b, req);
      last = { res: data, usedBase: base };
      if (!looksLikeStub(data.reply)) return last; // AI 정상응답이면 즉시 반환
      // 스텁이면 다음 후보 계속
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e));
    }
  }

  if (last) return last; // 마지막이라도 성공한 게 있으면 그걸 반환
  throw new Error(`All chat targets failed: ${errors.join(" | ")}`);
}