import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/user/Login.tsx";
import Signup from "./pages/user/Signup.tsx";
import AIchat from "./pages/chat/AIchat.tsx";
import AIchatHis from "./pages/chat/AIchatHis.tsx";
import Profile from "./pages/user/Profile.tsx";
import Dashboard from './features/admin/pages/dashboard'
import MembersPage from './features/admin/pages/mambers'
import AdminLayout from './features/admin/layouts/admin_layout'
import ContentsPage from './features/admin/pages/contents'

import PrivateRoute from './components/PrivateRoute';
import HealingMain from './pages/healing/HealingMain'
import MusicMain from './pages/healing/sound/MusicMain'
import NatureSound from './pages/healing/sound/NatureSound'
import WhiteNoise from './pages/healing/sound/WhiteNoise'
import BreathMain from './pages/healing/meditation/BreathMain'
import ShortMeditation from './pages/healing/meditation/ShortMeditation'
import SimpleStretch from './pages/healing/meditation/SimpleStretch'
import DrawingMain from './pages/healing/creation/DrawingMain'
import Canvas from './pages/healing/creation/Canvas'
import Goal from "./pages/user/Goal.tsx";


function AppContent() {
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
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/aichat" element={<AIchat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/goal" element={<Goal />} />

                {/* PrivateRoute 적용 */}
                {/*<Route*/}
                {/*    path="/profile"*/}
                {/*    element={*/}
                {/*        <PrivateRoute>*/}
                {/*            <Profile />*/}
                {/*        </PrivateRoute>*/}
                {/*    }*/}
                {/*/>*/}
                <Route
                    path="/aichat/history"
                    element={
                        <PrivateRoute>
                            <AIchatHis />
                        </PrivateRoute>
                    }
                />

                {/* /admin 기본 이동 */}

                <Route path="/healing" element={<HealingMain />} />

                <Route path="/healing/sound" element={<MusicMain />} />
                <Route path="/healing/sound/nature" element={<NatureSound />} />
                <Route path="/healing/sound/whitenoise" element={<WhiteNoise />} />

                <Route path="/healing/meditation/breath" element={<BreathMain />} />
                <Route path="/healing/meditation/short" element={<ShortMeditation />} />
                <Route path="/healing/meditation" element={<SimpleStretch />} />

                <Route path="/healing/creation" element={<DrawingMain />} />
                <Route path="/healing/creation/canvas" element={<Canvas />} />

                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />               {/* /admin */}
                    <Route path="members" element={<MembersPage />} />    {/* /admin/members */}
                    <Route path="contents" element={<ContentsPage />} />  {/* /admin/contents */}
                </Route>
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
