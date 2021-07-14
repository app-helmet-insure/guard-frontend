import React from 'react'
import './index.less'
import Banner from '@/components/insurance/banner'
import ShowData from '@/components/insurance/shwodata'
import Header from '@/components/header'
import Footer from '@/components/footer'

function Insurance (props) {
  console.log(props)
  return (
    <div>
      <Header {...props}/>
      <div className="page_box">
        <div className="insurance_container">
          <Banner/>
          <ShowData/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Insurance
