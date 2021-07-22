import React, { useState } from 'react'
import CallSvg from '../../../assets/images/insurance/call.svg'
import PutSvg from '../../../assets/images/insurance/put.svg'
import './index.less'
export const MySupplyList = [
  {
    ID: 1,
    TYPE: 'Call',
    EXPIRY: '2021/03/25 00:00', // 到期时间
    STRIKEPRICE: '0.8', // 出险价格
    VOLUME: 105.642258,
    STRIKEUNIT: 'MATIC',
    COLLATERAL: 'GUARD',
    PREMIUM: 0.5824951,
    PRICE: 61.536097,
    SETTLETOKEN: 'GUARD',
  },
  {
    ID: 2,
    TYPE: 'Put',
    EXPIRY: '2021/03/25 00:00', // 到期时间
    STRIKEPRICE: '0.8', // 出险价格
    VOLUME: 105.642258,
    STRIKEUNIT: 'MATIC',
    COLLATERAL: 'GUARD',
    PREMIUM: 0.5824951,
    PRICE: 61.536097,
    SETTLETOKEN: 'GUARD',
  },
  {
    ID: 3,
    TYPE: 'Call',
    EXPIRY: '2021/03/25 00:00', // 到期时间
    STRIKEPRICE: '0.8', // 出险价格
    VOLUME: 105.642258,
    STRIKEUNIT: 'MATIC',
    COLLATERAL: 'GUARD',
    PREMIUM: 0.5824951,
    PRICE: 61.536097,
    SETTLETOKEN: 'GUARD',
  },
  {
    ID: 4,
    TYPE: 'Put',
    EXPIRY: '2021/03/25 00:00', // 到期时间
    STRIKEPRICE: '0.8', // 出险价格
    VOLUME: 105.642258,
    STRIKEUNIT: 'MATIC',
    COLLATERAL: 'GUARD',
    PREMIUM: 0.5824951,
    PRICE: 61.536097,
    SETTLETOKEN: 'GUARD',
  },
]
const MySupply = props => (
  <div className="insurance_mysupply">
    <div className="insurance_mysupply_list">
      {MySupplyList.map(item => (
        <div className="insurance_mysupply_item">
          <section>
            <div>
              <img src={item.TYPE === 'Call' ? CallSvg : PutSvg}
                alt=""
              />
              <span className={item.TYPE}>
                {item.COLLATERAL +
                  ' ' +
                  item.TYPE +
                  ' ' +
                  item.STRIKEPRICE +
                  ' ' +
                  item.STRIKEUNIT}
              </span>
            </div>
            <div>
              <span>{item.EXPIRY}</span>
              <span>ID: {item.ID}</span>
            </div>
          </section>
          <section>
            <div>
              <span>出险价</span>
              <span>{item.STRIKEPRICE}</span>
              <span>{item.STRIKEUNIT}</span>
            </div>
            <div>
              <span>持有量</span>
              <span>{item.VOLUME}</span>
              <span>{item.COLLATERAL}</span>
            </div>
          </section>
          <section>
            <div>
              <span>保单单价</span>
              <span>{item.PRICE} </span>
              <span>{item.STRIKEUNIT}</span>
            </div>
            <div>
              <span>保费</span>
              <span>{item.PREMIUM}</span>
              <span>{item.SETTLETOKEN}</span>
            </div>
          </section>
          <section>
            <button>Mining</button>
            <button>出险</button>
          </section>
        </div>
      ))}
    </div>
  </div>
)
export default MySupply
