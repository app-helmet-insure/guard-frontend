import React, { useState, useEffect, useMemo } from 'react'
import './index.less'
import { getInsuranceList } from './data'
import { getCurrentInsurance } from '../../../configs/insurance'
import { useActiveWeb3React, getContract } from '../../../web3'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'

const Market = props => {
  const [InsuranceType, setInsuranceType] = useState('CALL')
  const [InsuranceSymbol, setInsuranceSymbol] = useState('GUARD')
  const [PolicyList, setPolicyList] = useState([])
  const CurrentInsurance = getCurrentInsurance(InsuranceType, InsuranceSymbol)
  const handleClickBuyInurance = () => {}
  const { library, active, account } = useActiveWeb3React()
  const getPolicyList = () => {
    const {
      insurance,
      collateral_symbol,
      collateral_address,
      collateral_decimals,
      underlying_symbol,
      underlying_address,
      underlying_decimals,
      settleToken_symbol,
      strikeprice_decimals,
    } = CurrentInsurance
    const OrderContracts = getContract(library, OrderABI, OrderAddress)

    getInsuranceList().then(res => {
      if (res && res.data.data.options) {
        const ReturnList = res.data.data.options
        const FixListPush = []
        ReturnList.filter(
          item =>
            CurrentInsurance &&
            item.collateral.toLocaleLowerCase() ===
              collateral_address.toLocaleLowerCase() &&
            item.underlying.toLocaleLowerCase() ===
              underlying_address.toLocaleLowerCase()
        )
        ReturnList.forEach(item => {
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
              show_ID:
                itemAsk.seller.substr(0, 2) +
                itemAsk.seller.substr(2, 3) +
                '...' +
                itemAsk.seller.substr(-4).toUpperCase(),
              settleToken_symbol,
              show_price: fromWei(itemAsk.price, strikeprice_decimals),
              price: itemAsk.price,
              volume: itemAsk.volume,
            }
            OrderContracts.methods
              .asks(itemAsk.askID)
              .call()
              .then(AsksInfo => {
                ResultItemAsk.show_volume = fromWei(
                  AsksInfo.remain,
                  collateral_decimals
                )
              })

            const AllItem = Object.assign(ResultItemAsk, ResultItem)
            FixListPush.push(AllItem)
          })
        })
        const FixList = FixListPush
        setPolicyList(FixListPush)
      }
    })
  }
  useEffect(() => {
    if (PolicyList.length === 0) {
      getPolicyList()
    }
  })
  return (
    <div className="insurance_market">
      <div className="insurance_type">
        <button
          onClick={() => setInsuranceType('CALL')}
          className={InsuranceType === 'CALL' ? 'insurance_active_call' : ''}
        >
          Cover Miss Out
        </button>
        <button
          onClick={() => setInsuranceType('PUT')}
          className={InsuranceType === 'PUT' ? 'insurance_active_put' : ''}
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
       
            <tr className="insurance_market_table_item" key={'web' + item.ID}>
              <td>{item.show_ID}</td>
              <td>{item.show_price}</td>
              <td>{item.show_volume}</td>
              <td>
                <input
                  type="text"
                  value={item.BUYVOLUME}
                  onChange={e => {
                    item.BUYVOLUME = e.target.value
                  }}
                />
                <button onClick={handleClickBuyInurance()}>购买</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="insurance_market_table h5_table">
        {PolicyList.map(item => (
          <div className="insurance_market_table_item" key={'h5' + item.ID}>
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
                value={item.BUYVOLUME}
                onChange={e => {
                  item.BUYVOLUME = e.target.value
                }}
              />
              <button onClick={handleClickBuyInurance()}>购买</button>
            </section>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Market
