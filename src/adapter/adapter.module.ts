import { LoggerModule } from './../logger/logger.module';
import { Module } from '@nestjs/common';
import { AdapterService } from './adapter.service';

@Module({
  imports: [LoggerModule],
  providers: [AdapterService],
  exports: [AdapterService]
})
export class AdapterModule {}
