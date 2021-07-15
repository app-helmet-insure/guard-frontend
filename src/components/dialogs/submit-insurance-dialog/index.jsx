import React, {useState} from 'react'
import {Modal, Checkbox, Button} from 'antd'
import './index.less'
import {FormattedMessage} from 'react-intl'

function SubmitInsuranceDialog ({visible, onClose}) {
  const [isCashDelivery, setIsCashDelivery] = useState(false)

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName="submit_insurance_dialog_wrap"
    >
      <h1><FormattedMessage id="submit_insurance_dialog_text1"/></h1>
      <p className="data">
        <FormattedMessage id="submit_insurance_dialog_text2" values={{
          num: <span>1000 HT</span>,
          doubleInsurance: <span><FormattedMessage id="submit_insurance_dialog_text3"/></span>,
          fee: '10.00 GURAD',
          profit: '100 BNB'
        }}/>
      </p>
      <Checkbox onChange={e => setIsCashDelivery(e.target.checked)} checked={isCashDelivery}>
        <div className="checkbox_title"><FormattedMessage id="submit_insurance_dialog_text4"/></div>
      </Checkbox>
      <p className="desc">
        <FormattedMessage id="submit_insurance_dialog_text5"/>
      </p>
      <div className="submit_view">
        <Button type="primary" className="btn_primary_gray">
          <FormattedMessage id="submit_insurance_dialog_text6"/>
        </Button>
      </div>
    </Modal>
  )
}

export default SubmitInsuranceDialog
