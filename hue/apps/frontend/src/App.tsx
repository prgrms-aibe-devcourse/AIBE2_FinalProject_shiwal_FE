import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

// 공통 컴포넌트
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// 사용자 페이지
import Home from "./pages/Home";
import Login from "./pages/user/Login.tsx";
import Signup from "./pages/user/Signup.tsx";
import Profile from "./pages/user/Profile.tsx";

// AI 채팅
import AIchat from "./pages/chat/AIchat.tsx";
import AIchatHis from "./pages/chat/AIchatHis.tsx";

// 힐링(사용자용)
import HealingMain from "./pages/healing/HealingMain";
import MusicMain from "./pages/healing/sound/MusicMain";
import NatureSound from "./pages/healing/sound/NatureSound";
import WhiteNoise from "./pages/healing/sound/WhiteNoise";
import BreathMain from "./pages/healing/meditation/BreathMain";
import ShortMeditation from "./pages/healing/meditation/ShortMeditation";
import SimpleStretch from "./pages/healing/meditation/SimpleStretch";
import DrawingMain from "./pages/healing/creation/DrawingMain";
import Canvas from "./pages/healing/creation/Canvas";

// 관리자(Admin)
import AdminLayout from "./features/admin/layouts/admin_layout";
import Dashboard from "./features/admin/pages/dashboard";
import MembersPage from "./features/admin/pages/mambers";
import ContentsPage from "./features/admin/pages/contents";
import HealingEditor from "./features/admin/pages/contents/components/healing_editor";
import SelftestEditor from "./features/admin/pages/contents/components/selftest_editor";

function AppContent() {
    const location = useLocation();

    // 배경색 전환 로직
    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/signup") {
            document.body.classList.add("white-bg");
            document.body.classList.remove("gray-bg");
        } else {
            document.body.classList.add("gray-bg");
            document.body.classList.remove("white-bg");
        }
    }, [location]);

    return (
        <>
            <Navbar />
            <Routes>
                {/* 사용자 일반 페이지 */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* PrivateRoute 적용 */}
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/aichat/history"
                    element={
                        <PrivateRoute>
                            <AIchatHis />
                        </PrivateRoute>
                    }
                />

                {/* AI Chat */}
                <Route path="/aichat" element={<AIchat />} />

                {/* 힐링(사용자) */}
                <Route path="/healing" element={<HealingMain />} />
                <Route path="/healing/sound" element={<MusicMain />} />
                <Route path="/healing/sound/nature" element={<NatureSound />} />
                <Route path="/healing/sound/whitenoise" element={<WhiteNoise />} />
                <Route path="/healing/meditation/breath" element={<BreathMain />} />
                <Route path="/healing/meditation/short" element={<ShortMeditation />} />
                <Route path="/healing/meditation" element={<SimpleStretch />} />
                <Route path="/healing/creation" element={<DrawingMain />} />
                <Route path="/healing/creation/canvas" element={<Canvas />} />

                {/* 관리자(Admin) */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} /> {/* /admin */}
                    <Route path="members" element={<MembersPage />} /> {/* /admin/members */}
                    <Route path="contents">
                        <Route index element={<ContentsPage />} /> {/* /admin/contents */}
                        <Route path="healing" element={<HealingEditor />} /> {/* /admin/contents/healing */}
                        <Route path="self-assessment" element={<SelftestEditor />} /> {/* /admin/contents/self-assessment */}
                    </Route>
                </Route>

                {/* 없는 경로 → 홈 또는 /admin 으로 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;