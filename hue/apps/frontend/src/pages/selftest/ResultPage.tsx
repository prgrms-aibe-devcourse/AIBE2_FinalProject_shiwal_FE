import { useNavigate } from "react-router-dom";

const ResultPage = () => {
    const navigate = useNavigate();

    // 백엔드 연동 후 여기에 props나 query param 등으로 결과 받아올 수 있음
    const score = 15; // 예시 점수
    const riskLevel = "고위험"; // 예시 결과

    return (
        <div className="result-container">
            <h2>📝 진단 결과</h2>

            <div className="result-card">
                <p><strong>총 점수:</strong> {score}점</p>
                <p><strong>위험 수준:</strong> {riskLevel}</p>
                <p className="result-desc">
                    당신의 현재 상태는 <strong>{riskLevel}</strong> 수준입니다.
                    필요시 전문가의 상담을 권장드립니다.
                </p>
            </div>

            <div className="result-actions">
                <button onClick={() => navigate("/selftest/basic")}>다시 검사하기</button>
                <button onClick={() => navigate("/")}>홈으로</button>
            </div>
        </div>
    );
};

export default ResultPage;