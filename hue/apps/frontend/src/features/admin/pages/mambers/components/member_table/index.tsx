import { useMemo, useState } from 'react'
import type { member_row, member_role, member_state } from '../../data'
import './table.css'

type props = {
    rows: member_row[]
    page_size?: number
    on_toggle_account?: (row: member_row, next: boolean) => void
    on_issue_temp_pw: (row: member_row) => void;
    on_open_actions?: (row: member_row) => void
}

const role_kor: Record<member_role,string> = {
    owner: '최고관리자',
    admin: '관리자',
    counselor: '상담사',
    member: '일반 회원',
}

const state_kor: Record<member_state,string> = {
    active: 'ON',
    suspended: '정지',
    inactive: '비활성화',
    deleted: '탈퇴',
}

export default function Member_table({
                                         rows,
                                         page_size = 10,
                                         on_toggle_account,
                                         on_open_actions,
                                     }: props) {
    const [page, set_page] = useState(1)

    const page_count = Math.max(1, Math.ceil(rows.length / page_size))
    const page_rows = useMemo(() => {
        const start = (page - 1) * page_size
        return rows.slice(start, start + page_size)
    }, [rows, page, page_size])

    return (
        <div className="m_table_wrap">
            <div className="m_header">
                <div>이름 / 아이디</div>
                <div>권한/상태</div>
                <div>전화번호</div>
                <div>가입일</div>
                <div>계정상태</div>
                <div></div>
            </div>

            {page_rows.map((r) => (
                <div key={r.id} className="m_row">
                    <div className="m_cell">
                        <div className="m_name">{r.name}</div>
                        <div className="m_sub">{r.user_id}</div>
                    </div>

                    <div className="m_cell">
                        <div className="m_role">{role_kor[r.role]}</div>
                        <div className="m_sub">{state_kor[r.state]}</div>
                    </div>

                    <div className="m_cell">{r.phone}</div>
                    <div className="m_cell">{r.join_date}</div>

                    <div className="m_cell">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={r.account_on}
                                onChange={(e) => on_toggle_account?.(r, e.target.checked)}/>
                            <span className="slider" />
                        </label>
                        <span className={`onoff ${r.account_on ? 'on' : 'off'}`}>
                             {r.account_on ? 'ON' : 'OFF'}
                        </span>
                    </div>

                    <div className="m_cell actions">
                        <button className="icon_btn" onClick={() => on_open_actions?.(r)}>⋯</button>
                    </div>
                </div>
            ))}

            <div className="m_pagination">
                <button
                    className="btn_sm"
                    onClick={() => set_page((p) => Math.max(1, p - 1))}
                >
                    ◀
                </button>

                <div className="pages">
                    {Array.from({ length: page_count }).map((_, i) => {
                        const n = i + 1
                        return (
                            <button
                                key={n}
                                className={`page_btn ${n === page ? 'active' : ''}`}
                                onClick={() => set_page(n)}
                            >
                                {n}
                            </button>
                        )
                    })}
                </div>

                <button
                    className="btn_sm"
                    onClick={() => set_page((p) => Math.min(page_count, p + 1))}
                >
                    ▶
                </button>
            </div>
        </div>
    )
}