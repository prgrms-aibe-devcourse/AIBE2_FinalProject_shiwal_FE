import { useNavigate } from "react-router-dom";
import "./category.css";

function FreeBoard() {
    const navigate = useNavigate();

    const posts = [
        { id: 1, category : "자유", title: "하루에 책 10쪽 읽기 도전!", writer: "책벌레", date: "25.09.26", views: 73, likes: 3, scrap: 1 },
        { id: 2, category : "자유", title: "좋아하는 노래 추천해줘", writer: "뮤직은혜", date: "25.09.25", views: 56, likes: 5, scrap: 0 },
        { id: 3, category : "자유", title: "일상 고민 나누는 공간", writer: "마음털기", date: "25.09.24", views: 89, likes: 7, scrap: 2 },
    ];

    return (
        <div className="board-wrap">
            <h2 className="board-title">자유게시판</h2>
            <table className="board-table">
                <thead>
                <tr>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>등록일</th>
                    <th>조회</th>
                    <th>추천</th>
                    <th>스크랩</th>
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
                        <td>{post.scrap}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default FreeBoard;