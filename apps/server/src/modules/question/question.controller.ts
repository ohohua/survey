import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/common/decorators/auth.decorator'
import { ApiResponseVo } from 'src/common/swagger/api-response.vo'
import { CopyQuestionDto, CreateQuestionDto, UpdateQuestionDto } from './model/question.dto'
import { QuestionService } from './question.service'

@ApiTags('问卷')
@Controller('admin/question')
export class QuestionController {
  constructor(private service: QuestionService) { }

  @ApiOperation({ summary: '新建问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiBody({ type: CreateQuestionDto, description: '' })
  @Auth()
  @Post()
  newQuestionnaire(@Body() dto: CreateQuestionDto) {
    return this.service.newQuestionnaire(dto)
  }

  @ApiOperation({ summary: '修改问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiBody({ type: UpdateQuestionDto, description: '' })
  @Auth()
  @Put()
  updateQuestionnaire(@Body() dto: UpdateQuestionDto) {
    return this.service.editQuestionnaire(dto)
  }

  @ApiOperation({ summary: '发布问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @Auth()
  @Patch(':id')
  issueQuestionnaire(@Param('id') id: string) {
    return this.service.issueQuestionnaire(id)
  }

  @ApiOperation({ summary: '问卷列表' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiQuery({ name: 'current', type: Number, description: '页码', required: true })
  @ApiQuery({ name: 'pageSize', type: Number, description: '分页大小', required: true })
  @ApiQuery({ name: 'title', type: String, description: '问卷名称', required: false })
  @Auth()
  @Get()
  loadQuestionList(@Query('current') current: number, @Query('pageSize') pageSize: number, @Query('title') title: string) {
    return this.service.loadQuestionList(current, pageSize, title)
  }

  @ApiOperation({ summary: '星标问卷列表' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiQuery({ name: 'current', type: Number, description: '页码', required: true })
  @ApiQuery({ name: 'pageSize', type: Number, description: '分页大小', required: true })
  @ApiQuery({ name: 'title', type: String, description: '问卷名称', required: false })
  @Auth()
  @Get('star-list')
  loadQuestionStarList(@Query('current') current: number, @Query('pageSize') pageSize: number, @Query('title') title: string) {
    return this.service.loadQuestionStarList(current, pageSize, title)
  }

  @ApiOperation({ summary: '回收站问卷列表' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiQuery({ name: 'current', type: Number, description: '页码', required: true })
  @ApiQuery({ name: 'pageSize', type: Number, description: '分页大小', required: true })
  @ApiQuery({ name: 'title', type: String, description: '问卷名称', required: false })
  @Auth()
  @Get('trash-list')
  loadQuestionTrashList(@Query('current') current: number, @Query('pageSize') pageSize: number, @Query('title') title: string) {
    return this.service.loadQuestionTrashList(current, pageSize, title)
  }

  @ApiOperation({ summary: '回收站问卷删除' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'ids', type: String, description: '问卷id，以逗号分隔', required: true })
  @Auth()
  @Delete('trash/:ids')
  deleteQuestionTrash(@Param('ids') ids: string) {
    return this.service.deleteQuestionTrash(ids)
  }

  @ApiOperation({ summary: '问卷详情' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get(':id')
  loadDetail(@Param('id') id: string) {
    return this.service.loadDetail(id)
  }

  @ApiOperation({ summary: '问卷标星' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Patch('star/:id')
  starQuestion(@Param('id') id: string) {
    return this.service.starQuestionnaire(id)
  }

  @ApiOperation({ summary: '删除问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @Auth()
  @Delete(':id')
  deleteQuestion(@Param('id') id: string) {
    return this.service.deleteQuestionnaire(id)
  }

  @ApiOperation({ summary: '复制问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiBody({ type: CopyQuestionDto, description: '' })
  @Auth()
  @Post('copy')
  copyQuestion(@Body('id') id: string) {
    return this.service.copyQuestionnaire(id)
  }

  @ApiOperation({ summary: '恢复问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @Auth()
  @Patch('restore/:ids')
  restoreQuestion(@Param('ids') ids: string) {
    return this.service.restoreQuestionnaire(ids)
  }
}
