import post from "@/utils/request";
import {LoginBody, RegisterBody} from "@/api/type";

export function registerApi<T>(params:RegisterBody) {
    return post<T>({
        url: '/auth/register',
        data: params,
    })
}

export function loginApi<T>(params:LoginBody) {
    return post<T>({
        url: '/auth/login',
        data: params,
    })
}