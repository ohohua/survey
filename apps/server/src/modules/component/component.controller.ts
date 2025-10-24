import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/common/decorators/auth.decorator'
import { ApiResponseVo } from 'src/common/swagger/api-response.vo'
import { ComponentService } from './component.service'
import { CreateComponentDto } from './model/component.dto'

@ApiTags('组件')
@Controller('admin/component')
export class ComponentController {
  constructor(private service: ComponentService) { }

  @ApiOperation({ summary: '新建组件' })
  @ApiBody({ type: CreateComponentDto })
  @ApiOkResponse({ type: ApiResponseVo, description: '请求成功' })
  @Auth()
  @Post()
  create(@Body() dto: CreateComponentDto) {
    return this.service.create(dto)
  }

  @ApiOperation({ summary: '查询组件列表' })
  @ApiParam({ description: '问卷id', name: 'id', type: String, required: true })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get(':id')
  getComponentList(@Param('id') id: string) {
    return this.service.getComponentListByQuestionId(id)
  }
}
