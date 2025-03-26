import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class MinioUploadDto {
  @ApiProperty({ description: 'formData' })
  @IsNotEmpty()
  files: FormData
}
