import {BrowserRouter as Router} from 'react-router-dom'
import RouterList from './router'
import React from 'react'
import SwitchWalletDialog from './components/dialogs/switch-wallet-dialog'

import {connect} from 'react-redux'
import {changeShowSwitchWallet} from './redux/actions'

const App = (props) => {
  return (
    <React.Fragment>
      <Router>
        <RouterList/>
      </Router>
      <SwitchWalletDialog visible={props.showSwitchWallet} onClose={() => {
        props.changeShowSwitchWallet(false)
      }}/>
    </React.Fragment>
  )
}
export default connect(
  state => state.index, {
    changeShowSwitchWallet
  }
)(App)
