
export const BLOCK_HEIGHT = 'web3/BLOCK_HEIGHT'
export const BALANCE = 'web3/BALANCE'

export function changeBlockHeight(params) {
  return { type: BLOCK_HEIGHT, params}
}

