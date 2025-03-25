import type * as Minio from 'minio'
import { Controller, Get, HttpStatus, Inject, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiResponseVo } from '../dto/api-response.dto'

@ApiTags('Minio')
@Controller('admin/minio')
export class ModuleController {
  @Inject('MINIO_CLIENT')
  private minioClient: Minio.Client

  @ApiOperation({ summary: '获取预签名' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Get('presignedUrl')
  presignedUrl(@Query('filename') filename: string) {
    return this.minioClient.presignedPutObject('survey', filename, 3600) // 生成预签名
  }
}
