import type * as Minio from 'minio'
import { BadRequestException, Controller, Get, HttpStatus, Inject, MaxFileSizeValidator, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiResponseVo } from '../swagger/api-response.vo'

@ApiTags('Minio')
@Controller('admin/minio')
export class ModuleController {
  @Inject('MINIO_CLIENT')
  private minioClient: Minio.Client

  // 方式1: 将上传路径返回给前端，前端使用axios上传
  @ApiOperation({ summary: '获取预签名' })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @Get('presignedUrl')
  presignedUrl(@Query('filename') filename: string) {
    return this.minioClient.presignedPutObject('survey', filename, 3600) // 生成预签名
  }

  // 方式2: 前端直接使用该接口上传获得 url
  @ApiOperation({
    summary: '上传单个文件',
    description: '上传单个文件，最大支持5MB',
  })
  @ApiConsumes('multipart/form-data') // 指定请求内容类型
  @ApiBody({
    description: '文件上传',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: { // 这里的'file'要和@FileInterceptor的参数一致
          type: 'string',
          format: 'binary',
          description: '要上传的文件',
        },
      },
      required: ['file'], // 标记为必填字段
    },
  })
  @ApiResponse({ type: ApiResponseVo, status: HttpStatus.OK, description: '请求成功' })
  @UseInterceptors(FileInterceptor('file')) // 这里的'file'要和ApiBody中的properties一致
  @Post('upload')
  async upload(@UploadedFile(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })] })) file: Express.Multer.File) {
    try {
      const bucketName = 'survey'
      const fileName = `${new Date().getTime()}_${file.originalname}`
      await this.minioClient.putObject(bucketName, fileName, file.buffer)
      const url = `http://${process.env.END_POINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`
      // 返回可访问的图片url路径
      return url
    }
    catch (e) {
      throw new BadRequestException(e)
    }
  }
}
