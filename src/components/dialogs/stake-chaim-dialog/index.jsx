import React, { useState, useMemo } from 'react'
import { Modal, Tabs, Input, Button, message } from 'antd'
import './index.less'
import { FormattedMessage } from 'react-intl'
import { injectIntl } from 'react-intl'
import Web3 from 'web3'
// 处理格式 千位符
import { formatNumber } from 'accounting'
import { formatAmount, splitFormat } from '../../../utils/format'
import { useActiveWeb3React, getContract } from '../../../web3'
import ERC20 from '../../../web3/abi/ERC20.json'
import { useBalance } from '../../../hooks/index'
import { useBlockHeight } from '../../../web3/index'
const { TabPane } = Tabs

function LineData({ title, value }) {
  return (
    <div className='line_data'>
      <div className='title'>{title}</div>
      <div className='value'>{value}</div>
    </div>
  )
}

function StakeChaimDialog({ visible, onClose, tab = 'Stake', intl, pool }) {
  const formatMessage = (id, values = {}) => intl.formatMessage({ id, values })
  const [miningPools, setMiningPools] = useState(pool)
  const { library, active, account } = useActiveWeb3React()
  const balance = useBalance(
    useBlockHeight(),
    miningPools && miningPools.MLP,
    ERC20.abi
  )
  const [activeTabKey, setActiveTabKey] = useState(tab)
  const [stakeInput, setStakeInput] = useState(null)
  const [unStakeClaimInput, setUnStakeClaimInput] = useState(null)
  const [approve, setApprove] = useState(true)
  const [loadFlag, setLoadFlag] = useState(false)

  useMemo(() => {
    setMiningPools(pool)
  }, [pool])

  useMemo(() => {
    if (miningPools && miningPools.allowance > 0) {
      setApprove(false)
    }
  }, [miningPools, miningPools && miningPools.allowance])

  const onMax = () => {
    setStakeInput(balance)
  }

  const onChange = (e) => {
    const { value } = e.target
    const re = /^[0-9]+([.|,][0-9]+)?$/g
    if (
      value === '' ||
      re.test(value) ||
      (value.split('.').length === 2 && value.slice(value.length - 1) === '.')
    ) {
      setStakeInput(value)
    }
  }

  const onChange = (e) => {
    const { value } = e.target
    const re = /^[0-9]+([.|,][0-9]+)?$/g
    if (
      value === '' ||
      re.test(value) ||
      (value.split('.').length === 2 && value.slice(value.length - 1) === '.')
    ) {
      setStakeInput(value)
    }
  }

  const onApprove = (e) => {
    if (!active) {
      return
    }
    if (loadFlag) return
    setLoadFlag(true)
    const contract = getContract(library, ERC20.abi, miningPools.MLP)
    contract.methods
      .approve(
        miningPools.address,
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({
        from: account,
      })
      .on('receipt', (_, receipt) => {
        message.success({
          content: formatMessage('mining_text16'),
          style: {
            color: '#2A3749',
          },
        })
        setStakeInput(null)
        setLoadFlag(false)
        setApprove(false)
      })
      .on('error', (err, receipt) => {
        message.error({
          content: formatMessage('mining_text17'),
          style: {
            color: '#2A3749',
          },
        })
        setLoadFlag(false)
      })
  }

  const stakeOnConfirm = () => {
    if (!active) {
      return false
    }
    if (!stakeInput) {
      return false
    }
    if (isNaN(parseInt(stakeInput))) {
      return false
    }
    if (loadFlag) return
    setLoadFlag(true)
    const pool_contract = getContract(
      library,
      miningPools.abi,
      miningPools.address
    )
    pool_contract.methods
      .stake(Web3.utils.toWei(`${stakeInput}`, 'ether'))
      .send({
        from: account,
      })
      .on('receipt', (_, receipt) => {
        message.success({
          content: formatMessage('mining_text18'),
          style: {
            color: '#2A3749',
          },
        })
        setStakeInput(null)
        setLoadFlag(false)
        onClose()
      })
      .on('error', (err, receipt) => {
        message.error({
          content: formatMessage('mining_text19'),
          style: {
            color: '#2A3749',
          },
        })
        setLoadFlag(false)
      })
  }

  const onConfirm = (e) => {
    if (!active) {
      return
    }
    if (!(miningPools && miningPools.balanceOf > 0)) {
      return false
    }
    if (isNaN(parseInt(miningPools && miningPools.balanceOf))) {
      return false
    }
    if (loadFlag) return
    setLoadFlag(true)
    const contract = getContract(library, miningPools.abi, miningPools.address)
    const method = miningPools.rewards2 ? 'getDoubleReward' : 'getReward'
    contract.methods[method]()
      .send({
        from: account,
      })
      .on('transactionHash', (hash) => {

      })
      .on('receipt', (_, receipt) => {
        message.success({
          content: formatMessage('mining_text20'),
          style: {
            color: '#2A3749',
          },
        })
        setLoadFlag(false)
        setStakeInput(null)
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

  const onConfirmAll = () => {
    if (!active) {
      return false
    }
    if (!(miningPools && miningPools.balanceOf > 0)) {
      return false
    }
    if (isNaN(parseInt(miningPools && miningPools.balanceOf))) {
      return false
    }
    if (loadFlag) return
    setLoadFlag(true)
    const contract = getContract(library, miningPools.abi, miningPools.address)
    contract.methods
      .exit()
      .send({
        from: account,
      })
      .on('transactionHash', (hash) => {})
      .on('receipt', (_, receipt) => {
        message.success({
          content: formatMessage('mining_text22'),
          style: {
            color: '#2A3749',
          },
        })
        setLoadFlag(false)
        setStakeInput(null)
        onClose()
      })
      .on('error', (err, receipt) => {
        message.error({
          content: formatMessage('mining_text23'),
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
      wrapClassName='stake_chain_dialog_wrap'
    >
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} animated>
        <TabPane
          tab={<FormattedMessage id='stake_chain_dialog_text1' />}
          key='Stake'
        >
          <LineData
            title={<FormattedMessage id='stake_chain_dialog_text2' />}
            value={
              miningPools
                ? formatNumber(balance, {
                    thousand: ',',
                    decimal: '.',
                    precision: balance - 0 > 0 ? miningPools.splitDigits : 0,
                  }) +
                  ' ' +
                  miningPools.rewards
                : '--'
            }
          />
          <div>
            <Input
              value={stakeInput}
              onChange={onChange}
              placeholder={formatMessage('stake_chain_dialog_text3')}
              size='large'
              suffix={
                <div className='max_btn' onClick={onMax}>
                  Max
                </div>
              }
            />
          </div>
          {approve && (
            <Button
              type='primary'
              size='large'
              className='btn_primary'
              onClick={onApprove}
              loading={loadFlag}
            >
              <FormattedMessage id='stake_chain_dialog_text7' />
            </Button>
          )}
          {!approve && (
            <Button
              type='primary'
              size='large'
              className='btn_primary'
              loading={loadFlag}
              onClick={stakeOnConfirm}
            >
              <FormattedMessage id='stake_chain_dialog_text1' />
            </Button>
          )}
        </TabPane>

        <TabPane
          tab={<FormattedMessage id='stake_chain_dialog_text4' />}
          key='Claim'
        >
          <LineData
            title={
              miningPools &&
              miningPools.rewards1 +
                ' ' +
                formatMessage('stake_chain_dialog_text5')
            }
            value={
              miningPools && miningPools.earned
                ? formatNumber(
                    formatAmount(miningPools.earned, miningPools.decimal, 6),
                    {
                      thousand: ',',
                      decimal: '.',
                      precision:
                        formatAmount(miningPools.earned) - 0 > 0
                          ? miningPools.splitDigits
                          : 0,
                    }
                  ) +
                  ' ' +
                  miningPools.rewards1
                : '--'
            }
          />
          {miningPools.rewards2 && (
            <LineData
              title={
                miningPools &&
                miningPools.rewards2 +
                  ' ' +
                  formatMessage('stake_chain_dialog_text5')
              }
              value={
                miningPools && miningPools.earned2
                  ? formatNumber(
                      formatAmount(miningPools.earned2, miningPools.decimal, 6),
                      formatAmount(miningPools.earned2) - 0 > 0
                        ? miningPools.splitDigits
                        : 0
                    ) +
                    ' ' +
                    miningPools.rewards2
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
        </TabPane>

        <TabPane
          tab={<FormattedMessage id='stake_chain_dialog_text6' />}
          key='Unstake&Claim'
        >
          <LineData
            title={<FormattedMessage id='mining_text10' />}
            value={
              miningPools && miningPools.balanceOf
                ? formatNumber(splitFormat(miningPools.balanceOf, 6), {
                    thousand: ',',
                    decimal: '.',
                    precision:
                      miningPools.balanceOf - 0 > 0
                        ? miningPools.splitDigits
                        : 0,
                  }) +
                  ' ' +
                  miningPools.rewards
                : '--'
            }
          />
          <div>
            <Input
              value={miningPools.balanceOf || ''}
              placeholder={formatMessage('stake_chain_dialog_text3')}
              size='large'
              type='number'
              disabled
            />
          </div>
          <Button
            type='primary'
            size='large'
            className='btn_primary un_stake_claim'
            loading={loadFlag}
            onClick={onConfirmAll}
          >
            <FormattedMessage id='stake_chain_dialog_text6' />
          </Button>
          <LineData
            title={
              miningPools &&
              miningPools.rewards1 +
                ' ' +
                formatMessage('stake_chain_dialog_text5')
            }
            value={
              miningPools && miningPools.earned
                ? formatNumber(
                    formatAmount(miningPools.earned, miningPools.decimal, 6),
                    {
                      thousand: ',',
                      decimal: '.',
                      precision:
                        formatAmount(miningPools.earned) - 0 > 0
                          ? miningPools.splitDigits
                          : 0,
                    }
                  ) +
                  ' ' +
                  miningPools.rewards1
                : '--'
            }
          />
          {miningPools && miningPools.rewards2 && (
            <LineData
              title={
                miningPools &&
                miningPools.rewards2 +
                  ' ' +
                  formatMessage('stake_chain_dialog_text5')
              }
              value={
                miningPools && miningPools.earned2
                  ? formatNumber(
                      formatAmount(miningPools.earned2, miningPools.decimal, 6),
                      formatAmount(miningPools.earned2) - 0 > 0
                        ? miningPools.splitDigits
                        : 0
                    ) +
                    ' ' +
                    miningPools.rewards2
                  : '--'
              }
            />
          )}
        </TabPane>
      </Tabs>
    </Modal>
  )
}
export default injectIntl(StakeChaimDialog)
