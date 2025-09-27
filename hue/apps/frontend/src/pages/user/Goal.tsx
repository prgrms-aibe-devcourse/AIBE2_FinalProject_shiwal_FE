import React, { useEffect, useState } from "react";

type Day = "일" | "월" | "화" | "수" | "목" | "금" | "토";
type Task = "접속" | "체크인" | "채팅" | "감정일기";

const days: Day[] = ["일", "월", "화", "수", "목", "금", "토"];
const tasks: Task[] = ["접속", "체크인", "채팅", "감정일기"];

const Goal: React.FC = () => {
    const today = new Date();
    const todayIndex = today.getDay();
    const todayDay = days[todayIndex];

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

    const [goals, setGoals] = useState<Record<string, boolean>>({}); // 초기 상태를 빈 객체로 변경
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGoalText, setNewGoalText] = useState("");
    const [weekRange, setWeekRange] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleGoal = (goal: string) => {
        setGoals((prev) => {
            const updated = { ...prev, [goal]: !prev[goal] };
            // TODO: 목표 상태 변경 API 호출 (PATCH/PUT)
            console.log("Update goal:", updated);
            return updated;
        });
    };

    const toggleProgress = (task: Task, day: Day) => {
        // 오늘 날짜에만 클릭 가능하도록 조건 추가
        if (day !== todayDay) {
            return;
        }

        setProgress((prev) => {
            const updated = { ...prev, [task]: { ...prev[task], [day]: !prev[task][day] } };
            // TODO: 주간 진행도 업데이트 API 호출 (PATCH/PUT)
            console.log("Update progress:", task, day, updated[task][day]);
            return updated;
        });
    };

    const addGoal = () => {
        if (newGoalText.trim() !== "") {
            const newGoal = newGoalText.trim();
            setGoals((prev) => ({
                ...prev,
                [newGoal]: false,
            }));
            // TODO: 새 목표 생성 API 호출 (POST)
            console.log("Add new goal:", newGoal);
            setNewGoalText("");
            setIsModalOpen(false);
        }
    };

    const toggleEditMode = () => {
        setIsEditMode((prev) => !prev);
    };

    const deleteGoal = (goalToDelete: string) => {
        setGoals((prev) => {
            const updated = { ...prev };
            delete updated[goalToDelete];
            // TODO: 목표 삭제 API 호출 (DELETE)
            console.log("Delete goal:", goalToDelete);
            return updated;
        });
    };

    const calculateWeekRange = () => {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        const startMonth = firstDayOfWeek.getMonth() + 1;
        const startDay = firstDayOfWeek.getDate();
        const endMonth = lastDayOfWeek.getMonth() + 1;
        const endDay = lastDayOfWeek.getDate();

        return `${startMonth}월 ${startDay}일 ~ ${endMonth}월 ${endDay}일`;
    };

    useEffect(() => {
        setWeekRange(calculateWeekRange());
        const fetchData = async () => {
            try {
                console.log("Fetching initial data from backend (dummy)");
                // 더미 데이터로 백엔드 응답 시뮬레이션
                const dummyGoals = {
                    "수면 루틴 회복하기": true,
                    "작은 성취 10개를 기록해보기": false,
                };
                // 지난 주에 대한 더미 진행도 데이터
                const dummyProgress = {
                    "접속": { "일": true, "월": true, "화": false, "수": true, "목": false, "금": false, "토": false },
                    "체크인": { "일": false, "월": false, "화": true, "수": false, "목": true, "금": false, "토": false },
                    "채팅": { "일": true, "월": true, "화": true, "수": true, "목": true, "금": true, "토": false },
                    "감정일기": { "일": false, "월": false, "화": false, "수": true, "목": false, "금": false, "토": false },
                };

                // 초기 데이터 상태 업데이트
                setGoals(dummyGoals);
                setProgress((prev) => {
                    const updated = { ...prev };
                    tasks.forEach((task) => {
                        days.forEach((day) => {
                            if (day !== todayDay) { // 오늘이 아닌 경우에만 더미 데이터로 채움
                                updated[task][day] = dummyProgress[task][day];
                            }
                        });
                    });
                    return updated;
                });
            } catch (err) {
                console.error("초기 데이터 불러오기 실패:", err);
            }
        };
        fetchData();
    }, [todayDay]);

    return (
        <div className="main-box-row">
            <div className="title">목표</div>

            <div className="goals-grid">
                <div className="left-panel-goal">
                    <div className="goal-settings">
                        <div className="goal-settings-header">
                            <div className="header-title">목표 설정</div>
                            <div className="goal-settings-actions">
                                <button className="action-btn" onClick={() => setIsModalOpen(true)}>
                                    추가
                                </button>
                                <button className="action-btn" onClick={toggleEditMode}>
                                    {isEditMode ? "완료" : "편집"}
                                </button>
                            </div>
                        </div>

                        <div className="goal-list">
                            {Object.keys(goals).map((goal) => (
                                <label className="goal-item" key={goal}>
                                    {isEditMode ? (
                                        <button className="delete-btn" onClick={() => deleteGoal(goal)}>
                                            ✖
                                        </button>
                                    ) : (
                                        <input
                                            type="checkbox"
                                            checked={goals[goal]}
                                            onChange={() => toggleGoal(goal)}
                                        />
                                    )}
                                    <span className="goal-text">{goal}</span>
                                    <span className="bell-icon" role="img" aria-label="bell">
                                        🔔
                                    </span>
                                </label>
                            ))}
                            <div className="goal-spacer" />
                        </div>
                    </div>
                </div>

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
                            <span className="week-range">{weekRange}</span>
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
                                                } ${day !== todayDay ? "not-allowed" : ""}`}
                                                onClick={() => toggleProgress(task, day)}
                                                aria-pressed={progress[task][day]}
                                                aria-label={`${task} ${day} 체크`}
                                                disabled={day !== todayDay} // 오늘이 아닌 경우 비활성화
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

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>새 목표 추가</h2>
                        <input
                            type="text"
                            value={newGoalText}
                            onChange={(e) => setNewGoalText(e.target.value)}
                            placeholder="새로운 목표를 입력하세요"
                        />
                        <div className="modal-actions">
                            <button onClick={addGoal}>완료</button>
                            <button onClick={() => setIsModalOpen(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goal;