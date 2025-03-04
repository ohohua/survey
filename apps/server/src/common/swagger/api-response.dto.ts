import { ApiProperty } from '@nestjs/swagger'

export class ApiResponse<T> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '提示信息', example: '操作成功' })
  msg: string

  @ApiProperty({ description: '数据' })
  data: T
}
