import React from 'react';

import { translateRaw } from 'translations';
import './Linkset.scss';

const LINK_COLUMNS = [
  {
    heading: translateRaw('NEW_FOOTER_TEXT_6'),
    links: [
      {
        title: 'SafeTech.io',
        link: 'https://www.safetech.io/'
      },
      {
        title: translateRaw('NEW_FOOTER_TEXT_7'),
        link: 'https://github.com/safehaven-io/MySafeWallet/'
      },
      // {
      //   title: translateRaw('NEW_FOOTER_TEXT_8'),
      //   link: 'https://about.mysafewallet.io/'
      // },
      // {
      //   title: translateRaw('NEW_FOOTER_TEXT_9'),
      //   link: 'mailto://press@mysafewallet.io'
      // },
      {
        title: translateRaw('NEW_FOOTER_TEXT_10'),
        link: 'https://github.com/safehaven-io/MySafeWallet'
      }
    ]
  },
  // {
  //   heading: translateRaw('NEW_FOOTER_TEXT_11'),
  //   links: [
  //     {
  //       title: 'Ledger Wallet',
  //       link: 'https://www.ledgerwallet.com/r/1985?path=/products/'
  //     },
  //     {
  //       title: 'TREZOR',
  //       link: 'https://shop.trezor.io/?offer_id=10&aff_id=1735'
  //     },
  //     {
  //       title: 'ether.card',
  //       link: 'https://ether.cards/?utm_source=mycrypto&utm_medium=cpm&utm_campaign=site'
  //     }
  //   ]
  // },
  {
    heading: translateRaw('NEW_FOOTER_TEXT_12'),
    links: [
      {
        title: 'Safehaven.io',
        link: 'https://Safehaven.io'
      },
      {
        title: 'Trustalliance.network',
        link: 'https://Trustalliance.network/'
      },
      {
        title: 'Thorblock.io',
        link: 'https://Thorblock.io/'
      },
      {
        title: 'Shop',
        link: 'https://Shop.safetech.io'
      }
    ]
  }
];

export default function Linkset() {
  return (
    <section className="Linkset">
      {LINK_COLUMNS.map(({ heading, links }) => (
        <section key={heading} className="Linkset-column">
          <h2>{heading}</h2>
          <ul>
            {links.map(({ title, link }) => (
              <li key={title}>
                <a href={link}>{title}</a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
