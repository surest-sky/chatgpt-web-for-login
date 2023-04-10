import fs from 'fs'
import * as console from "console";
export function record(value: string) {
  // 获取一个时间 2021-08-01 12:00:00
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  fs.appendFile('record.txt', `${time} ${value} \n`, (err) => {
    if (err)
      throw err
  })
}

function byteLength(str) {
  // 将 Unicode 字符转换为十六进制编码，并计算其长度
  let bytes = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0x7f) {
      bytes += 1;
    } else if (code <= 0x7ff) {
      bytes += 2;
    } else if (code <= 0xffff) {
      bytes += 3;
    } else {
      bytes += 4;
    }
  }
  return bytes;
}


// 将数据缓存到指定的文件中
export function cacheParentMessageIdToFile(parentMessageId: string, content: string): any{
  fs.appendFile(`messages/${parentMessageId}.txt`, `${content} \n`, (err) => {
    if (err)
      throw err
  })
}

// 获取缓存文件中的内容长度
export function getCacheFileLength(parentMessageId: string): number{
  if(!fs.existsSync(`messages/${parentMessageId}.txt`)) {
    return 0;
  }
  const data = fs.readFileSync(`messages/${parentMessageId}.txt`, 'utf8');
  if(data) {
    return 0;
  }
  return byteLength(data)
}

