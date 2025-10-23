import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './common/auth/auth.module'
import { MinioModule } from './common/minio/minio.module'
import { AnswerModule } from './modules/answer/answer.module'
import { ComponentModule } from './modules/component/component.module'
import { GlobalModule } from './modules/global/global.module'
import { QuestionModule } from './modules/question/question.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    GlobalModule,
    ComponentModule,
    QuestionModule,
    UserModule,
    MinioModule,
    AnswerModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
