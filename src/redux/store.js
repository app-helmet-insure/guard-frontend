import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import index from './reducers'

const store = createStore(
  combineReducers({
    index
  }),
  applyMiddleware(thunkMiddleware)
)

export default store
