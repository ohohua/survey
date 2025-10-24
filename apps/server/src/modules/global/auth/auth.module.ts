import { DynamicModule, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

export interface AuthModuleOptions {
  global?: boolean
}

@Module({})
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      global: options.global,
      controllers: [AuthController],
      providers: [AuthService],
      exports: [AuthService],
    }
  }
}
