
import {getHttpWeb3} from '../web3'
import {ChainId} from '../web3/address'
import BigNumber from 'bignumber.js'

export const formatAddress = (address, left = 4, right = 4) => {
  if (!address) {
    return null
  }
  return address.slice(0, left) + '...' + address.slice(-right)
}

export const getGasPrice = async () => {
  const web3 = getHttpWeb3(window.ethereum ? window.ethereum.chainId * 1 : ChainId.MATIC)
  const gasFee = await web3.eth.getGasPrice()
  console.log('gasFee', gasFee, new BigNumber(gasFee).multipliedBy(1.5).toFixed(0).toString())
  return new BigNumber(gasFee).multipliedBy(1.5).toFixed(0).toString()
}
