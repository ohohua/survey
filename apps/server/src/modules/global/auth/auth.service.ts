import { Injectable } from '@nestjs/common'
import { generateRSAKeys } from 'src/utils/rsa'

@Injectable()
export class AuthService {
  private readonly keys = generateRSAKeys() // 应用启动时生成一次

  getPublicKey() {
    return this.keys.publicKey
  }

  getPrivateKey() {
    return this.keys.privateKey
  }
}
