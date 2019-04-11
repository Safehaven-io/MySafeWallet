import React from 'react';

import { HELP_ARTICLE } from 'config';
import translate from 'translations';
import { HelpLink } from 'components/ui';
import Modal, { IButton } from 'components/ui/Modal';
import './DisclaimerModal.scss';

interface Props {
  isOpen: boolean;
  handleClose(): void;
}

const DisclaimerModal: React.SFC<Props> = ({ isOpen, handleClose }) => {
  const buttons: IButton[] = [
    { text: translate('ACTION_10'), type: 'default', onClick: handleClose }
  ];
  return (
    <Modal isOpen={isOpen} title="Disclaimer" buttons={buttons} handleClose={handleClose}>
      <p>
        Always backup your keys. SafeWallet is not a "web wallet". You are not required to create an
        account or provide funds for storage. No data leaves your computer/browser. SafeWallet is
        designed to create, save, and access your information while interacting with the blockchain.
      </p>
      <p>
        Some underlying Javascript libraries we use are under active development. While we have
        thoroughly tested and tens of thousands of wallets have been successfully created by people
        all over the globe, there is always the possibility something unexpected happens that causes
        your funds to be lost. Please use all blockchain products with caution. Users shall
        indemnify, defend and hold harmless Safetech LLC, against any and all claims, losses,
        liabilities, damages and expenses incurred by the use of SafeWallet which relate to or arise
        out of the utilization of SafeWallet.
      </p>
      <p>
        <b>MIT License</b>
        <br />
        Copyright (c) 2015-2017 MyEtherWallet LLC, 2018 MyCryptoHQ LLC
        <br />
        Copyright (c) 2019 SafeWallet, Safetech, Inc.
      </p>

      <p>
        Permission is hereby granted, free of charge, to any person obtaining a copy of this
        software and associated documentation files (the "Software"), to deal in the Software
        without restriction, including without limitation the rights to use, copy, modify, merge,
        publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
        to whom the Software is furnished to do so, subject to the following conditions:
      </p>
      <p>
        The above copyright notice and this permission notice shall be included in all copies or
        substantial portions of the Software.
      </p>
      <b>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
        INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
        FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
        DEALINGS IN THE SOFTWARE.
      </b>
    </Modal>
  );
};

export default DisclaimerModal;
