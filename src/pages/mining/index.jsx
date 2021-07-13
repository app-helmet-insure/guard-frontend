import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { connect } from 'react-redux'
import MiningBanner from '../../components/mining/banner'
import MiningCard from '../../components/mining/card'

const Mining = (props) => {
  return (
    <div className='mining_index'>
      <MiningBanner />
      <div className='mining_index_content'>
        {
          [0, 1, 2].map((item, index) => <MiningCard key={index} />)
        }   
      </div>
    </div>
  )
}

export default connect(
  state => state.index
)(Mining)