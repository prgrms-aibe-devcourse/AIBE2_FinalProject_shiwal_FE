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
                <Route path="/aichat/history" element={<AIchatHis />} />
                <Route path="/profile" element={<Profile />} />
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
