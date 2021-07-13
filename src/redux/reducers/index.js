import { LANGUAGE } from '../actions/index'

const language = window.localStorage.getItem('guard_frontend_language') || 'en'

// 初始化state
const initState = {
  language: language,
}

// reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case LANGUAGE:
      window.localStorage.setItem('guard_frontend_language', action.params.language)
      return {
        language: action.params.language,
      }
    default:
      return state
  }
}
