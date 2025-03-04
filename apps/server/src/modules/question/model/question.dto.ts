import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UpdateQuestionDto {
  @ApiProperty({ example: 'u7odcj4ott', description: '问卷id, 不能为空' })
  @IsNotEmpty()
  id: string

  @ApiProperty({ description: '问卷标题' })
  title?: string

  @ApiProperty({ description: '问卷是否发布' })
  isPublished?: boolean

  @ApiProperty({ description: '问卷是否标星' })
  isStar?: boolean

  @ApiProperty({ description: '答卷数量' })
  answerCount?: number
}
