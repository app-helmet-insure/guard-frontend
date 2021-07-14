import { BrowserRouter as Router, Link } from 'react-router-dom'
import RouterList from './router'
import './assets/css/index.less'

export default () => {
  return (
    <Router>
      <RouterList />
    </Router>
  )
}
