// src/App.tsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// 공통 UI
import Navbar from "@/components/Navbar";
import PrivateRoute from "@/components/PrivateRoute";

// --- 일반 페이지 ---
import Home from "@/pages/Home";

// 관리자(Admin)
import AdminLayout from "./features/admin/layouts/admin_layout";
import Dashboard from "./features/admin/pages/dashboard";
import Members from "./features/admin/pages/mambers";
import Contents from "./features/admin/pages/contents";
import HealingEditor from "./features/admin/pages/contents/components/healing_editor";
import SelftestEditor from "./features/admin/pages/contents/components/selftest_editor";

// 챗
import AIchat from "@/pages/chat/AIchat";
import AIchatHis from "@/pages/chat/AIchatHis";

// 힐링
import HealingMain from "@/pages/healing/HealingMain";

// 유저
import Login from "@/pages/user/Login";
import Signup from "@/pages/user/Signup";
import Profile from "@/pages/user/Profile";
import Goal from "@/pages/user/Goal";

// 네비게이션 공통 레이아웃
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

        {/* 챗 */}
        <Route path="/aichat" element={<AIchat />} />
        <Route
          path="/aichat/history"
          element={
            <PrivateRoute>
              <AIchatHis />
            </PrivateRoute>
          }
        />

        {/* 힐링 */}
        <Route path="/healing" element={<HealingMain />} />

        {/* 기타(임시) */}
        <Route path="/analysis" element={<div style={{ padding: 24 }}>심리 분석 페이지</div>} />
        <Route path="/community" element={<div style={{ padding: 24 }}>커뮤니티 페이지</div>} />
        <Route path="/selftest" element={<div style={{ padding: 24 }}>자기분석 테스트 페이지</div>} />

        {/* 유저 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/goal" element={<Goal />} />

          {/* 관리자 */}
          <Route
              path="/admin"
              element={
                  <PrivateRoute>
                      <AdminLayout />
                  </PrivateRoute>
              }
          >
              {/* /admin 기본 */}
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="members" element={<Members />} />

              {/* /admin/contents */}
              <Route path="contents">
                  <Route index element={<Contents />} />
                  <Route path="healing" element={<HealingEditor />} />
                  <Route path="self-assessment" element={<SelftestEditor />} />
              </Route>
          </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}