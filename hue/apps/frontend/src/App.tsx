import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가

// healing
import MusicMain from './pages/healing/sound/MusicMain';
import NatureSound from './pages/healing/sound/NatureSound';
import WhiteNoise from './pages/healing/sound/WhiteNoise';
import BreathMain from './pages/healing/meditation/BreathMain';
import ShortMeditation from './pages/healing/meditation/ShortMeditation';
import SimpleStretch from './pages/healing/meditation/SimpleStretch';
import DrawingMain from './pages/healing/creation/DrawingMain';
import Canvas from './pages/healing/creation/Canvas';
import Goal from "./pages/user/Goal";
import Form from "./pages/checkin/Form"

// 기존 import 유지
import Stats from "./pages/checkin/Stats"
import Daily from "./pages/checkin/Daily"


// 공통 UI
import Navbar from "@/components/Navbar";
import PrivateRoute from "@/components/PrivateRoute";

// 관리자 레이아웃/페이지
import AdminLayout from "@/features/admin/layouts/admin_layout";
import Dashboard from "@/features/admin/pages/dashboard";
import Members from "@/features/admin/pages/mambers";
import Contents from "@/features/admin/pages/contents";

// 일반 페이지
import Home from "@/pages/Home";
import AIchat from "@/pages/chat/AIchat";
import AIchatHis from "@/pages/chat/AIchatHis";
import HealingMain from "@/pages/healing/HealingMain";

// 유저 페이지
import Login from "@/pages/user/Login";
import Signup from "@/pages/user/Signup";
import Profile from "@/pages/user/Profile";


// 네비게이션 포함 레이아웃
function RootWithNavbar() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

/**
 * 캘린더 날짜 클릭 시 라우팅을 처리하는 StatsWrapper 함수
 * App.tsx에서 이 라우팅 로직을 담당
 */
function StatsWithRouting() {
    const navigate = useNavigate();

    // Stats에서 날짜 클릭 시 호출될 핸들러
    const handleDateClick = (date: string) => {
        // '2024-10-27'과 같은 형식의 날짜를 받아 /daily/2024-10-27로 이동
        navigate(`/daily/${date}`);
    };

    // Stats 컴포넌트에 onDateClick prop을 전달
    return <Stats onDateClick={handleDateClick} />;
}


export default function App() {
    const location = useLocation();

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
        <Routes>
            <Route element={<RootWithNavbar />}>
                {/* 홈 */}
                <Route path="/" element={<Home />} />

                {/* 네비게이션과 맞춘 라우트 */}
                <Route path="/aichat" element={<AIchat />} />
                <Route
                    path="/aichat/history"
                    element={
                        // <PrivateRoute>
                        <AIchatHis />
                        // </PrivateRoute>
                    }
                />
                <Route path="/healing" element={<HealingMain />} />
                <Route path="/goal" element={<Goal />} />

                {/* 아직 페이지 미정이면 임시로 더미 화면 */}
                <Route path="/analysis" element={<div style={{ padding: 24 }}>심리 분석 페이지</div>} />
                <Route path="/community" element={<div style={{ padding: 24 }}>커뮤니티 페이지</div>} />
                <Route path="/selftest" element={<div style={{ padding: 24 }}>자기분석 테스트 페이지</div>} />

                {/* 유저 */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/checkin" element={<Form />} />

                {/* Stats 라우트: StatsWithRouting 컴포넌트를 연결하여 onDateClick prop을 제공합니다. */}
                <Route path="/stats" element={<StatsWithRouting />} />

                {/* Daily 라우트: 날짜 파라미터를 받을 수 있도록 경로를 수정합니다. */}
                <Route path="/daily/:date" element={<Daily />} />

                {/* 기존 /daily 라우트는 그대로 둡니다. */}
                <Route path="/daily" element={<Daily />} />


                <Route
                    path="/profile"
                    element={
                        // <PrivateRoute>
                        <Profile />
                        // </PrivateRoute>
                    }
                />

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
