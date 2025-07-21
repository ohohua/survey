import { ApiProperty } from '@nestjs/swagger'
import { RESPONSE_CODE, RESPONSE_MSG } from '../../enums'

class _Test {
  @ApiProperty({ type: 'number', description: 'id' })
  id: string

  @ApiProperty({ type: 'string', description: '姓名' })
  name: string
}

export class ApiResponseVo<T = any> {
  constructor(code: number, msg: string, data?: T, timestamp?: number) {
    this.code = code || RESPONSE_CODE.SUCCESS
    this.msg = msg || RESPONSE_MSG.SUCCESS
    this.data = data
    this.timestamp = timestamp || Date.now()
  }

  @ApiProperty({ type: 'number', description: '状态码', default: RESPONSE_CODE.SUCCESS })
  code: number

  @ApiProperty({ type: 'string', description: '提示信息', default: RESPONSE_MSG.SUCCESS })
  msg: string

  // additionalProperties 允许接受任意的一个或多个键值对，旨在处理未知或动态属性
  @ApiProperty({ type: 'object', description: '业务数据', additionalProperties: true })
  data?: T

  @ApiProperty({ type: 'number', description: '时间戳', default: 1720685424078 })
  timestamp: number
}
