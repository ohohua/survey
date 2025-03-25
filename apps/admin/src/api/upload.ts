import { http, PREFIX } from './index'

/**
 * 获取预签名
 * @param filename 文件名
 * @returns 返回预签名url
 */
export const getPresignedUrl = (filename: string) => http.get<string>(`${PREFIX}/minio/presignedUrl`, { filename })
