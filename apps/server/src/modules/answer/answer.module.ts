import { Module } from '@nestjs/common'
import { AdminAnswerController, ClientAnswerController } from './answer.controller'
import { AnswerService } from './answer.service'

@Module({
  imports: [],
  providers: [AnswerService],
  controllers: [ClientAnswerController, AdminAnswerController],
})
export class AnswerModule { }
