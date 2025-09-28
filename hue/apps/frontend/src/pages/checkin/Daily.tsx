import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams와 useNavigate 추가
import "./form.css";

// 백엔드에서 받아올 데이터 타입 정의
interface CheckinData {
    mood: number;
    energy: number;
    stress: number;
    sleep: number;
    note: string;
    selectedEmotions: string[];
}

// 더미 데이터 함수 (특정 날짜의 데이터를 시뮬레이션)
const fetchCheckinData = async (date: string): Promise<CheckinData | null> => {
    // 실제 API 호출: fetch(`/api/checkin/${date}`)

    // 네트워크 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500));

    // 더미 데이터 반환 (날짜에 관계없이 같은 데이터를 반환하여 조회 기능 시뮬레이션)
    // 2024년 8월 28일 데이터를 예시로 사용
    return {
        mood: 85,
        energy: 70,
        stress: 30,
        sleep: 60,
        note: `오늘은 날씨가 좋아서 산책을 다녀왔습니다. 기분 최고!`,
        selectedEmotions: ["신나는", "상쾌한"],
    };
};

// 날짜 포맷 함수 (YYYY-MM-DD -> 00월 00일)
const formatDateTitle = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        // Date 객체가 유효하지 않은 경우 (예: "Invalid Date")
        if (isNaN(date.getTime())) {
            return "기록 조회";
        }

        // YYYY-MM-DD 형식의 문자열을 ISO 8601 형식으로 변환하여 Date 객체를 만듭니다.
        // 이는 브라우저 간 일관성을 확보하는 데 도움이 됩니다.
        const [year, month, day] = dateString.split('-').map(Number);
        const validDate = new Date(year, month - 1, day); // month는 0부터 시작

        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
        return `${validDate.toLocaleDateString('ko-KR', options)} 체크인`;
    } catch (e) {
        return "기록 조회";
    }
};


function Daily() {
    // URL 파라미터에서 'date' 값을 추출
    const { date: dateParam } = useParams<{ date: string }>();
    const navigate = useNavigate();

    // 1. 상태 변수 추가: 데이터 로딩 및 저장
    const [checkinData, setCheckinData] = useState<CheckinData | null>(null);
    const [loading, setLoading] = useState(true);

    // dateParam이 존재하지 않거나 유효하지 않은 경우를 대비한 대체 날짜
    const selectedDate = dateParam || new Date().toISOString().substring(0, 10);
    const title = formatDateTitle(selectedDate);


    // 2. 데이터 불러오기
    useEffect(() => {
        setLoading(true);
        if (dateParam) {
            const loadData = async () => {
                const data = await fetchCheckinData(dateParam);
                setCheckinData(data);
                setLoading(false);
            };
            loadData();
        } else {
            // 파라미터 없이 접근한 경우 (예: /daily)
            setLoading(false);
            setCheckinData(null);
        }
    }, [dateParam]);

    // 3. 닫기 핸들러
    const handleClose = () => {
        // '/stats' 페이지로 돌아가기
        navigate('/stats');
    };


    if (loading) {
        return <div className="checkin-page p-8 text-center text-gray-500">기록을 불러오는 중입니다...</div>;
    }

    if (!checkinData) {
        return (
            <div className="checkin-page">
                <div className="checkin-card-daily text-center">
                    <div className="title">{title}</div>
                    <p className="text-lg mt-8 text-gray-600">선택된 날짜({selectedDate})에 기록이 없습니다.</p>
                    <button onClick={handleClose} className="close-btn mt-6">
                        닫기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkin-page">
            <div className="checkin-card-daily read-only-card">
                <div className="title-row">
                    <div className="title">{title}</div>

                </div>

                {/* 기분 & 에너지 */}
                <div className="checkin-grid">
                    <div className="checkin-box mood-box read-only">
                        <label>기분</label>
                        <div className="range-wrapper">
                            {/* 읽기 전용으로 표시 */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={checkinData.mood}
                                disabled // 읽기 전용
                            />
                            <span className="range-value">{checkinData.mood}</span>
                        </div>
                    </div>
                    <div className="checkin-box energy-box read-only">
                        <label>에너지</label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={checkinData.energy}
                                disabled // 읽기 전용
                            />
                            <span className="range-value">{checkinData.energy}</span>
                        </div>
                    </div>
                </div>

                {/* 스트레스 & 수면 */}
                <div className="checkin-grid">
                    <div className="checkin-box stress-box read-only">
                        <label>스트레스</label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={checkinData.stress}
                                disabled // 읽기 전용
                            />
                            <span className="range-value">{checkinData.stress}</span>
                        </div>
                    </div>
                    <div className="checkin-box sleep-box read-only">
                        <label>수면</label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={checkinData.sleep}
                                disabled // 읽기 전용
                            />
                            <span className="range-value">{checkinData.sleep}</span>
                        </div>
                    </div>
                </div>

                {/* 한줄 기록 */}
                <div className="checkin-box note-box read-only">
                    <label>한줄 기록</label>
                    <p className="read-only-text">{checkinData.note}</p>
                </div>

                {/* 감정 선택 */}
                <div className="checkin-box emotion-box read-only">
                    <label>감정</label>
                    <div className="emotion-list">
                        {checkinData.selectedEmotions.map((emotion) => (
                            <span
                                key={emotion}
                                className={`emotion-btn`}
                            >
                                {emotion}
                            </span>
                        ))}
                    </div>
                </div>
                {/* 닫기 버튼 추가 및 navigate('/stats') 연결 */}
                <button onClick={handleClose} className="submit-btn">
                    닫기
                </button>
            </div>
        </div>
    );
}
export default Daily;
