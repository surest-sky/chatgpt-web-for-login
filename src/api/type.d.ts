interface EmailVerification {
    email: string,
    scene: string
}

export interface RegisterBody {
    account: string,
    email: string,
    phone?: string,
    password: string,
    code: number,
}

export interface LoginBody {
    account: string,
    password: string,
}