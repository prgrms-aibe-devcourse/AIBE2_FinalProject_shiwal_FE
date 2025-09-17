import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './features/admin/pages/dashboard'
import MembersPage from './features/admin/pages/mambers'
import AdminLayout from './features/admin/layouts/admin_layout'
import ContentsPage from './features/admin/pages/contents'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />               {/* /admin */}
                    <Route path="members" element={<MembersPage />} />    {/* /admin/members */}
                    <Route path="contents" element={<ContentsPage />} />  {/* /admin/contents */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App