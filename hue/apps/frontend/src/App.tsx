// src/App.tsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// 공통 UI
import Navbar from "@/components/Navbar";
import PrivateRoute from "@/components/PrivateRoute";

// 관리자 레이아웃/페이지 (네가 말한 경로/이름 그대로)
import AdminLayout from "@/features/admin/layouts/admin_layout";
import Dashboard from "@/features/admin/pages/dashboard";
import Members from "@/features/admin/pages/mambers";
import Contents from "@/features/admin/pages/contents";

// 일반 페이지 (네가 말한 경로/이름 그대로)
import Home from "@/pages/Home";
import AIchat from "@/pages/chat/AIchat";
import AIchatHis from "@/pages/chat/AIchatHis";
import HealingMain from "@/pages/healing/HealingMain";

function RootWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<RootWithNavbar />}>
        {/* 홈 */}
        <Route path="/" element={<Home />} />

        {/* 네비게이션과 맞춘 라우트 */}
        <Route path="/aichat" element={<AIchat />} />
        <Route path="/aichat/history" element={<AIchatHis />} />
        <Route path="/healing" element={<HealingMain />} />

        {/* 아직 페이지 미정이면 임시로 더미 화면 */}
        <Route path="/analysis" element={<div style={{padding:24}}>심리 분석 페이지</div>} />
        <Route path="/community" element={<div style={{padding:24}}>커뮤니티 페이지</div>} />
        <Route path="/selftest" element={<div style={{padding:24}}>자기분석 테스트 페이지</div>} />

        {/* 유저 */}
        <Route path="/login" element={<div style={{padding:24}}>로그인 페이지</div>} />
        <Route path="/signup" element={<div style={{padding:24}}>회원가입 페이지</div>} />
        <Route path="/profile" element={<div style={{padding:24}}>프로필 페이지</div>} />

        {/* 관리자 */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="contents" element={<Contents />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}