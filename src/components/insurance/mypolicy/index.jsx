import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import CallSvg from '../../../assets/images/insurance/call.svg'
import PutSvg from '../../../assets/images/insurance/put.svg'
import NoData from '../../../assets/images/insurance/nodata.svg'
import {
  getCurrentInsurance,
  getInsuranceList,
} from '../../../configs/insurance'
import { useActiveWeb3React, getContract } from '../../../web3'
import { Tooltip } from 'antd'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
import Erc20ABI from '../../../web3/abi/ERC20.json'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
import InfoSvg from '../../../assets/images/insurance/info.svg'
import { Pagination } from 'antd'
import moment from 'moment'
import Loading from '../../loading'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const FactoryAddress = '0x021297e233550eDBa8e6487EB7c6696cFBB63b88'
import './index.less'
import BigNumber from 'bignumber.js'
import { Skeleton } from 'antd'
import {getGasPrice} from '../../../utils'

const MyPolicy = props => {
  const [PolicyList, setPolicyList] = useState([])
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
  const getBindItem = async bidID => {
    const BidContracts = getContract(library, OrderABI, OrderAddress)
    return await BidContracts.methods.bids(bidID).call()
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
        const AskAssign = []
        const BidAssign = []
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
                binds: itemAsk.binds,
                askID: itemAsk.askID,
                isCancel: itemAsk.isCancel,
                show_ID:
                  itemAsk.seller.substr(0, 2) +
                  itemAsk.seller.substr(2, 3) +
                  '...' +
                  itemAsk.seller.substr(-4).toUpperCase(),
                settleToken_symbol,
                volume: itemAsk.volume,
                show_price: fromWei(itemAsk.price, settleToken_decimals),
                price: itemAsk.price,
              }
              const AllItem = Object.assign(ResultItemAsk, ResultItem)
              AskAssign.push(AllItem)
            })
          }
        })
        AskAssign.forEach(itemAsks => {
          const CurrentInsurance = getCurrentInsurance({
            CollateralAddress: itemAsks.collateral,
            UnderlyingAddress: itemAsks.underlying,
          })
          const {
            strikeprice_decimals,
            collateral_decimals,
          } = CurrentInsurance
          if (itemAsks.binds.length) {
            itemAsks.binds.forEach(itemBid => {
              if (
                account &&
                itemBid.buyer.toUpperCase() === account.toUpperCase()
              ) {
                const ResultItemBid = {
                  bidID: itemBid.bidID,
                  volume: itemAsks.volume,
                  show_volume: fromWei(itemBid.volume, collateral_decimals),
                  premium: new BigNumber(
                    (
                      itemAsks.show_price *
                      fromWei(itemBid.volume, collateral_decimals)
                    ).toFixed(8)
                  ).toString(),
                }
                const ReturnItem = Object.assign(ResultItemBid, itemAsks)
                if (ReturnItem.type === 'Put') {
                  ReturnItem.show_volume = Number(
                    ReturnItem.show_volume /
                      (1 / fromWei(itemAsks.strikePrice, strikeprice_decimals))
                  ).toFixed(8)
                } else {
                  ReturnItem.show_volume = Number(
                    ReturnItem.show_volume
                  ).toFixed(8)
                }

                BidAssign.push(ReturnItem)
              }
            })
          }
        })
        if (
          FilterList.length === 0 ||
          AskAssign.length === 0 ||
          BidAssign.length === 0
        ) {
          setLoading(false)
        }
        Promise.all(
          BidAssign.map(itemBids => getBindItem(itemBids.bidID))
        ).then(BidAssignList => {
          let returnList = BidAssign.map((list, index) => {
            list.remain = BidAssignList[index].remain
            return list
          })
          returnList = returnList.filter(filter => filter.remain !== '0')
          setPolicyList(returnList)
          setLoading(false)
        })
      }
    })
  }

  // 判断是否授权
  const handleClickWithDraw = async data => {
    // eslint-disable-next-line no-use-before-define
    const LongApproveStatus = await getLongApporve(data)
    // eslint-disable-next-line no-use-before-define
    const UnderlyingApproveStatus = await getUnderlyingApprove(data)
    if (!LongApproveStatus && !UnderlyingApproveStatus) {
      // eslint-disable-next-line no-use-before-define
      actionApproveLong(data)
      return
    }
    if (!LongApproveStatus && UnderlyingApproveStatus) {
      // eslint-disable-next-line no-use-before-define
      actionApproveLong(data, true)
      return
    }
    if (!UnderlyingApproveStatus && LongApproveStatus) {
      // eslint-disable-next-line no-use-before-define
      actionApproveUnderlying(data)
      return
    }
    if (LongApproveStatus && UnderlyingApproveStatus) {
      // eslint-disable-next-line no-use-before-define
      actionWithDraw(data)
      return
    }
  }
  const actionWithDraw = async data => {
    setOpenSuccess(false)
    const gasPrice = await getGasPrice()
    const OrderContracts = getContract(library, OrderABI, OrderAddress)
    OrderContracts.methods
      .exercise(data.bidID)
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
  }
  const actionApproveUnderlying = async data => {
    setOpenSuccess(false)
    const Erc20Contracts = getContract(library, Erc20ABI.abi, data.underlying)
    const gasPrice = await getGasPrice()
    const Infinitys =
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    Erc20Contracts.methods
      .approve(OrderAddress, Infinitys)
      .send({ from: account, gasPrice })
      .on('transactionHash', hash => {
        setOpenWaiting(true)
      })
      .on('receipt', (_, receipt) => {
        setOpenWaiting(false)
        setOpenSuccess(true)
        actionWithDraw(data)
      })
      .on('error', ereor => {
        setOpenWaiting(false)
      })
  }
  const actionApproveLong = async (data, approveFlag) => {
    const Erc20Contracts = getContract(library, Erc20ABI.abi, data.long)
    const gasPrice = await getGasPrice()
    const Infinitys =
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    Erc20Contracts.methods
      .approve(OrderAddress, Infinitys)
      .send({ from: account, gasPrice })
      .on('transactionHash', hash => {
        setOpenWaiting(true)
      })
      .on('receipt', (_, receipt) => {
        setOpenWaiting(false)
        setOpenSuccess(true)
        if (approveFlag) {
          actionWithDraw(data)
        } else {
          actionApproveUnderlying(data)
        }
      })
      .on('error', ereor => {
        setOpenWaiting(false)
      })
  }
  const getLongApporve = data => {
    const Erc20ContractsLong = getContract(library, Erc20ABI.abi, data.long)
    return Erc20ContractsLong.methods
      .allowance(account, OrderAddress)
      .call()
      .then(res => {
        if (Number(res) > 0) {
          return true
        }
        return false
      })
  }
  const getUnderlyingApprove = data => {
    const Erc20ContractsUnderlying = getContract(
      library,
      Erc20ABI.abi,
      data.underlying
    )
    return Erc20ContractsUnderlying.methods
      .allowance(account, OrderAddress)
      .call()
      .then(res => {
        if (Number(res) > 0) {
          return true
        }
        return false
      })
  }

  useEffect(() => {
    if (!account) {
      return
    }
    getPolicyList()
  }, [account])
  const ToolTipText = <FormattedMessage id={'insurance_tips3'} />
  return (
    <div className="insurance_mypolicy">
      <h2 className="insurance_mypolicy_title">
        <FormattedMessage id="mypolicy_text1" />
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          {PolicyList && PolicyList.length > 0 ? (
            <div className="insurance_mypolicy_list">
              {PolicyList.slice(MinNumber, MaxNumber).map((item, index) => (
                <div className="insurance_mypolicy_item" key={item.bidID}>
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
                      <span>ID: {item.bidID}</span>
                    </div>
                  </section>
                  <section className="section_pc">
                    <div>
                      <span>
                        <FormattedMessage id="mypolicy_text2" />
                      </span>
                      <span>{item.show_strikePrice}</span>
                      <span>{item.putToken}</span>
                    </div>
                    <div>
                      <span>
                        <FormattedMessage id="mypolicy_text3" />
                      </span>
                      <span>{item.show_volume}</span>
                      <span>{item.callToken}</span>
                    </div>
                  </section>
                  <section className="section_pc">
                    <div>
                      <span>
                        <FormattedMessage id="mypolicy_text4" />
                      </span>
                      <span>{Number(item.show_price).toFixed(8)}</span>
                      <span>{item.settleToken_symbol}</span>
                    </div>
                    <div>
                      <span>
                        <FormattedMessage id="mypolicy_text5" />
                      </span>
                      <span>{item.premium}</span>
                      <span>{item.settleToken_symbol}</span>
                    </div>
                  </section>
                  <section className="section_h5">
                    <div>
                      <span className="mypolicy_price_title">
                        <FormattedMessage id="mypolicy_text2" />
                      </span>
                      <p>
                        <span>{item.show_strikePrice}</span>
                        <span>{item.putToken}</span>
                      </p>
                    </div>
                    <div>
                      <span className="mypolicy_price_title">
                        <FormattedMessage id="mypolicy_text4" />
                      </span>
                      <p>
                        <span>{Number(item.show_price).toFixed(8)}</span>
                        <span>{item.settleToken_symbol}</span>
                      </p>
                    </div>
                  </section>
                  <section className="section_h5">
                    <div>
                      <span className="mypolicy_price_title">
                        <FormattedMessage id="mypolicy_text3" />
                      </span>
                      <p>
                        <span>{item.show_volume}</span>
                        <span>{item.callToken}</span>
                      </p>
                    </div>
                    <div>
                      <span className="mypolicy_price_title">
                        <FormattedMessage id="mypolicy_text5" />
                      </span>
                      <p>
                        <span>{item.premium}</span>
                        <span>{item.settleToken_symbol}</span>
                      </p>
                    </div>
                  </section>
                  <section>
                    <button onClick={() => handleClickWithDraw(item)}>
                      <FormattedMessage id="mypolicy_text6" />
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
                total={PolicyList.length}
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
export default MyPolicy
