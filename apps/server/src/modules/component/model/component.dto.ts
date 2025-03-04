import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class CreateComponentDto {
  @ApiProperty({ description: '问卷id' })
  @IsNotEmpty()
  questionId: string

  @ApiProperty({ description: '组件类型', enum: ['componentInput', 'componentTitle'] })
  @IsNotEmpty()
  type: string

  @ApiProperty({ description: '题目名称' })
  @IsNotEmpty()
  @Length(1, 64)
  title: string

  @ApiProperty({ description: '题目props信息, json' })
  @IsNotEmpty()
  props: JSON
}
