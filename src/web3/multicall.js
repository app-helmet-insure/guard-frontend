import {config, multicallClient, Contract as ClientContract} from '@chainstarter/multicall-client.js'

import {ChainId, getRpcUrl} from './address'


config({
  defaultChainId: ChainId.MATIC,
  allowFailure: false,
  rpc: {
    [ChainId.LOCALHOST]: {
      url: 'http://localhost:8545', // rpc url
      address: '0x6427169aB7344F9C37E9dC9001c681BEcd09343d', // multicall2 address
    }
  }
})

export {
  multicallClient,
  ClientContract
}
