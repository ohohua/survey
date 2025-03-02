import type * as Minio from 'minio'
import { Controller, Get, Inject, Query } from '@nestjs/common'

@Controller('minio')
export class ModuleController {
  @Inject('MINIO_CLIENT')
  private minioClient: Minio.Client

  @Get('presignedUrl')
  presignedUrl(@Query('filename') filename: string) {
    return this.minioClient.presignedPutObject('chat-room', filename, 3600) // 生成预签名，前端使用预签名地址上传文件
  }
}
