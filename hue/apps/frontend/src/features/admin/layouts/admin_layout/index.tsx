import { NavLink, Outlet } from 'react-router-dom'
import './admin_layout.css'

const AdminLayout = () => {
    return (

            <div className="admin_body">
                <aside className="admin_sidebar">
                    <nav>
                        <NavLink
                            to="/admin" end className={({ isActive }) => `side_link ${isActive ? 'active' : ''}`}>
                            대시보드
                        </NavLink>

                        <NavLink to="/admin/members" className={({ isActive }) => `side_link ${isActive ? 'active' : ''}`}>
                            구성원 관리
                        </NavLink>

                        <NavLink to="/admin/contents" className={({ isActive }) => `side_link ${isActive ? 'active' : ''}`}>
                            콘텐츠 관리
                        </NavLink>
                    </nav>
                </aside>

                <main className="admin_content">
                    <div className="page_shell">
                        <div className="page_card">
                    <Outlet />
                        </div>
                    </div>
                </main>
            </div>
    )
}

export default AdminLayout