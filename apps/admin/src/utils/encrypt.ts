import forge from 'node-forge'

export function encryptWithPublicKey(password: string, publicKey: string) {
  try {
    // 解析公钥
    const publicKeyObj = forge.pki.publicKeyFromPem(publicKey)
    // 使用 OAEP 加密（哈希算法与后端一致，这里用 sha256）
    const encrypted = publicKeyObj.encrypt(
      password,
      'RSA-OAEP', // 指定 OAEP 模式
      { md: forge.md.sha256.create() }, // 哈希算法
    )
    // 转为 base64 字符串返回
    return forge.util.encode64(encrypted)
  }
  catch (err) {
    console.error('加密失败:', err)
    return null
  }
}
