import React, { useEffect, useState } from "react";

type Day = "일" | "월" | "화" | "수" | "목" | "금" | "토";
type Task = "접속" | "체크인" | "채팅" | "감정일기";

const days: Day[] = ["일", "월", "화", "수", "목", "금", "토"];
const tasks: Task[] = ["접속", "체크인", "채팅", "감정일기"];

const Goals: React.FC = () => {
    const today = new Date();
    const todayIndex = today.getDay(); // 0=일 ... 6=토
    const todayDay = days[todayIndex];

    // 초기 빈 상태 생성
    const [progress, setProgress] = useState<Record<Task, Record<Day, boolean>>>(
        () => {
            const initial = {} as Record<Task, Record<Day, boolean>>;
            tasks.forEach((t) => {
                initial[t] = {} as Record<Day, boolean>;
                days.forEach((d) => (initial[t][d] = false));
            });
            return initial;
        }
    );

    const [goals, setGoals] = useState<Record<string, boolean>>({
        "수면 루틴 회복하기": false,
        "작은 성취 10개를 기록해보기": false,
    });

    const toggleGoal = (goal: string) => {
        setGoals((prev) => {
            const updated = { ...prev, [goal]: !prev[goal] };
            // TODO: 나중에 백엔드에 저장 (PATCH/PUT)
            console.log("Update goal:", updated);
            return updated;
        });
    };

    const toggleProgress = (task: Task, day: Day) => {
        setProgress((prev) => {
            const updated = { ...prev, [task]: { ...prev[task], [day]: !prev[task][day] } };
            // TODO: 나중에 백엔드에 저장 (PATCH/PUT)
            console.log("Update progress:", task, day, updated[task][day]);
            return updated;
        });
    };

    // 초기 데이터 fetch 자리 (나중에 API 연동)
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetch initial data (dummy) — replace with real API");
            } catch (err) {
                console.error("초기 데이터 불러오기 실패:", err);
            }
        };
        fetchData();
    }, []);

    return (
            <div className="main-box-row">
                <div className="title">목표</div>

                <div className="goals-grid">
                    {/* 왼쪽: 목표 설정 (넓게) */}
                    <div className="left-panel-goal">
                        <div className="goal-settings">
                            <div className="goal-settings-header">
                                <div className="header-title">목표 설정</div>
                                <div className="goal-settings-actions">
                                    <button className="action-btn">추가</button>
                                    <button className="action-btn">편집</button>
                                </div>
                            </div>

                            <div className="goal-list">
                                {Object.keys(goals).map((goal) => (
                                    <label className="goal-item" key={goal}>
                                        <input
                                            type="checkbox"
                                            checked={goals[goal]}
                                            onChange={() => toggleGoal(goal)}
                                        />
                                        <span className="goal-text">{goal}</span>
                                        <span className="bell-icon" role="img" aria-label="bell">
                      🔔
                    </span>
                                    </label>
                                ))}
                                {/* 빈 공간 채우기용 (원래 와이어프레임처럼 큰 박스) */}
                                <div className="goal-spacer" />
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 일일 진행도 (위) + 주간 진행도 (아래) */}
                    <div className="right-panel-goal">
                        <div className="daily-progress blue-card">
                            <div className="header-title">일일 진행도</div>
                            <div className="progress-steps">
                                <div className={`step ${progress["접속"][todayDay] ? "active" : ""}`}>
                                    <div className="step-num">1</div>
                                    <div className="step-label">접속</div>
                                </div>
                                <div className={`step ${progress["체크인"][todayDay] ? "active" : ""}`}>
                                    <div className="step-num">2</div>
                                    <div className="step-label">체크인</div>
                                </div>
                                <div className={`step ${progress["채팅"][todayDay] ? "active" : ""}`}>
                                    <div className="step-num">3</div>
                                    <div className="step-label">채팅</div>
                                </div>
                                <div className={`step ${progress["감정일기"][todayDay] ? "active" : ""}`}>
                                    <div className="step-num">4</div>
                                    <div className="step-label">감정일기</div>
                                </div>
                            </div>
                        </div>

                        <div className="weekly-progress purple-card">
                            <div className="weekly-header">
                                <div className="header-title">주간 진행도</div>
                                <span className="week-range">8월 24일 ~ 30일</span>
                            </div>

                            <table className="weekly-table">
                                <thead>
                                <tr>
                                    <th className="task-col" />
                                    {days.map((d) => (
                                        <th key={d} className="day-col">
                                            {d}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {tasks.map((task) => (
                                    <tr key={task}>
                                        <td className="task-col">{task}</td>
                                        {days.map((day) => (
                                            <td key={day} className="day-col">
                                                <button
                                                    className={`circle ${progress[task][day] ? "filled" : ""} ${
                                                        day === todayDay ? "today" : ""
                                                    }`}
                                                    onClick={() => toggleProgress(task, day)}
                                                    aria-pressed={progress[task][day]}
                                                    aria-label={`${task} ${day} 체크`}
                                                >
                                                    {progress[task][day] ? "●" : "◯"}
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Goals;
