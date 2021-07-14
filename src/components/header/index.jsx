import React, {useState} from 'react'
import './index.less'
import LOGO from '../../assets/images/logo.svg'
import GuradSvg from '../../assets/images/gurad-icon.svg'
import MenuSvg from '../../assets/images/menu.svg'
import {useWeb3React} from '@web3-react/core'
import {formatAddress} from '../../utils'
import DrawerMenu from '../drawer-menu'
import {FormattedMessage} from 'react-intl'
import ConnectWallDialog from '../dialogs/connect-wall-dialog'

function Header () {
  const {account, activate, active} = useWeb3React()
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [visibleConnectWall, setVisibleConnectWall] = useState(false)
  console.log(account, active)
  const connectWalletClick = () => {
    setVisibleConnectWall(true)
  }
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={LOGO} alt="Gurad"/>
        </div>
        <ul className="nav_list">
          <li className="nav_list_item">
            <span className="active">
              <FormattedMessage id="header_text1"/>
            </span>
          </li>
          <li className="nav_list_item">
            <span>
              <FormattedMessage id="header_text2"/>
            </span>
          </li>
        </ul>
        <div className="connect_wallet">
          {!active ? (
            <div className="not_connect flex_center" onClick={connectWalletClick}>CONNECT WALLET</div>
          ) : (
            <div className="connected">
              <div className="balance flex_center">
                <img src={GuradSvg} alt=""/>
                14966231.12
              </div>
              <div className="address flex_center">
                {formatAddress(account)}
                <span/>
              </div>
            </div>
          )}
        </div>
        <div className="menu_tab">
          <img src={MenuSvg} alt="" onClick={() => setVisibleMenu(true)}/>
        </div>
      </div>
      <DrawerMenu {...{account, active, visible: visibleMenu, setVisible: setVisibleMenu, connectWalletClick}}/>
      <ConnectWallDialog visible={visibleConnectWall} onClose={() => setVisibleConnectWall(false)}/>
    </>
  )
}

export default Header
