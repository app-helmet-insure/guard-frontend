import React, { useState } from 'react'
import './index.less'
import { getInsuranceList } from './data'
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
  const handleClickBuyInurance = () => {
  }
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
              <td>{item.ID}</td>
              <td>{item.PREMIUM}</td>
              <td>{item.VOLUME}</td>
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
              <span>{item.ID}</span>
            </p>
            <div>
              <p>
                <span>保费(MATIC)</span>
                <span>{item.PREMIUM}</span>
              </p>
              <p>
                <span>保单数量</span>
                <span>{item.VOLUME}</span>
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
