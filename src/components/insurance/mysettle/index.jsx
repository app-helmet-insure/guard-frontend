import React, { useState, useEffect } from 'react'
import CallSvg from '../../../assets/images/insurance/call.svg'
import PutSvg from '../../../assets/images/insurance/put.svg'
import NoData from '../../../assets/images/insurance/nodata.svg'
import {
  getCurrentInsurance,
  getInsuranceList,
} from '../../../configs/insurance'
import { getTokenName } from '../../../web3/address'
import { useActiveWeb3React, getContract } from '../../../web3'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
import PoolABI from '../../../web3/abi/StakingPool.json'
import FactoryABI from '../../../web3/abi/Factory.json'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const FactoryAddress = '0x021297e233550eDBa8e6487EB7c6696cFBB63b88'
import './index.less'

const MySettle = props => {
  const [SettleList, setSettleList] = useState([])
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
    getInsuranceList().then(async res => {
      if (res && res.data.data.options) {
        const ReturnList = res.data.data.options
        const FixListPush = []
        ReturnList.forEach(async item => {
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
            } = CurrentInsurance

            const longBalance = await getContract(library, PoolABI, item.long)
              .methods.balanceOf(account)
              .call()
              .then(long => {
                const balance = fromWei(
                  long,
                  CurrentInsurance.collateral_decimals
                )
                return balance
              })
            const shortBalance = await getContract(library, PoolABI, item.short)
              .methods.balanceOf(account)
              .call()
              .then(short => {
                const balance = fromWei(
                  short,
                  CurrentInsurance.collateral_decimals
                )
                return balance
              })
            if (Number(longBalance) > 0 && Number(shortBalance) > 0) {
              FixListPush.push({
                type,
                expiry: item.expiry,
                long: item.long,
                short: item.short,
                show_strikePrice: fromWei(
                  item.strikePrice,
                  strikeprice_decimals
                ),
                strikePrice: item.strikePrice,
                collateral: item.collateral,
                collateral_symbol: collateral_symbol,
                collateral_decimals: collateral_decimals,
                underlying: item.underlying,
                underlying_symbol: underlying_symbol,
                underlying_decimals: underlying_decimals,
                callToken: insurance,
                putToken: indextoken,
                claimBalance:
                  Number(shortBalance) > Number(longBalance)
                    ? longBalance
                    : shortBalance,
                col: 0,
                fee: 0,
                und: 0,
              })
            }
            const ShortMinusLong = Number(shortBalance) - Number(longBalance)
            if (Number(ShortMinusLong) > 0) {
              try {
                const SettleInfo = await getContract(
                  library,
                  FactoryABI,
                  FactoryAddress
                )
                  .methods.settleable(item.short, toWei(ShortMinusLong + ''))
                  .call()
                  .then(info => info)
                FixListPush.push({
                  type,
                  expiry: item.expiry,
                  long: item.long,
                  short: item.short,
                  show_strikePrice: fromWei(
                    item.strikePrice,
                    strikeprice_decimals
                  ),
                  strikePrice: item.strikePrice,
                  collateral: item.collateral,
                  collateral_symbol: collateral_symbol,
                  collateral_decimals: collateral_decimals,
                  underlying: item.underlying,
                  underlying_symbol: underlying_symbol,
                  underlying_decimals: underlying_decimals,
                  callToken: insurance,
                  putToken: indextoken,
                  claimBalance: 0,
                  col: fromWei(
                    SettleInfo.col,
                    CurrentInsurance.collateral_decimals
                  ),
                  fee: fromWei(
                    SettleInfo.fee,
                    CurrentInsurance.settleToken_decimals
                  ),
                  und: fromWei(
                    SettleInfo.und,
                    CurrentInsurance.underlying_decimals
                  ),
                })
              } catch (error) {
                console.log(error)
              }
            }
            const newobj = {}
            const newArr = []
            FixListPush.forEach(items => {
              if (!newobj[items.collateral + items.underlying + items.short]) {
                newobj[items.collateral + items.underlying + items.short] = 1
                newArr.push(items)
              }
            })
            const FixList = newArr.filter(
              newItem =>
                Number(newItem.col) + Number(newItem.claimBalance) > 0 ||
                Number(newItem.und) > 0
            )
            console.log
            setSettleList(FixList)
          }
        })
      }
    })
  }
  // 撤销订单
  const handleClickClaimOrder = data => {
    const OrderContracts = getContract(library, FactoryABI, FactoryAddress)
    if (Number(data.claimBalance) !== 0) {
      OrderContracts.methods
        .burn(data.short, toWei(data.claimBalance))
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
    } else {
      OrderContracts.methods.settle(data.short).send({ from: account })
    }
  }
  useEffect(() => {
    if (account) {
      getPolicyList()
    }
  }, [account])
  return (
    <div className="insurance_mysettle">
      <h2 className="insurance_mysettle_title">我的结算</h2>
      {SettleList && SettleList.length > 0 ? (
        <div className="insurance_mysettle_list">
          {SettleList.map((item, index) => (
            <div className="insurance_mysettle_item" key={index}>
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
              </section>
              <section className="mysettle_section_pc">
                <div>
                  <span>计价资产</span>
                  <span>
                    {item.type === 'Call'
                      ? Number(item.col) + Number(item.claimBalance)
                      : item.und}
                  </span>
                  <span>
                    {item.type === 'Call' ? item.callToken : item.putToken}
                  </span>
                </div>
              </section>
              <section className="mysettle_section_pc">
                <div>
                  <span>基础资产</span>
                  <span>
                    {item.type === 'Call'
                      ? item.und
                      : Number(item.col) + Number(item.claimBalance)}
                  </span>
                  <span>
                    {item.type === 'Call' ? item.putToken : item.callToken}
                  </span>
                </div>
              </section>
              <section className="mysettle_section_h5">
                <div>
                  <span className="mysettle_price_title">计价资产</span>
                  <p>
                    <span>
                      {item.type === 'Call'
                        ? Number(item.col) + Number(item.claimBalance)
                        : item.und}
                    </span>
                    <span>
                      {item.type === 'Call' ? item.callToken : item.putToken}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="mysettle_price_title">基础资产</span>
                  <p>
                    <span>
                      {item.type === 'Call'
                        ? item.und
                        : Number(item.col) + Number(item.claimBalance)}
                    </span>
                    <span>
                      {item.type === 'Call' ? item.putToken : item.callToken}
                    </span>
                  </p>
                </div>
              </section>
              <section>
                <button onClick={() => handleClickClaimOrder(item)}>
                  取回
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
export default MySettle
