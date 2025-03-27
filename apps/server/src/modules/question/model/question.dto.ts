import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, ValidateNested } from 'class-validator'
import { CreateComponentDto } from 'src/modules/component/model/component.dto'

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

class UpdateComponentPickIdDto {
  @ApiProperty({ description: '组件id, 没有则新增组件' })
  id?: string
}

class UpdateComponentDto extends IntersectionType(UpdateComponentPickIdDto, CreateComponentDto) { }

export class UpdateQuestionDto {
  @ApiProperty({ example: 'u7odcj4ott', description: '问卷id, 不能为空' })
  @IsNotEmpty({ message: '问卷id不能为空' })
  id: string

  @ApiProperty({ description: '问卷标题' })
  @IsNotEmpty({ message: '问卷标题不能为空' })
  title: string

  @ApiProperty({ description: '背景图片地址' })
  backgroundImage?: string

  @ApiProperty({ description: '页眉图片地址' })
  pageHeaderImage?: string

  @ApiProperty({ description: '组件列表' })
  @ValidateNested()
  @Type(() => UpdateComponentDto)
  components?: UpdateComponentDto[]
}

export class CopyQuestionDto {
  @ApiProperty({ example: 'u7odcj4ott', description: '问卷id, 不能为空' })
  @IsNotEmpty({ message: '问卷id不能为空' })
  id: string
}
