import React, { useContext, useMemo, useState } from 'react'
import './index.less'
import LOGO from '../../assets/images/logo.svg'
import GuradSvg from '../../assets/images/gurad-icon.svg'
import MenuSvg from '../../assets/images/menu.svg'
import HelmetSvg from '../../assets/images/helmet.svg'
import { useWeb3React } from '@web3-react/core'
import { formatAddress } from '../../utils'
import DrawerMenu from '../drawer-menu'
import { FormattedMessage } from 'react-intl'
import ConnectWallDialog from '../dialogs/connect-wallet-dialog'
import { Link } from 'react-router-dom'
import InstallMetamaskDialog from '../dialogs/install-metamask-dialog'
import HeaderChaimDialog from '../dialogs/header-claim-dialog'

import claim from '../../configs/claim'
import { VarContext } from '../../context'
import DisconnectedWalletDialog from '../dialogs/disconnected-wallet-dialog'

export const navList = [
  {
    name: <FormattedMessage id="header_text1" />,
    path: '/insurance',
    children: [
      {
        name: <FormattedMessage id="mypolicy_text1" />,
        path: '/mypolicy',
      },
      {
        name: <FormattedMessage id="mysupply_text1" />,
        path: '/mysupply',
      },
      {
        name: <FormattedMessage id="mysettle_text1" />,
        path: '/mysettle',
      },
    ],
  },
  {
    name: <FormattedMessage id="header_text2" />,
    path: '/mining',
  },
  {
    name: 'IBO',
    path: '/ibo',
  },
]

function Header (props) {
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [visibleConnectWall, setVisibleConnectWall] = useState(false)

  const [
    visibleDisconnectConnectWall,
    setVisibleDisconnectConnectWall,
  ] = useState(false)
  const [nonExistentMetamask, setNonExistentMetamask] = useState(false)

  const { account, activate, active, library, chainId } = useWeb3React()

  const [visibleHeaderClaimPopup, setVisibleHeaderClaimPopup] = useState(false)

  const [claimPools, setClaimPools] = useState(claim[0])

  const { balance, blockHeight } = useContext(VarContext)

  useMemo(() => {
    if (active && props.location.search.indexOf('claim') > -1) {
      setVisibleHeaderClaimPopup(true)
    } else {
      setVisibleHeaderClaimPopup(false)
    }
  }, [active, props.location.search])

  const goClaim = () => {
    setVisibleHeaderClaimPopup(true)
  }
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
      <div className="header_token_contract_address">
        <span></span>
        <p>
          Guard is now on quickswap.exchange. Token Contract Address:
          0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8
          <a
            href="https://quickswap.exchange/#/swap?inputCurrency=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&outputCurrency=0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8"
            target="_blank"
          >
            Exchange now
          </a>
        </p>
      </div>
      <div style={{ width: '100%', background: '#fff' }}>
        <div className="header">
          <Link to="/" className="logo">
            <img src={LOGO} alt="Gurad" />
          </Link>
          <ul className="nav_list">
            {navList.map(item => (
              <Link to={item.path} className="nav_list_item" key={item.path}>
                <span
                  className={
                    props.location.pathname &&
                    props.location.pathname.indexOf(item.path) === 0
                      ? 'active'
                      : ''
                  }
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </ul>
          <div className="connect_wallet">
            <a href="https://app.helmet.insure/#/">
              <div className="to_helmet flex_center">
                <img src={HelmetSvg} alt="" />
                <FormattedMessage
                  id="header_text7"
                  values={{ name: 'Helmet' }}
                />
              </div>
            </a>

            <a className="header_claim flex_center" onClick={goClaim}>
              <FormattedMessage id="header_claim_dialog_text1" />
            </a>

            {!active ? (
              <div
                className="not_connect flex_center"
                onClick={connectWalletClick}
              >
                <FormattedMessage id="header_text6" />
              </div>
            ) : (
              <div className="connected" onClick={connectWalletClick}>
                <div className="balance flex_center">
                  <img src={GuradSvg} alt="" />
                  {balance}
                </div>
                <div className="address flex_center">
                  {formatAddress(account)}
                  <span />
                </div>
              </div>
            )}
          </div>
          <div className="menu_tab">
            <img src={MenuSvg} alt="" onClick={() => setVisibleMenu(true)} />
          </div>
        </div>
      </div>
      <DrawerMenu
        {...{
          account,
          active,
          chainId,
          visible: visibleMenu,
          setVisible: setVisibleMenu,
          visibleHeaderClaim: visibleHeaderClaimPopup,
          setVisibleHeaderClaim: setVisibleHeaderClaimPopup,
          connectWalletClick,
          ...props,
        }}
      />
      <DisconnectedWalletDialog
        visible={visibleDisconnectConnectWall}
        onClose={() => setVisibleDisconnectConnectWall(false)}
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
      {/* claim */}
      <HeaderChaimDialog
        visible={visibleHeaderClaimPopup}
        onClose={() => setVisibleHeaderClaimPopup(false)}
        pool={claimPools}
      />
    </>
  )
}

export default Header
