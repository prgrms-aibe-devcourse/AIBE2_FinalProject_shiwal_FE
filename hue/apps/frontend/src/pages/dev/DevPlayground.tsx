import { useState } from "react";

/** Vite env 타입 힌트 */
const API_BASE = (import.meta.env.VITE_API_BASE as string) ?? "http://localhost:8080";
const AI_BASE  = (import.meta.env.VITE_AI_BASE as string) ?? "http://localhost:8001";

/** fetch JSON 래퍼 (제네릭 응답 타입) */
async function jsonFetch<T = unknown>(
  url: string,
  init?: RequestInit & { json?: unknown }
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json; charset=utf-8" };
  if (init?.headers) {
    Object.entries(init.headers as Record<string, string>).forEach(([k, v]) => (headers[k] = v));
  }
  const body = init?.json !== undefined ? JSON.stringify(init.json) : init?.body;

  const res  = await fetch(url, { ...init, headers, body });
  const text = await res.text();

  try {
    const data = text ? (JSON.parse(text) as T) : (null as T);
    if (!res.ok) {
      const msg =
        (data as unknown as { message?: string })?.message ??
        (data as unknown as { error?: string })?.error ??
        `HTTP ${res.status}`;
      throw new Error(msg);
    }
    return data;
  } catch {
    if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
    return text as unknown as T; // 2xx이면서 JSON이 아니면 원문 반환
  }
}

/** 응답 타입(필요 시 실제 스키마로 바꿔도 됨) */
interface SmokeChatRes {
  ok?: boolean;
  reply?: string;
}
interface AnalyzeRes {
  ok?: boolean;
  summary?: string;
  score?: number;
  crisis?: boolean;
}
interface HealthRes {
  status?: string;
  ok?: boolean;
}

export default function DevPlayground() {
  const [chatMsg, setChatMsg] = useState("오늘 할 일을 시작하기가 막막해요.");
  const [anText,  setAnText]  = useState("죽   고   싶   어   요");
  const [out,     setOut]     = useState<unknown>(null);       // ← unknown으로 보관
  const [err,     setErr]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // FE → BE1(Spring) → (내부) BE2 연동 확인
  const runChatSmoke = async () => {
    setErr(null); setLoading(true); setOut(null);
    try {
      const data = await jsonFetch<SmokeChatRes>(`${API_BASE}/api/ai/smoke`, {
        method: "POST",
        json: { message: chatMsg, sessionId: "fe-s1", userId: 1 },
      });
      setOut(data);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  // FE → BE1(Spring) → (내부) BE2 분석 확인
  const runAnalyzeSmoke = async () => {
    setErr(null); setLoading(true); setOut(null);
    try {
      const data = await jsonFetch<AnalyzeRes>(`${API_BASE}/api/ai/analyze-smoke`, {
        method: "POST",
        json: { text: anText, sessionId: "fe-s2", userId: 1 },
      });
      setOut(data);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  // FE → BE2(FastAPI) 직접 헬스체크
  const pingBE2 = async () => {
    setErr(null); setLoading(true); setOut(null);
    try {
      const res = await jsonFetch<HealthRes>(`${AI_BASE}/health`, { method: "GET" });
      setOut(res);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 780, margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ marginBottom: 8 }}>
        Dev Playground <small style={{ opacity: 0.7 }}>(/dev/ai)</small>
      </h2>

      <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 16 }}>
        API_BASE: <code>{API_BASE}</code> · AI_BASE: <code>{AI_BASE}</code>
      </div>

      <section style={{ marginTop: 12 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          대화 스모크 (POST {API_BASE}/api/ai/smoke)
        </label>
        <textarea
          value={chatMsg}
          onChange={(e) => setChatMsg(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 8 }}
        />
        <button onClick={runChatSmoke} disabled={loading} style={{ marginTop: 8 }}>
          {loading ? "요청 중..." : "대화 스모크 실행"}
        </button>
      </section>

      <section style={{ marginTop: 24 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          분석 스모크 (POST {API_BASE}/api/ai/analyze-smoke)
        </label>
        <textarea
          value={anText}
          onChange={(e) => setAnText(e.target.value)}
          rows={2}
          style={{ width: "100%", padding: 8 }}
        />
        <button onClick={runAnalyzeSmoke} disabled={loading} style={{ marginTop: 8 }}>
          {loading ? "요청 중..." : "분석 스모크 실행"}
        </button>
      </section>

      <section style={{ marginTop: 24 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          BE2 FastAPI 헬스체크 (GET {AI_BASE}/health)
        </label>
        <button onClick={pingBE2} disabled={loading} style={{ marginTop: 8 }}>
          {loading ? "요청 중..." : "헬스체크 실행"}
        </button>
      </section>

      {err && <pre style={{ color: "crimson", marginTop: 16 }}>Error: {err}</pre>}

      {out !== null && (
        <pre
          style={{
            marginTop: 16,
            background: "#0b1020",
            color: "#b7ffb7",
            padding: 12,
            overflow: "auto",
          }}
        >
{JSON.stringify(out, null, 2)}
        </pre>
      )}
    </div>
  );
}