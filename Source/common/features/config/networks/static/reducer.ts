import { gasPriceDefaults, InsecureWalletName, SecureWalletName } from 'config/data';
import { ETH_DEFAULT, ETH_LEDGER, ETH_TREZOR, ETH_SAFE_T } from 'config/dpaths';
import { makeExplorer } from 'utils/helpers';
import * as types from './types';

export const STATIC_NETWORKS_INITIAL_STATE: types.ConfigStaticNetworksState = {
  VECHAIN: {
    id: 'VECHAIN',
    name: 'Vechain',
    unit: 'VET',
    chainId: 1,
    isCustom: false,
    color: '#007896',
    blockExplorer: makeExplorer({
      name: 'Block Explorer',
      origin: 'https://explore.vechain.org',
      addressPath: 'accounts',
      txPath: 'transactions'
    }),
    tokens: require('config/tokens/vechain.json'),
    contracts: require('config/contracts/eth.json'),
    dPathFormats: {
      [SecureWalletName.LEDGER_NANO_S]: ETH_LEDGER,
      [InsecureWalletName.MNEMONIC_PHRASE]: ETH_DEFAULT
    },
    gasPriceSettings: gasPriceDefaults,
    shouldEstimateGasPrice: false
  }
  // VECHAIN_TEST: {
  //   id: 'VECHAIN_TEST',
  //   name: 'Vechain Testnet',
  //   unit: 'VET',
  //   chainId: 1,
  //   isCustom: false,
  //   color: '#007896',
  //   blockExplorer: makeExplorer({
  //     name: 'VeForge',
  //     origin: 'https://testnet.veforge.com',
  //     addressPath: 'accounts',
  //     txPath: 'transactions'
  //   }),
  //   tokens: require('config/tokens/vechain_test.json'),
  //   contracts: require('config/contracts/eth.json'),
  //   dPathFormats: {
  //     [SecureWalletName.LEDGER_NANO_S]: ETH_LEDGER,
  //     [InsecureWalletName.MNEMONIC_PHRASE]: ETH_DEFAULT
  //   },
  //   gasPriceSettings: gasPriceDefaults,
  //   shouldEstimateGasPrice: true
  // }
};

export function staticNetworksReducer(
  state: types.ConfigStaticNetworksState = STATIC_NETWORKS_INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    default:
      return state;
  }
}
