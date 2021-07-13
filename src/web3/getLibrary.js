import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'

export function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 8000
  console.log(library, 'library')
  return library
}

export function getNetworkLibrary(provider) {
  const library = new JsonRpcProvider(provider)
  library.pollingInterval = 8000
  console.log(library, 'library')
  return library
}
