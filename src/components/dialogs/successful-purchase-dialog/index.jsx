import React from 'react'
import {Modal} from 'antd'
import './index.less'
import SuccessSvg from '../../../assets/images/success.svg'
import FailSvg from '../../../assets/images/fail.png'
import {FormattedMessage} from 'react-intl'


function SuccessfulPurchaseDialog({visible, onClose, message, status = 'success'}) {
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName="successful_purchase_dialog_wrap"
    >
      <div className="text_center">
        {
          status === 'success' ? <img src={SuccessSvg} alt=""/> : <img src={FailSvg} alt=""/>
        }
        <p>
          {message ? message : (status === 'success' ? <FormattedMessage id="successful_purchase_dialog_text1"/> : <FormattedMessage id="successful_purchase_dialog_text3"/>)}
        </p>
      </div>
    </Modal>
  )
}
export default SuccessfulPurchaseDialog
