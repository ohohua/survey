// 创建一个全局异常过滤器来处理所有的异常，并将其转换为统一的响应格式
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import type { Response } from 'express'
import { Catch, HttpException, HttpStatus } from '@nestjs/common'

import { responseMessage } from '../../utils'

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // 获取上下文
    const ctx = host.switchToHttp()
    // 获取响应体
    const response = ctx.getResponse<Response>()
    // 获取状态码，判断是HTTP异常还是服务器异常
    const statusCode
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    // 自定义异常返回体
    response
      .status(statusCode)
      .json(responseMessage(null, '服务器内部错误!', statusCode))
  }
}
