import { useState, useRef, useEffect } from "react";
import { aiSmoke } from "@/lib/api"; // ← BE1(/api/ai/smoke) 경유 호출
import "../../index.css";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const SESSION_ID = "fe-s1";
const USER_ID = 1;

function AIchat() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "안녕하세요! 편하게 이야기 시작해볼까요? 😊" },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // 새 메시지 생길 때 스크롤 맨 아래로
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendToAI = async (userMessage: string) => {
    setLoading(true);
    setError(null);
    try {
      // BE1 → BE2 호출, { reply } 반환
      const res = await aiSmoke(userMessage, SESSION_ID, USER_ID);
      const reply = res?.reply ?? "(응답이 비어 있어요)";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "죄송해요, 잠시 오류가 있었어요. 다시 시도해 주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // 내 메시지 먼저 렌더
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");

    // AI 호출
    await sendToAI(trimmed);
  };

  return (
    <div className="main-box-col">
      <div className="chat-container">
        <aside className="sidebar">
          <div className="sidebar-title">채팅</div>
          <button>현재 대화</button>
          <button>이전 대화 주제 1</button>
          <button>이전 대화 주제 2</button>
          <button>이전 대화 주제 3</button>
        </aside>

        <section className="chat">
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`message ${m.sender === "user" ? "right" : "left"}`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="message left" style={{ opacity: 0.8 }}>
                답변 생성 중…
              </div>
            )}

            {error && (
              <div style={{ color: "crimson", fontSize: 13, margin: "6px 8px" }}>
                Error: {error}
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
              autoComplete="off"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSendMessage(e);
                }
              }}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              전송
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AIchat;