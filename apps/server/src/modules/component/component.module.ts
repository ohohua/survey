import { Module } from '@nestjs/common'
import { ComponentController } from './component.controller'
import { ComponentService } from './component.service'

@Module({
  imports: [],
  providers: [ComponentService],
  controllers: [ComponentController],
})
export class ComponentModule { }
