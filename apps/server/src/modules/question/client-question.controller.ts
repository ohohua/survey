import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiResponseVo } from 'src/common/swagger/api-response.vo'
import { QuestionService } from './question.service'

@ApiTags('答题端问卷')
@Controller('client/question')
export class ClientQuestionController {
  constructor(private service: QuestionService) { }

  @ApiOperation({ summary: '已发布问卷详情' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Get(':id')
  loadPublishedDetail(@Param('id') id: string) {
    return this.service.loadPublishedDetail(id)
  }
}
