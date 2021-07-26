import React, { Component } from 'react'
import './index.less'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Mysettle from '@/components/insurance/mysettle'

const MySettleH5 = props => (
  <div className="mysupply_h5">
    <Header {...props} />
    <Mysettle />
    <Footer />
  </div>
)

export default MySettleH5
