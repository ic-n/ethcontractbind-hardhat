import { Controller, Post, Get, Body } from '@nestjs/common';
import { LockService } from './lock.service';
import { ethers as eth } from 'ethers';

@Controller('lock')
export class LockController {
  constructor(private readonly lockService: LockService) {}

  @Post('deploy')
  async deployLock(
    @Body('unlockTime') unlockTime: number,
    @Body('value') value: string,
  ): Promise<void> {
    const valueInEther = eth.parseEther(value);
    await this.lockService.deployLock(unlockTime, valueInEther);
  }

  @Get('unlock-time')
  async getUnlockTime(): Promise<bigint> {
    return await this.lockService.getUnlockTime();
  }

  @Post('withdraw')
  async withdraw(): Promise<void> {
    await this.lockService.withdraw();
  }
}
