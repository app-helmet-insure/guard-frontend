import React, { useState, useEffect, useContext } from 'react'
import { VarContext } from '../../../context'

import './index.less'
const Supply = props => {
  const [InsuranceType, setInsuranceType] = useState('CALL')
  const [InsuranceDPR, setInsuranceDPR] = useState('')
  const [InsuranceVolume, setInsuranceVolume] = useState('')
  const { balance } = useContext(VarContext)
  useEffect(() => {
    if (InsuranceDPR || InsuranceVolume) {
      console.log(Number(InsuranceDPR) + 1000, InsuranceVolume)
    }
  })
  const handleClickSupplyInsurance = () => {
    console.log(InsuranceDPR, InsuranceVolume)
  }
  return (
    <div className="insurance_supply">
      <div className="insurance_type">
        <button
          onClick={() => setInsuranceType('CALL')}
          className={
            InsuranceType === 'CALL' ? 'insurance_active_call' : ''
          }>
          Cover Miss Out
        </button>
        <button
          onClick={() => setInsuranceType('PUT')}
          className={
            InsuranceType === 'PUT' ? 'insurance_active_put' : ''
          }>
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
            value={InsuranceDPR}
            onChange={e => {
              setInsuranceDPR(e.target.value)
            }}
          />
          <span className="name">DPR</span>
          <span className="number">0.07%</span>
        </div>
        <p className="left">预期最大收益: {balance} GURAD</p>
        <div className="volume">
          <input
            type="text"
            value={InsuranceVolume}
            onChange={e => {
              setInsuranceVolume(e.target.value)
            }}
          />
          <span>GURAD</span>
        </div>
        <p className="left">可用余额: 0 GURAD</p>
        <button
          className="confirm"
          onClick={handleClickSupplyInsurance()}>
          立即创建翻倍险
        </button>
      </div>
    </div>
  )
}
export default Supply
