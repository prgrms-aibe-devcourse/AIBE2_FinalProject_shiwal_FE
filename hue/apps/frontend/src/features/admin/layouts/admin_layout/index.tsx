// admin_layout/index.tsx
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './admin_layout.css'

const AdminLayout = () => {
    const { pathname } = useLocation()
    const [openContents, setOpenContents] = useState(pathname.startsWith('/admin/contents'))

    useEffect(() => {
        setOpenContents(pathname.startsWith('/admin/contents'))
    }, [pathname])

    return (

            <div className="admin_body">
                <aside className="admin_sidebar">
                    <nav className="side_nav">

                        <NavLink to="/admin" end className={({ isActive }) => `side_link ${isActive ? 'active' : ''}`}>
                            대시보드
                        </NavLink>

                        <NavLink to="/admin/members" className={({ isActive }) => `side_link ${isActive ? 'active' : ''}`}>
                            구성원 관리
                        </NavLink>

                        {/* 콘텐츠 관리 (부모) */}
                        <button
                            type="button"
                            className={`side_link side_parent ${openContents ? 'is-open' : ''}`}
                            onClick={() => setOpenContents(v => !v)}
                            aria-expanded={openContents}
                            aria-controls="submenu-contents"
                        >
                            <span>콘텐츠 관리</span>
                            <span className="side_caret" aria-hidden>▾</span>
                        </button>

                        {/* 하위 메뉴 */}
                        {openContents && (
                            <div id="submenu-contents" className="side_subnav">
                                <NavLink
                                    to="/admin/contents/healing"
                                    className={({ isActive }) => `side_sublink ${isActive ? 'active' : ''}`}
                                >
                                    힐링콘텐츠 관리
                                </NavLink>

                                <NavLink
                                    to="/admin/contents/self-assessment"
                                    className={({ isActive }) => `side_sublink ${isActive ? 'active' : ''}`}
                                >
                                    자가분석테스트 관리
                                </NavLink>
                            </div>
                        )}
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