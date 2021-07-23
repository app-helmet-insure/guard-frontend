import React, { useState, useEffect } from 'react'
import CallSvg from '../../../assets/images/insurance/call.svg'
import PutSvg from '../../../assets/images/insurance/put.svg'
import NoData from '../../../assets/images/insurance/nodata.svg'
import {
  getCurrentInsurance,
  getInsuranceList,
} from '../../../configs/insurance'
import { useActiveWeb3React, getContract } from '../../../web3'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
import Erc20ABI from '../../../web3/abi/ERC20.json'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const FactoryAddress = '0x021297e233550eDBa8e6487EB7c6696cFBB63b88'
import './index.less'

const MyPolicy = props => {
  const [PolicyList, setPolicyList] = useState([])
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
          } = CurrentInsurance
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
              show_price: fromWei(itemAsk.price, strikeprice_decimals),
              price: itemAsk.price,
            }
            const AllItem = Object.assign(ResultItemAsk, ResultItem)
            if (itemAsk.binds.length) {
              itemAsk.binds.forEach(itemBid => {
                if (
                  account &&
                  itemBid.buyer.toUpperCase() === account.toUpperCase()
                ) {
                  const ResultItemBid = {
                    bidID: itemBid.bidID,
                    volume: itemAsk.volume,
                    show_volume: fromWei(itemBid.volume, collateral_decimals),
                  }
                  const ReturnItem = Object.assign(ResultItemBid, AllItem)
                  FixListPush.push(ReturnItem)
                }
              })
            }
          })
        })
        const FixList = FixListPush
        setPolicyList(FixList)
      }
    })
  }
  const actionWithDraw = data => {
    console.log(data)
    const OrderContracts = getContract(library, OrderABI, OrderAddress)
    OrderContracts.methods
      .exercise(data.bidID)
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
  const actionApprove = adress => {
    const Erc20Contracts = getContract(library, Erc20ABI.abi, adress)
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
  // 判断是否授权
  const handleClickWithDraw = data => {
    console.log(data)
    const Erc20ContractsUnderlying = getContract(
      library,
      Erc20ABI.abi,
      data.long
    )
    const Erc20ContractsLong = getContract(library, Erc20ABI.abi, data.long)
    const LongApprove = Erc20ContractsLong.methods
      .allowance(account, OrderAddress)
      .call()
      .then(res => {
        console.log(res)
        if (Number(res) <= 0) {
          actionApprove(data.long)
          return false
        }
        return true
        
      })
    const UnderlyingApprove = Erc20ContractsUnderlying.methods
      .allowance(account, OrderAddress)
      .call()
      .then(res => {
        if (Number(res) <= 0) {
          actionApprove(data.underlying)
          return false
        }
        return true
        
      })
    if (LongApprove && UnderlyingApprove) {
      actionWithDraw(data)
    }
  }

  useEffect(() => {
    if (account) {
      getPolicyList()
    }
  }, [account])
  return (
    <div className="insurance_mypolicy">
      {PolicyList && PolicyList.length > 0 ? (
        <div className="insurance_mypolicy_list">
          {PolicyList.map(item => (
            <div className="insurance_mypolicy_item" key={item.bidID}>
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
                  <span>{item.expiry}</span>
                  <span>ID: {item.bidID}</span>
                </div>
              </section>
              <section>
                <div>
                  <span>出险价</span>
                  <span>{item.show_strikePrice}</span>
                  <span>{item.putToken}</span>
                </div>
                <div>
                  <span>持有量</span>
                  <span>{item.show_volume}</span>
                  <span>{item.callToken}</span>
                </div>
              </section>
              <section>
                <div>
                  <span>保单单价</span>
                  <span>
                    {(
                      Number(item.show_price) * Number(item.show_volume)
                    ).toFixed(4)}
                  </span>
                  <span>{item.settleToken_symbol}</span>
                </div>
                <div>
                  <span>保费</span>
                  <span>{item.show_price}</span>
                  <span>{item.settleToken_symbol}</span>
                </div>
              </section>
              <section>
                <button onClick={() => handleClickWithDraw(item)}>出险</button>
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
export default MyPolicy
