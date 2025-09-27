import { Link } from "react-router-dom";
import "./Navbar.css"; // 스타일 따로 관리

function Navbar() {
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
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
            </div>
        </nav>
    );
}

export default Navbar;
