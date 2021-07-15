import React from 'react'
import {Button, Modal} from 'antd'
import './index.less'
import LoadingSvg from '../../../assets/images/loading2.svg'
import {FormattedMessage} from 'react-intl'

function LoginAuthorizeDialog({visible, onClose}) {
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName="loading_authorize_dialog_wrap"
    >
      <h1><FormattedMessage id="login_authorize_dialog_text1"/></h1>
      <p>
        <FormattedMessage id="login_authorize_dialog_text2" values={{
          wallet: 'MetaMask'
        }}/>
      </p>
      <div className="dialog_footer flex_center">
        <div className="flex_center">
          <img src={LoadingSvg} alt="" className="loading_ani"/>
        </div>
        <Button className="dismiss_btn" type="primary" size="large" onClick={onClose}>
          <FormattedMessage id="login_authorize_dialog_text3"/>
        </Button>
      </div>
    </Modal>
  )
}
export default LoginAuthorizeDialog
