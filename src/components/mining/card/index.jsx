import React, { useState, useMemo, useEffect, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'
import cs from 'classnames'
import BigNumber from 'bignumber.js'
// 处理格式 千位符
import { formatNumber } from 'accounting'
import {
  formatAmount,
  formatLastZero, fromWei,
  splitFormat,
} from '../../../utils/format'
import { getMiningInfo } from '../../../hooks/mining'
import StakeChaimDialog from '@/components/dialogs/stake-chaim-dialog'
import CountDown from '@/components/mining/countDown'
import { VarContext } from '../../../context'
import { useActiveWeb3React } from '../../../web3'
import NewSvg from '../../../assets/images/mining/new.svg'
import WarningTipIcon from '../../../assets/images/mining/warning-tip.png'
import { Button, Skeleton, Space } from 'antd'
import cx from 'classname'

const MiningCard = props => {
  const { blockHeight } = useContext(VarContext)
  const { account } = useActiveWeb3React()
  const [visibleStakePopup, setVisibleStakePopup] = useState(false)
  const [balanceProportion, setBalanceProportion] = useState(0)
  const [tabFlag, setTabFlag] = useState('Stake')
  const [now, setNow] = useState(parseInt(Date.now() / 1000))
  const [miningPools, setMiningPools] = useState(null)
  const [lptValue, setLptValue] = useState('-')
  // 是否开始
  const isStarted = miningPools && miningPools.start_at < now
  // 是否结束
  const isEnd = miningPools && miningPools.dueDate < now && miningPools.dueDate
  // 获取池子信息
  useMemo(() => {
    if (blockHeight !== 0 && account) {
      // 静态的 不做任何请求
      if (props.pools.is_coming) {
        setMiningPools(props.pools)
        return
      }
      getMiningInfo(props.pools, account).then(async miningPools_ => {
        setMiningPools(miningPools_)
      }).catch(e =>{
        console.log(e)
      })
    }
  }, [blockHeight, account])
  // 获取池子token个人账户可使用余额
  const isFinish =
    miningPools &&
    miningPools.dueDate &&
    miningPools.dueDate <= now &&
    miningPools.start_at < now


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
          .dividedBy(
            new BigNumber(
              formatAmount(miningPools.totalSupply, miningPools.mlpDecimal)
            )
          )
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

  const cStyle = props.cStyle || {}
  // loading
  if (!miningPools) {
    return (
      <div className="mining_card" style={cStyle}>
        <div className="card_loading">
          <Space>
            <div className="flex_center_up_and_down">
              <Skeleton.Avatar active size={60} />
              <div className="skeleton_top_title">
                <Skeleton.Input
                  style={{ width: 200, height: 16 }}
                  active
                  size="small"
                />
                <div style={{ height: '10px' }} />
                <Skeleton.Input
                  style={{ width: 200, height: 16 }}
                  active
                  size="small"
                />
              </div>
            </div>
          </Space>
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    )
  }
  return (
    <>
      <div
        style={cStyle}
        className={
          cx({
            mining_card: true,
            ledLight: miningPools.ledLight && !isEnd && isStarted,
            custom_height1: miningPools.title === 'Guard-USDC LPT Pool' && miningPools.warningTipLocal,
            custom_height2: miningPools.title === 'Guard-USDC LPT Pool' && !miningPools.warningTipLocal
          })
        }
      >
        {miningPools.isNew && <img src={NewSvg} className="mining_card_new" alt=""/>}
        <div className="mining_card_title">
          <img src={miningPools.icon} />
          <p className="mining_card_title_text">
            <span className="title_text">{miningPools.title}</span>
            {miningPools.cover && (
              <a className={cs(`${miningPools.cover + '_cover'}`)}>
                <span
                  style={{
                    display: 'inline-block',
                    lineHeight: '24px',
                    paddingRight: '12px',
                    backgroundColor: '#f7f7fa',
                  }}
                >
                  <span
                    className={cs(`${miningPools.cover + '_cover_logo'}`)}
                  ></span>
                  {miningPools.name.toUpperCase()} {miningPools.cover}{' '}
                  {miningPools.strikeprice} USDC
                </span>
              </a>
            )}
            <a className="multiple_box">
              {miningPools.core && (
                <span className="core">
                  <svg
                    t="1628228243308"
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1133"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M540.416 760.917333l-122.794667 64.512A85.333333 85.333333 0 0 1 293.802667 735.573333l23.466666-136.789333-99.413333-96.853333a85.333333 85.333333 0 0 1 47.36-145.493334l137.301333-19.968 61.44-124.416a85.333333 85.333333 0 0 1 153.002667 0l61.44 124.416 137.301333 19.968a85.333333 85.333333 0 0 1 47.274667 145.493334L763.733333 598.698667l23.466667 136.789333a85.333333 85.333333 0 0 1-123.818667 89.941333l-122.88-64.512z"
                      p-id="1134"
                    ></path>
                  </svg>
                  <FormattedMessage id="mining_text26" />
                </span>
              )}
              {miningPools.multiple && (
                <span className="multiple">{miningPools.multiple}</span>
              )}
            </a>
          </p>
        </div>
        <CountDown
          pools={miningPools}
          aprPercentage={miningPools.APR || '-'}
          now={now}
          isFinish={isFinish}
        />
        <div className="mining_card_content">
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage id="mining_text7" />
            </span>
            <img
              className="mining_card_content_icon"
              src={miningPools.rewardIcon}
            />
          </p>


          {
            miningPools.showLptValue && (
              <p className="mining_card_content_val">
                <span>
                  <FormattedMessage id="mining_text27" />
                </span>
                <span>${miningPools.LPTStakeValue}</span>
              </p>
            )
          }
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage id="mining_text9" />
            </span>
            <span>
              {miningPools.totalSupply
                ? formatLastZero(
                  formatNumber(
                    formatAmount(
                      miningPools.totalSupply,
                      miningPools.mlpDecimal,
                      6
                    ),
                    {
                      thousand: ',',
                      decimal: '.',
                      precision:
                          miningPools.totalSupply - 0 > 0
                            ? miningPools.splitDigits
                            : 0,
                    }
                  )
                )
                : '--'}
            </span>
          </p>
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage id="mining_text10" />
            </span>
            <span>
              {miningPools.balanceOf
                ? formatLastZero(
                  formatNumber(splitFormat(miningPools.balanceOf, 6), {
                    thousand: ',',
                    decimal: '.',
                    precision:
                        miningPools.balanceOf - 0 > 0
                          ? miningPools.splitDigits
                          : 0,
                  })
                ) +
                  '(' +
                  (balanceProportion - 0 === 0 ? '0.00' : balanceProportion) +
                  '%)'
                : '--'}
            </span>
          </p>
          <p className="mining_card_content_val">
            <span>
              <FormattedMessage id="mining_text11" />
            </span>
            <span>
              {miningPools.balanceOf
                ? formatLastZero(
                  formatNumber(miningPools.balance, {
                    thousand: ',',
                    decimal: '.',
                    precision: miningPools.balance - 0 > 0 ? miningPools.splitDigits : 0,
                  })
                )
                : '--'}
            </span>
          </p>
        </div>
        <div className="buy_link">
          {miningPools.byLinkName && miningPools.byLink && (
            <a href={miningPools.byLink} target="_blank">
              <FormattedMessage
                id="mining_text25"
                values={{
                  name: 'Quickswap',
                  b: miningPools.byLinkName,
                }}
              />
            </a>
          )}
        </div>
        <Button
          className={'mining_card_btn btn_primary'}
          disabled={!isStarted || miningPools.is_coming}
          onClick={() => stakeClaimPopup(isEnd ? 'Claim' : 'Stake')}
        >
          {
            isEnd ? <FormattedMessage id="mining_text14" /> : <FormattedMessage id="mining_text12" />
          }
        </Button>
        <div
          className="mining_card_content mining_card_content_rewards"
          style={{ padding: '6px 12px' }}
        >
          <div className="mining_card_content_val mining_card_content_rewards_val">
            <div>
              <FormattedMessage
                id="mining_text13"
                values={{ coin: miningPools.rewards1 }}
              />
              {miningPools.earned
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
            </div>
            {miningPools.rewards2 && (
              <div>
                <FormattedMessage
                  id="mining_text13"
                  values={{ coin: miningPools.rewards2 }}
                />
                {miningPools.earned2
                  ? formatNumber(
                    formatAmount(miningPools.earned2, miningPools.decimal, 6),
                    formatAmount(miningPools.earned2) - 0 > 0
                      ? miningPools.splitDigits
                      : 0
                  )
                  : '--'}
              </div>
            )}
          </div>
          {isStarted &&
            (miningPools.earned - 0 > 0 || miningPools.earned2 - 0 > 0) && (
            <a
              className="mining_card_claim_btn"
              onClick={() => stakeClaimPopup('Claim')}
            >
              <FormattedMessage id="mining_text14" />
            </a>
          )}
        </div>
        {
          miningPools.warningTipLocal && (
            <div className="warning-tip">
              <img src={WarningTipIcon} alt=""/>
              <FormattedMessage id={miningPools.warningTipLocal}/>
            </div>
          )
        }
      </div>
      <StakeChaimDialog
        visible={visibleStakePopup}
        tab={tabFlag}
        pool={miningPools}
        balance={miningPools.balance}
        isEnd={isEnd}
        onClose={() => setVisibleStakePopup(false)}
      />
    </>
  )
}

export default MiningCard
