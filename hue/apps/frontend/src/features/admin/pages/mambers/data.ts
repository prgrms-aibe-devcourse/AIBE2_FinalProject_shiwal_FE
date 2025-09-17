export type member_role = 'owner' | 'admin' | 'counselor' | 'member'
export type member_state = 'active' | 'suspended' | 'inactive' | 'deleted'

export type member_row = {
    id: string
    name: string
    user_id: string        // 아이디(로그인용/표시용)
    role: member_role
    state: member_state
    phone: string
    join_date: string      // 'YYYY-MM-DD'
    temp_pw_issued: boolean
    account_on: boolean    // 스위치 ON/OFF
}

// 더미 20건
export const mock_members: member_row[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `${i + 1}`,
    name: ['식빵맨', '장정현'][i % 2],
    user_id: 'asdfasdf123',
    role: (['owner', 'admin', 'member', 'member', 'member'][i % 5]) as member_role,
    state: (['active','active','active','suspended','inactive'][i % 5]) as member_state,
    phone: '010 1234 1234',
    join_date: '2025-08-27',
    temp_pw_issued: false,
    account_on: i % 4 !== 3, // 임의로 OFF 포함
}))