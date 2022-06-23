import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
  imports: [UserModule]
})
export class LoggerModule {}
