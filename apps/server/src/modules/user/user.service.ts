import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { user } from '@survey/schema'
import { eq } from 'drizzle-orm'
import { AuthService } from 'src/modules/global/auth/auth.service'
import { decryptPassword } from 'src/utils/rsa'
import { DB, DbType } from '../global/providers/db.provider'
import { LoginDto, RegisterDto } from './model/user.dto'

const logger = new Logger('UserService')
@Injectable()
export class UserService {
  @Inject(DB)
  private db: DbType

  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(AuthService)
  private authService: AuthService

  async test() {
    try {
      // return await this.db.select().from(user).where(eq(user.id, ))
    }
    catch (e) {
      logger.error(e)
    }
  }

  async login(dto: LoginDto) {
    const { username, password } = dto
    const privateKey = this.authService.getPrivateKey()
    const decryptedPassword = decryptPassword(password, privateKey)
    const hasUser = await this.db.select().from(user).where(eq(user.username, username))
    if (!hasUser.length) {
      throw new BadRequestException('用户不存在')
    }
    const loginUser = hasUser[0]
    if (decryptedPassword !== loginUser.password) {
      throw new BadRequestException('密码错误')
    }

    return {
      token: this.jwtService.sign({ id: loginUser.id, username: loginUser.username }, {
        expiresIn: '7d',
      }),
    }
  }

  async register(dto: RegisterDto) {
    const { username, password } = dto
    const privateKey = this.authService.getPrivateKey()
    const decryptedPassword = decryptPassword(password, privateKey)
    const hasUser = await this.db.select().from(user).where(eq(user.username, username))
    if (hasUser.length) {
      throw new BadRequestException('用户已存在')
    }

    try {
      await this.db.insert(user).values({
        username,
        password: decryptedPassword,
        name: '',
        age: 0,
        email: '',
      })

      return '注册成功'
    }
    catch (error) {
      throw new BadRequestException(error)
    }
  }
}
