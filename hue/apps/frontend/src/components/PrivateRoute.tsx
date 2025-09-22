import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        console.log("로그인 필요: 로그인 페이지로 이동");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;