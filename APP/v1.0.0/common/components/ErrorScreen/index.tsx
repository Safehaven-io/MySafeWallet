import React from 'react';

import { NewTabLink } from 'components/ui';
import './index.scss';

const SUBJECT = 'Error!';
const DESCRIPTION =
  'I encountered an error while using SafeWallet. Here are the steps to re-create the issue:\n\nThe full error message:';

interface Props {
  error: Error;
}

const ErrorScreen: React.SFC<Props> = ({ error }) => {
  return (
    <div className="ErrorScreen">
      <div className="ErrorScreen-content">
        <h2>Oops!</h2>
        <p>Something went really wrong, so we're showing you this red error page! 😱</p>
        <p>
          Please contact{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`mailto:info@safehaven.io?Subject=${SUBJECT}&body=${DESCRIPTION}`}
          >
            info@safehaven.io
          </a>{' '}
          if a refresh doesn't fix it (or click it anyway to open a ticket 😊). You can also submit
          an issue on our{' '}
          <NewTabLink href="https://github.com/safehaven-io/MySafeWallet/issues">
            GitHub Repository
          </NewTabLink>. Please attach the following error to help our team solve your issue.
        </p>
        <code>{error.message}</code>
        <h5>
          Please make sure the error message does not include any sensitive information before
          sending it to us. We don't want your private keys!
        </h5>
      </div>
    </div>
  );
};

export default ErrorScreen;
