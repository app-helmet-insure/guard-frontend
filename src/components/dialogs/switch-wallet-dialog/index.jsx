import React from 'react'
import {Button, Modal} from 'antd'
import './index.less'
import {FormattedMessage} from 'react-intl'

function SwitchWalletDialog({visible, onClose}) {
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName="switch_wallet_dialog_wrap"
    >
      <h1><FormattedMessage id="switch_wallet_dialog_text1"/></h1>
      <p>
        <FormattedMessage id="switch_wallet_dialog_text2"/>
      </p>
      <p>
        <FormattedMessage id="switch_wallet_dialog_text3"/>
      </p>
      <div className="dialog_footer">
        <Button className="dismiss_btn" type="primary" size="large" onClick={onClose}>
          <FormattedMessage id="switch_wallet_dialog_text4"/>
        </Button>
      </div>
    </Modal>
  )
}
export default SwitchWalletDialog
