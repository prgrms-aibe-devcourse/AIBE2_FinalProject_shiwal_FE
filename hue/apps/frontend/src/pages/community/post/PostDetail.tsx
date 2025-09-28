import { useParams } from "react-router-dom";
import "./PostDetail.css";

function PostDetail() {
    useParams();
    // const { id } = useParams();
    //백엔드 연동할때 id 값 써야하면 작성

    return (
        <div className="post-detail-container">
            <div className="post-detail-card">
                <div className="post-header">
                    <h2 className="post-title">게시글 제목 (예: ISTJ와 잘 맞는 유형은?)</h2>
                    <div className="post-meta">
                        <span className="post-author">작성자: 잼뚱스</span>
                        <span className="post-date">작성일: 2025.08.25</span>
                        <span className="post-views">조회수: 35</span>
                    </div>
                </div>

                <div className="post-content">
                    <p>
                        본문 내용
                    </p>
                </div>

                <div className="post-actions">
                    <button className="recommend-button">👍 추천</button>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;