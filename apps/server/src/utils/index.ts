import type { Response } from '../typings'
import { createHash } from 'node:crypto'
import { RESPONSE_CODE, RESPONSE_MSG } from '../enums'

export function md5(str) {
  const hash = createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}

/**
 * @description: 统一返回体
 */
export function responseMessage<T = any>(data, msg: string = RESPONSE_MSG.SUCCESS, code: number = RESPONSE_CODE.SUCCESS): Response<T> {
  return { data, msg, code }
}

// 区分环境
export const environment = {
  production: process.env.NODE_ENV,
  host: process.env.HOST,
}

/**
 * 将对象转换成字符串
 * @param obj
 */
export function objectToQueryString(obj: { [key: string]: any }): string {
  return Object.keys(obj)
    .map((key) => {
      if (Array.isArray(obj[key])) {
        return obj[key]
          .map(
            value =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
          )
          .join('&')
      }
      else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      }
    })
    .join('&')
}
