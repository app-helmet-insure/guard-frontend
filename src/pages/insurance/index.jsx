import React from 'react'
import './index.less'
import Banner from '@/components/insurance/banner'
import ShowData from '@/components/insurance/showdata'
import Operation from '@/components/insurance/operation'
import Header from '@/components/header'
import Footer from '@/components/footer'

const Insurance = (props) => {
  return (
    <div>
      <Header {...props}/>
      <div className="page_box">
        <div className="insurance_container">
          <Banner/>
          <ShowData/>
          <Operation/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Insurance
