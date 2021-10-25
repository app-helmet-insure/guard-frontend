
import {getHttpWeb3} from '../web3'
import {ChainId} from '../web3/address'
import BigNumber from 'bignumber.js'
import axios from 'axios'

export const formatAddress = (address, left = 4, right = 4) => {
  if (!address) {
    return null
  }
  return address.slice(0, left) + '...' + address.slice(-right)
}

export const getGasPrice = async () => {
  const web3 = getHttpWeb3(window.ethereum ? window.ethereum.chainId * 1 : ChainId.MATIC)
  // const gasFee1 = await web3.eth.getGasPrice()
  const gasFee = await axios({
    method: 'get',
    url: 'https://gasstation-mainnet.matic.network/'
  }).then(res => res.data.fast)
  // console.log('gasFee1', gasFee1, new BigNumber(gasFee1).multipliedBy(1.5).toFixed(0).toString())
  console.log('gasFee', gasFee, web3.utils.toWei(String(gasFee), 'gwei'))

  return new BigNumber(web3.utils.toWei(String(gasFee), 'gwei')).multipliedBy(1.5).toFixed(0).toString()
}
