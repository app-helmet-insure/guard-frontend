import { BrowserRouter as Router } from 'react-router-dom'
import RouterList from './router'
import './assets/css/index.less'

export default () => {
  return (
    <Router>
      <RouterList />
    </Router>
  )
}
