import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './features/admin/pages/dashboard'
import MembersPage from './features/admin/pages/mambers'
import AdminLayout from './features/admin/layouts/admin_layout'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 기본 "/" → "/admin" 으로 리다이렉트 */}
                <Route path="/" element={<Navigate to="/admin" replace />} />

                {/* 관리자 레이아웃 아래에 하위 메뉴들을 연결 */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />               {/* /admin */}
                    <Route path="members" element={<MembersPage />} />    {/* /admin/members */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App