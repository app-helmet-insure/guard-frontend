import React from 'react'
import {Modal} from 'antd'
import './index.less'
import LoadingSvg from '../../../assets/images/loading2.svg'
import {FormattedMessage} from 'react-intl'
function WaitingConfirmationDialog({visible, onClose}) {
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName="waiting_confirmation_dialog_wrap"
    >
      <h1><FormattedMessage id="waiting_confirmation_dialog_text1"/></h1>
      <div className="text_center">
        <img src={LoadingSvg} alt="" className="loading_ani"/>
        <p><FormattedMessage id="waiting_confirmation_dialog_text2"/> </p>
      </div>
    </Modal>
  )
}
export default WaitingConfirmationDialog
