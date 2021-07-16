import React from 'react'
import './index.less'
import MiningBanner from '../../components/mining/banner'
import MiningCard from '../../components/mining/card'
import Header from '@/components/header'
import Footer from '@/components/footer'
import mining from '../../configs/mining'

const Mining = (props) => {
  return (
    <div>
      <Header {...props}/>
      <div className="page_box">
        <div className="mining_index">
          <MiningBanner/>
          <div className="mining_index_content">
            {mining.map((item, index) => (
              <MiningCard pools={item} key={index}/>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Mining
