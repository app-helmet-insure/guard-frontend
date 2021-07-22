import { UPDATE_COUNT } from '../actions/web3'

// 初始化state
const initState = {
  updateCount: 0, // 用于立即更新blockNumber
}

// reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_COUNT:
      return {
        ...state,
        updateCount: state.updateCount + 1,
      }
    default:
      return state
  }
}
