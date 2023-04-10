import {Response} from "../types";

export default (data: any, message: string = '', code: number = 200): Response => {
    return {
        code,
        message,
        data,
        status: code === 200 ? 'Success' : 'Fail'
    }
}