import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './model/user.dto'
import { LoginVo } from './model/user.vo'
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
    return {
      token: dto.toString(),
    }
  }

  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: '' })
  @Post('register')
  async register() {
    return this.service.test()
    // return new LoginDto()
  }
}
