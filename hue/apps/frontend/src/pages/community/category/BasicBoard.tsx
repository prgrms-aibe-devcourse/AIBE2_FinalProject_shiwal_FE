import "./category.css";
import { useNavigate } from "react-router-dom";

function BasicBoard() {
    const navigate = useNavigate();

    const posts = [
        {
            id: 1,
            category : "기본진단",
            title: "오늘의 기분 점수 공유해요!",
            writer: "기분좋은날",
            date: "25.09.28",
            views: 132,
            likes: 4,
        },
        {
            id: 2,
            category : "기본진단",
            title: "스트레스 해소법 추천해주세요",
            writer: "힐링중",
            date: "25.09.27",
            views: 98,
            likes: 7,
        },
    ];

    return (
        <div className="board-wrap">
            <h2 className="board-title">기본 진단 이야기</h2>
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
                {posts.map((post) => (
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

export default BasicBoard;