declare const window: any;
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import translate from 'translations';
import { AppState } from 'features/reducers';
import { configSelectors } from 'features/config';
import ArkaneWallet from 'libs/wallet/non-deterministic/arkane';
import { notificationsActions } from 'features/notifications';
import { ArkaneConnect, SignMethod } from '@arkane-network/arkane-connect';

import './ParitySigner.scss';
interface OwnProps {
  onUnlock(param: any): void;
}

interface StateProps {
  showNotification: notificationsActions.TShowNotification;
  isValidAddress: ReturnType<typeof configSelectors.getIsValidAddressFn>;
}

type Props = OwnProps & StateProps;

class ArkaneWalletDecryptClass extends PureComponent<Props> {
  public render() {
    return (
      <div className="Web3Decrypt">
        <div>
          <button
            className="Web3Decrypt-decrypt btn btn-primary btn-lg btn-block"
            onClick={this.unlockArkane.bind(this)}
          >
            {translate('ADD_ARKANE')}
          </button>
        </div>
      </div>
    );
  }

  private async unlockArkane() {
    window.arkaneConnect = new ArkaneConnect('SafeWallet', {
      environment: 'production', // TODO: change this to production when ready
      signUsing: SignMethod.POPUP
    });

    try {
      const authenticationResult = await window.arkaneConnect.checkAuthenticated();

      authenticationResult
        .authenticated(async (auth: any) => {
          console.log('This user is authenticated', auth);
          await this.makeWallet();
        })
        .notAuthenticated(async (auth: any) => {
          console.log('This user is not authenticated', auth);
          window.arkaneConnect.authenticate();
          await this.makeWallet();
        });
    } catch (e) {
      // sometimes arkane throws an error with false as the value when the user is not logged in.
      console.log('This user is not authenticated and threw an error', e);
      window.arkaneConnect.authenticate();
      await this.makeWallet();
    }
  }

  private async makeWallet() {
    let wallets = await window.arkaneConnect.api.getWallets();
    if (wallets.length > 0) {
      console.log(wallets);
    } else {
      console.log('wallets didnt work');
      window.arkaneConnect.manageWallets('VECHAIN');
      wallets = await window.arkaneConnect.api.getWallets();
    }
    this.props.onUnlock(new ArkaneWallet(wallets[0].address, wallets[0].id));
  }
}

export const ArkaneWalletDecrypt = connect((state: AppState): StateProps => ({
  showNotification: notificationsActions.showNotification,
  isValidAddress: configSelectors.getIsValidAddressFn(state)
}))(ArkaneWalletDecryptClass);
