// src/app/core/helpers/chains.helper.ts

export interface ChainInfo {
  chainId: number;
  name: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
}

export const CHAINS: ChainInfo[] = [
  // Ethereum Mainnet
  {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://etherscan.io'],
  },
  // Ethereum Sepolia Testnet
  {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  // BSC Mainnet
  {
    chainId: 56,
    name: 'BSC Mainnet',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  // BSC Testnet
  {
    chainId: 97,
    name: 'BSC Testnet',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  // Polygon Mainnet
  {
    chainId: 137,
    name: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com/'],
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  // Polygon Mumbai
  {
    chainId: 80001,
    name: 'Polygon Mumbai',
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  // Avalanche Mainnet
  {
    chainId: 43114,
    name: 'Avalanche C-Chain',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    blockExplorerUrls: ['https://snowtrace.io'],
  },
  // Avalanche Fuji Testnet
  {
    chainId: 43113,
    name: 'Avalanche Fuji',
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    blockExplorerUrls: ['https://testnet.snowtrace.io'],
  },
  // Fantom Mainnet
  {
    chainId: 250,
    name: 'Fantom Opera',
    rpcUrls: ['https://rpcapi.fantom.network'],
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  // Fantom Testnet
  {
    chainId: 4002,
    name: 'Fantom Testnet',
    rpcUrls: ['https://rpc.testnet.fantom.network/'],
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
    blockExplorerUrls: ['https://testnet.ftmscan.com'],
  },
  // Arbitrum Mainnet
  {
    chainId: 42161,
    name: 'Arbitrum One',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  // Arbitrum Rinkeby Testnet
  {
    chainId: 421611,
    name: 'Arbitrum Rinkeby',
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io'],
  },
  // Optimism Mainnet
  {
    chainId: 10,
    name: 'Optimism',
    rpcUrls: ['https://mainnet.optimism.io'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://explorer.optimism.io'],
  },
  // Optimism Kovan Testnet
  {
    chainId: 69,
    name: 'Optimism Kovan',
    rpcUrls: ['https://kovan.optimism.io'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://kovan-optimism.etherscan.io'],
  },
];

/** Función helper para obtener info de una chain por chainId */
export function getChainById(chainId: number): ChainInfo | undefined {
  return CHAINS.find(chain => chain.chainId === chainId);
}
