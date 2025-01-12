require("dotenv").config()
const HDWalletProvider = require("@truffle/hdwallet-provider")
const TestRPC = require("ganache-cli")

const {
  ETH_PKEY_RINKEBY,
  INFURA_PROJECT_ID_RINKEBY,
  ETH_PKEY_MAINNET,
  INFURA_PROJECT_ID_MAINNET,
  ETHERSCAN_API,
} = process.env

module.exports = {
  networks: {
    // ganache-cli
    development: {
      provider: TestRPC.provider({
        mnemonic: "myth like bonus scare over problem client lizard pioneer submit female collect",
        gasPrice: "0x4A817C800",
      }),
      network_id: "*", // Any network (default: none)
    },
    // truffle develop console
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      defaultEtherBalance: 500,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [ETH_PKEY_RINKEBY],
          providerOrUrl: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID_RINKEBY}`,
        }),
      network_id: "4",
      gas: 10000000,
      gasPrice: 100000000000,
      skipDryRun: true,
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [ETH_PKEY_MAINNET],
          providerOrUrl: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID_MAINNET}`,
        }),
      network_id: "1",
      gasPrice: 120000000000, // 120e9 = 120 gwei
    },
  },

  plugins: ["truffle-plugin-verify", "solidity-coverage"],

  api_keys: {
    etherscan: ETHERSCAN_API,
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.3",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
}
