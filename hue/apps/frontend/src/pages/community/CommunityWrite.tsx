import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CommunityWrite.css";

export default function CommunityWrite() {
    const navigate = useNavigate();

    const [category, setCategory] = useState("basic");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        // ✅ 백엔드 저장 처리 예정
        alert("게시글이 작성되었습니다!");
        navigate("/community");
    };

    const handleCancel = () => {
        navigate("/community");
    };

    return (
        <div className="write-container">
            <h2 className="write-title">게시글 작성</h2>

            <div className="write-form">
                <label className="write-label">카테고리</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="write-select"
                >
                    <option value="basic">기본 진단 이야기</option>
                    <option value="mbti">MBTI 이야기</option>
                    <option value="free">자유 게시판</option>
                </select>

                <label className="write-label">제목</label>
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="write-input"
                />

                <label className="write-label">내용</label>
                <textarea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="write-textarea"
                />

                <div className="write-buttons">
                    <button className="write-button submit" onClick={handleSubmit}>
                        등록
                    </button>
                    <button className="write-button cancel" onClick={handleCancel}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}