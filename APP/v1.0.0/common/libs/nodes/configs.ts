import { RawNodeConfig } from 'types/node';
import { StaticNetworkIds } from 'types/network';

export const makeNodeName = (network: string, name: string) => {
  return `${network.toLowerCase()}_${name}`;
};

export const NODE_CONFIGS: { [key in StaticNetworkIds]: RawNodeConfig[] } = {
  VECHAIN: [
    {
      name: makeNodeName('VECHAIN', 'vechain'),
      type: 'rpc',
      service: 'mainnet node',
      url: 'https://vechain.safetech.io'
    }
  ]

  // VECHAIN_TEST: [
  //   {
  //     name: makeNodeName('VECHAIN_TEST', 'vechain_test'),
  //     type: 'rpc',
  //     service: 'testnet node',
  //     url: 'https://nodetest.safetech.io'
  //   }
  // ]
};

export default NODE_CONFIGS;
