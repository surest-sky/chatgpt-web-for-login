interface Apikey {
    id?: number,
    use_count: number,
    api_key: string,
    ip: string,
    created_at: string,
    updated_at: string,
    user_id: number
}

export default Apikey