import { useState, useRef, useEffect } from "react";
import "../../index.css";
import { postChatSmart } from "./api";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const SESSION_ID = "fe-s1";
const USER_ID = 1;

export default function AIchat() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "안녕하세요! 편하게 이야기 시작해볼까요? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [target, setTarget] = useState<string>("");

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendToAI = async (userMessage: string) => {
    setLoading(true);
    setError(null);
    try {
      const { res, usedBase, usedPath } = await postChatSmart({
        session_id: SESSION_ID,
        message: userMessage,
        user_id: USER_ID,
      });
      setTarget(`${usedBase}${usedPath}`);
      setMessages((prev) => [...prev, { sender: "ai", text: res.reply }]);
    } catch (e) {
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
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");
    await sendToAI(trimmed);
  };

  return (
    <div className="main-box-col">
      <div className="chat-container">
        <aside className="sidebar">
          <div className="sidebar-title">채팅</div>
          <button>현재 대화</button>
          {target && (
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 8 }}>
              target: {target}
            </div>
          )}
        </aside>

        <section className="chat">
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`message ${m.sender === "user" ? "right" : "left"}`}>
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