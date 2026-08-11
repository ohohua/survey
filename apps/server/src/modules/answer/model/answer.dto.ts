import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

export class SubmitAnswerItemDto {
  @ApiProperty({ description: '组件 id' })
  @IsString()
  @IsNotEmpty({ message: '组件 id 不能为空' })
  componentId: string

  @ApiProperty({ description: '答案内容，字符串或 JSON 字符串' })
  @IsString()
  content: string
}

export class SubmitAnswerDto {
  @ApiProperty({ description: '问卷 id' })
  @IsString()
  @IsNotEmpty({ message: '问卷 id 不能为空' })
  questionId: string

  @ApiProperty({ description: '匿名答题人 id' })
  @IsString()
  @IsNotEmpty({ message: '匿名答题人 id 不能为空' })
  respondentId: string

  @ApiProperty({ type: [SubmitAnswerItemDto], description: '答案列表' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerItemDto)
  answers: SubmitAnswerItemDto[]
}
