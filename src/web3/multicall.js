import { Provider, setMulticallAddress} from 'ethers-multicall-x'
import {cloneDeep} from 'lodash'
import {JsonRpcProvider} from '@ethersproject/providers'
import {ChainId, getRpcUrl} from './address'

export const getMultiCallProvider = (provider, chainId) => {
  setMulticallAddress(ChainId.HECO, '0xc9a9F768ebD123A00B52e7A0E590df2e9E998707')
  setMulticallAddress(ChainId.MATIC, '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507')
  return new Provider(provider, chainId)
}

export const getOnlyMultiCallProvider = chainId => getMultiCallProvider(new JsonRpcProvider(getRpcUrl(chainId), chainId), chainId)

/**
 * MultiCallProvider解析器
 */
export const processResult = _data => {
  const data = cloneDeep(_data)
  if (Array.isArray(data)) {
    data.map((o, i) => {
      data[i] = processResult(o)
    })
    return data
  }
  if (data.toString) {
    return data.toString()
  }
  if (typeof data === 'object') {
    for (const key in data) {
      Object.assign(data, {
        [key]: processResult(0)
      })
    }
    return data
  }
  return data
}
