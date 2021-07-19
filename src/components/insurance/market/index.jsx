import React, { useState } from 'react'

import './index.less'
export const PolicyList = [
  {
    ID: 1,
    PREMIUM: 154.5454,
    VOLUME: 100.0,
    BUYVOLUME: '',
  },
  {
    ID: 2,
    PREMIUM: 154.5454,
    VOLUME: 100.0,
    BUYVOLUME: '',
  },
  {
    ID: 3,
    PREMIUM: 154.5454,
    VOLUME: 100.0,
    BUYVOLUME: '',
  },
  {
    ID: 4,
    PREMIUM: 154.5454,
    VOLUME: 100.0,
    BUYVOLUME: '',
  },
  {
    ID: 5,
    PREMIUM: 154.5454,
    VOLUME: 100.0,
    BUYVOLUME: '',
  },
  {
    ID: 6,
    PREMIUM: 154.5454,
    VOLUME: 100.0,
    BUYVOLUME: '',
  },
]
const Market = props => {
  const [InsuranceType, setInsuranceType] = useState('CALL')
  const handleClickBuyInurance = ()=>{
    console.log(PolicyList)
  }
  return (
    <div className="insurance_market">
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
      <table className="insurance_market_table">
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
            <tr>
              <td>{item.ID}</td>
              <td>{item.PREMIUM}</td>
              <td>{item.VOLUME}</td>
              <td>
                <input type="text" value={item.BUYVOLUME} />
                <button onClick={handleClickBuyInurance()}>购买</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Market
