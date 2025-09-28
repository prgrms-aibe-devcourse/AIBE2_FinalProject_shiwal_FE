import { useNavigate } from "react-router-dom";
import "./category.css";

function MBTIBoard() {
    const navigate = useNavigate();

    const posts = [
        { id: 1, category : "MBTI", title: "ISTJ 성격 특징", writer: "잔망루피", date: "25.09.27", views: 120, likes: 10 },
        { id: 2, category : "MBTI", title: "ENFP 공감글 모음", writer: "엔프피짱", date: "25.09.26", views: 97, likes: 6 },
        { id: 3, category : "MBTI", title: "MBTI별 연애 유형", writer: "바이팅", date: "25.09.24", views: 142, likes: 9 },
    ];

    return (
        <div className="board-wrap">
            <h2 className="board-title">MBTI 이야기</h2>
            <table className="board-table">
                <thead>
                <tr>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>등록일</th>
                    <th>조회</th>
                    <th>추천</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post => (
                    <tr
                        key={post.id}
                        className="board-row"
                        onClick={() => navigate(`/community/post/${post.id}`)}
                    >
                        <td>{post.title}</td>
                        <td>{post.writer}</td>
                        <td>{post.date}</td>
                        <td>{post.views}</td>
                        <td>{post.likes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MBTIBoard;