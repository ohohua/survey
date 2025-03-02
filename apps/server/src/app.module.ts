import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GlobalModule } from './modules/global/global.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [UserModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
