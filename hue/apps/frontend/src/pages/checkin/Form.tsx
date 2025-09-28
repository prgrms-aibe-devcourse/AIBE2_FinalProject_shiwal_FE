import React, { useState } from "react";
import "./form.css";

const emotions = [
    "신나는", "편안한", "기대되는", "행복한", "설레는", "의욕적인", "상쾌한",
    "무기력한", "두려운", "우울한", "귀찮은", "피곤한", "그저그런", "긴장되는"
];

function Form() {
    // 1. 상태 변수 추가: 제출 상태 관리
    const [mood, setMood] = useState(50);
    const [energy, setEnergy] = useState(50);
    const [stress, setStress] = useState(50);
    const [sleep, setSleep] = useState(50);
    const [note, setNote] = useState("");
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태

    const toggleEmotion = (emotion: string) => {
        setSelectedEmotions((prev) =>
            prev.includes(emotion)
                ? prev.filter((e) => e !== emotion)
                : [...prev, emotion]
        );
    };

    // 2. 비동기 handleSubmit 함수
    const handleSubmit = async () => {
        // 제출이 이미 진행 중이면 함수 실행을 막는다
        if (isSubmitting) return;

        setIsSubmitting(true); // 제출 시작

        // 백엔드로 보낼 데이터 객체
        const postData = {
            mood,
            energy,
            stress,
            sleep,
            note,
            selectedEmotions,
        };

        console.log("전송할 데이터:", postData);

        try {
            // 3. 백엔드 API 호출 시뮬레이션
            // 실제 API 호출로 대체해야 함
            // 예: const response = await fetch('https://your-backend-api.com/checkin', { ... });

            // 더미 데이터 전송 시뮬레이션 (1초 지연)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 더미 응답: 200 OK를 가정
            const response = { ok: true, status: 200 };

            if (response.ok) {
                console.log("체크인 성공!");
                alert("체크인이 완료되었습니다!");
                // 성공 시 상태 초기화 (선택 사항)
                setMood(50);
                setEnergy(50);
                setStress(50);
                setSleep(50);
                setNote("");
                setSelectedEmotions([]);
            } else {
                // HTTP 오류 처리
                console.error("체크인 실패:", response.status);
                alert("체크인에 실패했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            // 네트워크 오류 등 예외 처리
            console.error("오류 발생:", error);
            alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false); // 제출 완료 (성공/실패 무관)
        }
    };

    return (
        <div className="checkin-page">
            <div className="checkin-card">
                <div className="title">일일 체크인</div>

                {/* 기분 & 에너지 */}
                <div className="checkin-grid">
                    <div className="checkin-box mood-box">
                        <label>기분</label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={mood}
                                onChange={(e) => setMood(Number(e.target.value))}
                            />
                            <span className="range-value">{mood}</span>
                        </div>
                        <div className="range-labels">
                            <span>나쁨</span>
                            <span>좋음</span>
                        </div>
                    </div>
                    <div className="checkin-box energy-box">
                        <label>에너지</label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={energy}
                                onChange={(e) => setEnergy(Number(e.target.value))}
                            />
                            <span className="range-value">{energy}</span>
                        </div>
                        <div className="range-labels">
                            <span>없음</span>
                            <span>많음</span>
                        </div>
                    </div>
                </div>

                {/* 스트레스 & 수면 */}
                <div className="checkin-grid">
                    <div className="checkin-box stress-box">
                        <label>스트레스</label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={stress}
                                onChange={(e) => setStress(Number(e.target.value))}
                            />
                            <span className="range-value">{stress}</span>
                        </div>
                        <div className="range-labels">
                            <span>없음</span>
                            <span>많음</span>
                        </div>
                    </div>
                    <div className="checkin-box sleep-box">
                        <label>수면</label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sleep}
                                onChange={(e) => setSleep(Number(e.target.value))}
                            />
                            <span className="range-value">{sleep}</span>
                        </div>
                        <div className="range-labels">
                            <span>부족</span>
                            <span>충분</span>
                        </div>
                    </div>
                </div>

                {/* 한줄 기록 */}
                <div className="checkin-box note-box">
                    <label>한줄 기록</label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder=""
                    />
                </div>

                {/* 감정 선택 */}
                <div className="checkin-box emotion-box">
                    <label>감정</label>
                    <div className="emotion-list">
                        {emotions.map((emotion) => (
                            <button
                                key={emotion}
                                type="button"
                                onClick={() => toggleEmotion(emotion)}
                                className={`emotion-btn ${
                                    selectedEmotions.includes(emotion) ? "selected" : ""
                                }`}
                            >
                                {emotion}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 완료 버튼 */}
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={isSubmitting} // 제출 중일 때 버튼 비활성화
                >
                    {isSubmitting ? "전송 중..." : "완료"}
                </button>
            </div>
        </div>
    );
}
export default Form;