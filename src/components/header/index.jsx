import React from 'react'
import './index.less'
import LOGO from '../../assets/images/logo.svg'
import GURAD_ICON from '../../assets/images/gurad-icon.svg'
import {useWeb3React} from '@web3-react/core'
import {formatAddress} from '../../utils'

function Header () {
  const { account, activate, active } = useWeb3React()
  console.log(account, active)
  const connectWalletClick = () => {

  }
  return (
    <div className="header">
      <div className="logo">
        <img src={LOGO} alt="Gurad"/>
      </div>
      <ul className="nav_list">
        <li className="nav_list_item">
          <span className="active">保险</span>
        </li>
        <li className="nav_list_item">
          <span>挖矿</span>
        </li>
      </ul>
      <div className="connect_wallet">
        {!active ? (
          <div className="not_connect flex_center" onClick={connectWalletClick}>CONNECT WALLET</div>
        ) : (
          <div className="connected">
            <div className="balance flex_center">
              <img src={GURAD_ICON} alt=""/>
              14966231.12
            </div>
            <div className="address flex_center">
              {formatAddress(account)}
              <span />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
