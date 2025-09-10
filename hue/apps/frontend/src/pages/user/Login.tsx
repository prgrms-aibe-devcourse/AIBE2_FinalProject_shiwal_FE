import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css"; // 아래 CSS 예시를 같은 경로에 저장하거나 index.css에 합쳐도 됩니다.

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 실제 로그인 로직(서버 호출) 넣기
        console.log("로그인 시도:", { email, password });
        // 예시: 로그인 성공 시 메인 페이지로 이동
        navigate("/");
    };

    return (
        <div className="auth-page">
            {/*<div className="auth-card">*/}
                <div className="logo-wrap">
                    <img src="/logo.png" alt="휴 로고" className="logo-img" />
                </div>

            <div className="btns">
                <form className="auth-form" onSubmit={onSubmit}>
                    <label className="sr-only" htmlFor="email">이메일</label>
                    <input
                        id="email"
                        className="input input-mint"
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className="sr-only" htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        className="input input-mint"
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn btn-primary">로그인</button>
                </form>
            </div>

                <div className="or-line">
                    <span>또는</span>
                </div>

                <div className="socials">
                    <button className="btn btn-kakao" type="button" onClick={() => alert("카카오 로그인 (연동 필요)")}>
                        <img src="/kakao.png" alt="카카오톡 로고" className="kakao-img" />
                        카카오톡 계정으로 로그인
                    </button>

                    <button className="btn btn-google" type="button" onClick={() => alert("구글 로그인 (연동 필요)")}>
                        <img src="/google.png" alt="구글 로고" className="google-img" />
                        구글 계정으로 로그인
                    </button>
                </div>

                <p className="muted small">
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </p>
            {/*</div>*/}
        </div>
    );
}
