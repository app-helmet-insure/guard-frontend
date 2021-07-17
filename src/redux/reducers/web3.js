import { BLOCK_HEIGHT } from '../actions/web3'

// 初始化state
const initState = {
  blockHeight: 0,
  balance: 0
}

// reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case BLOCK_HEIGHT:
      return {
        ...state,
        blockHeight: action.params.blockHeight,
      }
    default:
      return state
  }
}
