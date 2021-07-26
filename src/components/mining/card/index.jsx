import React, {useState, useMemo, useEffect, useContext} from 'react'
import {FormattedMessage} from 'react-intl'
import './index.less'
import {connect} from 'react-redux'
import cs from 'classnames'
import BigNumber from 'bignumber.js'
// 处理格式 千位符
import {formatNumber} from 'accounting'
import {formatAmount, splitFormat} from '../../../utils/format'
import {useBalance} from '../../../hooks/index'
import ERC20 from '../../../web3/abi/ERC20.json'
import {getMiningInfo, getAPR, getMdxARP} from '../../../hooks/mining'
import StakeChaimDialog from '@/components/dialogs/stake-chaim-dialog'
import CountDown from '@/components/mining/countDown'
import {VarContext} from '../../../context'
import {useActiveWeb3React} from '../../../web3'

const MiningCard = props => {
  const {blockHeight} = useContext(VarContext)
  const {account} = useActiveWeb3React()
  const [miningPools, setMiningPools] = useState(null)
  useMemo(() => {
    getMiningInfo(props.pools.address, account).then(setMiningPools)
  }, [blockHeight, account])
  const balance = useBalance(
    blockHeight,
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

  const [apr, setApr] = useState('0')
  const [mdexApr, setMdexApr] = useState('0')
  useMemo(() => {
    if (blockHeight !== 0 && miningPools) {
      getAPR(
        miningPools,
        miningPools.earnName === 'APY' ? 2 : 1,
      ).then(setApr)
      // 奖励2的apr
      getMdxARP(miningPools).then(setMdexApr)
    }
  }, [blockHeight, miningPools])

  useMemo(() => {
    console.log('apr', apr, mdexApr)
    if (apr > 0 && miningPools && (!miningPools.mdexReward || mdexApr > 0)) {
      setPercentage((apr * 100 + mdexApr * 100).toFixed(2))
    }
  }, [apr, mdexApr])

  useEffect(() => {
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
  }, [miningPools])

  const stakeClaimPopup = val => {
    setTabFlag(val)
    setVisibleStakePopup(true)
  }

  return (
    <>
      <div className="mining_card">
        <div className="mining_card_title">
          <img/>
          <p className="mining_card_title_text">
            <a className={cs(`${miningPools && miningPools.cover + '_cover'}`)}>
              <span
                className={cs(
                  `${miningPools && miningPools.cover + '_cover_logo'}`
                )}
              ></span>
              {miningPools ? (
                <>
                  <FormattedMessage id="mining_text3"/> {miningPools.cover}{' '}
                  {miningPools.strikeprice} {miningPools.shortToken}
                </>
              ) : (
                '--'
              )}
            </a>
            <span className="title_text">
              {miningPools && miningPools.name}
            </span>
          </p>
        </div>
        <CountDown
          pools={miningPools}
          aprPercentage={aprPercentage}
          now={now}
          isFinish={isFinish}
        />
        <div className="mining_card_content">
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage id="mining_text7"/>
            </span>
            {miningPools && miningPools.icon && (
              <img
                className="mining_card_content_icon"
                src={require('../../../assets/images/mining/' +
                  miningPools.icon)}
              />
            )}
          </p>
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage id="mining_text9"/>
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
                      formatAmount(miningPools.totalSupply) - 0 > 0
                        ? miningPools.splitDigits
                        : 0,
                  }
                )
                : '--'}
            </span>
          </p>
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage id="mining_text10"/>
            </span>
            <span>
              {miningPools && miningPools.balanceOf
                ? formatNumber(splitFormat(miningPools.balanceOf, 6), {
                  thousand: ',',
                  decimal: '.',
                  precision:
                    miningPools.balanceOf - 0 > 0
                      ? miningPools.splitDigits
                      : 0,
                }) +
                '(' +
                (balanceProportion - 0 === 0 ? '0.00' : balanceProportion) +
                '%)'
                : '--'}
            </span>
          </p>
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage id="mining_text11"/>
            </span>
            <span>
              {miningPools && miningPools.balanceOf
                ? formatNumber(balance, {
                  thousand: ',',
                  decimal: '.',
                  precision: balance - 0 > 0 ? miningPools.splitDigits : 0,
                })
                : '--'}
            </span>
          </p>
        </div>
        <a className="mining_card_btn" onClick={() => stakeClaimPopup('Stake')}>
          <FormattedMessage id="mining_text12"/>
        </a>
        <div className="mining_card_content" style={{padding: '6px 12px'}}>
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage
                id="mining_text13"
                values={{coin: miningPools && miningPools.rewards1}}
              />
              {miningPools && miningPools.earned
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
                )
                : '--'}
            </span>
            {miningPools && miningPools.earned - 0 > 0 && (
              <a
                className="mining_card_claim_btn"
                onClick={() => stakeClaimPopup('Claim')}
              >
                <FormattedMessage id="mining_text14"/>
              </a>
            )}
          </p>
          {miningPools && miningPools.rewards2 && (
            <p className="mining_card_content_val">
              <span>
                <FormattedMessage
                  id="mining_text13"
                  values={{coin: miningPools.rewards2}}
                />
                {miningPools.earned2
                  ? formatNumber(
                    formatAmount(miningPools.earned2, miningPools.decimal, 6),
                    formatAmount(miningPools.earned2) - 0 > 0
                      ? miningPools.splitDigits
                      : 0
                  )
                  : '--'}
              </span>
              {miningPools && miningPools.earned2 - 0 > 0 && (
                <a
                  className="mining_card_claim_btn"
                  onClick={() => stakeClaimPopup('Claim')}
                >
                  <FormattedMessage id="mining_text14"/>
                </a>
              )}
            </p>
          )}
        </div>
      </div>
      {
        miningPools && (
          <StakeChaimDialog
            visible={visibleStakePopup}
            tab={tabFlag}
            pool={miningPools}
            onClose={() => setVisibleStakePopup(false)}
          />
        )
      }
    </>
  )
}

export default MiningCard
