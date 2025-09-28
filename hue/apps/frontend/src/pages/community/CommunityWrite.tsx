import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CommunityWrite.css";

function CommunityWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        alert("게시글이 작성되었습니다!");
        navigate("/community"); // 나중에 서버 저장 처리 가능
    };

    return (
        <div className="community-write">
            <h2>게시글 작성</h2>
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>등록</button>
        </div>
    );
}

export default CommunityWrite;