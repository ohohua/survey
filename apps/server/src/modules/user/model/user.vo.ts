import { ApiProperty } from '@nestjs/swagger'

export class LoginVo {
  @ApiProperty({ description: 'token' })
  token: string
}
