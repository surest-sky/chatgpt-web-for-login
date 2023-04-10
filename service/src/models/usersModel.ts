interface UsersModel {
    id?: number,
    account: string,
    user_id?: number,
    phone?: string,
    email: string,
    password?: string,
    ip?: string,
    created_at?: string,
    updated_at?: string,
    login_at?: string,
    balance: number,
}

export default UsersModel