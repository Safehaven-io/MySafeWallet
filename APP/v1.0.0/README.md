#[![N|Solid](https://safehaven.io/img/bannerMSW.jpeg)](https://mysafewallet.io/)

## Contents

1. [Introduction](#Introduction)
2. [Upcoming major updates](#upcomingmajorupdates)
3. [Wyaddingacustomnode](#Wy adding a custom node)
3.  1. [Requirements](#requirements)
    2. [Runningtheapp](#Running the App)
    3. [Development](#Development)
4. [NetworkArchitecture](#Network Architecture)  
  
    

## Introduction

MySafeWallet is a web-based, non-hosted wallet, where you control your funds. It is written in Javascript and is an open-source wallet to be used. It is a user-friendly application for securing VET, VIP180 and VIP181 tokens and interacting with smart contracts.
MySafeWallet (aka MSW) is an offline wallet as it uses a machine’s browser to generate necessary data and nothing is ever stored on MySafeWallet servers. All the necessary data is stored in the user his browser.
In its web interface, you can either manage VET and other tokens directly or manage them via MSW on different wallet providers that integrated the Vechain wallets. Arkane and Comet are the most popolur ones, beside the VeCahinThor Mobile wallet.
We plan to integrate every hot or cold storage wallet that supports the VeChain Blockchain whenever they pass our rigorous validation process.

## Upcoming major updates

- Multiple wallet support for each wallet provider:
* Comet only deals with one VET adress, however
  Arkane provides multiple Wallet addresses support, in relaease 1.0.0 MSW only supports the first Wallet listed.
* Ledger Support : We are reverse Engineering the Vechain Ledger APP in order to interact with it in a secure manner, this will take a few weeks.
* MySafeWallet Desktop APP releases are upcoming for Windows, Linux and MacOS devices

## Wy adding a custom node

### Requirements

* Node 8.9.4\*
* Yarn >= 1.7.0\*\*
* Python 2.7.X\*\*\*

<sub>\*Higher versions should work fine, but may cause inconsistencies. It's suggested you run 8.9.4 using `nvm`.</sub>
<br/>
<sub>**npm is NOT supported for package management. SafeWallet uses yarn.lock to ensure sub-dependency versions are pinned, so yarn is required to install node_modules</sub>
<br/>
<sub>\***Python 3 is **not** supported, since our dependencies use `node-gyp`.</sub>
<br/>
<sub>\***For users trying to build with WSL, you'll need to have install libpng via `sudo apt-get install libpng16-dev`.</sub>

### Running the App

After `yarn`ing all dependencies you can run various commands depending on what you want to do:

#### Development

```bash
# run app in dev mode in browser, rebuild on file changes
yarn dev
```

#### Build Releases

```bash
# builds the production server app
yarn build
```

building adds output to a folder in `dist/`.


## Network Architecture

