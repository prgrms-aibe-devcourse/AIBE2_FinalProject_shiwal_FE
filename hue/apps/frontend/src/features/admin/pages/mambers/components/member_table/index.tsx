// src/features/admin/pages/mambers/components/member_table/index.tsx
import './table.css'
// 🔧 상대경로 → 별칭 경로로 교체
import { formatJoinDate } from '@/shared/formatters/datetime'

export type Row = {
  id: number | string
  name: string
  user_id: string
  phone?: string | null
  role?: 'ADMIN' | 'USER' | null
  state?: 'ACTIVE' | 'SUSPENDED' | null
  join_date?: string | null
}

type Props = {
  rows: Row[]
  page: number
  totalPages: number
  onPageChange: (next: number) => void
  on_toggle_account?: (row: Row, next: boolean) => void
  on_open_actions?: (row: Row) => void
}

const ROLE_LABEL: Record<string, string> = { ADMIN: '관리자', USER: '일반회원' }
const STATE_LABEL: Record<string, string> = { ACTIVE: 'ON', SUSPENDED: 'OFF' }

const toRoleLabel = (role?: string | null) => (role ? ROLE_LABEL[role.toUpperCase()] ?? role : '-')
const toStateLabel = (state?: string | null) => (state ? STATE_LABEL[state.toUpperCase()] ?? state : '-')
const stateToBoolean = (state?: string | null) => (state ?? '').toUpperCase() === 'ACTIVE'

export default function MemberTable({
  rows,
  page,
  totalPages,
  onPageChange,
  on_toggle_account,
  on_open_actions,
}: Props) {
  const page_rows = rows

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
            <div className="m_role">{toRoleLabel(r.role)}</div>
            <div className="m_sub">{toStateLabel(r.state)}</div>
          </div>

          <div className="m_cell">{r.phone ?? '-'}</div>
          <div className="m_cell">{formatJoinDate(r.join_date)}</div>

          <div className="m_cell">
            <label className="switch">
              <input
                type="checkbox"
                checked={stateToBoolean(r.state)}
                onChange={(e) => on_toggle_account?.(r, e.target.checked)}
              />
              <span className="slider" />
            </label>
            <span className={`onoff ${stateToBoolean(r.state) ? 'on' : 'off'}`}>
              {stateToBoolean(r.state) ? 'ON' : 'OFF'}
            </span>
          </div>

          <div className="m_cell actions">
            <button className="icon_btn" onClick={() => on_open_actions?.(r)}>⋯</button>
          </div>
        </div>
      ))}

      <div className="m_pagination">
        <button className="btn_sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          ◀
        </button>

        <div className="pages">
          {Array.from({ length: Math.max(1, totalPages) }).map((_, i) => {
            const n = i + 1
            return (
              <button
                key={n}
                className={`page_btn ${n === page ? 'active' : ''}`}
                onClick={() => onPageChange(n)}
              >
                {n}
              </button>
            )
          })}
        </div>

        <button className="btn_sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          ▶
        </button>
      </div>
    </div>
  )
}