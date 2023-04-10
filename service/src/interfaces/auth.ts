export interface RegisterBody {
    account: string,
    email: string,
    phone?: string,
    password: string,
    ip: string,
    code: string,
}

export interface EmailVerifyCodeBody {
    email: string,
    scene: string,
}

export interface ServiceBody {
    isSuccessful: boolean,
    message?: string
}
export interface LoginServiceBody {
    isSuccessful: boolean,
    message?: string,
    user?: JwtUser,
}

export interface LoginBody {
    account: string,
    password: string,
}

export interface JwtUser {
    account: string,
    email: string,
    token: string,
    userId: number,
    balance: number,
}