import { Global, Module } from '@nestjs/common'
import { createClient } from 'redis'
import { environment } from 'src/utils'
import { RedisService } from './redis.service'

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: environment.host,
            port: 6379,
          },
          database: 2,
        })
        await client.connect()
        return client
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
