import React, { Component } from 'react'
import './index.less'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Mysupply from '@/components/insurance/mysupply'

const MySupplyH5 = props => (
  <div className="mysupply_h5">
    <Header {...props} />
    <Mysupply />
    <Footer />
  </div>
)

export default MySupplyH5
