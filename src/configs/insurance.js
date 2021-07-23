import Order from '../web3/abi/Order.json'
import { getPairPrice } from '../hooks/quickswap'
import Item from 'antd/lib/list/Item'
import axios from 'axios'
export const getCurrentInsurance = ({
  Type = '',
  Insurance = '',
  CollateralAddress = '',
  UnderlyingAddress = '',
}) => {
  const config = [
    {
      type: 'Put',
      insurance: 'GUARD',
      indextoken: 'MATIC',
      collateral_chainid: 137,
      collateral_symbol: 'MATIC',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      underlying_chainid: 137,
      underlying_symbol: 'GUARD',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.4',
      strikeprice_decimals: 'ether',
      lastprice: '0.6',
      expiry: 1626969600,
    },
    {
      type: 'Call',
      insurance: 'GUARD',
      indextoken: 'MATIC',
      collateral_chainid: 137,
      collateral_symbol: 'GUARD',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      underlying_chainid: 137,
      underlying_symbol: 'MATIC',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      settleToken_symbol: 'GUARD',
      settleToken_address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      settleToken_decimals: 'ether',
      strikeprice: '0.8',
      strikeprice_decimals: 'ether',
      lastprice: '0.6',
      expiry: 1626969600,
    },
    {
      type: 'Put',
      insurance: 'TESTB',
      indextoken: 'MATIC',
      collateral_chainid: 137,
      collateral_symbol: 'MATIC',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      underlying_chainid: 137,
      underlying_symbol: 'TESTB',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4',
      settleToken_symbol: 'TESTB',
      settleToken_address: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4',
      settleToken_decimals: 'ether',
      strikeprice: '0.004',
      strikeprice_decimals: 'ether',
      lastprice: '0.6',
      expiry: 1627228800,
    },
    {
      type: 'Call',
      insurance: 'TESTB',
      indextoken: 'MATIC',
      collateral_chainid: 137,
      collateral_symbol: 'TESTB',
      collateral_decimals: 'ether',
      collateral_decimals_number: 18,
      collateral_address: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4',
      underlying_chainid: 137,
      underlying_symbol: 'MATIC',
      underlying_decimals: 'ether',
      underlying_decimals_number: 18,
      underlying_address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      settleToken_symbol: 'TESTB',
      settleToken_address: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4',
      settleToken_decimals: 'ether',
      strikeprice: '0.008',
      strikeprice_decimals: 'ether',
      lastprice: '0.6',
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
