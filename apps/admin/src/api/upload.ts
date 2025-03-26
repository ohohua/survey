import { http, PREFIX } from './index'

/**
 * 获取预签名
 * @param filename 文件名
 * @returns 返回预签名url
 */
export const getPresignedUrl = (filename: string) => http.get<string>(`${PREFIX}/minio/presignedUrl`, { filename })

/**
 * 上传文件, 直接上传文件到minio，服务端直接返回文件url
 * @param file
 * @returns url 文件url
 */
export const uploadFile = (file: File) => http.upload(`${PREFIX}/minio/upload`, file)
