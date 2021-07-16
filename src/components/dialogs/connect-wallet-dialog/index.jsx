import React from 'react'
import { Modal } from 'antd'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import MathSvg from '../../../assets/images/math.svg'
import MetamaskSvg from '../../../assets/images/metamask.svg'
import './index.less'
import {injected, useConnectWallet, walletConnector} from '../../../web3/connectors'
import {ChainId} from '../../../web3/address'
import {FormattedMessage} from 'react-intl'

function ConnectWallDialog({visible, onClose}) {
  const connectWallet = useConnectWallet()
  const {chainId} = useWeb3ReactCore()
  const defChainId = injected.supportedChainIds.includes(chainId) ? chainId : ChainId.MATIC
  const onConnectWallMetaMask = () => {
    connectWallet(injected, defChainId).then(onClose)
  }
  const onConnectWallSanCode = () => {
    connectWallet(walletConnector[defChainId]).then(onClose)
  }
  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      onCancel={onClose}
      centered
      wrapClassName="connect_wallet_dialog_wrap"
    >
      <div className="connect_wallet_dialog">
        <div className="wallet_item flex_center" onClick={onConnectWallMetaMask}>
          <img src={MetamaskSvg} alt=""/>
          <p><FormattedMessage id="header_text5" values={{wallet: 'Metamask'}}/></p>
        </div>
        <div className="wallet_item flex_center" onClick={onConnectWallSanCode}>
          <img src={MathSvg} alt=""/>
          <p><FormattedMessage id="header_text5" values={{wallet: 'Math'}}/></p>
        </div>
      </div>
    </Modal>

  )
}
export default ConnectWallDialog
