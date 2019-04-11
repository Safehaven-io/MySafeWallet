declare const window: any;
declare const thor: any;

import { IFullWallet } from '../IWallet';
import Web3Node from 'libs/nodes/web3';
import { INode } from 'libs/nodes';
import { Web3Wallet } from './wallets';
import { makeTransaction, getTransactionFields } from 'libs/transaction';

import { extend } from 'thorify/dist/extend';
const Web3 = require('web3'); // Recommend using require() instead of import here

export default class CometWallet extends Web3Wallet implements IFullWallet {
  private web3: any;

  constructor(address: string) {
    super(address, '');

    if (typeof thor !== 'undefined') {
      // Use thor provider
      this.web3 = new Web3(thor);
      // Extend web3 to connect to VeChain Blockchain
      extend(this.web3);
    } else {
      throw new Error('Comet is not installed. Please install it and try again.');
    }
  }

  public async sendTransaction(
    serializedTransaction: string,
    nodeLib: Web3Node,
    networkConfig: any
  ): Promise<string> {
    const transactionInstance = makeTransaction(serializedTransaction);
    const { to, value, gasLimit: gas, gasPrice, data, nonce, chainId } = getTransactionFields(
      transactionInstance
    );

    const tx = {
      from: this.getAddressString(),
      to: to,
      value: value,
      gas,
      gasPrice,
      data,
      nonce
    };

    const result = await this.web3.eth.sendTransaction(tx);

    return result.transactionHash;
  }

  public signRawTransaction(): Promise<Buffer> {
    return Promise.reject(new Error('Comet cannot sign raw transactions.'));
  }

  public signMessage(msg: string, nodeLib: Web3Node | INode): Promise<string> {
    return Promise.reject(new Error('Comet cannot sign messages.'));
  }
}
