import "./selftest.css";
import { useNavigate } from "react-router-dom";

const SelfTestMBTIMain = () => {
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
                    <h2>MBTI 성격유형 검사</h2>
                    <h3>나의 성향을 빠르게 알아보세요!!</h3>
                    <p className="test-desc">이 테스트는 성격유형을 간단히 확인하는 참고용입니다.</p>
                    <p className="test-desc">정확한 성격 분석은 전문 심리 상담을 통해 확인할 수 있습니다.</p>
                    <button className="start-btn" onClick={() => navigate("/selftest/mbti/start")}>
                        MBTI 검사 시작
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

export default SelfTestMBTIMain;