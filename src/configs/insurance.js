import Order from '../web3/abi/Order.json'
import { getPairPrice } from '../hooks/quickswap'
import Item from 'antd/lib/list/Item'
export const getCurrentInsurance = (Type, Insurance)=>{
  const config = [
    {
      type: 'PUT',
      insurance: 'GUARD',
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
      type: 'CALL',
      insurance: 'GUARD',
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
  ]
  return config.filter(item=>item.type === Type && item.insurance === Insurance)[0]
}

// StartList.map(item => {
//   const Token1 = {
//     chainID: item.collateral_chainid,
//     address: item.collateral_address,
//     decimals: item.collateral_decimals_number,
//     symbol: item.collateral_symbol,
//     name: item.collateral_symbol,
//   }
//   const Token2 = {
//     chainID: 137,
//     address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
//     decimals: 18,
//     symbol: 'GUARD',
//     name: 'GUARD',
//   }
//   getPairPrice(Token1, Token2)
// })

