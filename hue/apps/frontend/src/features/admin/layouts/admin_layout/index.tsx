import './admin_layout.css'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="admin_layout">
            <header className="admin_header">상단(로고/메뉴)</header>

            <div className="admin_body">
                <aside className="admin_sidebar">
                    <nav>
                        <button className="menu_btn active">대시보드</button>
                        <button className="menu_btn">구성원 관리</button>
                        <button className="menu_btn">콘텐츠 관리</button>
                    </nav>
                </aside>

                <main className="admin_content">{children}</main>
            </div>
        </div>
    );
};
export default AdminLayout;