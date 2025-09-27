import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 실제 프로젝트에서는 여기서 백엔드에 저장된
        // 로그인 토큰(JWT)이나 세션 정보를 확인
        // 예시로 'true'를 설정하여 로그인된 상태를 가정
        const token = localStorage.getItem("userToken");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="휴 로고" className="nav-logo-img" />
                </Link>
                <Link to="/aichat">휴봇과 상담</Link>
                <Link to="/healing">힐링 컨텐츠</Link>
                <Link to="/">심리 분석</Link>
                <Link to="/">커뮤니티</Link>
                <Link to="/">자기분석 테스트</Link>
            </div>
            <div className="nav-right">
                {isLoggedIn ? (
                    // 로그인 상태일 경우 '나의 페이지' 표시
                    <Link to="/profile">나의 페이지</Link>
                ) : (
                    // 로그인 상태가 아닐 경우 '로그인'과 '회원가입' 표시
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;