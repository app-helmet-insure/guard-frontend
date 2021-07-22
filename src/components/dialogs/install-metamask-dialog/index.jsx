import React from 'react'
import {Button, Modal} from 'antd'
import './index.less'
import MetamaskSvg from '../../../assets/images/metamask.svg'
import {FormattedMessage} from 'react-intl'

function InstallMetamaskDialog({visible, onClose}) {
  const reloadPage = () => {
    window.location.reload()
  }
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName="install_metamask_dialog_wrap"
    >
      <h1><FormattedMessage id="install_metamask_dialog_text3"/></h1>
      <div className="metamask_title flex_center_up_and_down">
        <img src={MetamaskSvg} alt=""/>
        <span>MetaMask</span>
      </div>
      <p>
        <FormattedMessage id="install_metamask_dialog_text1" values={{
          wallet: <strong>MetaMask</strong>
        }}/>
        <span className="refresh_page" onClick={reloadPage}>
          <FormattedMessage id="install_metamask_dialog_text2"/>
        </span>
      </p>
      <div className="dialog_footer">
        <div>
          <Button className="install_btn back" size="large" type="primary" ghost onClick={onClose}>
            <FormattedMessage id="install_metamask_dialog_text4"/>
          </Button>
        </div>
        <Button className="install_btn install" type="primary" size="large" onClick={() => window.open('https://metamask.io/')}>
          <FormattedMessage id="install_metamask_dialog_text5" values={{
            wallet: 'MetaMask'
          }}/>
        </Button>
      </div>
    </Modal>
  )
}

export default InstallMetamaskDialog
