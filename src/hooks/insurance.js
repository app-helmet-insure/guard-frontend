import Web3 from 'web3'
import { useContext, useEffect, useMemo, useState } from 'react'
import PairABI from '../web3/abi/Pair.json'
import { Token, Route, Pair, TokenAmount } from '@dinoswap/quickswap-sdk'
import { getContract, useActiveWeb3React } from '../web3'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { formatAmount } from '../utils/format'
import { ChainId } from '../web3/address'
import { getHttpWeb3 } from '../web3'
import ERC20_ABI from '../web3/abi/ERC20.json'
import axios from 'axios'
import { fromWei, toWei } from 'web3-utils'
import {
  getInsuranceList,
  getCurrentInsurance,
  InsuranceTypeList,
} from '../configs/insurance'
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
    return Price
  } catch (error) {
    console.log(error)
    return 0
  }
}
export const getBalance = (
  ContractAddress,
  address,
  abi = ERC20_ABI.abi,
  decimals = 18
) => {
  const [balance, setBalance] = useState('0')
  const { account, library, active } = useWeb3ReactCore()
  useMemo(() => {
    if (active && address) {
      // console.log(active, address, account)
      const WEB3 = getHttpWeb3(ChainId.BSC)
      console.log(ContractAddress, address)
      const contract = new WEB3.eth.Contract(abi, ContractAddress)
      contract.methods
        .balanceOf(address)
        .call()
        .then(balance_ => {
          const resBalance = formatAmount(balance_, decimals)
          // console.log('balance', balance_, 'format', resBalance)
          setBalance(resBalance)
        })
        .catch(e => {})
    }
  }, [account, active, address])

  return balance
}

export const getLptValue = lpt_address => {
  const ABI = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06'
  console.log(lpt_address)
  const querygql = {
    query: `
    {
      uniswapFactories(first: 5, where: {id: "${lpt_address.toLowerCase()}"}) {
        id
        pairCount
        totalVolumeUSD
        totalVolumeETH
      }
      tokens(first: 5) {
        id
        symbol
        name
        decimals
      }
    }
  `,
  }
  return axios({
    method: 'post',
    url: ABI,
    data: querygql,
  })
}
const getPrice = async (library, data) => {
  const {
    collateral_chainid,
    collateral_symbol,
    collateral_address,
    collateral_decimals_number,
    underlying_chainid,
    underlying_symbol,
    underlying_address,
    underlying_decimals_number,
  } = data
  const value = await useIndexPrice(library, {
    collateral_chainid,
    collateral_address,
    collateral_decimals_number,
    collateral_symbol,
    underlying_chainid,
    underlying_address,
    underlying_decimals_number,
    underlying_symbol,
  })
  return value
}
export const getShortTokenValue = library =>
  getInsuranceList().then(Insurance => {
    const ReturnList = Insurance.data.data.options
    const ShortList = []
    ReturnList.forEach(item => {
      const CurrentInsurance = getCurrentInsurance({
        CollateralAddress: item.collateral,
        UnderlyingAddress: item.underlying,
      })
      if (CurrentInsurance) {
        const { type, insurance, collateral_decimals } = CurrentInsurance
        item.type = type
        item.insurance = insurance
        item.asks.forEach(itemAsk => {
          itemAsk.show_volume = fromWei(itemAsk.volume, collateral_decimals)
          const ShortItem = Object.assign(itemAsk, item)
          ShortList.push(ShortItem)
        })
      }
    })
    let PutValue = 0
    const PutList = ShortList.filter(item => item.type === 'Put')
    PutList.forEach(item => {
      PutValue += Number(item.show_volume)
    })
    let CallValue = 0
    const promise_list = []
    const CallList = ShortList.filter(item => item.type === 'Call')
    CallList.map(async (item, index) => {
      const CurrentInsurance = getCurrentInsurance({
        CollateralAddress: item.collateral,
        UnderlyingAddress: item.underlying,
      })
      const price = await getPrice(library, CurrentInsurance)
      promise_list.push(price * Number(item.show_volume))
      await Promise.all(promise_list.map(items => items * 1)).then(res => {
        CallValue = promise_list.reduce((prev, next) => prev + next)
        return CallValue
      })
      return CallValue
    })
    return PutValue + CallValue
  })
