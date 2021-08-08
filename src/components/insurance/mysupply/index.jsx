import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import CallSvg from '../../../assets/images/insurance/call.svg'
import PutSvg from '../../../assets/images/insurance/put.svg'
import NoData from '../../../assets/images/insurance/nodata.svg'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
import SubmitInsuranceDialog from '../../dialogs/submit-insurance-dialog'
import Loading from '../../loading'
import {
  getCurrentInsurance,
  getInsuranceList,
} from '../../../configs/insurance'
import { getTokenName } from '../../../web3/address'
import { useActiveWeb3React, getContract } from '../../../web3'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
import { Pagination } from 'antd'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
import './index.less'
import moment from 'moment'
import { Skeleton } from 'antd'

const MySupply = props => {
  const [SupplyList, setSupplyList] = useState([])
  const [loading, setLoading] = useState(true)
  const { library, active, account } = useActiveWeb3React()
  const [OpenWaiting, setOpenWaiting] = useState(false)
  const [OpenSuccess, setOpenSuccess] = useState(false)
  const [Page, setPage] = useState(1)
  const [PageSize, setPageSize] = useState(5)
  const [MinNumber, setMinNumber] = useState(0)
  const [MaxNumber, setMaxNumber] = useState(PageSize)
  const onSuccessClose = () => {
    setOpenSuccess(false)
  }
  const onWaitClose = () => {
    setOpenWaiting(false)
  }
  const goMining = () => {
    props.history.push('/mining')
  }
  const onChangePage = value => {
    setPage(value)
    if (value <= 1) {
      setMinNumber(0)
      setMaxNumber(PageSize)
    } else {
      setMinNumber((value - 1) * PageSize)
      setMaxNumber((value - 1) * PageSize + PageSize)
    }
  }
  // 保单数据
  const getPolicyList = () => {
    getInsuranceList().then(res => {
      if (res && res.data.data.options) {
        const ReturnList = res.data.data.options
        const FixListPush = []
        const FilterList = ReturnList.filter(
          item => Number(item.expiry) >= 1627315200
        )
        FilterList.forEach(item => {
          const CurrentInsurance = getCurrentInsurance({
            CollateralAddress: item.collateral,
            UnderlyingAddress: item.underlying,
          })
          if (CurrentInsurance) {
            const {
              type,
              indextoken,
              strikeprice_decimals,
              collateral_symbol,
              collateral_decimals,
              underlying_symbol,
              underlying_decimals,
              insurance,
              settleToken_symbol,
              settleToken_decimals,
            } = CurrentInsurance
            const ResultItem = {
              type,
              expiry: item.expiry,
              show_expiry: moment(new Date(item.expiry * 1000)).format(
                'YYYY/MM/DD HH:mm:ss'
              ),
              long: item.long,
              short: item.short,
              show_strikePrice:
                type === 'Call'
                  ? fromWei(item.strikePrice, strikeprice_decimals)
                  : 1 / fromWei(item.strikePrice, strikeprice_decimals),
              strikePrice: item.strikePrice,
              collateral: item.collateral,
              collateral_symbol: collateral_symbol,
              collateral_decimals: collateral_decimals,
              underlying: item.underlying,
              underlying_symbol: underlying_symbol,
              underlying_decimals: underlying_decimals,
              callToken: insurance,
              putToken: indextoken,
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
                show_volume: fromWei(itemAsk.volume, collateral_decimals),
              }
              if (itemAsk.binds.length) {
                let number = 0
                if (itemAsk.binds.length > 1) {
                  itemAsk.binds.forEach(
                    itembid =>
                      (number += Number(
                        fromWei(itembid.volume, collateral_decimals)
                      ))
                  )
                } else {
                  number = Number(
                    fromWei(itemAsk.binds[0].volume, collateral_decimals)
                  )
                }
                ResultItem.show_besold = number
                ResultItem.show_unsold =
                  Number(fromWei(itemAsk.volume, collateral_decimals)) - number
              } else {
                ResultItem.show_besold = 0
                ResultItem.show_unsold = Number(
                  fromWei(itemAsk.volume, collateral_decimals)
                )
              }
              const AllItem = Object.assign(ResultItemAsk, ResultItem)
              if (AllItem.type === 'Put') {
                AllItem.show_besold = Number(
                  AllItem.show_besold /
                    (1 / fromWei(ResultItem.strikePrice, strikeprice_decimals))
                ).toFixed(8)
                AllItem.show_unsold = Number(
                  AllItem.show_unsold /
                    (1 / fromWei(ResultItem.strikePrice, strikeprice_decimals))
                ).toFixed(8)
              } else {
                AllItem.show_besold = Number(AllItem.show_besold).toFixed(8)
                AllItem.show_unsold = Number(AllItem.show_unsold).toFixed(8)
              }
              if (
                !AllItem.isCancel &&
                itemAsk.seller.toUpperCase() === account.toUpperCase()
              ) {
                FixListPush.push(AllItem)
              }
            })
          }
        })
        const FixList = FixListPush.sort(
          (a, b) => Number(b.show_unsold) - Number(a.show_unsold)
        )
        console.log(FixList)
        setSupplyList(FixList)
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
  }
  // 撤销订单
  const handleClickCancelOrder = data => {
    console.log(data)
    const AskID = data.askID
    const OrderContracts = getContract(library, OrderABI, OrderAddress)
    OrderContracts.methods
      .cancel(AskID)
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
  useEffect(() => {
    if (!account) {
      return
    }
    getPolicyList()
  }, [account])
  return (
    <div className="insurance_mysupply">
      <h2 className="insurance_mysupply_title">
        <FormattedMessage id="mysupply_text1" />
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          {SupplyList && SupplyList.length > 0 ? (
            <div className="insurance_mysupply_list">
              {SupplyList.slice(MinNumber, MaxNumber).map(item => (
                <div className="insurance_mysupply_item" key={item.askID}>
                  <section>
                    <div>
                      <img
                        src={item.type === 'Call' ? CallSvg : PutSvg}
                        alt=""
                      />
                      <span className={item.type}>
                        {item.callToken +
                          ' ' +
                          item.type +
                          ' ' +
                          item.show_strikePrice +
                          ' ' +
                          item.putToken}
                      </span>
                    </div>
                    <div>
                      <span>{item.show_expiry}</span>
                      <span>ID: {item.askID}</span>
                    </div>
                  </section>
                  <section className="mysupply_section_pc">
                    <div>
                      <span>
                        <FormattedMessage id="mypolicy_text2" />
                      </span>
                      <span>{item.show_strikePrice}</span>
                      <span>{item.putToken}</span>
                    </div>
                    <div>
                      <span>
                        <FormattedMessage id="mypolicy_text4" />
                      </span>
                      <span>{Number(item.show_price).toFixed(8)}</span>
                      <span>{item.settleToken_symbol}</span>
                    </div>
                  </section>
                  <section className="mysupply_section_pc">
                    <div>
                      <span>
                        <FormattedMessage id="mysupply_text2" />
                      </span>
                      <span>{item.show_besold}</span>
                      <span>{item.callToken}</span>
                    </div>
                    <div>
                      <span>
                        <span>
                          <FormattedMessage id="mysupply_text3" />
                        </span>
                      </span>
                      <span>{item.show_unsold}</span>
                      <span>{item.callToken}</span>
                    </div>
                  </section>
                  <section className="mysupply_section_h5">
                    <div>
                      <span className="mysupply_price_title">
                        <FormattedMessage id="mypolicy_text2" />
                      </span>
                      <p>
                        <span>{item.show_strikePrice}</span>
                        <span>{item.putToken}</span>
                      </p>
                    </div>
                    <div>
                      <span className="mysupply_price_title">
                        <FormattedMessage id="mypolicy_text4" />
                      </span>
                      <p>
                        <span>{Number(item.show_price).toFixed(8)}</span>
                        <span>{item.settleToken_symbol}</span>
                      </p>
                    </div>
                  </section>
                  <section className="mysupply_section_h5">
                    <div>
                      <span className="mysupply_price_title">
                        <FormattedMessage id="mysupply_text2" />
                      </span>
                      <p>
                        <span>{item.show_besold}</span>
                        <span>{item.callToken}</span>
                      </p>
                    </div>
                    <div>
                      <span className="mysupply_price_title">
                        <FormattedMessage id="mysupply_text3" />
                      </span>
                      <p>
                        <span>{item.show_unsold}</span>
                        <span>{item.callToken}</span>
                      </p>
                    </div>
                  </section>
                  <section>
                    {Number(item.show_unsold) === 0 ? (
                      <button className="finish">
                        <FormattedMessage id="insurance_text27" />
                      </button>
                    ) : (
                      <>
                        <button onClick={goMining} className="mining">
                          <FormattedMessage id="mysupply_text4" />
                        </button>
                        <button
                          onClick={() => handleClickCancelOrder(item)}
                          className={`cancel ${
                            Number(item.show_besold) > 0 ? 'disable' : ''
                          }`}
                        >
                          <FormattedMessage id="mysupply_text5" />
                        </button>
                      </>
                    )}
                  </section>
                </div>
              ))}
              <Pagination
                className="paginaction"
                current={Page}
                pageSize={PageSize}
                total={SupplyList.length}
                onChange={value => onChangePage(value)}
              />
            </div>
          ) : (
            <img src={NoData} alt="" className="nodata" />
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
export default withRouter(MySupply)
