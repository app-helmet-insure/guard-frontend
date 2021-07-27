import { Switch, Route, Redirect } from 'react-router-dom'
import routerConfig from './router.config'

function mapRoutes(routes_) {
  return routes_.map((item, index) => {
    const { exact = false, path, routes, redirect, component, ...rest } = item

    return (
      <Route exact={exact} path={path} key={index} render={props => {
        const NewComp = component
        const newProps = Object.assign(props, { redirect, ...rest })

        if (routes) {
          return <NewComp {...newProps}>{mapRoutes(routes)}</NewComp>
        }
        return redirect ? <Redirect to={redirect} /> : <NewComp {...newProps} />
      }} />
    )
  })
}

export default (props) => (
  <Switch>
    {mapRoutes(routerConfig)}
    <Route component={() => {
      window.location.href = '/'
      return null
    }}/>
  </Switch>
)
