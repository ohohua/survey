import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { knife4jSetup } from 'nest-knife4j'

/**
 * 注册 swagger 插件，支持 knife4j
 * swagger: localhost:port/api
 * knife4j: localhost:port/doc.html
 * @param app
 */
export function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('问卷系统')
    .setDescription('web端和c端接口文档')
    .setVersion('1.0')
    .addTag('dev')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  knife4jSetup(app, [{
    name: '2.X版本',
    url: `/api-json`,
    swaggerVersion: '3.0',
    location: `/api-json`,
  }])
}
