import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsEnum, IsJSON, IsNotEmpty } from 'class-validator'
import { COMPONENT_TYPE } from 'src/enums'

export class CreateComponentDto {
  @ApiProperty({ description: '问卷id' })
  @IsNotEmpty()
  questionId: string

  @ApiProperty({ description: '组件类型', enum: COMPONENT_TYPE })
  @IsEnum(COMPONENT_TYPE)
  @IsNotEmpty()
  type: COMPONENT_TYPE

  @ApiProperty({ description: '题目props信息, json' })
  @IsNotEmpty()
  @IsJSON()
  props: JSON
}

class UpdateComponentPickIdDto {
  @ApiProperty({ description: '组件id, 没有则新增组件' })
  id?: string
}

export class UpdateComponentDto extends IntersectionType(CreateComponentDto, UpdateComponentPickIdDto) { }
