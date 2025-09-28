// src/features/admin/pages/members/index.tsx
import './members.css'
import MemberTable from './components/member_table'
import { useEffect, useMemo, useState } from 'react'
// import { AdminApi } from '../../../../lib/adminApi'

type ApiUser = {
    id: number
    name?: string
    nickname?: string
    email?: string
    role?: string
    state?: string
    riskLevel?: string
    joinedAt?: string
    phone?: string
}

type Row = React.ComponentProps<typeof MemberTable>['rows'][number]

const mapUserToRow = (u: ApiUser): Row => ({
    id: String(u.id),
    name: u.name ?? u.nickname ?? u.email ?? '',
    user_id: u.email ?? u.nickname ?? String(u.id),
    role: (u.role as any) ?? 'USER',
    state: (u.state as any) ?? 'ACTIVE',
    phone: u.phone ?? '',
    join_date: u.joinedAt ?? '',
})

export default function Members_page() {
    const [rows, setRows] = useState<Row[]>([])
    const [loading, setLoading] = useState(true)

    // ⭐ 페이지 상태 추가
    const [page, setPage] = useState(1) // 프론트는 1-base
    const [totalPages, setTotalPages] = useState(1)

    // 🔎 검색어
    const [search, setSearch] = useState('')

    // ⏳ 타이핑 중 과도한 호출 방지 (300ms 디바운스)
    const debounced = useMemo(() => search.trim(), [search])
    const [debouncedSearch, setDebouncedSearch] = useState(debounced)
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(debounced), 300)
        return () => clearTimeout(t)
    }, [debounced])

    // 📡 목록 호출 (검색어 + 페이지 반영)
    useEffect(() => {
        setLoading(true)
        AdminApi.getUsers({ q: debouncedSearch, page: page - 1, size: 10 })
            .then((res) => {
                const list: ApiUser[] = res.data?.content ?? []
                setRows(list.map(mapUserToRow))
                setTotalPages(res.data?.totalPages ?? 1)
            })
            .catch((err) => {
                console.error(err)
                alert('사용자 목록을 불러오지 못했습니다.')
            })
            .finally(() => setLoading(false))
    }, [debouncedSearch, page])

    const toggle_account = async (r: Row, next: boolean) => {
        // 낙관적 UI 업데이트
        const prev = rows
        const nextState: "ACTIVE" | "SUSPENDED" = next ? "ACTIVE" : "SUSPENDED"
        setRows(prev => prev.map(x => x.id === r.id ? { ...x, state: nextState } : x))

        try {
            await AdminApi.updateUserState(r.id, nextState, next ? undefined : "관리자에서 비활성화")
            // 성공 시 추가 처리 없음
        } catch (e) {
            console.error(e)
            alert("상태 변경에 실패했습니다.")
            // 실패 시 롤백
            setRows(prev)
        }
    }

    const open_actions: React.ComponentProps<
        typeof MemberTable
    >['on_open_actions'] = (r) => {
        alert(`액션: ${r.name}`)
    }

    return (
        <div className="members_wrap">
            <h1>관리자 계정</h1>

            <section className="panel">
                <div className="row">
                    <button
                        className="btn"
                        onClick={() => {
                            setSearch('')
                            setPage(1)
                        }}
                    >
                        사용자 목록
                    </button>
                    <input
                        className="input"
                        placeholder="검색 (이름/이메일/닉네임)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setDebouncedSearch(search.trim())
                                setPage(1)
                            }
                        }}
                    />
                </div>
            </section>

            <section className="panel" style={{ padding: 0 }}>
                {loading ? (
                    <div style={{ padding: 16 }}>로딩중...</div>
                ) : (
                    <MemberTable
                        rows={rows}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        on_toggle_account={toggle_account}
                        on_open_actions={open_actions}
                    />
                )}
            </section>
        </div>
    )
}