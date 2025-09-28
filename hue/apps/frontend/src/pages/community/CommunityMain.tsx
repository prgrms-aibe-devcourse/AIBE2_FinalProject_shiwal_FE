import { useNavigate } from "react-router-dom";
import "./CommunityMain.css";

function CommunityMain() {
    const navigate = useNavigate();

    return (
        <main className="community-main">
            <h2 className="community-title">커뮤니티</h2>
            <p className="community-desc">
                다양한 주제에 대해 이야기를 나누고, 서로의 경험을 공유해보세요.
            </p>

            <div className="community-cards">
                <div className="community-card" onClick={() => navigate("/community/basic")}>기본 진단 이야기</div>
                <div className="community-card" onClick={() => navigate("/community/mbti")}>MBTI 이야기</div>
                <div className="community-card" onClick={() => navigate("/community/free")}>자유 게시판</div>
            </div>
        </main>
    );
}

export default CommunityMain;