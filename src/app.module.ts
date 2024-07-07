import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LockService } from './lock/lock.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LockService],
})
export class AppModule {}
