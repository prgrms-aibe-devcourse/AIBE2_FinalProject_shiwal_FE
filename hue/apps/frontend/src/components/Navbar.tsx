// src/components/Navbar.tsx
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const cx = (isActive: boolean) => `nav-link${isActive ? " active" : ""}`;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="휴 로고" className="nav-logo-img" />
        </Link>

        <NavLink to="/aichat" className={({ isActive }) => cx(isActive)}>
          휴봇과 상담
        </NavLink>
        <NavLink to="/healing" className={({ isActive }) => cx(isActive)}>
          힐링 컨텐츠
        </NavLink>
        <NavLink to="/analysis" className={({ isActive }) => cx(isActive)}>
          심리 분석
        </NavLink>
        <NavLink to="/community" className={({ isActive }) => cx(isActive)}>
          커뮤니티
        </NavLink>
        <NavLink to="/selftest" className={({ isActive }) => cx(isActive)}>
          자기분석 테스트
        </NavLink>
      </div>

      <div className="nav-right">
        <NavLink to="/login" className={({ isActive }) => cx(isActive)}>
          로그인
        </NavLink>
        <NavLink to="/signup" className={({ isActive }) => cx(isActive)}>
          회원가입
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;