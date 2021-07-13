import { Link, Redirect, Route, Switch } from 'react-router-dom'


export default props => {
  const { children, redirect } = props

  return (
    <div>
      <div>React 子路由功能展示</div>
      <ul>
        <li><Link to="/detail">detail A</Link></li>
        <li><Link to="/detail/b">detail B</Link></li>
        111
      </ul>

      <Switch>
        {children}
        <Redirect r-show={redirect} to={redirect} />
        <Route component={() => (<div>404 Page not Found!</div>)} />
      </Switch>
    </div>
  )
}
