import { ApiProperty } from '@nestjs/swagger'

export class LoginVo {
  @ApiProperty({ description: 'token' })
  token: string
}

export class RegisterVo {
  @ApiProperty({ description: '用户名' })
  username: string
}
