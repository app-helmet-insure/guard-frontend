import React, {useState, useMemo, createContext} from 'react'
import {FormattedMessage} from 'react-intl'
import BigNumber from 'bignumber.js'
import cs from 'classnames'
import {message, Slider, InputNumber, Row, Col, Modal, Button} from 'antd'
import {
  formatAmount,
  fromWei, numToWei,
} from '../../../utils/format'
import './index.less'
import {getPoolInfo, onAirdrop_, onApprove_, onBurn_, onClaim_} from '../../../hooks/ido'
import {useWeb3React} from '@web3-react/core'
import {CopyToClipboard} from 'react-copy-to-clipboard/lib/Component'

const IdoCard = props => {
  const [idoData, setIdoData] = useState(props.pools)
  const [amount, setAmount] = useState(props.pools.pool_info.min_allocation)
  const [claimFlag, setClaimFlag] = useState(false)
  const [approvalLoading, setApprovalLoading] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)
  const [burnLoading, setBurnLoading] = useState(false)
  const [airdropLoading, setAirdropLoading] = useState(false)
  const [loadLoading, setLoadLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {account, library} = useWeb3React()
  const [now, setNow] = useState(parseInt(Date.now() / 1000, 10))
  const [tipModalVisible, setTipModalVisible] = useState(false)


  let status = 0 // 0 waiting, 1 ing, 2 end
  let isClaimTime = false

  let t = 0
  if (now < idoData.startTime) {
    status = 0
    t = idoData.startTime - now
  } else {
    if (now < idoData.endTime) {
      status = 1
      t = idoData.endTime - now
    } else {
      status = 2
      if (now < idoData.claimTime) {
        t = idoData.claimTime - now
      } else {
        isClaimTime = true
      }
    }
  }
  const countdown = {
    h: t !== 0 ? Math.floor(t / 3600) : '-',
    m: t !== 0 ? Math.floor((t % 3600) / 60) : '-',
    statusTxt: {
      0: 'IBO_text3',
      1: 'IBO_text4',
      2: 'IBO_text7'
    }[status],
  }
  useMemo(() => {
    const timer_ = setInterval(() => {
      setNow(parseInt(Date.now() / 1000, 10))
    }, 1000)
    return () => clearInterval(timer_)
  }, [])

  const getData = () => {
    if (account && !idoData.is_coming) {
      getPoolInfo(props.pools, account).then(pool_ => {
        console.log('pool_', pool_)
        setIdoData(pool_)
        setLoadLoading(false)
      })
    }
  }
  useMemo(() => {
    setLoadLoading(true)
    getData()
  }, [account])

  const onChange = value => {
    setAmount(value)
  }

  const onAirdrop = () => {
    setAirdropLoading(true)
    onAirdrop_(library, account, idoData, success => {
      success && message.success('success')
      getData()
      setAirdropLoading(false)
    })
  }
  const getAvailable = () => {
    const purchasedCurrencyOf =
      fromWei(idoData.purchasedCurrencyOf).toFixed(6, 1) * 1
    const balanceOf = idoData.balanceOf || 0
    const remainingLimit = idoData.pool_info.max_allocation - purchasedCurrencyOf
    return Math.min(remainingLimit, balanceOf)
  }

  const onMax = () => {
    const available = getAvailable()
    if (idoData.pool_info.min_allocation <= available) {
      setAmount(Math.min(
        idoData.pool_info.max_allocation,
        available
      ))
    }
  }

  const onApprove = () => {
    setApprovalLoading(true)
    onApprove_(library, account, idoData.currency.address, idoData.address, success => {
      success && message.success('approve success')
      getData()
      setApprovalLoading(false)
    })
  }

  const onClaim = () => {
    setClaimLoading(true)
    onClaim_(library, account, idoData, success => {
      success && message.success('claim success')
      getData()
      setClaimLoading(false)
    })
  }

  const showClaim = () => {
    if (!loadLoading) {
      setClaimFlag(!claimFlag)
    }
  }
  const onBurnBtnClick = () => {
    if (Number(amount.toFixed(idoData.currency.decimal)) > 0) {
      setTipModalVisible(true)
    } else {
      message.warn('please enter amount')
    }
  }
  const onBurn = () => {
    setTipModalVisible(false)
    setBurnLoading(true)
    onBurn_(library, account, amount.toFixed(idoData.currency.decimal), idoData, success => {
      success && message.success('burn success')
      getData()
      Modal.destroyAll()
      setBurnLoading(false)
    })
  }

  const arriveMaxUser = Number(idoData.pool_info.curUserCount) >= Number(idoData.pool_info.maxAccount)
  return (
    <>
      {idoData && (
        <div className="ibo_item_warp">
          <div className={cs('ibo_item', idoData.light && 'active')}>
            <div className="ibo_item_title">
              <p className="ibo_item_title_left">
                <img src={idoData.icon}/>
                <span>{idoData.name}</span>
                <span
                  style={{marginLeft: '5px', cursor: 'pointer'}}
                  onClick={() => setIsModalVisible(true)}
                >
                  <svg
                    fill="#000000"
                    t="1617039040708"
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1287"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
                      p-id="1288"
                    ></path>
                  </svg>
                </span>
              </p>
              <p className="ibo_item_title_right">
                <span className="ibo_item_countdown">
                  {countdown.h}
                  <FormattedMessage id="IBO_text2"/>/{countdown.m}
                  <FormattedMessage id="IBO_text1"/>
                </span>
                <span className="ibo_item_status ibo_item_status_ongoing">
                  <FormattedMessage id={countdown.statusTxt}/>
                </span>
              </p>
            </div>
            {status === 2 && false ? (
              <div className="finished_style">
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text20"/>
                  </span>
                  <span className="value">1.0s</span>
                </p>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text21"/>
                  </span>
                  <span className="value">999%</span>
                </p>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text22"/>
                  </span>
                  <span className="value">$999</span>
                </p>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text23"/>
                  </span>
                  <span className="value">999 {idoData.underlying.symbol}</span>
                </p>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text24"/>
                  </span>
                  <span className="value">
                    10,000 {idoData.underlying.symbol}
                  </span>
                </p>
              </div>
            ) : (
              <div>
                <p className="ibo_item_radio">{idoData.ratio}</p>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text8"/>
                  </span>
                  <span className="value">
                    {new BigNumber(idoData.amount).toFormat()}{' '}
                    {idoData.underlying.symbol}
                  </span>
                </p>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text9"/>
                  </span>
                  <span className="value">{idoData.pool_info.maxAccount}</span>
                </p>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text10"/>
                  </span>
                  <span className="value">
                    {(idoData.progress * 100).toFixed(0)}%
                  </span>
                </p>
                <a className="ibo_item_progress">
                  <i
                    className="ibo_item_progress_bar"
                    style={{
                      width:
                        idoData.progress > 1
                          ? '100%'
                          : idoData.progress * 100 + '%',
                      display: idoData.progress == 0 && 'none',
                    }}
                  ></i>
                </a>
                <div
                  className="block"
                  style={{position: 'relative', marginTop: '8px'}}
                >
                  {idoData.purchasedCurrencyOf <= 0 && (
                    <span className="slider-max" onClick={onMax}>
                      <FormattedMessage id="IBO_text50"/>
                    </span>
                  )}

                  {/* <el-slider
                    v-model='amount'
                    min={idoData.pool_info.min_allocation}
                    max={idoData.pool_info.max_allocation}
                    show-input
                    disabled={idoData.purchasedCurrencyOf > 0}
                  ></el-slider> */}
                  <Col>
                    <InputNumber
                      min={idoData.pool_info.min_allocation}
                      max={idoData.pool_info.max_allocation}
                      value={amount}
                      onChange={onChange}
                    />
                  </Col>

                  <p className="ibo_item_value slider_content">
                    <span className="ibo_item_value_title">
                      <FormattedMessage id="IBO_text11"/>
                    </span>
                    <span className="value">
                      {getAvailable()} {idoData.currency.symbol}
                    </span>
                  </p>
                  <Row>
                    <Col
                      style={{margin: '0 auto', width: '174px', zIndex: 6}}
                    >
                      <Slider
                        min={
                          idoData.pool_info && idoData.pool_info.min_allocation
                        }
                        max={
                          idoData.pool_info && idoData.pool_info.max_allocation
                        }
                        onChange={onChange}
                        value={amount}
                      />
                    </Col>
                    <p className="min_max_value">
                      <span>
                        <FormattedMessage id="IBO_text12"/>
                        {idoData.pool_info.min_allocation}
                      </span>

                      <span>
                        <FormattedMessage id="IBO_text13"/>
                        {idoData.pool_info.max_allocation}
                      </span>
                    </p>
                  </Row>
                </div>
                {idoData.currency.allowance > 0 ? (
                  <Button
                    className={
                      status !== 1 ||
                      arriveMaxUser ||
                      idoData.purchasedCurrencyOf > 0 ||
                      loadLoading
                        ? 'ibo_item_btn burn disabled'
                        : 'ibo_item_btn burn'
                    }
                    onClick={onBurnBtnClick}
                    disabled={
                      status !== 1 ||
                      arriveMaxUser ||
                      idoData.purchasedCurrencyOf > 0 ||
                      loadLoading
                    }
                    loading={burnLoading}
                  >
                    {arriveMaxUser ? (
                      <FormattedMessage id="IBO_text34"/>
                    ) : (
                      <FormattedMessage id="IBO_text51"/>
                    )}
                  </Button>
                ) : (
                  <Button
                    className={
                      status !== 1 || arriveMaxUser || loadLoading
                        ? 'ibo_item_btn burn disabled'
                        : 'ibo_item_btn burn'
                    }
                    disabled={status !== 1 || arriveMaxUser || loadLoading}
                    onClick={onApprove}
                    loading={approvalLoading}
                  >
                    {arriveMaxUser ? (
                      <FormattedMessage id="IBO_text34"/>
                    ) : (
                      <FormattedMessage id="Approve"/>
                    )}
                  </Button>
                )}
              </div>
            )}
            <p className="ibo_item_value">
              <span className="ibo_item_value_title">
                <FormattedMessage
                  id="IBO_text14"
                  values={{icon: idoData.currency.symbol}}
                />
              </span>
              <span className="value">
                {fromWei(idoData.purchasedCurrencyOf).toFixed(6, 1) * 1}
              </span>
            </p>
            <p className="ibo_item_value">
              <span className="ibo_item_value_title">
                <FormattedMessage id="IBO_text15"/>
              </span>
              <span className="value">
                {!idoData.settleable || status === 0
                  ? '-'
                  : fromWei(idoData.settleable.rate)
                    .multipliedBy(new BigNumber(100))
                    .toFixed(2, 1)
                    .toString()}
                %
              </span>
            </p>
            <p className="ibo_item_value">
              <span className="ibo_item_value_title">
                <FormattedMessage id="IBO_text16"/>
              </span>
              <span className="value">
                {!idoData.settleable
                  ? '-'
                  : formatAmount(
                    idoData.settleable.volume,
                    idoData.underlying.decimal
                  )}
              </span>
            </p>
            <p className="claim_detail_btn" onClick={showClaim}>
              <span></span>
              <a>
                <FormattedMessage id="IBO_text17"/>
              </a>
              <span></span>
            </p>
            {claimFlag && (
              <div>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage
                      id="IBO_text18"
                      values={{icon: idoData.currency.symbol}}
                    />
                  </span>
                  <span className="value">
                    {idoData.settleable
                      ? idoData.settleable.amount == '0'
                        ? 0
                        : new BigNumber(
                          fromWei(idoData.settleable.amount)
                        ).toFormat(6)
                      : 0}
                  </span>
                </p>
                <p className="ibo_item_value">
                  <span className="ibo_item_value_title">
                    <FormattedMessage id="IBO_text19"/>
                  </span>
                  <span className="value">
                    {idoData.settleable &&
                    formatAmount(
                      idoData.settleable.volume,
                      idoData.underlying.decimal
                    )}
                  </span>
                </p>
                <Button
                  className={
                    !(status === 2 && idoData.settleable.volume > 0) ||
                    !isClaimTime
                      ? 'ibo_item_btn claim disabled'
                      : 'ibo_item_btn claim'
                  }
                  disabled={
                    !(status === 2 && idoData.settleable.volume > 0) ||
                    !isClaimTime
                  }
                  onClick={() => onClaim()}
                  loading={claimLoading}
                >
                  <FormattedMessage id="IBO_text52"/>
                </Button>
                {idoData.claimTimeTipI18n && (
                  <p className="ibo_item_value">
                    <span className="ibo_item_value_title">
                      <FormattedMessage id="IBO_text36"/>&nbsp;
                      <FormattedMessage id={idoData.claimTimeTipI18n}/>
                    </span>
                  </p>
                )}
                {idoData.airdrop && (
                  <template>
                    <p className="ibo_item_value">
                      <span className="ibo_item_value_title">
                        <FormattedMessage id="IBO_text48"/>
                      </span>
                      <span className="value">{idoData.airdrop.allowList}</span>
                    </p>
                    <Button
                      className="ibo_item_btn ibo_item_claim"
                      disabled={
                        !(
                          now > idoData.airdrop.begin &&
                          !idoData.airdrop.withdrawList &&
                          idoData.airdrop.allowList > 0
                        )
                      }
                      onClick={onAirdrop}
                      loading={airdropLoading}
                    >
                      <FormattedMessage id="IBO_text52"/>
                    </Button>
                    <p className="ibo_item_value">
                      <span className="ibo_item_value_title">
                        <FormattedMessage
                          id="IBO_text49"
                          values={{token: idoData.name}}
                        />
                      </span>
                    </p>
                  </template>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <Modal
        title={<FormattedMessage id="IBO_text33"/>}
        cancelText={<FormattedMessage id="IBO_text32"/>}
        okText={<FormattedMessage id="IBO_text31"/>}
        className="ido-modal"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="tip_box">
          <p>
            <FormattedMessage id="IBO_text28"/>:{' '}
            <FormattedMessage id={idoData.modal.expected_trading_time}/>
          </p>
          <p>
            <FormattedMessage id="IBO_text29"/>: <a href={idoData.modal.trading_platform}
              target="_blank">{idoData.modal.trading_platform}</a>
          </p>
          <p>
            SC: {idoData.underlying.address}
            <CopyToClipboard
              text={idoData.underlying.address}
              onCopy={() => {
                message.success('copy success')
              }}
            >
              <i
                className="copy"
                id="copy_default"
              ></i>
            </CopyToClipboard>
          </p>
          <p>
            TG:
            <a href={idoData.modal.TG} target="_blank">
              {idoData.modal.TG}
            </a>
          </p>
          <p>
            <FormattedMessage id="IBO_text30"/>:
            <a href={idoData.modal.website} target="_blank">
              {idoData.modal.website}
            </a>
          </p>
        </div>
      </Modal>

      <Modal
        title={<FormattedMessage id="IBO_text33"/>}
        cancelText={<FormattedMessage id="IBO_text32"/>}
        okText={<FormattedMessage id="IBO_text31"/>}
        className="ido-modal"
        visible={tipModalVisible}
        onOk={() => onBurn()}
        onCancel={() => setTipModalVisible(false)}
      >
        <FormattedMessage id="IBO_text27"/>
      </Modal>
    </>
  )
}

export default IdoCard
