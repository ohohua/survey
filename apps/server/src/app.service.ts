import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(type: number, content: string): string {
    let res = 'Hello '
    switch (+type) {
      case 1:
        res += content
        break
      case 2:
        res += 'Survey'
        break
      default:
        res += 'World'
        break
    }
    return res
  }
}
