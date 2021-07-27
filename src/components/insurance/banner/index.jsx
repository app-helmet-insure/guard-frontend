import React, { useState } from 'react'
import './index.less'
import { Carousel } from 'antd'
const Banner = props => {
  return (
    <Carousel autoplay>
      <div className='insurance_banner'>
        <div className='insurance_banner_wrap insurance_banner_wrap_2'></div>
      </div>
      <div className='insurance_banner'>
        <div className='insurance_banner_wrap insurance_banner_wrap_1'></div>
      </div>
    </Carousel>
  )
}

export default Banner
