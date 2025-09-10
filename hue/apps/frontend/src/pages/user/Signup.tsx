import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../../components/Checkbox.tsx";
import "../../styles/Login.css";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [n, setN] = useState("");
    const [nickname, setNickname] = useState("");
    const [service, setService] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 실제 회원가입 로직(서버 호출) 넣기
        console.log("회원가입 시도:", { email, password, n, nickname });
        // 예시: 로그인 성공 시 메인 페이지로 이동
        navigate("/login");
    };

    return (
        <div className="auth-page">
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

                    <label className="sr-only" htmlFor="n">이름</label>
                    <input
                        id="n"
                        className="input input-mint"
                        type="n"
                        placeholder="이름"
                        value={n}
                        onChange={(e) => setN(e.target.value)}
                        required
                    />

                    <label className="sr-only" htmlFor="nickname">닉네임</label>
                    <input
                        id="nickname"
                        className="input input-mint"
                        type="nickname"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />

                    {/*<label className="sr-only" htmlFor="agree">이용약관 동의</label>*/}
                    <div className="agree-box">
                        <Checkbox checked={service} onChange={setService}>
                            <label htmlFor="agree" className="agree-text">
                                이용약관 동의 (필수)
                            </label>
                        </Checkbox>
                    </div>


                    <button type="submit" className="btn btn-primary">
                        <Link to="/Login">회원가입</Link>
                    </button>
                </form>

            </div>


        </div>
    );
}