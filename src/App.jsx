import { BrowserRouter as Router, Link } from 'react-router-dom'
import RouterList from './router'
import './assets/css/index.less'
import {useEagerConnect} from './hooks/index'

export default () => {
  const tried = useEagerConnect()
  return (
    <Router>
      <RouterList />
    </Router>
  )
}
