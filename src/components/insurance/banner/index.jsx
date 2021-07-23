import React, { useState } from 'react'
import BannerImg from '@/assets/images/insurance/banner.png'
import './index.less'
const Banner = props => (
  <div className="insurance_banner">
    <div className="insurance_banner_wrap">
      <img src={BannerImg} alt="" />
    </div>
  </div>
)

export default Banner
