import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { connect } from 'react-redux'

const MiningBanner = (props) => {
  return (
    <div className='mining_banner'>
      <div className='mining_banner_box'>
        <h2 className='mining_banner_title'>
          <FormattedMessage id="mining_text1" />
        </h2>
        <p className='mining_banner_content'>
          <FormattedMessage id="mining_text2" />
        </p>
      </div>
    </div>
  )
}

export default connect(
  state => state.index
)(MiningBanner)