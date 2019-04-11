import { handleJSONResponse } from 'api/utils';

interface IRateSymbols {
  symbols: {
    all: TAllSymbols;
    fiat: TFiatSymbols;
    coinAndToken: TCoinAndTokenSymbols;
  };
  isFiat: isFiat;
}

type isFiat = (rate: string) => boolean;

export type TAllSymbols = (keyof ISymbol)[];
export type TFiatSymbols = (keyof IFiatSymbols)[];
export type TCoinAndTokenSymbols = (keyof ICoinAndTokenSymbols)[];
interface ISymbol {
  USD?: number;
  EUR?: number;
  GBP?: number;
  CHF?: number;
  BTC?: number;
  ETH?: number;
  REP?: number;
}
interface IFiatSymbols {
  USD: number;
  EUR: number;
  GBP: number;
  CHF: number;
}
interface ICoinAndTokenSymbols {
  BTC: number;
  ETH: number;
  REP: number;
}

const fiat: TFiatSymbols = ['USD', 'EUR', 'GBP', 'CHF'];
const coinAndToken: TCoinAndTokenSymbols = ['BTC', 'ETH', 'REP'];
export const rateSymbols: IRateSymbols = {
  symbols: {
    all: [...fiat, ...coinAndToken],
    fiat,
    coinAndToken
  },
  isFiat: (rate: string) => (fiat as string[]).includes(rate)
};

// TODO - internationalize
const ERROR_MESSAGE = 'Could not fetch rate data.';
const CCApi = 'https://mysafewallet.io/api';
// https://mysafewallet.io/api/prices?currencies=VET,SHA

const CCRates = (symbols: string[]) => {
  const tsyms = rateSymbols.symbols.all.concat(symbols as any).join(',');
  // return `${CCApi}/prices?currencies=${tsyms}`;
  return `${CCApi}/prices?currencies=VET,VTHO,SHA`;
};

export interface CCResponse {
  [symbol: string]: ISymbol;
}

interface ICMCResponse {
  status: { error_code: number };
  data: {
    [key: string]: {
      quote: {
        USD: {
          price: number;
        };
      };
    };
  };
}

interface IRatesResponse {
  [key: string]: number;
}

const testCMCResponse = {
  status: {
    timestamp: '2019-04-09T02:40:08.276Z',
    error_code: 0,
    error_message: null,
    elapsed: 6,
    credit_count: 1
  },
  data: {
    SHA: {
      id: 3831,
      name: 'Safe Haven',
      symbol: 'SHA',
      slug: 'safe-haven',
      circulating_supply: null,
      total_supply: 8500000000,
      max_supply: null,
      date_added: '2019-04-02T00:00:00.000Z',
      num_market_pairs: 6,
      tags: [],
      platform: {
        id: 3077,
        name: 'VeChain',
        symbol: 'VET',
        slug: 'vechain',
        token_address: '0x5db3c8a942333f6468176a870db36eef120a34dc'
      },
      cmc_rank: 1879,
      last_updated: '2019-04-09T02:39:08.000Z',
      quote: {
        USD: {
          price: 0.00235663058234,
          volume_24h: 544499.818970271,
          percent_change_1h: 0.522924,
          percent_change_24h: -3.50392,
          percent_change_7d: null,
          market_cap: 0,
          last_updated: '2019-04-09T02:39:08.000Z'
        }
      }
    },
    VET: {
      id: 3077,
      name: 'VeChain',
      symbol: 'VET',
      slug: 'vechain',
      circulating_supply: 55454734800,
      total_supply: 86712634466,
      max_supply: null,
      date_added: '2017-08-22T00:00:00.000Z',
      num_market_pairs: 52,
      tags: [],
      platform: null,
      cmc_rank: 23,
      last_updated: '2019-04-09T02:39:06.000Z',
      quote: {
        USD: {
          price: 0.0073473163652,
          volume_24h: 16209684.173936,
          percent_change_1h: -0.0650994,
          percent_change_24h: -3.23735,
          percent_change_7d: 13.0396,
          market_cap: 407443480.52386594,
          last_updated: '2019-04-09T02:39:06.000Z'
        }
      }
    },
    VTHO: {
      id: 3012,
      name: 'VeThor Token',
      symbol: 'VTHO',
      slug: 'vethor-token',
      circulating_supply: null,
      total_supply: null,
      max_supply: null,
      date_added: '2018-07-30T00:00:00.000Z',
      num_market_pairs: 7,
      tags: [],
      platform: {
        id: 3077,
        name: 'VeChain',
        symbol: 'VET',
        slug: 'vechain',
        token_address: '0x0000000000000000000000000000456E65726779'
      },
      cmc_rank: 1865,
      last_updated: '2019-04-09T02:39:06.000Z',
      quote: {
        USD: {
          price: 0.00107522656752,
          volume_24h: 891381.657111322,
          percent_change_1h: 0.238862,
          percent_change_24h: -1.36003,
          percent_change_7d: 15.3531,
          market_cap: 0,
          last_updated: '2019-04-09T02:39:06.000Z'
        }
      }
    }
  }
};

export const fetchRates = (symbols: string[] = []): Promise<CCResponse> =>
  fetch(CCRates(symbols))
    .then(response => handleJSONResponse(response, ERROR_MESSAGE))
    .then((rates: ICMCResponse) => {
      // API errors come as 200s, so check the json for error
      if (rates.status.error_code > 0) {
        throw new Error('Failed to fetch rates');
      }
      return rates;
      // return testCMCResponse;
    })
    .then((rates: ICMCResponse) => {
      // Sometimes the API erroneously gives tokens an extremely high value,
      // like 10000000 ETH to 1 token. Filter those out. If that ever turns
      // out to be true, we should all go home.
      return Object.keys(rates.data).reduce((filteredRates: IRatesResponse, key) => {
        if (rates.data[key] && rates.data[key].quote.USD.price > 0.000001) {
          filteredRates[key] = rates.data[key].quote.USD.price;
        }
        return filteredRates;
      }, {});
    })
    .then((rates: IRatesResponse) => {
      // All currencies are in ETH right now. We'll do token -> eth -> value to
      // do it all in one request to their respective rates via ETH.
      return symbols.reduce(
        (eqRates, sym) => {
          if (rates[sym]) {
            eqRates[sym] = {};
            eqRates[sym]['USD'] = rates[sym];
            // eqRates[sym] = rateSymbols.symbols.all.reduce(
            //   (symRates, rateSym) => {
            //     symRates[rateSym] = 1 / rates[sym] * rates[rateSym];
            //     return symRates;
            //   },
            //   {} as ISymbol
            // );
          }
          return eqRates;
        },
        {} as CCResponse
      );
    });
