import { Module } from '@nestjs/common'
import { AnswerController } from './answer.controller'
import { AnswerService } from './answer.service'

@Module({
  imports: [],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule { }
