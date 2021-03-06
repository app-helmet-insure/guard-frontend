import Web3 from 'web3'
import { useContext, useEffect, useMemo, useState } from 'react'
import PairABI from '../web3/abi/Pair.json'
import {
  Token,
  Route,
  Pair,
  TokenAmount,
  Fetcher,
} from '@dinoswap/quickswap-sdk'
import { getContract, useActiveWeb3React } from '../web3'
import { formatAmount } from '../utils/format'
import { ChainId } from '../web3/address'
import { getHttpWeb3 } from '../web3'
import ERC20_ABI from '../web3/abi/ERC20.json'
import axios from 'axios'
import { fromWei, toWei } from 'web3-utils'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'
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
  decimals = 18,
  chainId_ = ChainId.BSC
) => {
  const [balance, setBalance] = useState('0')
  const { account, library, active } = useActiveWeb3React()
  useMemo(() => {
    if (active && address) {
      const WEB3 = getHttpWeb3(chainId_)
      const contract = new WEB3.eth.Contract(abi, ContractAddress)
      contract.methods
        .balanceOf(address)
        .call()
        .then(balance_ => {
          const resBalance = formatAmount(balance_, decimals)
          setBalance(resBalance)
        })
        .catch(e => { })
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


  return  await useIndexPrice(library, {
    collateral_chainid,
    collateral_address,
    collateral_decimals_number,
    collateral_symbol,
    underlying_chainid,
    underlying_address,
    underlying_decimals_number,
    underlying_symbol,
  })
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
    const CallList = ShortList.filter(item => item.type === 'Call')

    const TVLPriceMap = {}
    const priceArr = []
    for (let i = 0; i < CallList.length; i++) {
      const CurrentInsurance = getCurrentInsurance({
        CollateralAddress: CallList[i].collateral,
        UnderlyingAddress: CallList[i].underlying,
      })
      CallList[i].CurrentInsurance = CurrentInsurance
      if (!TVLPriceMap[`${CurrentInsurance.collateral_address}${CurrentInsurance.underlying_address}`]) {
        priceArr.push(CurrentInsurance)
        TVLPriceMap[`${CurrentInsurance.collateral_address}${CurrentInsurance.underlying_address}`] = true
      }
    }
    return Promise.all(
      priceArr.map((item, index) => getPrice(library, item))
    ).then(price_list => {
      const priceMap = {}
      for (let i = 0; i < priceArr.length; i++) {
        priceMap[`${priceArr[i].collateral_address}${priceArr[i].underlying_address}`] = price_list[i]
      }
      CallValue = CallList.reduce(
        (sum, item, index) => sum + (priceMap[`${item.CurrentInsurance.collateral_address}${item.CurrentInsurance.underlying_address}`] || 0) * CallList[index].show_volume,
        0
      )
      return CallValue + PutValue
    })
  })
