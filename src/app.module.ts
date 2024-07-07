import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LockService } from './lock/lock.service';
import { LockController } from './lock/lock.controller';

@Module({
  imports: [],
  controllers: [AppController, LockController],
  providers: [AppService, LockService],
})
export class AppModule {}
