import { NavLink, Outlet } from 'react-router-dom'
import './admin_layout.css'

const AdminLayout = () => {
    return (
        <div className="admin_layout">
            <header className="admin_header">상단(로고/메뉴)</header>

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

                        <NavLink to="/admin/settings" className={({ isActive }) => `side_link ${isActive ? 'active' : ''}`}>
                            콘텐츠 관리
                        </NavLink>
                    </nav>
                </aside>

                {/* 여기서 하위 라우트 페이지가 바뀌어 렌더링됨 */}
                <main className="admin_content">
                    <div className="page_shell">
                        <div className="page_card">
                    <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout