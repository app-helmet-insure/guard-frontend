import React, { useContext, useState, useMemo } from 'react'
import { Modal, Button, message } from 'antd'
import './index.less'
import { FormattedMessage } from 'react-intl'
import { injectIntl } from 'react-intl'
import Web3 from 'web3'
import { VarContext } from '../../../context'
import { getClaimInfo } from '../../../hooks/claim'
// 处理格式 千位符
import { formatNumber } from 'accounting'
import { formatAmount, numToWei, splitFormat } from '../../../utils/format'
import { useActiveWeb3React, getContract } from '../../../web3'
import PolygonscanClaim from '../../../web3/abi/PolygonscanClaim.json'
import GuardInsureLogo from '../../../assets/images/guard.insure_logo@2x.png'

function LineData ({ title, value }) {
  return (
    <div className="rewards_data">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  )
}

function HeaderChaimDialog ({ visible, onClose, intl, pool }) {
  const { blockHeight } = useContext(VarContext)
  const formatMessage = (id, values = {}) => intl.formatMessage({ id, values })
  const { library, active, account } = useActiveWeb3React()
  const [loadFlag, setLoadFlag] = useState(false)
  const [claimPools, setClaimPools] = useState(pool)

  // 获取池子信息
  useMemo(() => {
    if (blockHeight !== 0) {
      // 静态的 不做任何请求
      getClaimInfo(pool, account).then(miningPools_ => {
        setClaimPools(miningPools_)
      })
    }
  }, [blockHeight, account])

  const onConfirm = e => {
    if (!active) {
      return
    }
    if (!(claimPools && claimPools.earned)) {
      return false
    }
    if (isNaN(parseInt(claimPools && claimPools.earned))) {
      return false
    }
    if (loadFlag) return
    setLoadFlag(true)
    const contract = getContract(library, claimPools.abi, claimPools.address)

    contract.methods
      .claim()
      .send({
        from: account,
      })
      .on('transactionHash', hash => {})
      .on('receipt', (_, receipt) => {
        message.success({
          content: formatMessage('mining_text20'),
          style: {
            color: '#2A3749',
          },
        })
        setLoadFlag(false)
        onClose()
      })
      .on('error', (err, receipt) => {
        message.error({
          content: formatMessage('mining_text21'),
          style: {
            color: '#2A3749',
          },
        })
        setLoadFlag(false)
      })
  }

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName="header_chain_dialog_wrap stake_chain_dialog_wrap"
    >
      <img className="guard_insure_logo" src={GuardInsureLogo} alt="" />
      <LineData
        title={claimPools && claimPools.rewards1}
        value={
          claimPools && claimPools.earned
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
            )
            : '--'
        }
      />
      <Button
        type="primary"
        size="large"
        className="btn_primary_gray"
        loading={loadFlag}
        onClick={onConfirm}
      >
        <FormattedMessage id="header_claim_dialog_text1" />
      </Button>
      {/* <a className='header_chain_dialog_wrap_tips header_chain_dialog_wrap_tips1'>
        <FormattedMessage id='stake_chain_dialog_text9' />
      </a>
      <a className='header_chain_dialog_wrap_tips header_chain_dialog_wrap_tips1 link_tip'
          href='https://helmetinsure.medium.com/burning-helmet-%EF%B8%8F-guard-8725e3afacd7'
          target='_blank'
        >
        <FormattedMessage id='stake_chain_dialog_text10' />
      </a> */}
      <a className="header_chain_dialog_wrap_tips">
        <FormattedMessage id="stake_chain_dialog_text8" />
      </a>
    </Modal>
  )
}
export default injectIntl(HeaderChaimDialog)
