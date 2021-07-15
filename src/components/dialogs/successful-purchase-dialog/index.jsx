import React from 'react'
import {Modal} from 'antd'
import './index.less'
import SuccessSvg from '../../../assets/images/success.svg'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router-dom'
function SuccessfulPurchaseDialog({visible, onClose}) {
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
        <img src={SuccessSvg} alt=""/>
        <p>
          <FormattedMessage id="successful_purchase_dialog_text1" values={{
            title: <Link to="" className="link">
              <FormattedMessage id="successful_purchase_dialog_text2"/> </Link>}}/>
        </p>
      </div>
    </Modal>
  )
}
export default SuccessfulPurchaseDialog
