import { Global, Module } from '@nestjs/common'
import * as Minio from 'minio'
import { ModuleController } from './minio.controller'
import { ModuleService } from './minio.service'

@Global()
@Module({
  controllers: [ModuleController],
  providers: [
    ModuleService,
    {
      provide: 'MINIO_CLIENT',
      useFactory: async () => {
        const client = new Minio.Client({
          endPoint: '192.168.1.7',
          port: 9000,
          useSSL: false,
          accessKey: 'mMjCrrTPRqwadibUcJyE',
          secretKey: 'mvoXvbKEMZlcI0T3whtEg81xerGT4hPXHzzpG1Qw',
        })
        return client
      },
    },
  ],
  exports: ['MINIO_CLIENT'],
})
export class ModuleModule {}
