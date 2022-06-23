import { LoggerModule } from './../logger/logger.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { UploadFileEntity } from './entities/upload-file.entity';
import { AdapterModule } from './../adapter/adapter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadFileEntity]),
    AdapterModule,
    LoggerModule
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService]
})
export class UploadFileModule {}
