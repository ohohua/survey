import { Inject, Injectable } from '@nestjs/common'
import { DB, DbType } from '../global/providers/db.provider'
import { CreateComponentDto } from './model/component.dto'
// import { component, createId } from '@survey/schema';

@Injectable()
export class ComponentService {
  constructor() { }
  @Inject(DB)
  private db: DbType

  async create(_dto: CreateComponentDto) {
    // const id = createId()
    // const {questionId, title, type, props} = dto
    // await this.db.insert(component).values({ id, questionId, title, type, props })

  }
}
