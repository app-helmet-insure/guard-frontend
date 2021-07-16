import {message} from 'antd'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
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

export const useActiveWeb3React = () => {
  const context = useWeb3ReactCore()
  const contextNetwork = useWeb3ReactCore()
  return context.active ? context : contextNetwork
}

export function useBlockHeight() {
  const { library } = useActiveWeb3React()
  const [blockNumber, setBlockNumber] = useState(0)

  const updateBlockNumber = (blockNumber) => {
    setBlockNumber(blockNumber)
  }

  useEffect(() => {
    library && library.once('block', updateBlockNumber)
    return () => {
      library && library.off('block', updateBlockNumber)
    }
  }, [blockNumber, library])

  return blockNumber
}
