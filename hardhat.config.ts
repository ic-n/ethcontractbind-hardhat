// import { HardhatUserConfig } from 'hardhat/config';
require('@nomicfoundation/hardhat-toolbox');
require('@typechain/hardhat');
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-chai-matchers');

const config = {
  solidity: '0.8.24',
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v6',
  },
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
  },
};

export default config;
