import React, { Component } from 'react'
import './index.less'
import Banner from '@/components/insurance/banner'
import ShowData from '@/components/insurance/showdata'
import Operation from '@/components/insurance/operation'
import PolicyTab from '@/components/insurance/policytab'
import Supply from '@/components/insurance/supply'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { InsuranceTypeList } from '../../configs/insurance'
const Insurance = props => (
  <div>
    <Header {...props} />
    <div className="page_box">
      <div className="insurance_container">
        <Banner />
        <ShowData />
        {InsuranceTypeList.map(insurance => (
          <Operation
            InsuranceSymbol={insurance.InsuranceSymbol}
            PairUSDC={insurance.PairUSDC}
            Logo={insurance.Logo}
            Expiry={insurance.Expiry}
            ShowName={insurance.ShowName}
            key={insurance.InsuranceSymbol}
          />
        ))}
        <PolicyTab />
      </div>
    </div>
    <Footer />
  </div>
)

export default Insurance
