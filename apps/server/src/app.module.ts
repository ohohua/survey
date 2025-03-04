import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ComponentModule } from './modules/component/component.module'
import { GlobalModule } from './modules/global/global.module'
import { QuestionModule } from './modules/question/question.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [UserModule, GlobalModule, QuestionModule, ComponentModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
