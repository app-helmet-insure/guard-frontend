import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import CallSvg from '../../../assets/images/insurance/call.svg'
import PutSvg from '../../../assets/images/insurance/put.svg'
import NoData from '../../../assets/images/insurance/nodata.svg'
import {
  getCurrentInsurance,
  getInsuranceList,
} from '../../../configs/insurance'
import {ChainId, getTokenName} from '../../../web3/address'
import { useActiveWeb3React, getContract } from '../../../web3'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
import PoolABI from '../../../web3/abi/StakingPool.json'
import FactoryABI from '../../../web3/abi/Factory.json'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
import { Tooltip } from 'antd'
import {multicallClient, ClientContract} from '../../../web3/multicall'
import Loading from '../../loading'
import { Pagination } from 'antd'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const FactoryAddress = '0x021297e233550eDBa8e6487EB7c6696cFBB63b88'
import './index.less'
import { Skeleton } from 'antd'
import {getGasPrice} from '../../../utils'

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
    getInsuranceList().then(res => {
      if (res && res.data.data.options) {
        const ReturnList = res.data.data.options
        const FixListPush = []
        ReturnList.forEach(item => {
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
            const longContracts = new ClientContract( PoolABI, item.long, ChainId.MATIC)
            const shortContracts = new ClientContract( PoolABI, item.short, ChainId.MATIC)
            PromiseList.push(
              longContracts.balanceOf(account),
              shortContracts.balanceOf(account)
            )
            multicallClient(PromiseList).then(data => {
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
                getContract(library, FactoryABI, FactoryAddress)
                  // .methods.settleable(account, item.short)
                  .methods.settleable(
                    item.short,
                    toWei(ShortMinusLong, CurrentInsurance.collateral_decimals)
                  )
                  .call()
                  .then(SettleInfo => {
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
                    const newobj = {}
                    const newArr = []
                    FixListPush.forEach(items => {
                      if (
                        !newobj[
                          items.collateral + items.underlying + items.short
                        ]
                      ) {
                        newobj[
                          items.collateral + items.underlying + items.short
                        ] = 1
                        newArr.push(items)
                      }
                    })
                    const FixList = newArr.filter(
                      newItem =>
                        Number(newItem.col) + Number(newItem.claimBalance) >
                          0 || Number(newItem.und) > 0
                    )
                    setSettleList(FixList)
                    setLoading(false)
                  })
              } else {
                const newobj = {}
                const newArr = []
                FixListPush.forEach(items => {
                  if (
                    !newobj[items.collateral + items.underlying + items.short]
                  ) {
                    newobj[
                      items.collateral + items.underlying + items.short
                    ] = 1
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
              }
            })
          }
        })
      } else {
        setLoading(false)
      }
    })
  }
  // 结算订单
  const handleClickClaimOrder = async data => {
    const OrderContracts = getContract(library, FactoryABI, FactoryAddress)
    const gasPrice = await getGasPrice()
    if (Number(data.claimBalance) !== 0) {
      OrderContracts.methods
        .burn(data.short, toWei(data.claimBalance, data.collateral_decimals))
        .send({ from: account, gasPrice })
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
      OrderContracts.methods.settle(data.short).send({ from: account, gasPrice })
    }
  }
  useEffect(() => {
    if (!account) {
      return
    }
    getPolicyList()
  }, [account])
  const ToolTipText = <FormattedMessage id={'insurance_tips4'} />
  return (
    <div className="insurance_mysettle">
      <h2 className="insurance_mysettle_title">
        <FormattedMessage id="mysettle_text1" />
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          {SettleList && SettleList.length > 0 ? (
            <div className="insurance_mysettle_list">
              {SettleList.map((item, index) => (
                <div className="insurance_mysettle_item" key={index}>
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
                  </section>
                  <section className="mysettle_section_pc">
                    <div>
                      <span>
                        <FormattedMessage id="mysettle_text2" />
                      </span>
                      <span>
                        {item.type === 'Call'
                          ? (
                            Number(item.col) + Number(item.claimBalance)
                          ).toFixed(8)
                          : Number(item.und).toFixed(8)}
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
                          ? Number(item.und).toFixed(8)
                          : (
                            Number(item.col) + Number(item.claimBalance)
                          ).toFixed(8)}
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
                          {item.type === 'Call'
                            ? item.callToken
                            : item.putToken}
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
                          {item.type === 'Call'
                            ? item.callToken
                            : item.putToken}
                        </span>
                      </p>
                    </div>
                  </section>
                  <section>
                    <button onClick={() => handleClickClaimOrder(item)}>
                      <FormattedMessage id="mysettle_text4" />
                      <Tooltip placement="top" title={ToolTipText}>
                        <svg
                          t="1628664522470"
                          className="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="3921"
                          width="200"
                          height="200"
                          fill="#fff"
                        >
                          <path
                            d="M512 43.885714c258.121143 0 468.114286 209.993143 468.114286 468.114286 0 258.121143-209.993143 468.114286-468.114286 468.114286A468.626286 468.626286 0 0 1 43.885714 512C43.885714 253.878857 253.878857 43.885714 512 43.885714z m0 643.657143a58.514286 58.514286 0 1 0-0.073143 116.955429A58.514286 58.514286 0 0 0 512 687.542857zM512 219.428571c-96.768 0-175.542857 71.460571-175.542857 159.305143 0 25.161143 22.454857 45.494857 50.176 45.494857 27.721143 0 50.102857-20.333714 50.102857-45.494857 0-37.668571 33.792-68.315429 75.264-68.315428s75.264 30.72 75.264 68.315428c0 34.962286-29.110857 63.853714-66.56 67.803429L512 446.902857c-27.794286 0-50.176 20.333714-50.176 45.494857v91.062857c0 25.161143 22.454857 45.494857 50.176 45.494858 27.794286 0 50.176-20.333714 50.176-45.494858v-52.955428C634.368 510.829714 687.542857 450.633143 687.542857 378.733714 687.542857 290.889143 608.768 219.428571 512 219.428571z"
                            p-id="3922"
                          ></path>
                        </svg>
                      </Tooltip>
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
export default MySettle
