import React, { useState, useEffect } from 'react'
import CallSvg from '../../../assets/images/insurance/call.svg'
import PutSvg from '../../../assets/images/insurance/put.svg'
import NoData from '../../../assets/images/insurance/nodata.svg'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
import {
  getCurrentInsurance,
  getInsuranceList,
} from '../../../configs/insurance'
import { getTokenName } from '../../../web3/address'
import { useActiveWeb3React, getContract } from '../../../web3'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
import './index.less'
import moment from 'moment'

const MySupply = props => {
  const [SupplyList, setSupplyList] = useState([])
  const { library, active, account } = useActiveWeb3React()
  const [OpenWaiting, setOpenWaiting] = useState(false)
  const [OpenSuccess, setOpenSuccess] = useState(false)
  const onSuccessClose = () => {
    setOpenSuccess(false)
  }
  const onWaitClose = () => {
    setOpenWaiting(false)
  }
  // 保单数据
  const getPolicyList = () => {
    getInsuranceList().then(res => {
      if (res && res.data.data.options) {
        const ReturnList = res.data.data.options
        const FixListPush = []
        ReturnList.forEach(item => {
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
              show_strikePrice: fromWei(item.strikePrice, strikeprice_decimals),
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
                  number = Number(fromWei(itemAsk.binds[0].volume))
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
              if (
                !AllItem.isCancel &&
                itemAsk.seller.toUpperCase() === account.toUpperCase()
              ) {
                FixListPush.push(AllItem)
              }
            })
          }
        })
        const FixList = FixListPush
        console.log(FixList)
        setSupplyList(FixList)
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
    if (account) {
      getPolicyList()
    }
  }, [account])
  return (
    <div className="insurance_mysupply">
      {SupplyList && SupplyList.length > 0 ? (
        <div className="insurance_mysupply_list">
          {SupplyList.map(item => (
            <div className="insurance_mysupply_item" key={item.askID}>
              <section>
                <div>
                  <img src={item.type === 'Call' ? CallSvg : PutSvg} alt="" />
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
              <section>
                <div>
                  <span>出险价</span>
                  <span>{item.show_strikePrice}</span>
                  <span>{item.putToken}</span>
                </div>
                <div>
                  <span>保单单价</span>
                  <span>
                    {(
                      Number(item.show_price) * Number(item.show_volume)
                    ).toFixed(8)}
                  </span>
                  <span>{item.settleToken_symbol}</span>
                </div>
              </section>
              <section>
                <div>
                  <span>已出售</span>
                  <span>{item.show_besold}</span>
                  <span>{item.callToken}</span>
                </div>
                <div>
                  <span>未出售</span>
                  <span>{item.show_unsold}</span>
                  <span>{item.callToken}</span>
                </div>
              </section>
              <section>
                <button>Mining</button>
                <button onClick={() => handleClickCancelOrder(item)}>
                  撤销
                </button>
              </section>
            </div>
          ))}
        </div>
      ) : (
        <img src={NoData} alt="" className="nodata" />
      )}
      <WaitingConfirmationDialog visible={OpenWaiting} onClose={onWaitClose} />
      <SuccessfulPurchaseDialog
        visible={OpenSuccess}
        onClose={onSuccessClose}
      />
    </div>
  )
}
export default MySupply
