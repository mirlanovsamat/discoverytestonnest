import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import ormconfig from './configs/ormconfig';
import { UploadFileModule } from './upload-file/upload-file.module';
import { AdapterModule } from './adapter/adapter.module';
import { UploadFileMiddleware } from './middlewares/uploadFileMiddleware';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(ormconfig),
    UploadFileModule,
    AdapterModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploadFileMiddleware)
      .forRoutes({ path: 'files/:filename', method: RequestMethod.PUT });
  }
}
