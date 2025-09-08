import './dashboard.css'

import AiCounselSummary from './components/ai_counsel_summary'
import SelfDiagnosisSummary from './components/self_diagnosis_summary'
import TriggerOverviewChart from './components/trigger_overview_chart'
import VisitTrend from './components/visit_trend'
import SignupTrend from './components/signup_trend'

const Dashboard = () => {
    return (
        <div className="dashboard_wrap">
            {/* 1) 상단 요약: AI 상담대화 / 자가진단검사 */}
            <section className="grid_two">
                <div className="panel">
                    <AiCounselSummary />
                </div>
                <div className="panel">
                    <SelfDiagnosisSummary />
                </div>
            </section>

            {/* 2) 중앙 트리거 차트 */}
            <section className="panel" style={{ marginTop: 16 }}>
                <h3>위험발언 제재현황</h3>
                <TriggerOverviewChart />
            </section>

            {/* 3) 하단 추이 2개: 방문자 / 가입자 */}
            <section className="grid_two" style={{ marginTop: 16 }}>
                <div className="panel">
                    <h3>방문자 추이</h3>
                    <VisitTrend />
                </div>
                <div className="panel">
                    <h3>가입자 추이</h3>
                    <SignupTrend />
                </div>
            </section>
        </div>
    )
}

export default Dashboard