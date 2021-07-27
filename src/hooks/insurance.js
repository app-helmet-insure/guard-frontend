import Web3 from 'web3'
import PairABI from '../web3/abi/Pair.json'
import {
  Token,
  Route,
  Pair,
  TokenAmount,
  USDC,
  Fetcher,
} from '@dinoswap/quickswap-sdk'
import { getContract, useActiveWeb3React } from '../web3'
export const pairContract = (library, address) =>
  getContract(library, PairABI.abi, address)
export const useIndexPrice = async (library, data) => {
  const {
    collateral_chainid,
    collateral_address,
    collateral_decimals_number,
    collateral_symbol,
    underlying_chainid,
    underlying_address,
    underlying_decimals_number,
    underlying_symbol,
  } = data
  const TOKEN1 = new Token(
    collateral_chainid,
    collateral_address,
    collateral_decimals_number,
    collateral_symbol,
    collateral_symbol
  )
  const TOKEN2 = new Token(
    underlying_chainid,
    underlying_address,
    underlying_decimals_number,
    underlying_symbol,
    underlying_symbol
  )

  try {
    // 获取交易对地址
    const address = Pair.getAddress(TOKEN1, TOKEN2)
    // 获取合约方法
    const Contracts = pairContract(library, address)
    // 获取getReserves
    const result = await Contracts.methods.getReserves().call()

    const balances = TOKEN1.sortsBefore(TOKEN2)
      ? [result.reserve0, result.reserve1]
      : [result.reserve1, result.reserve0]
    const pair = new Pair(
      new TokenAmount(TOKEN1, balances[0]),
      new TokenAmount(TOKEN2, balances[1])
    )
    const route = new Route([pair], TOKEN1)
    const Price = route.midPrice.toSignificant(6)
    console.log(Price)
    return Price
  } catch (error) {
    console.log(error)
    return 0
  }
}
