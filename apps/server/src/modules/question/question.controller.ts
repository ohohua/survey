import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Req } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
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
  newQuestionnaire(@Body() dto: CreateQuestionDto, @Req() req: Request) {
    return this.service.newQuestionnaire(dto, req.user.id)
  }

  @ApiOperation({ summary: '修改问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiBody({ type: UpdateQuestionDto, description: '' })
  @Auth()
  @Put()
  updateQuestionnaire(@Body() dto: UpdateQuestionDto, @Req() req: Request) {
    return this.service.editQuestionnaire(dto, req.user.id)
  }

  @ApiOperation({ summary: '发布问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @Auth()
  @Patch(':id')
  issueQuestionnaire(@Param('id') id: string, @Req() req: Request) {
    return this.service.issueQuestionnaire(id, req.user.id)
  }

  @ApiOperation({ summary: '问卷列表' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiQuery({ name: 'current', type: Number, description: '页码', required: true })
  @ApiQuery({ name: 'pageSize', type: Number, description: '分页大小', required: true })
  @ApiQuery({ name: 'title', type: String, description: '问卷名称', required: false })
  @Auth()
  @Get()
  loadQuestionList(@Query('current') current: number, @Query('pageSize') pageSize: number, @Query('title') title: string, @Req() req: Request) {
    return this.service.loadQuestionList(current, pageSize, title, req.user.id)
  }

  @ApiOperation({ summary: '星标问卷列表' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiQuery({ name: 'current', type: Number, description: '页码', required: true })
  @ApiQuery({ name: 'pageSize', type: Number, description: '分页大小', required: true })
  @ApiQuery({ name: 'title', type: String, description: '问卷名称', required: false })
  @Auth()
  @Get('star-list')
  loadQuestionStarList(@Query('current') current: number, @Query('pageSize') pageSize: number, @Query('title') title: string, @Req() req: Request) {
    return this.service.loadQuestionStarList(current, pageSize, title, req.user.id)
  }

  @ApiOperation({ summary: '回收站问卷列表' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiQuery({ name: 'current', type: Number, description: '页码', required: true })
  @ApiQuery({ name: 'pageSize', type: Number, description: '分页大小', required: true })
  @ApiQuery({ name: 'title', type: String, description: '问卷名称', required: false })
  @Auth()
  @Get('trash-list')
  loadQuestionTrashList(@Query('current') current: number, @Query('pageSize') pageSize: number, @Query('title') title: string, @Req() req: Request) {
    return this.service.loadQuestionTrashList(current, pageSize, title, req.user.id)
  }

  @ApiOperation({ summary: '首页概览' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('overview')
  loadOverview(@Req() req: Request) {
    return this.service.loadOverview(req.user.id)
  }

  @ApiOperation({ summary: '回收站问卷删除' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'ids', type: String, description: '问卷id，以逗号分隔', required: true })
  @Auth()
  @Delete('trash/:ids')
  deleteQuestionTrash(@Param('ids') ids: string, @Req() req: Request) {
    return this.service.deleteQuestionTrash(ids, req.user.id)
  }

  @ApiOperation({ summary: '问卷详情' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get(':id')
  loadDetail(@Param('id') id: string, @Req() req: Request) {
    return this.service.loadDetail(id, req.user.id)
  }

  @ApiOperation({ summary: '问卷标星' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Patch('star/:id')
  starQuestion(@Param('id') id: string, @Req() req: Request) {
    return this.service.starQuestionnaire(id, req.user.id)
  }

  @ApiOperation({ summary: '删除问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @Auth()
  @Delete(':id')
  deleteQuestion(@Param('id') id: string, @Req() req: Request) {
    return this.service.deleteQuestionnaire(id, req.user.id)
  }

  @ApiOperation({ summary: '复制问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiBody({ type: CopyQuestionDto, description: '' })
  @Auth()
  @Post('copy')
  copyQuestion(@Body('id') id: string, @Req() req: Request) {
    return this.service.copyQuestionnaire(id, req.user.id)
  }

  @ApiOperation({ summary: '恢复问卷' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @ApiParam({ name: 'id', type: String, required: true, description: '问卷id' })
  @Auth()
  @Patch('restore/:ids')
  restoreQuestion(@Param('ids') ids: string, @Req() req: Request) {
    return this.service.restoreQuestionnaire(ids, req.user.id)
  }
}
