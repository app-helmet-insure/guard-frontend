import React, { useState, useEffect, useContext } from 'react'
import { VarContext } from '../../../context'
import Web3 from 'web3'
import { toWei, fromWei } from 'web3-utils'
import OrderABI from '../../../web3/abi/Order.json'
import { useActiveWeb3React, getContract } from '../../../web3'
import { getCurrentInsurance } from '../../../configs/insurance'
import './index.less'
import { toFixed } from 'accounting'

const NowTime = parseInt(Date.now() / 1000, 10)
const OrderAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D'

const Supply = props => {
  const [InsuranceType, setInsuranceType] = useState('CALL')
  const [InsuranceDPR, setInsuranceDPR] = useState({
    number: 0.0007,
    show: '0.07%',
  })
  const [InsuranceVolume, setInsuranceVolume] = useState('')
  const [InsuranceSymbol, setInsuranceSymbol] = useState('GUARD')
  const [Earning, setEarning] = useState(0)
  const { balance } = useContext(VarContext)
  const { library, active, account } = useActiveWeb3React()
  const CurrentInsurance = getCurrentInsurance(InsuranceType, InsuranceSymbol)
  useEffect(() => {
    const DaysRemain = Math.ceil((CurrentInsurance.expiry - NowTime) / 86400)
    const { strikeprice, lastprice } = CurrentInsurance
    if (InsuranceDPR || InsuranceVolume) {
      if (InsuranceType === 'CALL') {
        // 1. Number =  DPR*花费的GUARD数量*保险剩余天数
        // 2. Premium = Number - Math.min((行权价-执行价),0)
        // 3. Earned = -(Math.max((当前价-执行价),0)-Premium)
        const Number = InsuranceDPR.number * InsuranceVolume * DaysRemain
        const Premium = Number - Math.min(strikeprice - lastprice, 0)
        const Earned = -(Math.max(lastprice - strikeprice, 0) - Premium)
        const Expect = Earned > 0 ? Earned : 0
        setEarning(Expect)
      } else {
        // 1. Number =  DPR*花费的GUARD数量*保险剩余天数
        // 2. Premium = Number - Math.min((当前价-执行价),0)
        // 3. Earned = -(Math.max((执行价-当前价),0)-Premium)
        const Number =
          InsuranceDPR.number * (InsuranceVolume / lastprice) * DaysRemain
        const Premium = Number - Math.min(lastprice - strikeprice, 0)
        const Earned = -(Math.max(strikeprice - lastprice, 0) - Premium)
        const Expect = Earned > 0 ? Earned : 0
        setEarning(Expect)
      }
    }
  })
  const handleClickSupplyInsurance = () => {
    const SellContracts = getContract(library, OrderABI, OrderAddress)
    const _private = false
    const _collateral = CurrentInsurance.collateral_address
    const _underlying = CurrentInsurance.underlying_address
    const _strikePrice = toWei(
      CurrentInsurance.strikeprice + '',
      CurrentInsurance.strikeprice_decimals
    )
    const _expiry = CurrentInsurance.expiry
    const settleToken = CurrentInsurance.settleToken_address
    const price = toWei(0.1 + '', CurrentInsurance.settleToken_decimals)
    if (InsuranceType === 'CALL') {
      SellContracts.methods
        .sell(
          _private,
          _collateral,
          _underlying,
          _strikePrice,
          _expiry,
          toWei(InsuranceVolume),
          settleToken,
          price
        )
        .send({ from: account })
    } else {
      SellContracts.methods
        .sellOnETH(
          _private,
          _underlying,
          _strikePrice,
          _expiry,
          settleToken,
          price
        )
        .send({ from: account, value: toWei(InsuranceVolume) })
    }
  }
  return (
    <div className="insurance_supply">
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
      <div className="insurance_form">
        <p className="between">
          <span>Insurance Price</span>
          <span>Guard: 2.0000 USD</span>
        </p>
        <div className="dpr">
          <input
            type="text"
            readOnly
            onChange={e => {
              setInsuranceDPR(e.target.value)
            }}
          />
          <span className="name">DPR</span>
          <span className="number">{InsuranceDPR.show}</span>
        </div>
        <p className="left">预期最大收益: {Earning.toFixed(4)} GUARD</p>
        <div className="volume">
          <input
            type="text"
            value={InsuranceVolume}
            onChange={e => {
              setInsuranceVolume(e.target.value)
            }}
          />
          <span>{CurrentInsurance.collateral_symbol}</span>
        </div>
        <p className="left">可用余额: {balance} {CurrentInsurance.collateral_symbol}</p>
        <button
          className="confirm"
          onClick={() => handleClickSupplyInsurance()}
        >
          {InsuranceType === 'CALL' ? '立即创建翻倍险' : '立即创建腰斩险'}
        </button>
      </div>
    </div>
  )
}
export default Supply
