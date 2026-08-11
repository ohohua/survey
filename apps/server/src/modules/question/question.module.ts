import { Module } from '@nestjs/common'
import { ClientQuestionController } from './client-question.controller'
import { QuestionController } from './question.controller'
import { QuestionService } from './question.service'

@Module({
  imports: [],
  providers: [QuestionService],
  controllers: [QuestionController, ClientQuestionController],
})
export class QuestionModule { }
