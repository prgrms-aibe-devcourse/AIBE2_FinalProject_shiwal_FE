// src/features/admin/pages/members/index.tsx
import './members.css'
import Member_table from './components/member_table'
import { mock_members, type member_row } from './data'
import { useState } from 'react'

const Members_page = () => {
    const [rows, set_rows] = useState<member_row[]>(mock_members)

    const issue_temp_pw = (r: member_row) => {
        // TODO: API 호출 자리
        alert(`임시비밀번호 발급: ${r.name} (${r.user_id})`)
    }

    const toggle_account = (r: member_row, next: boolean) => {
        set_rows((prev) =>
            prev.map((x) => (x.id === r.id ? { ...x, account_on: next } : x))
        )
    }

    const open_actions = (r: member_row) => {
        // TODO: 우측 슬라이드 패널/메뉴
        alert(`액션 메뉴: ${r.name}`)
    }

    return (
        <div className="members_wrap">
            <h1>관리자 계정</h1>

            {/* 상단 컨트롤은 다음 턴에 붙임 */}
            <section className="panel">
                <div className="row">
                    <button className="btn">사용자 목록</button>
                    <input className="input" placeholder="검색" />
                </div>
            </section>

            <section className="panel" style={{ padding: 0 }}>
                <Member_table
                    rows={rows}
                    page_size={10}
                    on_issue_temp_pw={issue_temp_pw}
                    on_toggle_account={toggle_account}
                    on_open_actions={open_actions}
                />
            </section>
        </div>
    )
}

export default Members_page