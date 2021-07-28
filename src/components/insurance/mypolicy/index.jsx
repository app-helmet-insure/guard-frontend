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
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
import Erc20ABI from '../../../web3/abi/ERC20.json'
import WaitingConfirmationDialog from '../../dialogs/waiting-confirmation-dialog'
import SuccessfulPurchaseDialog from '../../dialogs/successful-purchase-dialog'
import moment from 'moment'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const FactoryAddress = '0x021297e233550eDBa8e6487EB7c6696cFBB63b88'
import './index.less'
import BigNumber from 'bignumber.js'
import {Skeleton} from 'antd'

const MyPolicy = props => {
  const [PolicyList, setPolicyList] = useState([])
  const [loading, setLoading] = useState(true)
  const { library, active, account } = useActiveWeb3React()
  const [OpenWaiting, setOpenWaiting] = useState(false)
  const [OpenSuccess, setOpenSuccess] = useState(false)
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
                premium: new BigNumber(
                  (
                    fromWei(itemAsk.price, settleToken_decimals) *
                    fromWei(itemAsk.volume, collateral_decimals)
                  ).toFixed(8)
                ).toString(),
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
        if (FilterList.length === 0 || AskAssign.length === 0 || BidAssign.length === 0) {
          setLoading(false)
        }
        BidAssign.forEach((itemBids, index) => {
          getBindItem(itemBids.bidID).then(data => {
            itemBids.remain = data.remain
            FixListPush.push(itemBids)
            if (index === BidAssign.length - 1) {
              const list = FixListPush.filter(
                filter => Number(filter.remain) !== 0
              )
              setPolicyList(list)
              setLoading(false)
            }
          })
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
    console.log(LongApproveStatus, UnderlyingApproveStatus)
    console.log(
      !LongApproveStatus && !UnderlyingApproveStatus,
      !LongApproveStatus && UnderlyingApproveStatus,
      LongApproveStatus && !UnderlyingApproveStatus,
      LongApproveStatus && UnderlyingApproveStatus
    )
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
  const actionWithDraw = data => {
    setOpenSuccess(false)
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
        getPolicyList()
      })
      .on('error', ereor => {
        setOpenWaiting(false)
      })
  }
  const actionApproveUnderlying = data => {
    setOpenSuccess(false)
    const Erc20Contracts = getContract(library, Erc20ABI.abi, data.underlying)
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
        actionWithDraw(data)
      })
      .on('error', ereor => {
        setOpenWaiting(false)
      })
  }
  const actionApproveLong = (data, approveFlag) => {
    const Erc20Contracts = getContract(library, Erc20ABI.abi, data.long)
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
        console.log(res)
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
  return (
    <div className="insurance_mypolicy">
      <h2 className="insurance_mypolicy_title">
        <FormattedMessage id="mypolicy_text1" />
      </h2>
      <Skeleton active loading={loading}>
        {PolicyList && PolicyList.length > 0 ? (
          <div className="insurance_mypolicy_list">
            {PolicyList.map((item, index) => (
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
                  </button>
                </section>
              </div>
            ))}
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
export default MyPolicy
