import React from 'react'
import './index.less'
import {connect} from 'react-redux'
import MiningBanner from '../../components/mining/banner'
import MiningCard from '../../components/mining/card'
import Header from '../../components/header'
import Footer from '../../components/footer'

const Mining = (props) => {
  return (
    <div>
      <Header {...props}/>
      <div className="page_box">
        <div className="mining_index">
          <MiningBanner/>
          <div className="mining_index_content">
            {
              [0, 1, 2].map((item, index) => <MiningCard key={index}/>)
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default connect(
  state => state.index
)(Mining)
