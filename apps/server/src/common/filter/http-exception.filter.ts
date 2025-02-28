// 它负责捕获作为 HttpException 类实例的异常，并为它们设置自定义响应逻辑。
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import type { Response } from 'express'
import { Catch, HttpException } from '@nestjs/common'

import { responseMessage } from '../../utils'

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取上下文
    const ctx = host.switchToHttp()
    // 获取响应体
    const response = ctx.getResponse<Response>()
    // 获取状态码
    const statusCode = exception.getStatus()
    // 获取 class-validator 校验的错误信息
    const getResponse = exception.getResponse() as { message: string[] }
    const msg = getResponse.message ? getResponse.message.toString() : exception.message
    // 自定义异常返回体
    response
      .status(statusCode)
      .json(responseMessage(null, msg, statusCode))
  }
}
