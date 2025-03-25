import { Module } from '@nestjs/common'
import * as Minio from 'minio'
import { ModuleController } from './minio.controller'

@Module({
  controllers: [ModuleController],
  providers: [
    {
      provide: 'MINIO_CLIENT',
      useFactory: async () => {
        const client = new Minio.Client({
          endPoint: process.env.END_POINT!,
          port: Number(process.env.MINIO_PORT),
          useSSL: false,
          accessKey: process.env.ACCESS_KEY,
          secretKey: process.env.SECRET_KEY,
        })
        return client
      },
    },
  ],
  exports: ['MINIO_CLIENT'],
})
export class MinioModule {}
