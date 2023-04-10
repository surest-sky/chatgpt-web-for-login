import {UserInfo} from "@/store/modules/user/helper";

export interface Response {
    code: number
    message: string
    data: any,
    status: 'Success' | 'Fail'
}

export interface SessionResponse {
    auth: boolean
    model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI',
    user?: UserInfo,
}