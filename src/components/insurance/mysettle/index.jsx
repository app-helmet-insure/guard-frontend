import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
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
import {
  processResult,
  getOnlyMultiCallProvider,
} from '../../../web3/multicall'
import { Contract } from 'ethers-multicall-x'
import { getRpcUrl } from '../../../web3/address'
import { Pagination } from 'antd'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const FactoryAddress = '0x021297e233550eDBa8e6487EB7c6696cFBB63b88'
import './index.less'
import { Skeleton } from 'antd'

const MySettle = props => {
  const [SettleList, setSettleList] = useState([])
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
    getInsuranceList().then(async res => {
      if (res && res.data.data.options) {
        const ReturnList = res.data.data.options
        const FixListPush = []
        const multicallPorvider = getOnlyMultiCallProvider(137)
        ReturnList.forEach(async item => {
          const CurrentInsurance = getCurrentInsurance({
            CollateralAddress: item.collateral,
            UnderlyingAddress: item.underlying,
          })
          const PromiseList = []
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
            const longContracts = new Contract(item.long, PoolABI)
            const shortContracts = new Contract(item.short, PoolABI)
            PromiseList.push(
              longContracts.balanceOf(account),
              shortContracts.balanceOf(account)
            )
            multicallPorvider.all(PromiseList).then(data => {
              data = processResult(data)
              let [longBalance, shortBalance] = data
              longBalance = fromWei(
                longBalance + '',
                CurrentInsurance.collateral_decimals
              )
              shortBalance = fromWei(
                shortBalance + '',
                CurrentInsurance.collateral_decimals
              )
              if (Number(longBalance) > 0 && Number(shortBalance) > 0) {
                FixListPush.push({
                  type,
                  expiry: item.expiry,
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
                  claimBalance:
                    Number(shortBalance) > Number(longBalance)
                      ? longBalance
                      : shortBalance,
                  col: 0,
                  fee: 0,
                  und: 0,
                })
              }
              let ShortMinusLong = Number(shortBalance) - Number(longBalance)
              if (Number(ShortMinusLong) > 0) {
                ShortMinusLong = ShortMinusLong.toString()
                console.log(ShortMinusLong, typeof ShortMinusLong)
                try {
                  getContract(library, FactoryABI, FactoryAddress)
                    .methods.settleable(item.short, toWei(ShortMinusLong + ''))
                    .call()
                    .then(SettleInfo => {
                      console.log(SettleInfo)
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
                    })
                } catch (error) {
                  console.log(error)
                }
              }
              const newobj = {}
              const newArr = []

              FixListPush.forEach(items => {
                if (
                  !newobj[items.collateral + items.underlying + items.short]
                ) {
                  newobj[items.collateral + items.underlying + items.short] = 1
                  newArr.push(items)
                }
              })
              const FixList = newArr.filter(
                newItem =>
                  Number(newItem.col) + Number(newItem.claimBalance) > 0 ||
                  Number(newItem.und) > 0
              )
              setSettleList(FixList)
              setLoading(false)
            })
          }
        })
      } else {
        setLoading(false)
      }
    })
  }
  // 撤销订单
  const handleClickClaimOrder = data => {
    const OrderContracts = getContract(library, FactoryABI, FactoryAddress)
    if (Number(data.claimBalance) !== 0) {
      OrderContracts.methods
        .burn(data.short, toWei(data.claimBalance, data.collateral_decimals))
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
    if (!account) {
      return
    }
    getPolicyList()
  }, [account])
  return (
    <div className="insurance_mysettle">
      <h2 className="insurance_mysettle_title">
        <FormattedMessage id="mysettle_text1" />
      </h2>
      <Skeleton active loading={loading}>
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
                    <span>
                      <FormattedMessage id="mysettle_text2" />
                    </span>
                    <span>
                      {item.type === 'Call'
                        ? Number(item.col) + Number(item.claimBalance)
                        : item.und}
                    </span>
                    <span>
                      {item.type === 'Call'
                        ? item.collateral_symbol
                        : item.underlying_symbol}
                    </span>
                  </div>
                </section>
                <section className="mysettle_section_pc">
                  <div>
                    <span>
                      <FormattedMessage id="mysettle_text3" />
                    </span>
                    <span>
                      {item.type === 'Call'
                        ? item.und
                        : Number(item.col) + Number(item.claimBalance)}
                    </span>
                    <span>
                      {item.type === 'Call'
                        ? item.underlying_symbol
                        : item.collateral_symbol}
                    </span>
                  </div>
                </section>
                <section className="mysettle_section_h5">
                  <div>
                    <span className="mysettle_price_title">
                      <FormattedMessage id="mysettle_text2" />
                    </span>
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
                    <span className="mysettle_price_title">
                      <FormattedMessage id="mysettle_text3" />
                    </span>
                    <p>
                      <span>
                        {item.type === 'Call'
                          ? item.und
                          : Number(item.col) + Number(item.claimBalance)}
                      </span>
                      <span>
                        {item.type === 'Call' ? item.callToken : item.putToken}
                      </span>
                    </p>
                  </div>
                </section>
                <section>
                  <button onClick={() => handleClickClaimOrder(item)}>
                    <FormattedMessage id="mysettle_text4" />
                  </button>
                </section>
              </div>
            ))}
            <Pagination
              className="paginaction"
              current={Page}
              pageSize={PageSize}
              total={SettleList.length}
              onChange={value => onChangePage(value)}
            />
          </div>
        ) : (
          <img src={NoData} alt="" className="nodata" />
        )}
      </Skeleton>
      <WaitingConfirmationDialog visible={OpenWaiting} onClose={onWaitClose} />
      <SuccessfulPurchaseDialog
        visible={OpenSuccess}
        onClose={onSuccessClose}
      />
    </div>
  )
}
export default MySettle
