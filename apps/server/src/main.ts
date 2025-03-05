import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filter/all-exception.filter'
import { HttpExceptionsFilter } from './common/filter/http-exception.filter'
import { FormatResponseInterceptor } from './common/interceptor/format-response.interceptor'
import { swaggerSetup } from './common/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 启用 swagger
  swaggerSetup(app)
  // 设置前缀
  app.setGlobalPrefix('api')
  // 允许跨域
  app.enableCors({ origin: [/^http:\/\/localhost(:\d+)?$/, /^http:\/\/xxx\.xxx\.com(:81)?$/] })
  // 启用管道校验
  app.useGlobalPipes(new ValidationPipe({ transform: true })) // transform: true 将参数转化为Dto实例
  // 启用修改响应格式拦截器
  app.useGlobalInterceptors(new FormatResponseInterceptor())
  // 所有异常过滤
  app.useGlobalFilters(new AllExceptionsFilter())
  // http异常过滤
  app.useGlobalFilters(new HttpExceptionsFilter())

  await app.listen(process.env.PORT ?? 8888)
}
bootstrap()
