import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

// This adds support for typescript paths mappings
import 'tsconfig-paths/register';

import '@typechain/hardhat';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
  },
  paths: {
    sources: './src/services/blockchain/contracts',
    artifacts: './src/services/blockchain/artifacts/artifacts',
  },
};

export default config;
