import { Injectable, Logger } from '@nestjs/common';
import * as LockArtifact from '../../artifacts/contracts/Lock.sol/Lock.json';
import { ethers } from 'hardhat';
import { ethers as ethersT } from 'ethers';
import { Lock } from 'src/types';

@Injectable()
export class LockService {
  private readonly logger = new Logger(LockService.name);
  private provider: ethersT.JsonRpcProvider;
  private wallet: ethersT.Wallet;
  private contract?: Lock;

  constructor() {
    const url = 'http://localhost:8545';
    const privateKey = 'YOUR_PRIVATE_KEY';
    this.provider = new ethers.JsonRpcProvider(url);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  async deployLock(
    unlockTime: number,
    value: ethersT.BigNumberish,
  ): Promise<void> {
    const LockFactory = new ethers.ContractFactory(
      LockArtifact.abi,
      LockArtifact.bytecode,
      this.wallet,
    );
    this.contract = (await LockFactory.deploy(unlockTime, {
      value,
    })) as unknown as Lock;

    await this.contract.waitForDeployment();
    const addr = await this.contract.getAddress();
    this.logger.log(`Lock contract deployed at ${addr}`);
  }

  async getUnlockTime(): Promise<bigint> {
    return await this.contract!.unlockTime();
  }

  async withdraw(): Promise<void> {
    const tx = await this.contract!.withdraw();
    await tx.wait();
    this.logger.log('Funds withdrawn');
  }
}
