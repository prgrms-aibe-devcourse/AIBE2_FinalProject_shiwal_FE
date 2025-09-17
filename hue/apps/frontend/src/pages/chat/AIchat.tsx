import { useState, useRef, useEffect } from "react";
import "../../index.css";

// 메시지 객체 타입을 정의
interface Message {
    sender: "user" | "ai";
    text: string;
}

function AIchat() {
    // 채팅 메시지 목록을 저장
    const [messages, setMessages] = useState<Message[]>([]);
    // 사용자가 입력창에 입력한 내용을 저장
    const [input, setInput] = useState<string>("");

    // useRef: 스크롤을 맨 아래로 내리기 위해 채팅 메시지 영역 DOM에 접근
    const chatMessagesRef = useRef<HTMLDivElement>(null);
    // useEffect: 메시지 목록이 업데이트될 때마다 스크롤을 맨 아래로 내리는 역할
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    // 가짜 AI 응답을 시뮬레이션하는 함수
    // 백엔드 서버가 준비되면 getMockAIResponse 함수 대신 실제 웹소켓 로직을 추가
    const getMockAIResponse = (userMessage: string) => {
        // 1초 뒤에 응답이 오는 것처럼 가정 (로딩 상태 시뮬레이션)
        setTimeout(() => {
            let aiResponse: string;

            if (userMessage.includes("안녕")) {
                aiResponse = "안녕하세요! 무엇을 도와드릴까요?";
            } else if (userMessage.includes("날씨")) {
                aiResponse = "오늘 날씨는 맑습니다.";
            } else if (userMessage.includes("이름")) {
                aiResponse = "저는 Google에서 만든 AI 비서입니다.";
            } else {
                aiResponse = "죄송합니다. 아직 학습하지 않은 내용입니다.";
            }

            // 기존 메시지 목록에 AI 응답을 추가
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "ai", text: aiResponse },
            ]);
        }, 1000);
    };

    // 폼 제출(메시지 전송) 핸들러
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

        const trimmedInput = input.trim();
        if (!trimmedInput) return; // 빈 메시지

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: trimmedInput },
        ]);

        getMockAIResponse(trimmedInput);
        setInput("");
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
                    {/* 메시지가 들어가는 부분 */}
                    <div className="chat-messages" ref={chatMessagesRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    message.sender === "user" ? "right" : "left"
                                }`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>

                    {/* 입력창과 전송 버튼 */}
                    <form className="chat-input" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="메시지를 입력하세요..."
                            autoComplete="off"
                        />
                        <button type="submit">전송</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default AIchat;