import dayjs from "dayjs";
import * as path from "path";
import fs from "fs";
import * as console from "console";

interface SendResponseOptions<T = any> {
    type: 'Success' | 'Fail'
    message?: string
    data?: T
}

export function sendResponse<T>(options: SendResponseOptions<T>) {
    if (options.type === 'Success') {
        return Promise.resolve({
            message: options.message ?? null,
            data: options.data ?? null,
            status: options.type,
        })
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
        message: options.message ?? 'Failed',
        data: options.data ?? null,
        status: options.type,
    })
}

// 根据时间戳, 随机生成指定长度的int字符串
export function generateRandomIntString(length: number): number {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    const arr = result.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return parseInt(arr.join('').padStart(length, '0'));
}

// 将日志以时间进行切割输出到文件中
export function appendSqlLog(sql) {
    const logFile = 'sql';
    const currentDate = dayjs().format('YYYY-MM-DD') ;
    const logFileName = `${logFile}_${currentDate}.log`;
    const logPath = path.join(process.cwd(), 'logs', logFileName);

    // 首先检查日志文件是否存在，如果不存在则创建它。
    if (!fs.existsSync(logPath)) {
        fs.writeFileSync(logPath, '');
    }

    // 追加 SQL 日志到文件中
    fs.appendFileSync(logPath, sql + '\n');
}