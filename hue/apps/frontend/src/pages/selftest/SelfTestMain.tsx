import "./selftest.css";
import { useNavigate } from "react-router-dom";

const SelfTestMain = () => {
    const navigate = useNavigate();

    return (
        <div className="selftest-container">
            <aside className="sidebar">
                <h3>식빵맨님의<br />자가분석</h3>
                <button onClick={() => navigate("/selftest")}>오늘의 기본진단</button>
                <button onClick={() => navigate("/selftest/mbti")}>MBTI 검사</button>

                {/*<div className="info-box">*/}
                {/*    <p><strong>추천 검사</strong></p>*/}
                {/*    <p>우울증 검사<br />불안감 검사<br />ADHD 검사</p>*/}
                {/*</div>*/}

                <div className="info-box">
                    <p><strong>진행 중 검사</strong></p>
                    <p>없음</p>
                </div>

                <div className="info-box">
                    <p><strong>완료한 검사</strong></p>
                    <p>없음</p>
                </div>
            </aside>

            <main className="main-area">
                <section className="intro-box">
                    <h2>자가진단 테스트 전 꼭 읽어 주세요!</h2>
                    <p>
                        자가 진단 테스트는 자신의 증상에 대한 정도를 간단히 이해하고<br />
                        심리적 어려움을 위해 예방하기 위한 사적인 검사입니다.<br />
                        보다 정확한 진단을 위해서는 전문가와의 상담이 필요합니다.
                    </p>
                </section>

                <section className="main-test">
                    <h2>오늘의 기본진단!</h2>
                    <h3>하루 1분, 기분 체크로 마음 건강 챙기기!!</h3>
                    <p className="test-desc">이 진단은 간단한 자기점검용으로, 의학정/임상정 진단이 아닙니다.</p>
                    <p className="test-desc">가볍게 내 마음을 살펴보는 테스트입니다. 답변에 따라 결과가 달라질 수 있고, 오늘의 컨디션을 100% 설명하지 않을 수도 있습니다.</p>
                    <button className="start-btn" onClick={() => navigate("/selftest/basic")}>
                        검사 시작하기
                    </button>
                </section>

                <section className="cards-area">
                    <h4>오늘의 마음 이야기</h4>
                    <div className="cards">
                        <div className="card">
                            <img src="/ai-chat.png" alt="AI 상담" />
                            <p>AI가 들어주는 나의 하루</p>
                        </div>
                        <div className="card">
                            <img src="/basic-check.png" alt="기본 진단" />
                            <p>기본 검사로 내 상태 확인하기</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SelfTestMain;