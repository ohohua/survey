import { Global, Module } from '@nestjs/common'
import { createClient } from 'redis'
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
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
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
