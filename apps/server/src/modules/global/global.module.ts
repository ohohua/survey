import { Global, Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DB, DbProvider } from './providers/db.provider'

const logger = new Logger('Global')

const envConfig = {
  production: '.env.prod',
  development: '.env.dev',
}

const envFilePath = envConfig[process.env.NODE_ENV!] || '.env'
logger.log(process.env.NODE_ENV)

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
  ],
  providers: [DbProvider],
  exports: [DB],
})
export class GlobalModule {}
