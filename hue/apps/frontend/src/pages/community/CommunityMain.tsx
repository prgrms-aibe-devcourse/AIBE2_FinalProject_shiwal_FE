import { useNavigate } from "react-router-dom";
import "./CommunityMain.css";

function CommunityMain() {
    const navigate = useNavigate();

    return (
        <main className="community-main">
            {/* 키워드 검색 + 글쓰기 */}
            <div className="community-header">
                <input
                    type="text"
                    className="community-search"
                    placeholder="검색해보세요"
                />
                <button
                    className="community-write-btn"
                    onClick={() => navigate("/community/write")}
                >
                    + 글쓰기
                </button>
            </div>

            {/* 카테고리 */}
            <div className="community-cards">
                <div
                    className="community-card"
                    onClick={() => navigate("/community/basic")}
                >
                    <img
                        // src="이미지 넣기"
                        alt="기본 진단"
                        className="card-image"
                    />
                    <p className="card-title">기본 진단 이야기</p>
                </div>
                <div
                    className="community-card"
                    onClick={() => navigate("/community/mbti")}
                >
                    <img
                        // src="이미지 넣기"
                        alt="MBTI"
                        className="card-image"
                    />
                    <p className="card-title">MBTI 이야기</p>
                </div>
                <div
                    className="community-card"
                    onClick={() => navigate("/community/free")}
                >
                    <img
                        // src="이미지 넣기"
                        alt="자유게시판"
                        className="card-image"
                    />
                    <p className="card-title">자유 게시판</p>
                </div>
            </div>

            {/* BEST 인기글 */}
            <section className="community-best">
                <h2>BEST 인기글</h2>
                <div className="best-grid">
                    <div className="best-card">
                        <div className="best-thumbnail" />
                        <p className="best-title">베스트글 더미</p>
                    </div>
                    <div className="best-card">
                        <div className="best-thumbnail" />
                        <p className="best-title">베스트글 더미</p>
                    </div>
                    <div className="best-card">
                        <div className="best-thumbnail" />
                        <p className="best-title">베스트글 더미</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default CommunityMain;