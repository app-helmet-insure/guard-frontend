import React, { Component } from 'react'
import './index.less'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Mypolicy from '@/components/insurance/mypolicy'

const MyPolicyH5 = props => (
  <div className="mypolicy_h5">
    <Header {...props} />
    <Mypolicy />
    <Footer />
  </div>
)

export default MyPolicyH5
