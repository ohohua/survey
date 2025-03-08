import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, ValidateNested } from 'class-validator'
import { CreateComponentDto, UpdateComponentDto } from 'src/modules/component/model/component.dto'

class ComponentDto extends OmitType(CreateComponentDto, ['questionId'] as const) { }

export class CreateQuestionDto {
  @ApiProperty({ description: '问卷标题' })
  title?: string

  @ApiProperty({ description: '背景图片地址' })
  backgroundImage?: string

  @ApiProperty({ description: '页眉图片地址' })
  pageHeaderImage?: string

  @ApiProperty({ description: '组件列表' })
  @ValidateNested()
  @Type(() => ComponentDto)
  components?: ComponentDto[]
}

export class UpdateQuestionDto {
  @ApiProperty({ example: 'u7odcj4ott', description: '问卷id, 不能为空' })
  @IsNotEmpty()
  id: string

  @ApiProperty({ description: '问卷标题' })
  title?: string

  @ApiProperty({ description: '背景图片地址' })
  backgroundImage?: string

  @ApiProperty({ description: '页眉图片地址' })
  pageHeaderImage?: string

  @ApiProperty({ description: '组件列表' })
  @ValidateNested()
  @Type(() => UpdateComponentDto)
  components?: UpdateComponentDto[]
}
