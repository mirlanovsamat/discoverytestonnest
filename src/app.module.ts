import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {ormconfig} from './configs/ormconfig';
import { UploadFileModule } from './upload-file/upload-file.module';
import { AdapterModule } from './adapter/adapter.module';
import { UploadFileMiddleware } from './middlewares/uploadFileMiddleware';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middlewares/authMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(ormconfig),
    UploadFileModule,
    AdapterModule,
    LoggerModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploadFileMiddleware)
      .forRoutes({ path: 'files/:filename', method: RequestMethod.PUT });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
