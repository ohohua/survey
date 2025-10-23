import { Buffer } from 'node:buffer'
import * as crypto from 'node:crypto'

// 生成 RSA 密钥对（保持不变，但确保支持 OAEP）
export function generateRSAKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  })
  return { publicKey, privateKey }
}

// 使用 RSA_PKCS1_OAEP_PADDING 解密
export function decryptPassword(encryptedPassword: string, privateKey: string) {
  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // OAEP 填充
      oaepHash: 'sha256', // 可选：指定哈希算法（前后端需一致）
    },
    Buffer.from(encryptedPassword, 'base64'),
  ).toString()
}
