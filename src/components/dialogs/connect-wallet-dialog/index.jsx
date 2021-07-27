import React, {useEffect, useState} from 'react'
import { Modal } from 'antd'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import MathSvg from '../../../assets/images/walletConnect.png'
import MetamaskSvg from '../../../assets/images/metamask.svg'
import './index.less'
import {injected, useConnectWallet, walletConnector} from '../../../web3/connectors'
import {ChainId} from '../../../web3/address'
import {FormattedMessage} from 'react-intl'
import LoginAuthorizeDialog from '../login-authorize-dialog'

function ConnectWallDialog({visible, onClose}) {
  const connectWallet = useConnectWallet()
  const {chainId, active} = useWeb3ReactCore()
  const defChainId = injected.supportedChainIds.includes(chainId) ? chainId : ChainId.MATIC
  const [isLoginAuthorize, setIsLoginAuthorize] = useState(false)
  const onConnectWallMetaMask = () => {
    // const isUnlocked = window.ethereum.isConnected()
    // console.log('isUnlocked', isUnlocked)
    connectWallet(injected, defChainId).then(()=>{
      setIsLoginAuthorize(false)
    }).catch(() => {
      setIsLoginAuthorize(false)
    })
    // if (!isUnlocked) {
    onClose()
    setIsLoginAuthorize(true)
    // }
  }
  useEffect(() => {
    if (isLoginAuthorize && active) {
      setIsLoginAuthorize(false)
    }
  }, [active])
  const onConnectWallSanCode = () => {
    connectWallet(walletConnector[defChainId]).then(onClose)
  }
  return (
    <React.Fragment>
      <Modal
        visible={visible}
        footer={null}
        closable={false}
        onCancel={onClose}
        centered
        wrapClassName="connect_wallet_dialog_wrap"
        zIndex={1001}
      >
        <div className="connect_wallet_dialog">
          <div className="wallet_item flex_center" onClick={onConnectWallMetaMask}>
            <img src={MetamaskSvg} alt=""/>
            <p><FormattedMessage id="header_text5" values={{wallet: 'Metamask'}}/></p>
          </div>
          <div className="wallet_item flex_center" onClick={onConnectWallSanCode}>
            <img src={MathSvg} alt=""/>
            <p><FormattedMessage id="header_text8"/></p>
          </div>
        </div>
      </Modal>
      <LoginAuthorizeDialog visible={isLoginAuthorize} onClose={() => setIsLoginAuthorize(false)}/>
    </React.Fragment>
  )
}
export default ConnectWallDialog
