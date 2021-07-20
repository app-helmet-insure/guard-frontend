import React, { useState, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
// 处理格式 千位符
import { formatNumber } from 'accounting'
import { formatAmount, splitFormat } from '../../../utils/format'
import { useBalance } from '../../../hooks/index'
import { useBlockHeight } from '../../../web3/index'
import ERC20 from '../../../web3/abi/ERC20.json'
import { useMiningInfo } from '../../../hooks/mining'
import StakeChaimDialog from '@/components/dialogs/stake-chaim-dialog'
import CountDown from '@/components/mining/countDown'

const MiningCard = (props) => {
  let { pools: miningPools } = props
  miningPools = useMiningInfo(miningPools && miningPools.address)
  const balance = useBalance(
    useBlockHeight(),
    miningPools && miningPools.MLP,
    ERC20.abi
  )
  const [visibleStakePopup, setVisibleStakePopup] = useState(false)
  const [balanceProportion, setBalanceProportion] = useState(0)
  const [tabFlag, setTabFlag] = useState('Stake')
  const [aprPercentage, setPercentage] = useState('-')
  const [now, setNow] = useState(parseInt(Date.now() / 1000))
  const isFinish =
    miningPools &&
    miningPools.dueDate &&
    miningPools.dueDate <= now &&
    miningPools.openDate < now

  useMemo(() => {
    let timerId = null
    const fn = () => {
      timerId = setTimeout(() => {
        const now = parseInt(Date.now() / 1000)
        setNow(now)
        if (isFinish) {
          clearTimeout(timerId)
        } else {
          fn()
        }
      }, 1000)
    }
    fn()
    return () => {
      clearTimeout(timerId)
    }
  }, [])

  useMemo(() => {
    if (miningPools && miningPools.balanceOf * 1 && miningPools.totalSupply) {
      setBalanceProportion(
        new BigNumber(miningPools.balanceOf)
          .dividedBy(new BigNumber(formatAmount(miningPools.totalSupply)))
          .multipliedBy(new BigNumber(100))
          .toNumber()
          .toFixed(2) * 1
      )
    } else {
      setBalanceProportion(0)
    }
  }, [miningPools, miningPools.balanceOf, miningPools.totalSupply])

  const stakeClaimPopup = (val) => {
    setTabFlag(val)
    setVisibleStakePopup(true)
  }

  return (
    <>
      <div className='mining_card'>
        <div className='mining_card_title'>
          <img />
          <h2>{miningPools && miningPools.name}</h2>
        </div>
        <CountDown
          pools={miningPools}
          aprPercentage={aprPercentage}
          now={now}
          isFinish={isFinish}
        />
        <div className='mining_card_content'>
          <p className='mining_card_content_val'>
            <span>
              <FormattedMessage id='mining_text7' />
            </span>
            <span>
              <FormattedMessage id='mining_text8' />
            </span>
          </p>
          <p className='mining_card_content_val'>
            <span>
              <FormattedMessage id='mining_text9' />
            </span>
            <span>
              {miningPools && miningPools.totalSupply
                ? formatNumber(
                    formatAmount(
                      miningPools.totalSupply,
                      miningPools.decimal,
                      6
                    ),
                    {
                      thousand: ',',
                      decimal: '.',
                      precision:
                        formatAmount(miningPools.totalSupply) - 0 > 0 ? 6 : 0,
                    }
                  )
                : '--'}
            </span>
          </p>
          <p className='mining_card_content_val'>
            <span>
              <FormattedMessage id='mining_text10' />
            </span>
            <span>
              {miningPools && miningPools.balanceOf
                ? formatNumber(splitFormat(miningPools.balanceOf, 6), {
                    thousand: ',',
                    decimal: '.',
                    precision: miningPools.balanceOf - 0 > 0 ? 6 : 0,
                  }) +
                  '(' +
                  (balanceProportion - 0 === 0 ? '0.00' : balanceProportion) +
                  '%)'
                : '--'}
            </span>
          </p>
          <p className='mining_card_content_val'>
            <span>
              <FormattedMessage id='mining_text11' />
            </span>
            <span>
              {miningPools && miningPools.balanceOf
                ? formatNumber(formatAmount(balance, miningPools.decimal, 6), {
                    thousand: ',',
                    decimal: '.',
                    precision: formatAmount(balance) - 0 > 0 ? 6 : 0,
                  })
                : '--'}
            </span>
          </p>
        </div>
        <a className='mining_card_btn' onClick={() => stakeClaimPopup('Stake')}>
          <FormattedMessage id='mining_text12' />
        </a>
        <div className='mining_card_content' style={{ padding: '6px 12px' }}>
          <p className='mining_card_content_val'>
            <span>
              <FormattedMessage
                id='mining_text13'
                values={{ coin: miningPools && miningPools.rewards1 }}
              />
              {miningPools && miningPools.earned
                ? formatNumber(
                    formatAmount(miningPools.earned, miningPools.decimal, 6),
                    {
                      thousand: ',',
                      decimal: '.',
                      precision:
                        formatAmount(miningPools.earned) - 0 > 0 ? 6 : 0,
                    }
                  )
                : '--'}
            </span>
            <a
              className='mining_card_claim_btn'
              onClick={() => stakeClaimPopup('Claim')}
            >
              <FormattedMessage id='mining_text14' />
            </a>
          </p>
        </div>
      </div>
      <StakeChaimDialog
        visible={visibleStakePopup}
        tab={tabFlag}
        pool={miningPools}
        onClose={() => setVisibleStakePopup(false)}
      />
    </>
  )
}

export default MiningCard
