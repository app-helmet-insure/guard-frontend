import React from 'react'
import { Modal } from 'antd';
import MathSvg from '../../../assets/images/math.svg'
import MetamaskSvg from '../../../assets/images/metamask.svg'
import './index.less'
import {injected, useConnectWallet} from '../../../web3/connectors'
import {ChainId} from '../../../web3/address'
import {FormattedMessage} from 'react-intl'

function ConnectWallDialog({visible, onClose}) {
  const connectWallet = useConnectWallet()
  const onConnectWallMetaMask = () => {
    connectWallet(injected, ChainId.HECO).then(onClose)
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
        <div className="wallet_item flex_center">
          <img src={MathSvg} alt=""/>
          <p><FormattedMessage id="header_text5" values={{wallet: 'Math'}}/></p>
        </div>
      </div>
    </Modal>

  )
}
export default ConnectWallDialog
