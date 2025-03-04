import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiResponseVo } from 'src/common/dto/api-response.dto'
import { ComponentService } from './component.service'
import { CreateComponentDto } from './model/component.dto'

@ApiTags('组件')
@Controller('component')
export class ComponentController {
  constructor(private service: ComponentService) { }

  @ApiOperation({ summary: '新建组件' })
  @ApiBody({ type: CreateComponentDto })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Post('create')
  create(@Body() dto: CreateComponentDto) {
    return this.service.create(dto)
  }
}
