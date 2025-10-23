import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDto, RegisterDto } from './model/user.dto'
import { LoginVo, RegisterVo } from './model/user.vo'
import { UserService } from './user.service'

@ApiTags('用户')
@Controller('admin/user')
export class UserController {
  constructor(private service: UserService) { }

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: LoginVo, status: HttpStatus.OK, description: '请求成功' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto)
  }

  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ type: RegisterVo, status: HttpStatus.OK, description: '请求成功' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.service.register(dto)
  }
}
