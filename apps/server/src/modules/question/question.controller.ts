import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiResponseVo } from 'src/common/dto/api-response.dto'
import { CopyQuestionDto, CreateQuestionDto, UpdateQuestionDto } from './model/question.dto'
import { QuestionService } from './question.service'

@ApiTags('问卷')
@Controller('admin/question')
export class QuestionController {
  constructor(private service: QuestionService) { }

  @ApiOperation({ summary: '新建问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiBody({ type: CreateQuestionDto, description: '' })
  @Post()
  newQuestionnaire(@Body() dto: CreateQuestionDto) {
    return this.service.newQuestionnaire(dto)
  }

  @ApiOperation({ summary: '修改问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiBody({ type: UpdateQuestionDto, description: '' })
  @Put()
  updateQuestionnaire(@Body() dto: UpdateQuestionDto) {
    return this.service.editQuestionnaire(dto)
  }

  @ApiOperation({ summary: '发布问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @Patch(':id')
  issueQuestionnaire(@Param('id') id: string) {
    return this.service.issueQuestionnaire(id)
  }

  @ApiOperation({ summary: '问卷列表' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiQuery({ name: 'pageIndex', type: Number, description: '页码', required: true })
  @ApiQuery({ name: 'pageSize', type: Number, description: '分页大小', required: true })
  @ApiQuery({ name: 'title', type: String, description: '问卷名称', required: false })
  @Get()
  loadQuestionList(@Query('pageIndex') pageIndex: number, @Query('pageSize') pageSize: number, @Query('title') title: string) {
    return this.service.loadQuestionList(pageIndex, pageSize, title)
  }

  @ApiOperation({ summary: '问卷详情' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Get(':id')
  loadDetail(@Param('id') id: string) {
    return this.service.loadDetail(id)
  }

  @ApiOperation({ summary: '问卷标星' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Patch('star/:id')
  starQuestion(@Param('id') id: string) {
    return this.service.starQuestionnaire(id)
  }

  @ApiOperation({ summary: '删除问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @Delete(':id')
  deleteQuestion(@Param('id') id: string) {
    return this.service.deleteQuestionnaire(id)
  }

  @ApiOperation({ summary: '复制问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiBody({ type: CopyQuestionDto, description: '' })
  @Post('copy')
  copyQuestion(@Body('id') id: string) {
    return this.service.copyQuestionnaire(id)
  }
}
