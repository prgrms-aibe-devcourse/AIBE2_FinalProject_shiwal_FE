import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './features/admin/pages/dashboard'
import AdminLayout from './features/admin/layouts/admin_layout'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin" replace />} /> {/* 옵션 */}
                <Route path="/admin" element={
                    <AdminLayout>
                        <Dashboard />
                        </AdminLayout>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App