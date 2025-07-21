// 全局拦截器，用于更改响应格式
// 创建快捷语法： nest g interceptor xxx --flat
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import type { Response } from 'express'
import type { Observable } from 'rxjs'
import { HttpStatus, Injectable } from '@nestjs/common'
import { map } from 'rxjs'
import { RESPONSE_MSG } from 'src/enums'
import { ApiResponseVo } from '../swagger/api-response.vo'

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse<Response>()
    const request = context.switchToHttp().getRequest()

    return next.handle().pipe(
      map((data) => {
        // nest中POST 请求返回201，改为200
        if (request.method === 'POST') {
          if (response.statusCode === HttpStatus.CREATED) {
            response.status(HttpStatus.OK)
          }
        }

        return new ApiResponseVo(
          response.statusCode,
          RESPONSE_MSG.SUCCESS,
          data,
          new Date().getTime(),
        )
      }),
    )
  }
}
