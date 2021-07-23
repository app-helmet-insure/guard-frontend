import React, {useContext, useEffect, useMemo, useState} from 'react'
import './index.less'
import LOGO from '../../assets/images/logo.svg'
import GuradSvg from '../../assets/images/gurad-icon.svg'
import MenuSvg from '../../assets/images/menu.svg'
import HelmetSvg from '../../assets/images/helmet.svg'
import {useWeb3React} from '@web3-react/core'
import {formatAddress} from '../../utils'
import DrawerMenu from '../drawer-menu'
import {FormattedMessage} from 'react-intl'
import ConnectWallDialog from '../dialogs/connect-wallet-dialog'
import {Link} from 'react-router-dom'
import InstallMetamaskDialog from '../dialogs/install-metamask-dialog'

import {VarContext} from '../../context'
import DisconnectedWalletDialog from '../dialogs/disconnected-wallet-dialog'

export const navList = [
  {
    name: <FormattedMessage id="header_text1"/>,
    path: '/insurance',
    children: [
      {
        name: '我的保单',
        path: '/1',
      },
      {
        name: '我发布的保险',
        path: '/2',
      },
      {
        name: '我的结束',
        path: '/3',
      },
    ],
  },
  {
    name: <FormattedMessage id="header_text2"/>,
    path: '/mining',
  },
]

function Header (props) {
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [visibleConnectWall, setVisibleConnectWall] = useState(false)

  const [visibleDisconnectConnectWall, setVisibleDisconnectConnectWall] = useState(false)
  const [nonExistentMetamask, setNonExistentMetamask] = useState(false)

  const {account, activate, active, library, chainId} = useWeb3React()

  const {balance} = useContext(VarContext)

  const connectWalletClick = async () => {
    if (window.ethereum) {
      if (active) {
        setVisibleDisconnectConnectWall(true)
      } else {
        setVisibleConnectWall(true)
      }
    } else {
      // 没下载MetaMask
      setNonExistentMetamask(true)
    }
  }
  return (
    <>
      <div className="header">
        <Link to="/" className="logo">
          <img src={LOGO} alt="Gurad"/>
        </Link>
        <ul className="nav_list">
          {navList.map(item => (
            <Link
              to={item.path}
              className="nav_list_item"
              key={item.path}>
              <span
                className={
                  props.location.pathname && props.location.pathname.indexOf(item.path) === 0
                    ? 'active'
                    : ''
                }>
                {item.name}
              </span>
            </Link>
          ))}
        </ul>
        <div className="connect_wallet">
          <a href="https://www.helmet.insure/">
            <div className="to_helmet flex_center">
              <img src={HelmetSvg} alt=""/>
              <FormattedMessage id="header_text7" values={{name: 'Helmet'}}/>
            </div>
          </a>

          {!active ? (
            <div
              className="not_connect flex_center"
              onClick={connectWalletClick}>
              <FormattedMessage id="header_text6"/>
            </div>
          ) : (
            <div className="connected" onClick={connectWalletClick}>
              <div className="balance flex_center">
                <img src={GuradSvg} alt=""/>
                {balance}
              </div>
              <div className="address flex_center">
                {formatAddress(account)}
                <span/>
              </div>
            </div>
          )}
        </div>
        <div className="menu_tab">
          <img
            src={MenuSvg}
            alt=""
            onClick={() => setVisibleMenu(true)}
          />
        </div>
      </div>
      <DrawerMenu
        {...{
          account,
          active,
          chainId,
          visible: visibleMenu,
          setVisible: setVisibleMenu,
          connectWalletClick,
          ...props,
        }}
      />
      <DisconnectedWalletDialog visible={visibleDisconnectConnectWall} onClose={()=> setVisibleDisconnectConnectWall(false)}/>
      <ConnectWallDialog
        visible={visibleConnectWall}
        onClose={() => setVisibleConnectWall(false)}
      />
      {/* 无钱包提示 */}
      <InstallMetamaskDialog
        visible={nonExistentMetamask}
        onClose={() => setNonExistentMetamask(false)}
      />
    </>
  )
}

export default Header
