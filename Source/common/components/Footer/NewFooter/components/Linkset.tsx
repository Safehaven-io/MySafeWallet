import React from 'react';

import { translateRaw } from 'translations';
import './Linkset.scss';

const LINK_COLUMNS = [
  {
    heading: translateRaw('NEW_FOOTER_TEXT_6'),
    links: [
      {
        title: translateRaw('SafeHaven.io'),
         link: 'https://Safehaven.io'
      },
      {
        title: translateRaw('NEW_FOOTER_TEXT_7'),
        link: 'https://id.safetech.io'
      },
       {
         title: 'Inheriti.com',
        link: 'https://inheriti.com/'
       },
       {
         title: translateRaw('SafeKey Shop'),
         link: 'https://shop.safetech.io'
       },
      {
        title: translateRaw('NEW_FOOTER_TEXT_10'),
        link: 'https://cometpowered.com/'
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
        title: 'SafeNode',
        link: 'https://stats.safenode.io'
      },
      {
        title: 'Trustalliance.network',
        link: 'https://Trustalliance.network/'
      },
      {
        title: 'Thorblock.io',
        link: 'https://portal.thorblock.io/'
      },
      {
        title: 'FundRequest',
        link: 'https://fundrequest.io'
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
