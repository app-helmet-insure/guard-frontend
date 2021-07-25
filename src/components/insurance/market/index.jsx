import React, { useState, useEffect, useMemo } from 'react'
import './index.less'
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
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'

const Market = props => {
  console.log(props, 'market')
  const [InsuranceType, setInsuranceType] = useState('Call')
  const [PolicyList, setPolicyList] = useState([])
  const [ApproveStatus, setApproveStatus] = useState(false)
  const { library, active, account } = useActiveWeb3React()
  const [OpenWaiting, setOpenWaiting] = useState(false)
  const [OpenSuccess, setOpenSuccess] = useState(false)
  const { InsuranceSymbol } = props
  const onSuccessClose = () => {
    setOpenSuccess(false)
  }
  const onWaitClose = () => {
    setOpenWaiting(false)
  }
  // 保单数据
  const getPolicyList = () => {
    const CurrentInsurance = getCurrentInsurance({
      Type: InsuranceType,
      Insurance: InsuranceSymbol,
    })
    const {
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
                ResultItem.show_volume =
                  Number(fromWei(itemAsk.volume, collateral_decimals)) - number
              } else {
                ResultItem.show_volume = Number(
                  fromWei(itemAsk.volume, collateral_decimals)
                )
              }
              const AllItem = Object.assign(ResultItemAsk, ResultItem)
              if (!AllItem.isCancel) {
                FixListPush.push(AllItem)
              }
            })
          })
          const FixList = FixListPush
          setPolicyList(FixList)
        }
      }
    })
  }
  // 获取授权状态
  const getApproveStatus = data => {
    const CurrentInsurance = getCurrentInsurance({
      Type: InsuranceType,
      Insurance: InsuranceSymbol,
    })
    console.log(CurrentInsurance)
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
        const Volume = toWei(data.buy_volume, data.collateral_decimals)
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
      const CurrentInsurance = getCurrentInsurance({
        Type: InsuranceType,
        Insurance: InsuranceSymbol,
      })
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
        })
        .on('error', ereor => {
          setOpenWaiting(false)
        })
    }
  }
  useEffect(() => {
    if (InsuranceType || InsuranceSymbol) {
      getPolicyList()
    }
    if (InsuranceSymbol) {
      getApproveStatus()
    }
  }, [InsuranceType, InsuranceSymbol])

  return (
    <div className="insurance_market">
      {PolicyList.length > 0 ? (
        <div className="insurance_market_wrap">
          <div className="insurance_type">
            <button
              onClick={() => setInsuranceType('Call')}
              className={
                InsuranceType === 'Call' ? 'insurance_active_call' : ''
              }
            >
              Cover Miss Out
            </button>
            <button
              onClick={() => setInsuranceType('Put')}
              className={InsuranceType === 'Put' ? 'insurance_active_put' : ''}
            >
              Cover 50% Off
            </button>
          </div>
          <table className="insurance_market_table web_table">
            <thead>
              <tr>
                <td>ID</td>
                <td>保费(MATIC)</td>
                <td>保单数量</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              {PolicyList.map(item => (
                <tr
                  className="insurance_market_table_item"
                  key={'web' + item.askID}
                >
                  <td>{item.show_ID}</td>
                  <td>{item.show_price}</td>
                  <td>{item.show_volume}</td>
                  <td>
                    <input
                      type="text"
                      value={item.buy_volume}
                      onChange={e => {
                        item.buy_volume = e.target.value
                      }}
                    />
                    <button onClick={() => handleClickBuyInurance(item)}>
                      {ApproveStatus ? '购买' : '授权'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="insurance_market_table h5_table">
            {PolicyList.map(item => (
              <div
                className="insurance_market_table_item"
                key={'h5' + item.askID}
              >
                <p>
                  <span>ID</span>
                  <span>{item.show_ID}</span>
                </p>
                <div>
                  <p>
                    <span>保费(MATIC)</span>
                    <span>{item.show_price}</span>
                  </p>
                  <p>
                    <span>保单数量</span>
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
                  <button onClick={() => handleClickBuyInurance(item)}>
                    {ApproveStatus ? '购买' : '授权'}
                  </button>
                </section>
              </div>
            ))}
          </div>
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
export default Market
