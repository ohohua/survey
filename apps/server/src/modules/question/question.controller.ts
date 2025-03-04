import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiResponseVo } from 'src/common/dto/api-response.dto'
import { QuestionService } from './question.service'

@ApiTags('问卷')
@Controller('question')
export class QuestionController {
  constructor(private service: QuestionService) { }

  @ApiOperation({ summary: '新建问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Post('create')
  create() {
    return this.service.create()
  }

  @ApiOperation({ summary: '查询问卷' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Get(':id')
  query(@Param('id') id: string) {
    // TODO
    return id
  }
}
