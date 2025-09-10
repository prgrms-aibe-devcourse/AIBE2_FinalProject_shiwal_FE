import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/user/Login.tsx";
import Signup from "./pages/user/Signup.tsx";
import AIchat from "./pages/chat/AIchat.tsx";

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
