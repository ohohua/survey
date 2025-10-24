import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginVo } from 'src/modules/user/model/user.vo'
import { AuthService } from './auth.service'

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '获取公钥' })
  @ApiResponse({ type: LoginVo, status: HttpStatus.OK, description: '请求成功' })
  @Get('public-key')
  getPublicKey() {
    return { publicKey: this.authService.getPublicKey() }
  }
}
