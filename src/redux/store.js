import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import counter from './reducers/counter'
import index from './reducers'

const store = createStore(
  combineReducers({
    counter,
    index
  }),
  applyMiddleware(thunkMiddleware)
)

export default store
