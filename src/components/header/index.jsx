import React, {useState} from 'react'
import './index.less'
import LOGO from '../../assets/images/logo.svg'
import GuradSvg from '../../assets/images/gurad-icon.svg'
import MenuSvg from '../../assets/images/menu.svg'
import {useWeb3React} from '@web3-react/core'
import {formatAddress} from '../../utils'
import DrawerMenu from '../drawer-menu'
import {FormattedMessage} from 'react-intl'
import ConnectWallDialog from '../dialogs/connect-wallet-dialog'
import {Link} from 'react-router-dom'
import InstallMetamaskDialog from '../dialogs/install-metamask-dialog'

export const navList = [
  {
    name: <FormattedMessage id="header_text1"/>,
    path: '/',
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
  console.log(props)
  const {account, activate, active} = useWeb3React()
  console.log(account, active)
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [visibleConnectWall, setVisibleConnectWall] = useState(false)
  const [nonExistentMetamask, setNonExistentMetamask] = useState(false)
  const connectWalletClick = () => {
    if (window.ethereum) {
      setVisibleConnectWall(true)
    } else {
      setNonExistentMetamask(true)
    }
  }
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={LOGO} alt="Gurad"/>
        </div>
        <ul className="nav_list">
          {navList.map((item) => (
            <Link
              to={item.path}
              className="nav_list_item"
              key={item.path}>
                            <span
                              className={
                                props.location.pathname === item.path
                                  ? 'active'
                                  : ''
                              }>
                                {item.name}
                            </span>
            </Link>
          ))}
        </ul>
        <div className="connect_wallet">
          {!active ? (
            <div
              className="not_connect flex_center"
              onClick={connectWalletClick}>
              CONNECT WALLET
            </div>
          ) : (
            <div className="connected" onClick={connectWalletClick}>
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
          visible: visibleMenu,
          setVisible: setVisibleMenu,
          connectWalletClick,
          ...props,
        }}
      />
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
