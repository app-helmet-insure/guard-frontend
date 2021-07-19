import React, { useState, useMemo } from 'react'
import { Modal, Tabs, Input, Button, message } from 'antd'
import './index.less'
import {FormattedMessage} from 'react-intl'
import { injectIntl } from 'react-intl'
import {useActiveWeb3React, getContract} from '../../../web3'
import ERC20 from '../../../web3/abi/ERC20.json'
const { TabPane } = Tabs

function LineData ({title, value}) {
  return (
    <div className="line_data">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  )
}

function StakeChaimDialog({ visible, onClose, tab = 'Stake', intl, pool }) {
  const formatMessage = (id, values = {}) => intl.formatMessage({ id, values })
  const [miningPools, setMiningPools] = useState(pool)
  const { library, active, account } = useActiveWeb3React()
  const [activeTabKey, setActiveTabKey] = useState(tab)
  const [stakeInput, setStakeInput] = useState(null)
  const [unStakeClaimInput, setUnStakeClaimInput] = useState(null)
  const [approve, setApprove] = useState(true)
  const [loadFlag, setLoadFlag] = useState(false)

  useMemo(() => {
    setMiningPools(pool)
    console.log(pool, 'pool')
  }, [pool])

  useMemo(() => {
    if (miningPools && miningPools.allowance > 0) {
      setApprove(false)
    }
  }, [miningPools, miningPools && miningPools.allowance])

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
          content: 'approve success',
          style: {
            color: '#2A3749',
          },
        })
        setLoadFlag(false)
        setApprove(false)
      })
      .on('error', (err, receipt) => {
        message.error({
          content: 'approve error',
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
            value={'123.456.098 WAR'}
          />
          <div>
            <Input
              value={stakeInput}
              onChange={(e) => setStakeInput(e.target.value)}
              placeholder={formatMessage('stake_chain_dialog_text3')}
              size='large'
              type='number'
              suffix={<div className='max_btn'>Max</div>}
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
            <Button type='primary' size='large' className='btn_primary'>
              <FormattedMessage id='stake_chain_dialog_text1' />
            </Button>
          )}
        </TabPane>

        <TabPane
          tab={<FormattedMessage id='stake_chain_dialog_text4' />}
          key='Claim'
        >
          <LineData
            title={'WAR ' + formatMessage('stake_chain_dialog_text5')}
            value={'88888888.0003'}
          />
          <LineData
            title={'MDX ' + formatMessage('stake_chain_dialog_text5')}
            value={'88888888.0003'}
          />
          <Button type='primary' size='large' className='btn_primary_gray'>
            <FormattedMessage id='stake_chain_dialog_text4' />
          </Button>
        </TabPane>

        <TabPane
          tab={<FormattedMessage id='stake_chain_dialog_text6' />}
          key='Unstake&Claim'
        >
          <LineData
            title={<FormattedMessage id='stake_chain_dialog_text2' />}
            value={'123.456.098 WAR'}
          />
          <div>
            <Input
              value={unStakeClaimInput}
              onChange={(e) => setUnStakeClaimInput(e.target.value)}
              placeholder={formatMessage('stake_chain_dialog_text3')}
              size='large'
              type='number'
              suffix={<div className='max_btn'>Max</div>}
            />
          </div>
          <Button
            type='primary'
            size='large'
            className='btn_primary un_stake_claim'
          >
            <FormattedMessage id='stake_chain_dialog_text6' />
          </Button>
          <LineData
            title={'WAR ' + formatMessage('stake_chain_dialog_text5')}
            value={'88888888.0003'}
          />
          <LineData
            title={'MDX ' + formatMessage('stake_chain_dialog_text5')}
            value={'88888888.0003'}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
}
export default injectIntl(StakeChaimDialog)
