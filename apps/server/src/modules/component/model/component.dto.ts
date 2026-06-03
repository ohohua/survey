import type { ComponentType } from '@survey/shared'
import { ApiProperty } from '@nestjs/swagger'
import { COMPONENT_TYPE } from '@survey/shared'
import { IsEnum, IsJSON, IsNotEmpty } from 'class-validator'

export class CreateComponentDto {
  @ApiProperty({ description: '问卷id' })
  @IsNotEmpty()
  questionId: string

  @ApiProperty({ description: '组件类型', enum: COMPONENT_TYPE })
  @IsEnum(COMPONENT_TYPE)
  @IsNotEmpty()
  type: ComponentType

  @ApiProperty({ description: '组件排序' })
  @IsNotEmpty({ message: '组件排序不能为空' })
  sort: number

  @ApiProperty({ description: '题目props信息, json' })
  @IsNotEmpty()
  @IsJSON()
  props: JSON
}
