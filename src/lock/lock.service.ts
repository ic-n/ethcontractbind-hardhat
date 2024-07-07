import { Injectable, Logger } from '@nestjs/common';
import * as LockArtifact from '../../artifacts/contracts/Lock.sol/Lock.json';
import { ethers as eth } from 'ethers';
import { Lock } from 'types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LockService {
  private readonly logger = new Logger(LockService.name);
  private provider: eth.JsonRpcProvider;
  private wallet: eth.Wallet;
  private contract?: Lock;

  constructor(private configService: ConfigService) {
    const url = 'http://localhost:8545';
    const privateKey = this.configService.get<string>('ETH_PRIVKEY')!;
    this.provider = new eth.JsonRpcProvider(url);
    this.wallet = new eth.Wallet(privateKey, this.provider);
  }

  async deployLock(unlockTime: number, value: eth.BigNumberish): Promise<void> {
    const LockFactory = new eth.ContractFactory(
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
