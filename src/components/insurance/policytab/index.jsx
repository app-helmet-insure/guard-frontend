import React, { useState } from 'react'
import MyPolicy from '../mypolicy'
import MySettle from '../mysettle'
import MySupply from '../mysupply'
import './index.less'
const PolicyTab = props => {
  const [ActiveTab, setActiveTab] = useState('MYPOLICY')
  return (
    <div className="insurance_tabcheck">
      <div className="insurance_tabcheck_buttons">
        <button
          onClick={() => setActiveTab('MYPOLICY')}
          className={
            ActiveTab === 'MYPOLICY'
              ? 'MYPOLICY my_policy'
              : 'my_policy'
          }>
          <span>我的保单</span>
        </button>
        <button
          onClick={() => setActiveTab('MYSUPPLY')}
          className={
            ActiveTab === 'MYSUPPLY'
              ? 'MYSUPPLY my_supply'
              : 'my_supply'
          }>
          <span>我发布的保险</span>
        </button>
        <button
          onClick={() => setActiveTab('MYSETTLE')}
          className={
            ActiveTab === 'MYSETTLE'
              ? 'MYSETTLE my_settle'
              : 'my_settle'
          }>
          <span>我的结算</span>
        </button>
      </div>
      {ActiveTab === 'MYPOLICY' ? (
        <MyPolicy />
      ) : ActiveTab === 'MYSUPPLY' ? (
        <MySupply />
      ) : (
        <MySettle />
      )}
    </div>
  )
}

export default PolicyTab
