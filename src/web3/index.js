import {message} from 'antd'
import Web3 from 'web3'
import {getRpcUrl} from './address'

export const addToken = async (address, symbol, icon) =>{
  try {
    const addTokenClick = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals: 18,
          image: icon,
        },
      },
    })
    if (addTokenClick) {
      message.success('add success')
    }
  } catch (err) {
    console.log(err, 'addToken')
  }
}

export const getWeb3 = library => new Web3(library.provider)

export const getContract = (library, abi, address) => {
  const web3 = getWeb3(library)
  return new web3.eth.Contract(abi, address)
}

export const getHttpWeb3 = chainId => new Web3(new Web3.providers.HttpProvider(getRpcUrl(chainId)))

