import React, { useState, useEffect } from "react";
// form.css는 기존에 제공받았으므로 별도의 스타일 정의는 생략합니다.

// 백엔드에서 받아올 데이터의 타입을 정의함
interface ChartData {
    기분: number[];
    에너지: number[];
    스트레스: number[];
    수면: number[];
}

interface EmotionRank {
    name: string;
    rank: number;
}

// 1. 캘린더 데이터 타입 정의:
interface CalendarData {
    checkedDates: number[]; // 체크인한 '일'만 포함 (1~31)
}

// 2. Props 정의: 날짜 클릭 이벤트 핸들러 추가
interface StatsProps {
    onDateClick: (date: string) => void;
}


const Stats = ({ onDateClick }: StatsProps) => {
    // 3. 기존 상태 유지
    const [selectedTab, setSelectedTab] = useState<"기분" | "에너지" | "스트레스" | "수면">("기분");
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [emotionRank, setEmotionRank] = useState<EmotionRank[] | null>(null);
    const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
    const [loading, setLoading] = useState(true);

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(2025); // 9월 정렬 확인을 위해 2025년으로 고정
    const [currentMonth, setCurrentMonth] = useState(9); // 9월로 고정 (컴포넌트 테스트용)

    // 4. 더미 데이터 정의
    const dummyChartData: ChartData = {
        기분: [80, 75, 60, 45, 30, 50, 65, 40],
        에너지: [70, 65, 55, 40, 35, 45, 55, 30],
        스트레스: [30, 40, 50, 60, 70, 60, 50, 65],
        수면: [60, 55, 70, 80, 90, 85, 70, 60],
    };

    const dummyEmotionRank: EmotionRank[] = [
        { name: "상쾌한", rank: 1 },
        { name: "기대되는", rank: 2 },
        { name: "그저그런", rank: 3 },
        { name: "귀찮은", rank: 4 },
    ];

    // 백엔드에서 받아올 더미 캘린더 데이터 (2025년 9월 데이터)
    const dummyCalendarData: CalendarData = {
        checkedDates: [2, 5, 8, 12, 15, 20, 23, 26, 29], // 체크인 기록이 있는 날짜
    };

    // 5. useEffect 로직 유지
    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // 실제 백엔드 연동 시 아래 주석 해제
            // try { ... } catch (error) { ... }

            setChartData(dummyChartData);
            setEmotionRank(dummyEmotionRank);
            setCalendarData(dummyCalendarData);
            setLoading(false);
        };

        fetchData();
    }, [currentYear, currentMonth]);

    if (loading) {
        return <div className="checkin-page loading-state">데이터를 불러오는 중입니다...</div>;
    }

    if (!chartData || !emotionRank || !calendarData) {
        return <div className="checkin-page error-state">데이터를 불러오지 못했습니다.</div>;
    }

    // 6. 캘린더 관련 계산 함수 유지
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const chartWidth = 520;
    const chartHeight = 300;
    const paddingLeft = 30;
    const paddingRight = 20;

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    };

    const totalDays = getDaysInMonth(currentYear, currentMonth);
    // 해당 월의 첫 날이 무슨 요일인지 계산 (0=일요일, 1=월요일...)
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();

    const getPath = (data: number[]) => {
        const stepX = (chartWidth - paddingLeft - paddingRight) / (data.length - 1);
        return data.map((value, idx) => {
            const x = paddingLeft + idx * stepX;
            const y = (100 - value) * (chartHeight / 100);
            return `${x},${y}`;
        }).join(" ");
    };

    // 7. 날짜 변경 핸들러 (추후 구현 시 사용)
    const handleMonthChange = (direction: number) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;

        if (newMonth < 1) {
            newMonth = 12;
            newYear--;
        } else if (newMonth > 12) {
            newMonth = 1;
            newYear++;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };


    return (
        <div className="checkin-page">
            <div className="main-box-cal">
                <div className="title">일일 체크인 현황</div>

                <div className="goals-grid">
                    {/* 캘린더 카드 */}
                    <div className="calendar-wrapper">
                        <div className="calendar-card">
                            <div className="goal-settings-header">
                                <div className="header-title">{`${currentYear}년 ${currentMonth}월`}</div>
                            </div>

                            {/* 요일 표시 */}
                            <div className="calendar-weekdays">
                                {weekDays.map((day) => (
                                    <div key={day} className="calendar-weekday">{day}</div>
                                ))}
                            </div>

                            <div className="calendar-grid">
                                {/* 날짜 시작 전 빈 칸 채우기 */}
                                {Array.from({ length: firstDayOfWeek }, (_, i) => (
                                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                                ))}

                                {/* 동적으로 날짜 렌더링 */}
                                {Array.from({ length: totalDays }, (_, i) => {
                                    const day = i + 1;
                                    const isCheckedIn = calendarData.checkedDates.includes(day);

                                    // 8. 날짜 클릭 핸들러 추가
                                    const handleDayClick = () => {
                                        if (isCheckedIn) {
                                            // YYYY-MM-DD 형식으로 날짜를 포맷하여 상위 컴포넌트로 전달
                                            const formattedDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                            onDateClick(formattedDate);
                                        } else {
                                            console.log(`${currentMonth}월 ${day}일은 체크인 기록이 없습니다.`);
                                        }
                                    };

                                    return (
                                        <div
                                            key={day}
                                            className={`calendar-day ${isCheckedIn ? "checked clickable" : "unclickable"}`}
                                            onClick={handleDayClick}
                                        >
                                            {day}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="calendar-footer">총 {calendarData.checkedDates.length}일</div>
                        </div>
                    </div>

                    {/* 감정 랭킹 + 그래프 (기존 로직 유지) */}
                    <div className="stats-right">
                        {/* 감정 랭킹 */}
                        <div className="emotion-rank-box">
                            <div className="header-title">감정 랭킹</div>
                            <div className="emotion-list emotion-rank-list">
                                {emotionRank.map((emotion, i) => (
                                    <div key={i} className="emotion-rank-block">
                                        <div className="emotion-rank-button">{emotion.name}</div>
                                        <div className="emotion-rank-number-below">{emotion.rank}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 그래프 */}
                        <div className="graph-stat-box">
                            <div className="goal-settings-header">
                                <div className="header-title">그래프</div>
                                <div className="graph-tabs">
                                    {["기분", "에너지", "스트레스", "수면"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setSelectedTab(tab as any)}
                                            className={`graph-tab-btn ${
                                                selectedTab === tab ? "active" : ""
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="graph-container">
                                <div className="graph-y-axis">
                                    <span>100</span>
                                    <span>50</span>
                                    <span>0</span>
                                </div>
                                <svg
                                    className="chart-container"
                                    width={chartWidth}
                                    height={chartHeight}
                                >
                                    <polyline
                                        className="chart-line"
                                        points={getPath(chartData[selectedTab])}
                                    />
                                    {chartData[selectedTab].map((value, idx) => {
                                        const stepX = (chartWidth - paddingLeft - paddingRight) / (chartData[selectedTab].length - 1);
                                        const x = paddingLeft + idx * stepX;
                                        const y = (100 - value) * (chartHeight / 100);
                                        return (
                                            <circle
                                                className="chart-point"
                                                key={idx}
                                                cx={x}
                                                cy={y}
                                            />
                                        );
                                    })}
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
