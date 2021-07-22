import React, { useState, useEffect } from 'react'
import CallSvg from '../../../assets/images/insurance/call.svg'
import PutSvg from '../../../assets/images/insurance/put.svg'
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
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'
const FactoryAddress = '0x021297e233550eDBa8e6487EB7c6696cFBB63b88'
import './index.less'

const MySettle = props => {
  const [SettleList, setSettleList] = useState([])
  const { library, active, account } = useActiveWeb3React()

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
              const balance = fromWei(long)
              return balance
            })
          const shortBalance = await getContract(library, PoolABI, item.short)
            .methods.balanceOf(account)
            .call()
            .then(short => {
              const balance = fromWei(short)
              return balance
            })
          if (Number(longBalance) > 0 && Number(shortBalance) > 0) {
            FixListPush.push({
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
                col: toWei(SettleInfo.col),
                fee: toWei(SettleInfo.fee),
                und: toWei(SettleInfo.und),
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
          const FixList = newArr
          console.log(FixList)
          setSettleList(FixList)
        })
      }
    })
  }
  // 撤销订单
  const handleClickClaimOrder = data => {
    console.log(data)
    const OrderContracts = getContract(library, FactoryABI, FactoryAddress)
    if (Number(data.claimBalance) !== 0) {
      OrderContracts.methods
        .burn(data.short, toWei(data.claimBalance))
        .send({ from: account })
    } else {
      OrderContracts.methods.settle(data.short).send({ from: account })
    }
  }
  useEffect(() => {
    getPolicyList()
  }, [])
  return (
    <div className="insurance_mysettle">
      <div className="insurance_mysettle_list">
        {SettleList.map((item, index) => {
          // eslint-disable-next-line no-lone-blocks
          {
            if (
              Number(item.col) + Number(item.claimBalance) > 0 &&
              Number(item.und) > 0
            ) {
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
                <section>
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
                <section>
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
                <section>
                  <button onClick={() => handleClickClaimOrder(item)}>
                    取回
                  </button>
                </section>
              </div>
            }
          }
        })}
      </div>
    </div>
  )
}
export default MySettle
