import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/Checkbox";
import "../../styles/Login.css";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [n, setN] = useState("");
    const [nickname, setNickname] = useState("");
    const [service, setService] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!service) {
            setError("이용약관에 동의해야 합니다.");
            return;
        }

        const payload = {
            email,
            password,
            name: n,
            nickname,
        };

        try {
            const response = await fetch("/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "회원가입에 실패했습니다.");
                return;
            }

            navigate("/login");
        } catch (err) {
            setError("서버와의 통신에 실패했습니다.");
        }
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

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary">
                        회원가입
                    </button>
                </form>

            </div>


        </div>
    );
}