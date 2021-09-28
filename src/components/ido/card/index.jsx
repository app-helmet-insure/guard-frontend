import React, { useState, useMemo, useEffect, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import BigNumber from 'bignumber.js'
import cs from 'classnames'
import { message, Slider, InputNumber, Row, Col, Modal } from 'antd'
import {
  formatAmount,
  fromWei,
} from '../../../utils/format'
import './index.less'

const IdoCard = (props) => {
  const [idoData, setIdoData] = useState(props.pools)
  const [amount, setAmount] = useState(null)
  const [timer, setTimer] = useState(null)
  const [initTimer, setInitTimer] = useState(null)
  const [claimFlag, setClaimFlag] = useState(false)
  const [approvalLoading, setApprovalLoading] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)
  const [burnLoading, setBurnLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(false)
  const [airdropLoading, setAirdropLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  let countdown = {
    h: '-',
    m: '-',
    statusTxt: 'IBO_text3',
  }
  let now = parseInt(Date.now() / 1000)

  console.log(idoData, 'props')

  const showModal = () => {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const onChange = (value) => {
    setAmount(value)
  }

  const onAirdrop = () => {}

  const onMax = () => {}

  const onApprove = () => {}

  const onClaim = () => {}

  const showClaim = () => {
    setClaimFlag(!claimFlag)
  }

  const onBurn = () => {}

  return (
    <>
      {idoData && (
        <div className='ibo_item_warp'>
          <div className={cs('ibo_item', idoData.light && 'active')}>
            <div className='ibo_item_title'>
              <p className='ibo_item_title_left'>
                {/* <img src={require(`~/assets/img/ibo/${idoData.icon}`)} /> */}
                <span>{idoData.name}</span>
                <span
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                  onClick={showModal}
                >
                  <svg
                    fill='#000000'
                    t='1617039040708'
                    className='icon'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='1287'
                    width='16'
                    height='16'
                  >
                    <path
                      d='M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z'
                      p-id='1288'
                    ></path>
                  </svg>
                </span>
              </p>
              <p className='ibo_item_title_right'>
                <span className='ibo_item_countdown'>
                  {countdown.h}
                  <FormattedMessage id='IBO_text2' />/{countdown.m}
                  <FormattedMessage id='IBO_text1' />
                </span>
                <span className='ibo_item_status ibo_item_status_ongoing'>
                  <FormattedMessage id={countdown.statusTxt} />
                </span>
              </p>
            </div>
            {idoData.status !== 3 && (
              <div>
                <p className='ibo_item_radio'>{idoData.ratio}</p>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text8' />
                  </span>
                  <span className='value'>
                    {new BigNumber(idoData.amount).toFormat()}{' '}
                    {idoData.underlying.symbol}
                  </span>
                </p>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text9' />
                  </span>
                  <span className='value'>{idoData.pool_info.maxAccount}</span>
                </p>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text10' />
                  </span>
                  <span className='value'>
                    {(idoData.progress * 100).toFixed(0)}%
                  </span>
                </p>
                <a className='ibo_item_progress'>
                  <i
                    className='ibo_item_progress_bar'
                    style={{
                      width:
                        idoData.progress > 1
                          ? '100%'
                          : idoData.progress * 100 + '%',
                      display: idoData.progress == 0 && 'none',
                    }}
                  ></i>
                </a>
                <div className='block' style={{position: 'relative'}}>
                  {idoData.purchasedCurrencyOf <= 0 && (
                    <span className='slider-max' onClick={onMax}>
                      <FormattedMessage id='IBO_text50' />
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

                  <p className='ibo_item_value slider_content'>
                    <span className='ibo_item_value_title'>
                      <FormattedMessage id='IBO_text11' />
                    </span>
                    <span className='value'>
                      {/* {available} {idoData.currency.symbol} */}
                    </span>
                  </p>
                  <Row style={{ position: "relative" }}>
                    <Col style={{margin: '0 auto', width: '160px'}}>
                      <Slider
                        min={idoData.pool_info.min_allocation}
                        max={idoData.pool_info.max_allocation}
                        onChange={onChange}
                        value={amount}
                      />
                    </Col>
                    <p className='min_max_value'>
                      <span>
                        <FormattedMessage id='IBO_text12' />
                        {idoData.pool_info.min_allocation}
                      </span>

                      <span>
                        <FormattedMessage id='IBO_text13' />
                        {idoData.pool_info.max_allocation}
                      </span>
                    </p>
                    </Row>
                  
                </div>
                {idoData.currency.allowance === '0' && (
                  <a
                    className='ibo_item_btn'
                    className={
                      idoData.status !== 1 ||
                      parseInt(idoData.pool_info.curUserCount) >=
                        parseInt(idoData.pool_info.maxAccount)
                        ? 'disabled'
                        : ''
                    }
                    style={{
                      background: '#17173A',
                      color: '#ffffff',
                    }}
                    onClick={onApprove}
                  >
                    {approvalLoading && <i className='el-icon-loading'></i>}
                    {parseInt(idoData.pool_info.curUserCount) >=
                    parseInt(idoData.pool_info.maxAccount) ? (
                      <FormattedMessage id='IBO_text34' />
                    ) : (
                      <FormattedMessage id='Approve' />
                    )}
                  </a>
                )}

                {idoData.currency.allowance !== '0' && (
                  <a
                    className={
                      !(
                        idoData.status === 1 &&
                        $store.state.userInfo.status === 1 &&
                        parseInt(idoData.pool_info.curUserCount) <
                          parseInt(idoData.pool_info.maxAccount)
                      ) ||
                      idoData.purchasedCurrencyOf > 0 ||
                      now > parseInt(idoData.timeClose)
                        ? 'disabled ibo_item_btn'
                        : 'ibo_item_btn'
                    }
                    style={{
                      background: '#17173A',
                      color: '#ffffff',
                    }}
                    onClick={onBurn}
                  >
                    {burnLoading && <i className='el-icon-loading'></i>}
                    {parseInt(idoData.pool_info.curUserCount) >=
                    parseInt(idoData.pool_info.maxAccount) ? (
                      <FormattedMessage id='IBO_text34' />
                    ) : (
                      <FormattedMessage id='IBO_text51' />
                    )}
                  </a>
                )}
              </div>
            )}
            {idoData.status === 3 && (
              <div className='finished_style'>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text20' />
                  </span>
                  <span className='value'>1.0s</span>
                </p>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text21' />
                  </span>
                  <span className='value'>999%</span>
                </p>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text22' />
                  </span>
                  <span className='value'>$999</span>
                </p>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text23' />
                  </span>
                  <span className='value'>999 {idoData.underlying.symbol}</span>
                </p>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text24' />
                  </span>
                  <span className='value'>
                    10,000 {idoData.underlying.symbol}
                  </span>
                </p>
              </div>
            )}
            <p className='ibo_item_value'>
              <span className='ibo_item_value_title'>
                <FormattedMessage
                  id='IBO_text14'
                  values={{ icon: idoData.currency.symbol }}
                />
              </span>
              <span className='value'>
                {fromWei(idoData.purchasedCurrencyOf).toFixed(6, 1) * 1}
              </span>
            </p>
            <p className='ibo_item_value'>
              <span className='ibo_item_value_title'>
                <FormattedMessage id='IBO_text15' />
              </span>
              <span className='value'>
                {!idoData.settleable || idoData.status === 0
                  ? '-'
                  : fromWei(idoData.settleable.rate)
                      .multipliedBy(new BigNumber(100))
                      .toFixed(2, 1)
                      .toString()}
                %
              </span>
            </p>
            <p className='ibo_item_value'>
              <span className='ibo_item_value_title'>
                <FormattedMessage id='IBO_text16' />
              </span>
              <span className='value'>
                {!idoData.settleable
                  ? '-'
                  : formatAmount(
                      idoData.settleable.volume,
                      idoData.underlying.decimal
                    )}
              </span>
            </p>
            <p className='claim_detail_btn' onClick={showClaim}>
              <span></span>
              <a>
                <FormattedMessage id='IBO_text17' />
              </a>
              <span></span>
            </p>
            {claimFlag && (
              <div>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage
                      id='IBO_text18'
                      values={{ icon: idoData.currency.symbol }}
                    />
                  </span>
                  <span className='value'>
                    {idoData.settleable
                      ? this.idoData.settleable.amount == '0'
                        ? 0
                        : new BigNumber(
                            fromWei(this.idoData.settleable.amount)
                          ).toFormat(6)
                      : 0}
                  </span>
                </p>
                <p className='ibo_item_value'>
                  <span className='ibo_item_value_title'>
                    <FormattedMessage id='IBO_text19' />
                  </span>
                  <span className='value'>
                    {idoData.settleable &&
                      formatAmount(
                        idoData.settleable.volume,
                        idoData.underlying.decimal
                      )}
                  </span>
                </p>
                <a
                  className={
                    idoData.status === 2 && idoData.settleable.volume > 0
                      ? 'ibo_item_btn ibo_item_claim'
                      : 'ibo_item_btn ibo_item_claim disabled'
                  }
                  style={{
                    color: '#ffffff',
                  }}
                  onClick={onClaim}
                >
                  {claimLoading && <i className='el-icon-loading'></i>}
                  <FormattedMessage id='IBO_text52' />
                </a>
                {idoData.claimTimeTipI18n && (
                  <p className='ibo_item_value'>
                    <span className='ibo_item_value_title'>
                      <FormattedMessage id='IBO_text36' />
                      {idoData.claimTimeTipI18n}
                    </span>
                  </p>
                )}
                {idoData.airdrop && (
                  <template>
                    <p className='ibo_item_value'>
                      <span className='ibo_item_value_title'>
                        <FormattedMessage id='IBO_text48' />
                      </span>
                      <span className='value'>{idoData.airdrop.allowList}</span>
                    </p>
                    <a
                      className={
                        idoData.airdrop &&
                        now > idoData.airdrop.begin &&
                        !idoData.airdrop.withdrawList &&
                        idoData.airdrop.allowList > 0
                          ? 'ibo_item_btn ibo_item_claim'
                          : 'ibo_item_btn ibo_item_claim disabled'
                      }
                      style={{
                        color: '#ffffff',
                      }}
                      onClick={onAirdrop}
                    >
                      {airdropLoading && <i className='el-icon-loading'></i>}
                      <FormattedMessage id='IBO_text52' />
                    </a>
                    <p className='ibo_item_value'>
                      <span className='ibo_item_value_title'>
                        <FormattedMessage
                          id='IBO_text49'
                          values={{ token: idoData.name }}
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
      <Modal title="Tip" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width='400'>
        {
          idoData.name === 'MONI' && (
            <div className="tip_box">
              <p><FormattedMessage id='IBO_text28' />: <FormattedMessage id='IBO_august' /></p>
              <p><FormattedMessage id='IBO_text29' />: Pancakeswap.finance</p>
              <p>
                SC: 0x0e52d24c87a5ca4f37e3ee5e16ef5913fb0cceeb
          <i
                  className="copy"
                  id="copy_default"
                  onClick={() => message.success('0x0e52d24c87a5ca4f37e3ee5e16ef5913fb0cceeb')}
          ></i>
        </p>
            <p>
              TG:
          <a href="T.me/game1networkchat" target="_blank"
              >T.me/game1networkchat</a
              >
            </p>
            <p>
              <FormattedMessage id='IBO_text30' />:
          <a href="https://game1network.com" target="_blank"
              >https://game1network.com</a
              >
            </p>
      </div>
          )
        }
      </Modal>
    </>
  )
}

export default IdoCard
