import Order from '../web3/abi/Order.json'
import { getPairPrice } from '../hooks/quickswap'
import Item from 'antd/lib/list/Item'
import axios from 'axios'
export const InsuranceTypeList = [
  {
    InsuranceSymbol: 'GUARD',
    PairUSDC: '',
  },
  {
    InsuranceSymbol: 'MATIC',
    PairUSDC: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
  },
  {
    InsuranceSymbol: 'QUICK',
    PairUSDC: '0x1F1E4c845183EF6d50E9609F16f6f9cAE43BC9Cb',
  },
  {
    InsuranceSymbol: 'ETH',
    PairUSDC: '0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d',
  },
]
export const getCurrentInsurance = ({
  Type = '',
  Insurance = '',
  CollateralAddress = '',
  UnderlyingAddress = '',
}) => {
  // WETH 0x7ceb23fd6bc0add59e62ac25578270cff1b9f619
  // USDC 0x2791bca1f2de4661ed88a30c99a7a9449aa84174
  // GUARD 0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8
  // QUICK 0x831753dd7087cac61ab5644b308642cc1c33dc13
  // WMATIC 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
  const config = [
    // GUARD
    {
      type: 'Put',
      insurance: 'GUARD',
      indextoken: 'USDC',
      collateral_chainid: 137,
      collateral_symbol: 'USDC',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      underlying_chainid: 137,
      underlying_symbol: 'GUARD',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.0005',
      strikeprice_decimals: 'ether',
      lastprice: '0.001',
      expiry: 1626969600,
    },
    {
      type: 'Call',
      insurance: 'GUARD',
      indextoken: 'USDC',
      collateral_chainid: 137,
      collateral_symbol: 'GUARD',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      underlying_chainid: 137,
      underlying_symbol: 'USDC',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.005',
      strikeprice_decimals: 'ether',
      lastprice: '0.001',
      expiry: 1626969600,
    },
    // MATIC
    {
      type: 'Put',
      insurance: 'MATIC',
      indextoken: 'USDC',
      collateral_chainid: 137,
      collateral_symbol: 'USDC',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      underlying_chainid: 137,
      underlying_symbol: 'MATIC',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.00005',
      strikeprice_decimals: 'ether',
      lastprice: '0.0001',
      expiry: 1627228800,
    },
    {
      type: 'Call',
      insurance: 'MATIC',
      indextoken: 'USDC',
      collateral_chainid: 137,
      collateral_symbol: 'MATIC',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      underlying_chainid: 137,
      underlying_symbol: 'USDC',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.0002',
      strikeprice_decimals: 'ether',
      lastprice: '0.0001',
      expiry: 1627228800,
    },
    // QUICK
    {
      type: 'Put',
      insurance: 'QUICK',
      indextoken: 'USDC',
      collateral_chainid: 137,
      collateral_symbol: 'USDC',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      underlying_chainid: 137,
      underlying_symbol: 'QUICK',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.00005',
      strikeprice_decimals: 'ether',
      lastprice: '0.0001',
      expiry: 1627228800,
    },
    {
      type: 'Call',
      insurance: 'QUICK',
      indextoken: 'USDC',
      collateral_chainid: 137,
      collateral_symbol: 'QUICK',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
      underlying_chainid: 137,
      underlying_symbol: 'USDC',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.0002',
      strikeprice_decimals: 'ether',
      lastprice: '0.0001',
      expiry: 1627228800,
    },
    // ETH
    {
      type: 'Put',
      insurance: 'ETH',
      indextoken: 'USDC',
      collateral_chainid: 137,
      collateral_symbol: 'USDC',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      underlying_chainid: 137,
      underlying_symbol: 'ETH',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.00005',
      strikeprice_decimals: 'ether',
      lastprice: '0.0001',
      expiry: 1627228800,
    },
    {
      type: 'Call',
      insurance: 'ETH',
      indextoken: 'USDC',
      collateral_chainid: 137,
      collateral_symbol: 'ETH',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      underlying_chainid: 137,
      underlying_symbol: 'USDC',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.0002',
      strikeprice_decimals: 'ether',
      lastprice: '0.0001',
      expiry: 1627228800,
    },
  ]
  return config.filter(
    item =>
      (item.type === Type && item.insurance === Insurance) ||
      (item.collateral_address.toLocaleLowerCase() ===
        CollateralAddress.toLocaleLowerCase() &&
        item.underlying_address.toLocaleLowerCase() ===
          UnderlyingAddress.toLocaleLowerCase())
  )[0]
}

export const getInsuranceList = function () {
  return axios({
    method: 'post',
    url: 'https://api.thegraph.com/subgraphs/name/app-helmet-insure/guard',
    data: {
      query: `{
                options(first: 1000) {
                  id
                  creator
                  collateral 
                  underlying
                  strikePrice
                  expiry
                  long
                  short
                  asks {
                    askID
                    seller
                    volume
                    settleToken
                    price
                    isCancel
                    binds {
                      bidID
                      askID
                      buyer
                      volume
                      amount
                    }
                  }
                }
              }
              `,
    },
  })
}
