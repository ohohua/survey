import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@ApiTags('测试')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiParam({ name: 'type', type: Number, description: '返回类型: 1, 2', required: false })
  @ApiQuery({ name: 'content', type: String, description: '返回内容', required: false })
  @ApiOperation({ summary: '测试接口', description: '接口描述' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @Get('test:type')
  getHello(@Param('type', ParseIntPipe) type: number, @Query('content') content: string): string {
    return this.appService.getHello(type, content)
  }
}
