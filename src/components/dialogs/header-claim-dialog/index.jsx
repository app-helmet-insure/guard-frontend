import React, { useState, useMemo } from 'react'
import { Modal, Button, message } from 'antd'
import './index.less'
import { FormattedMessage } from 'react-intl'
import { injectIntl } from 'react-intl'
import Web3 from 'web3'
// 处理格式 千位符
import { formatNumber } from 'accounting'
import { formatAmount, numToWei, splitFormat } from '../../../utils/format'
import { useActiveWeb3React, getContract } from '../../../web3'
import ERC20 from '../../../web3/abi/ERC20.json'
import GuardInsureLogo from '../../../assets/images/guard.insure_logo@2x.png'

function LineData({ title, value }) {
  return (
    <div className='rewards_data'>
      <div className='title'>{title}</div>
      <div className='value'>{value}</div>
    </div>
  )
}

function HeaderChaimDialog({ visible, onClose, intl }) {
  const formatMessage = (id, values = {}) => intl.formatMessage({ id, values })
  const { library, active } = useActiveWeb3React()
  const [loadFlag, setLoadFlag] = useState(false)

  const onConfirm = (e) => {
    if (!active) {
      return
    }
    if (loadFlag) return
    setLoadFlag(true)
    message.success({
      content: formatMessage('mining_text20'),
      style: {
        color: '#2A3749',
      },
    })
  }

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName='header_chain_dialog_wrap stake_chain_dialog_wrap'
    >
      <img className='guard_insure_logo' src={GuardInsureLogo} alt="" />
      <LineData
        title={
          formatMessage('stake_chain_dialog_text5')
        }
        value={'10 Guard'}
      />
      <Button
        type='primary'
        size='large'
        className='btn_primary_gray'
        loading={loadFlag}
        onClick={onConfirm}
      >
        <FormattedMessage id='stake_chain_dialog_text4' />
      </Button>
      <a className='header_chain_dialog_wrap_tips'><FormattedMessage id='stake_chain_dialog_text8' /></a>
    </Modal>
  )
}
export default injectIntl(HeaderChaimDialog)