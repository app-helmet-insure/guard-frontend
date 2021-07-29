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

function HeaderChaimDialog({ visible, onClose, intl, pool }) {
  const formatMessage = (id, values = {}) => intl.formatMessage({ id, values })
  const { library, active, account } = useActiveWeb3React()
  const [loadFlag, setLoadFlag] = useState(false)
  const [claimPools, setClaimPools] = useState(pool)

  useMemo(() => {
    setClaimPools(pool)
  }, [pool])

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
          claimPools &&
          claimPools.rewards1 +
          ' ' +
          formatMessage('stake_chain_dialog_text5')
        }
        value={claimPools && claimPools.earned
          ? formatNumber(
            formatAmount(claimPools.earned, claimPools.decimal, 6),
            {
              thousand: ',',
              decimal: '.',
              precision:
                formatAmount(claimPools.earned) - 0 > 0
                  ? claimPools.splitDigits
                  : 0,
            }
          ) +
          ' ' +
          claimPools.rewards1
          : '--'}
      />
      {claimPools && claimPools.rewards2 && (
        <LineData
          title={
            claimPools &&
            claimPools.rewards2 +
            ' ' +
            formatMessage('stake_chain_dialog_text5')
          }
          value={
            claimPools && claimPools.earned2
              ? formatNumber(
                formatAmount(claimPools.earned2, claimPools.decimal, 6),
                formatAmount(claimPools.earned2) - 0 > 0
                  ? claimPools.splitDigits
                  : 0
              ) +
              ' ' +
              claimPools.rewards2
              : '--'
          }
        />
      )}
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