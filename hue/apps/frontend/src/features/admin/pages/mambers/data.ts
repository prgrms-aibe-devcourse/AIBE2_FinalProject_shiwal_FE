export type member_role = 'owner' | 'admin' | 'counselor' | 'member'
export type member_state = 'active' | 'suspended' | 'inactive' | 'deleted'

export type member_row = {
    id: string
    name: string
    user_id: string
    role: member_role
    state: member_state
    phone: string
    join_date: string
    temp_pw_issued: boolean
    account_on: boolean
}