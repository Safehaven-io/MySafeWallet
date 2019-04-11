declare const window: any;

import { IFullWallet } from '../IWallet';
import Web3Node from 'libs/nodes/web3';
import { INode } from 'libs/nodes';
import { Web3Wallet } from './wallets';
import { makeTransaction, getTransactionFields } from 'libs/transaction';

export default class ArkaneWallet extends Web3Wallet implements IFullWallet {
  private id: string;

  constructor(address: string, id: string) {
    super(address, '');
    this.id = id;
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

    const signer = window.arkaneConnect.createSigner('POPUP');

    const clause: { to: string; amount: number; data?: string } = {
      to,
      amount: parseInt(value, 16)
    };

    if (data !== '0x') {
      clause.data = data;
    }

    console.log('arkane tx', {
      type: 'VET_TRANSACTION',
      walletId: this.id,
      clauses: [clause]
    });

    const transactionResult = await signer.executeNativeTransaction({
      type: 'VET_TRANSACTION',
      walletId: this.id,
      clauses: [clause]
    });

    console.log(transactionResult);
    return transactionResult.result.transactionHash;
  }

  public signRawTransaction(): Promise<Buffer> {
    return Promise.reject(new Error('Arkane cannot sign raw transactions.'));
  }

  public signMessage(msg: string, nodeLib: Web3Node | INode): Promise<string> {
    return Promise.reject(new Error('Arkane cannot sign messages.'));
  }
}
