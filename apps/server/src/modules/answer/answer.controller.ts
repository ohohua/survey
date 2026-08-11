import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/common/decorators/auth.decorator'
import { AnswerService } from './answer.service'
import { SubmitAnswerDto } from './model/answer.dto'

class LoginVo { }

@ApiTags('答题端答卷')
@Controller('client/answer')
export class ClientAnswerController {
  constructor(private service: AnswerService) { }

  @ApiOperation({ summary: '提交答案' })
  @ApiBody({ type: SubmitAnswerDto })
  @ApiResponse({ type: LoginVo, status: HttpStatus.OK, description: '请求成功' })
  @Post('submit')
  submit(@Body() dto: SubmitAnswerDto) {
    return this.service.submitAnswer(dto)
  }
}

@ApiTags('答卷统计')
@Controller('admin/answer')
export class AdminAnswerController {
  constructor(private service: AnswerService) { }

  @ApiOperation({ summary: '问卷答卷统计' })
  @ApiResponse({ type: LoginVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('stat/:questionId')
  stat(
    @Param('questionId') questionId: string,
    @Query('current') current = 1,
    @Query('pageSize') pageSize = 20,
  ) {
    return this.service.loadAnswerStat(questionId, Number(current), Number(pageSize))
  }
}
