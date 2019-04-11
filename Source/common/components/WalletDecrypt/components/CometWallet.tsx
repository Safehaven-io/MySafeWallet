declare const window: any;
declare const thor: any;

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import translate from 'translations';
import { AppState } from 'features/reducers';
import { configSelectors } from 'features/config';
import CometWallet from 'libs/wallet/non-deterministic/comet';
import { notificationsActions } from 'features/notifications';

import { extend } from 'thorify/dist/extend';
const Web3 = require('web3'); // Recommend using require() instead of import here

import './ParitySigner.scss';
interface OwnProps {
  onUnlock(param: any): void;
}

interface StateProps {
  showNotification: notificationsActions.TShowNotification;
  isValidAddress: ReturnType<typeof configSelectors.getIsValidAddressFn>;
}

type Props = OwnProps & StateProps;

class CometWalletDecryptClass extends PureComponent<Props> {
  public render() {
    return (
      <div className="Web3Decrypt">
        <div>
          <button
            className="Web3Decrypt-decrypt btn btn-primary btn-lg btn-block"
            onClick={this.unlockComet.bind(this)}
          >
            {translate('ADD_COMET')}
          </button>
        </div>
      </div>
    );
  }

  private async unlockComet() {
    if (typeof thor !== 'undefined') {
      // Use thor provider
      const web3js = new Web3(thor);
      // Extend web3 to connect to VeChain Blockchain
      extend(web3js);

      const [cometAccount] = await thor.enable();

      this.props.onUnlock(new CometWallet(cometAccount));
    } else {
      throw new Error('Comet is not installed. Please install it and try again.');
    }
  }
}

export const CometWalletDecrypt = connect((state: AppState): StateProps => ({
  showNotification: notificationsActions.showNotification,
  isValidAddress: configSelectors.getIsValidAddressFn(state)
}))(CometWalletDecryptClass);
