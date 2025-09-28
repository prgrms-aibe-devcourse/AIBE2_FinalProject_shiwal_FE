// import { useState, useRef, useEffect } from "react";
// // import { aiSmoke } from "@/lib/api"; // ← BE1(/api/ai/smoke) 경유 호출
// import "../../index.css";
//
// interface Message {
//   sender: "user" | "ai";
//   text: string;
// }
//
// const SESSION_ID = "fe-s1";
// const USER_ID = 1;
//
// function AIchat() {
//   const [messages, setMessages] = useState<Message[]>([
//     { sender: "ai", text: "안녕하세요! 편하게 이야기 시작해볼까요? 😊" },
//   ]);
//   const [input, setInput] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//
//   const chatMessagesRef = useRef<HTMLDivElement>(null);
//
//   // 새 메시지 생길 때 스크롤 맨 아래로
//   useEffect(() => {
//     if (chatMessagesRef.current) {
//       chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
//     }
//   }, [messages, loading]);
//
//   const sendToAI = async (userMessage: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // BE1 → BE2 호출, { reply } 반환
//       const res = await aiSmoke(userMessage, SESSION_ID, USER_ID);
//       const reply = res?.reply ?? "(응답이 비어 있어요)";
//       setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
//     } catch (e: unknown) {
//       const msg = e instanceof Error ? e.message : String(e);
//       setError(msg);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "ai", text: "죄송해요, 잠시 오류가 있었어요. 다시 시도해 주세요." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmed = input.trim();
//     if (!trimmed || loading) return;
//
//     // 내 메시지 먼저 렌더
//     setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
//     setInput("");
//
//     // AI 호출
//     await sendToAI(trimmed);
//   };
//
//   return (
//     <div className="main-box-col">
//       <div className="chat-container">
//         <aside className="sidebar">
//           <div className="sidebar-title">채팅</div>
//           <button>현재 대화</button>
//           <button>이전 대화 주제 1</button>
//           <button>이전 대화 주제 2</button>
//           <button>이전 대화 주제 3</button>
//         </aside>
//
//         <section className="chat">
//           <div className="chat-messages" ref={chatMessagesRef}>
//             {messages.map((m, idx) => (
//               <div
//                 key={idx}
//                 className={`message ${m.sender === "user" ? "right" : "left"}`}
//               >
//                 {m.text}
//               </div>
//             ))}
//
//             {loading && (
//               <div className="message left" style={{ opacity: 0.8 }}>
//                 답변 생성 중…
//               </div>
//             )}
//
//             {error && (
//               <div style={{ color: "crimson", fontSize: 13, margin: "6px 8px" }}>
//                 Error: {error}
//               </div>
//             )}
//           </div>
//
//           <form className="chat-input" onSubmit={handleSendMessage}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="메시지를 입력하세요..."
//               autoComplete="off"
//               disabled={loading}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   void handleSendMessage(e);
//                 }
//               }}
//             />
//             <button type="submit" disabled={loading || !input.trim()}>
//               전송
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// }
//
// export default AIchat;
import { useState, useRef, useEffect } from "react";

// import { aiSmoke } from "@/lib/api"; // BE1(/api/ai/smoke) 경유 호출

import "../../index.css";
import { postChatSmart } from "./api";

interface Message {
  sender: "user" | "ai";
  text: string;
}

interface ChatHistory {
  date: string;
  messages: Message[];
}

const SESSION_ID = "fe-s1";
const USER_ID = 1;


export default function AIchat() {

function getTodayDateStr(): string {
  return new Date().toISOString().split("T")[0]; // "2025-09-27" 형식
}

function AIchat() {

  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "안녕하세요! 편하게 이야기 시작해볼까요? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [target, setTarget] = useState<string>("");

  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      date: "2025-09-24",
      messages: [
        { sender: "user", text: "안녕 챗봇" },
        { sender: "ai", text: "안녕하세요! 무엇을 도와드릴까요?" },
      ],
    },
    {
      date: "2025-09-25",
      messages: [
        { sender: "user", text: "오늘 날씨 어때?" },
        { sender: "ai", text: "오늘은 맑고 화창한 날씨입니다! ☀️" },
      ],
    },
    {
      date: "2025-09-26",
      messages: [
        { sender: "user", text: "재밌는 농담 하나 해줘" },
        { sender: "ai", text: "왜 컴퓨터는 바다를 싫어할까요? 파일이 물에 빠질까봐요! 😂" },
      ],
    },
  ]);
  const today = getTodayDateStr();
  const [activeDate, setActiveDate] = useState<string>(today); // 기본은 오늘 날짜


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

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");


    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");


    await sendToAI(trimmed);
  };

  const handleLoadChatHistory = (date: string) => {
    const selected = chatHistories.find((c) => c.date === date);
    if (selected) {
      setMessages(selected.messages);
      setActiveDate(date);
    }
  };

  const handleLoadTodayChat = () => {
    setMessages([
      { sender: "ai", text: "안녕하세요! 편하게 이야기 시작해볼까요? 😊" },
    ]);
    setActiveDate(today);
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

      <div className="main-box-col">
        <div className="chat-container">
          <aside className="sidebar">
            <div className="sidebar-title">채팅</div>


            <button
                onClick={handleLoadTodayChat}
                className={`sidebar-button ${activeDate === today ? "sidebar-active" : ""}`}
            >
              {today}
            </button>

            {chatHistories.map((history) => (
                <button
                    key={history.date}
                    onClick={() => handleLoadChatHistory(history.date)}
                    className={`sidebar-button ${activeDate === history.date ? "sidebar-active" : ""}`}
                >
                  {history.date}
                </button>
            ))}
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

}

export default AIchat;

