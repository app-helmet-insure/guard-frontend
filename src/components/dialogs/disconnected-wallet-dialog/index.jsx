import React, {useState} from 'react'
import './index.less'
import {FormattedMessage} from 'react-intl'
import {Button, Modal, message} from 'antd'
import {
  useWeb3React as useWeb3ReactCore,
} from '@web3-react/core'
import {formatAddress} from '../../../utils'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import CopyPng from '../../../assets/images/copy.png'
import SwitchPng from '../../../assets/images/switch.png'
import ConnectWallDialog from '../connect-wallet-dialog'

function DisconnectedWalletDialog ({visible, onClose}) {
  const {account, deactivate} = useWeb3ReactCore()
  const [visibleConnectWall, setVisibleConnectWall] = useState(false)
  const onSwitchWallet = () => {
    // onClose()
    setVisibleConnectWall(true)
  }
  return (
    <React.Fragment>
      <Modal
        visible={visible}
        footer={null}
        onCancel={onClose}
        centered
        destroyOnClose
        wrapClassName="disconnected_wallet_dialog_wrap"
      >
        <h1><FormattedMessage id="disconnected_wallet_dialog_text1"/></h1>
        <p>
          {formatAddress(account, 6, 3)}
        </p>

        <CopyToClipboard
          text={account}
          onCopy={() => {
            message.success('copy success')
          }}
        >
          <div className="menu_btn flex_center_up_and_down">
            <img src={CopyPng} alt=""/>
            <FormattedMessage id="disconnected_wallet_dialog_text2"/>
          </div>
        </CopyToClipboard>
        <div className="menu_btn flex_center_up_and_down" onClick={onSwitchWallet}>
          <img src={SwitchPng} alt=""/>
          <FormattedMessage id="disconnected_wallet_dialog_text3"/>
        </div>
        <Button className="btn_primary disconnect_btn" type="primary" size="large" onClick={() => {
          deactivate()
          onClose()
        }}>
          <FormattedMessage id="disconnected_wallet_dialog_text4"/>
        </Button>
      </Modal>
      <ConnectWallDialog visible={visibleConnectWall} onClose={() => setVisibleConnectWall(false)}/>
    </React.Fragment>

  )
}
export default DisconnectedWalletDialog
