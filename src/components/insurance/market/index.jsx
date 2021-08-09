import React, { useState, useEffect, useMemo } from 'react'
import './index.less'
import { FormattedMessage } from 'react-intl'
import {
  getCurrentInsurance,
  getInsuranceList,
} from '../../../configs/insurance'
import NoData from '../../../assets/images/insurance/nodata.svg'
import { useActiveWeb3React, getContract } from '../../../web3'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
import Erc20ABI from '../../../web3/abi/ERC20.json'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
import BigNumber from 'bignumber.js'
import { Pagination } from 'antd'
import Loading from '../../loading'
import { numberFormat } from 'highcharts'
import Tips from '../../../assets/images/insurance/tips.svg'
import moment from 'moment'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const Market = props => {
  const [InsuranceType, setInsuranceType] = useState('Call')
  const [PolicyList, setPolicyList] = useState([])
  const [ApproveStatus, setApproveStatus] = useState(false)
  const { library, active, account } = useActiveWeb3React()
  const [OpenWaiting, setOpenWaiting] = useState(false)
  const [OpenSuccess, setOpenSuccess] = useState(false)
  const [Page, setPage] = useState(1)
  const [PageSize, setPageSize] = useState(10)
  const [MinNumber, setMinNumber] = useState(0)
  const [MaxNumber, setMaxNumber] = useState(10)
  const [loading, setLoading] = useState(true)
  const { InsuranceSymbol } = props
  const CurrentInsurance = getCurrentInsurance({
    Type: InsuranceType,
    Insurance: InsuranceSymbol,
  })
  const onSuccessClose = () => {
    setOpenSuccess(false)
  }
  const onWaitClose = () => {
    setOpenWaiting(false)
  }
  const onChangePage = value => {
    setPage(value)
    if (value <= 1) {
      setMinNumber(0)
      setMaxNumber(10)
    } else {
      setMinNumber((value - 1) * 10)
      setMaxNumber((value - 1) * 10 + 10)
    }
  }
  // 保单数据
  const getPolicyList = () => {
    const {
      type,
      insurance,
      collateral_symbol,
      collateral_address,
      collateral_decimals,
      underlying_symbol,
      underlying_address,
      underlying_decimals,
      settleToken_symbol,
      settleToken_decimals,
      strikeprice_decimals,
    } = CurrentInsurance
    getInsuranceList().then(res => {
      console.log(res)
      if (res && res.data.data.options) {
        const ReturnList = res.data.data.options
        const FixListPush = []
        const FilterList = ReturnList.filter(
          item =>
            CurrentInsurance &&
            item.collateral.toLocaleLowerCase() ===
              collateral_address.toLocaleLowerCase() &&
            item.underlying.toLocaleLowerCase() ===
              underlying_address.toLocaleLowerCase()
        )
        if (FilterList) {
          FilterList.forEach(item => {
            const ResultItem = {
              type,
              expiry: item.expiry,
              long: item.long,
              short: item.short,
              show_strikePrice: fromWei(item.strikePrice, strikeprice_decimals),
              strikePrice: item.strikePrice,
              collateral: item.collateral,
              collateral_symbol: collateral_symbol,
              collateral_decimals: collateral_decimals,
              underlying: item.underlying,
              underlying_symbol: underlying_symbol,
              underlying_decimals: underlying_decimals,
              currentInsurance: insurance,
            }
            item.asks.filter(itemAsk => {
              const ResultItemAsk = {
                askID: itemAsk.askID,
                isCancel: itemAsk.isCancel,
                show_ID:
                  itemAsk.seller.substr(0, 2) +
                  itemAsk.seller.substr(2, 3) +
                  '...' +
                  itemAsk.seller.substr(-4).toUpperCase(),
                settleToken_symbol,
                show_price: fromWei(itemAsk.price, settleToken_decimals),
                price: itemAsk.price,
                volume: itemAsk.volume,
                premium:
                  fromWei(itemAsk.price, settleToken_decimals) *
                  fromWei(itemAsk.volume, collateral_decimals),
              }
              if (itemAsk.binds.length) {
                let number = 0
                if (itemAsk.binds.length) {
                  itemAsk.binds.forEach(
                    itembid =>
                      (number += Number(
                        fromWei(itembid.volume, collateral_decimals)
                      ))
                  )
                }
                ResultItem.show_volume =
                  Number(fromWei(itemAsk.volume, collateral_decimals)) - number
              } else {
                ResultItem.show_volume = Number(
                  fromWei(itemAsk.volume, collateral_decimals)
                )
              }
              const AllItem = Object.assign(ResultItemAsk, ResultItem)
              if (AllItem.type === 'Put') {
                AllItem.show_volume = Number(
                  AllItem.show_volume / (1 / AllItem.show_strikePrice)
                ).toFixed(8)
              } else {
                AllItem.show_volume = Number(AllItem.show_volume).toFixed(8)
              }
              if (AllItem.premium > 0.000000001) {
                FixListPush.push(AllItem)
              }
            })
          })

          const FixList = FixListPush.sort(
            (a, b) => Number(b.show_volume) - Number(a.show_volume)
          )
          setPolicyList(FixList)
          console.log(FixList)
          setLoading(false)
        } else {
          setLoading(false)
        }
      }
    })
  }
  // 获取授权状态
  const getApproveStatus = data => {
    const { settleToken_address } = CurrentInsurance
    const Erc20Contracts = getContract(
      library,
      Erc20ABI.abi,
      settleToken_address
    )
    Erc20Contracts.methods
      .allowance(account, OrderAddress)
      .call()
      .then(res => {
        if (Number(res) > 0) {
          setApproveStatus(true)
        }
      })
  }
  // 购买保单
  const handleClickBuyInurance = data => {
    if (ApproveStatus) {
      if (Number(data.buy_volume) <= Number(data.show_volume)) {
        const BuyContracts = getContract(library, OrderABI, OrderAddress)
        const AskID = data.askID
        let Volume
        if (data.type === 'Put') {
          if (data.buy_volume >= data.show_volume) {
            Volume = data.volume
          } else {
            Volume = toWei(
              new BigNumber(
                (data.buy_volume * (1 / data.show_strikePrice)).toFixed(6)
              ).toString(),
              data.collateral_decimals
            )
          }
        } else {
          if (data.buy_volume >= data.show_volume) {
            Volume = data.volume
          } else {
            Volume = toWei(data.buy_volume, data.collateral_decimals)
          }
        }
        BuyContracts.methods
          .buy(AskID, Volume)
          .send({ from: account })
          .on('transactionHash', hash => {
            setOpenWaiting(true)
          })
          .on('receipt', (_, receipt) => {
            setOpenWaiting(false)
            setOpenSuccess(true)
            getPolicyList()
          })
          .on('error', ereor => {
            setOpenWaiting(false)
          })
      }
    } else {
      const { settleToken_address } = CurrentInsurance
      const Erc20Contracts = getContract(
        library,
        Erc20ABI.abi,
        settleToken_address
      )
      const Infinitys =
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      Erc20Contracts.methods
        .approve(OrderAddress, Infinitys)
        .send({ from: account })
        .on('transactionHash', hash => {
          setOpenWaiting(true)
        })
        .on('receipt', (_, receipt) => {
          setOpenWaiting(false)
          setOpenSuccess(true)
          getApproveStatus()
        })
        .on('error', ereor => {
          setOpenWaiting(false)
        })
    }
  }
  useEffect(() => {
    if (!active) {
      return
    }
    if (InsuranceType || InsuranceSymbol) {
      setPolicyList([])
      setPage(1)
      onChangePage(1)
      setLoading(true)
      getPolicyList()
      getApproveStatus()
    }
  }, [InsuranceType, InsuranceSymbol, active])

  return (
    <div className="insurance_market">
      <div className="insurance_type">
        <button
          onClick={() => setInsuranceType('Call')}
          className={InsuranceType === 'Call' ? 'insurance_active_call' : ''}
        >
          <FormattedMessage id="insurance_text4" />
        </button>
        <button
          onClick={() => setInsuranceType('Put')}
          className={InsuranceType === 'Put' ? 'insurance_active_put' : ''}
        >
          <FormattedMessage id="insurance_text5" />
        </button>
      </div>
      <div className="insurance_tips">
        <img src={Tips} alt="nodata" />
        <p>
          <FormattedMessage
            id="insurance_tips"
            values={{
              time: moment(new Date(CurrentInsurance.expiry * 1000)).format(
                'YYYY/MM/DD HH:mm:ss'
              ),
            }}
          />
        </p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {PolicyList && PolicyList.length > 0 ? (
            <div className="insurance_market_wrap">
              <table className="insurance_market_table web_table">
                <thead>
                  <tr>
                    <td>
                      <FormattedMessage id="insurance_text18" />
                    </td>
                    <td>
                      <FormattedMessage id="insurance_text19" />
                      (GUARD)
                    </td>
                    <td>
                      <FormattedMessage id="insurance_text20" />
                    </td>
                    <td>
                      <FormattedMessage id="insurance_text21" />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {PolicyList.slice(MinNumber, MaxNumber).map(item => (
                    <tr
                      className="insurance_market_table_item"
                      key={'web' + item.askID}
                    >
                      <td>{item.show_ID}</td>
                      <td>{item.premium.toFixed(8)}</td>
                      <td>{item.show_volume}</td>
                      <td>
                        <input
                          type="text"
                          value={item.buy_volume}
                          onChange={e => {
                            item.buy_volume = e.target.value
                          }}
                        />
                        <button
                          onClick={() => handleClickBuyInurance(item)}
                          className={
                            Number(item.show_volume) === 0 ? 'hiddenButton' : ''
                          }
                        >
                          {ApproveStatus ? (
                            <FormattedMessage id="insurance_text22" />
                          ) : (
                            <FormattedMessage id="stake_chain_dialog_text7" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="insurance_market_table h5_table">
                {PolicyList.slice(MinNumber, MaxNumber).map(item => (
                  <div
                    className="insurance_market_table_item"
                    key={'h5' + item.askID}
                  >
                    <p>
                      <span>
                        <FormattedMessage id="insurance_text18" />:{' '}
                      </span>
                      <span>{item.show_ID}</span>
                    </p>
                    <div>
                      <p>
                        <span>
                          <FormattedMessage id="insurance_text19" />
                          (GUARD)
                        </span>
                        <span> {item.premium.toFixed(8)}</span>
                      </p>
                      <p>
                        <span>
                          <FormattedMessage id="insurance_text20" />
                        </span>
                        <span>{item.show_volume}</span>
                      </p>
                    </div>
                    <section>
                      <input
                        type="text"
                        value={item.buy_volume}
                        onChange={e => {
                          item.buy_volume = e.target.value
                        }}
                      />
                      <button
                        onClick={() => handleClickBuyInurance(item)}
                        className={
                          Number(item.show_volume) === 0 ? 'hiddenButton' : ''
                        }
                      >
                        {ApproveStatus ? (
                          <FormattedMessage id="insurance_text22" />
                        ) : (
                          <FormattedMessage id="stake_chain_dialog_text7" />
                        )}
                      </button>
                    </section>
                  </div>
                ))}
              </div>
              <Pagination
                className="paginaction"
                current={Page}
                pageSize={PageSize}
                total={PolicyList.length}
                onChange={value => onChangePage(value)}
                showSizeChanger={false}
                hideOnSinglePage
              />
            </div>
          ) : (
            <div className="nodata">
              <img src={NoData} alt="" />
            </div>
          )}
        </>
      )}

      <WaitingConfirmationDialog visible={OpenWaiting} onClose={onWaitClose} />
      <SuccessfulPurchaseDialog
        visible={OpenSuccess}
        onClose={onSuccessClose}
      />
    </div>
  )
}
export default Market
