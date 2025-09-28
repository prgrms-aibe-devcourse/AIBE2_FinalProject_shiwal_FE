import { useState } from "react";
import "./testpage.css";

type Question = {
    id: number;
    content: string;
    options: string[];
};

const sampleMBTIQuestions: Question[] = [
    {
        id: 1,
        content: "혼자 있는 시간이 더 편하다고 느낀다.",
        options: ["매우 그렇다", "어느 정도 그렇다", "별로 그렇지 않다", "전혀 아니다"]
    },
    {
        id: 2,
        content: "계획 세우는 것보다 즉흥적인 걸 더 좋아한다.",
        options: ["매우 그렇다", "어느 정도 그렇다", "별로 그렇지 않다", "전혀 아니다"]
    },
    // ➕ 이후 백엔드 연동 시 API에서 받아오도록
];

export default function MBTITestPage() {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    const handleOptionChange = (questionId: number, selected: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: selected
        }));
    };

    const handleSubmit = () => {
        console.log("MBTI 제출한 답변: ", answers);

        // 🔄 MBTI 결과 API 연동 위치
        // axios.post('/api/selftest/mbti', answers).then(...)

        alert("MBTI 검사 제출 완료!");
    };

    return (
        <div className="test-selftest-container">
            <h2 className="test-title">MBTI 심리 검사</h2>

            {sampleMBTIQuestions.map((q) => (
                <div key={q.id} className="test-question-block">
                    <p className="test-question-content">{q.content}</p>
                    <div className="test-options">
                        {q.options.map((opt) => (
                            <label key={opt} className="test-option-label">
                                <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    value={opt}
                                    checked={answers[q.id] === opt}
                                    onChange={() => handleOptionChange(q.id, opt)}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button className="test-submit-button" onClick={handleSubmit}>
                결과 보기
            </button>
        </div>
    );
}