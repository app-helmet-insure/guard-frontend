import Web3 from 'web3'
import OrderABI from '../web3/abi/Order.json'
import { useActiveWeb3React, getContract } from '../web3'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'

export const sellOnETH = () => {
  console.log(useActiveWeb3React())
  //   const { library, active, account } = useActiveWeb3React()
  //   console.log(library, active, account)
  //   const Contracts = getContract(library, OrderABI.abi, OrderAddress)
  //   console.log(library, active, account)
  return 1111111111
}
export const sell = () => {}
