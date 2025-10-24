import * as fs from 'node:fs'
import * as path from 'node:path'
import { Body, Controller, HttpStatus, Post, Sse } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { interval, map } from 'rxjs'
import { Auth } from 'src/common/decorators/auth.decorator'
import { AnswerService } from './answer.service'

class Ans { }
class LoginVo { }

@ApiTags('提交答卷')
@Controller('client/answer')
export class AnswerController {
  constructor(private service: AnswerService) { }

  @ApiOperation({ summary: '提交答案' })
  @ApiBody({ type: Ans })
  @ApiResponse({ type: LoginVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Post('submit')
  submit(@Body() dto: string) {
    return this.service.submitAnswer(dto)
  }

  @Sse('stream')
  stream() {
    try {
      const filePath = path.resolve(__dirname, './xs.txt')
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const segments = fileContent.match(/.{1,100}/g) || []

      let index = 0
      return interval(300).pipe(
        map(() => {
          if (index < segments.length) {
            return { data: { segment: segments[index++] } }
          }
          else {
            return { data: { done: true } }
          }
        }),
      )
    }
    catch (error) {
      console.error('Error reading file:', error)
      throw error
    }
  }
}
