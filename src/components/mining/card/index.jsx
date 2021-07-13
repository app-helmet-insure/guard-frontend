import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { connect } from 'react-redux'

const MiningCard = (props) => {
  return (
    <div className='mining_card'>
      <div className='mining_card_title'>
        <img />
        <h2><FormattedMessage id="mining_text3" /></h2>
      </div>
      <div className='mining_card_apy'>
        <p className='mining_card_apy_val'>
          <span><FormattedMessage id="mining_text4" /></span>
          <span className='value'>102.04%</span>
        </p>
        <p className='mining_card_apy_val'>
          <span><FormattedMessage id="mining_text5" /></span>
          <span className='value'><FormattedMessage id="mining_text6" /></span>
        </p>
      </div>
      <div className='mining_card_content'>
        <p className='mining_card_content_val'>
          <span><FormattedMessage id="mining_text7" /></span>
          <span><FormattedMessage id="mining_text8" /></span>
        </p>
        <p className='mining_card_content_val'>
          <span><FormattedMessage id="mining_text9" /></span>
          <span>999,999.123456</span>
        </p>
        <p className='mining_card_content_val'>
          <span><FormattedMessage id="mining_text10" /></span>
          <span>9,999.123456(10.11%)</span>
        </p>
        <p className='mining_card_content_val'>
          <span><FormattedMessage id="mining_text11" /></span>
          <span>9,999.123456(10.11%)</span>
        </p>
      </div>
      <a className='mining_card_btn'><FormattedMessage id="mining_text12" /></a>
      <div className='mining_card_content' style={{padding: '6px 12px'}}>
        <p className='mining_card_content_val'>
          <span><FormattedMessage id="mining_text13" />99.123456</span>
          <a className='mining_card_claim_btn'><FormattedMessage id="mining_text14" /></a>
        </p>
      </div>
    </div>
  )
}

export default connect(
  state => state.index
)(MiningCard)