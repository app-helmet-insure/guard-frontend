import React, { useState } from 'react'
import BannerImg from '@/assets/images/insurance/banner.png'
import './index.less'
const Banner = props => (
  <div className="insurance_banner">
    <div className="insurance_banner_wrap">
      <img src={BannerImg} alt="" />
      <div>
        <h3>
          🎅Merry Christmas! HELMET airdrop million insurance
          policy
        </h3>
        <p>
          Hold a policy before you "Yeild Farming" at AMMs，you
          will claim rewards with frictionless.
        </p>
      </div>
    </div>
  </div>
)

export default Banner
