import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import DataIcon1 from '@/assets/images/insurance/data_icon_1.svg'
import DataIcon2 from '@/assets/images/insurance/data_icon_2.svg'
import DataIcon3 from '@/assets/images/insurance/data_icon_3.svg'
import DataIcon4 from '@/assets/images/insurance/data_icon_4.svg'
import './index.less'

const ShowData = props => (
  <div className="insurance_data_wrap">
    <div className="insurance_data">
      <div className="insurance_data_icon1 data_item">
        <img src={DataIcon1} alt="" />
        <p>
          <span>
            <FormattedMessage id="insurance_text1" />
          </span>
          <span>3221</span>
        </p>
      </div>
      <div className="insurance_data_icon2 data_item">
        <img src={DataIcon2} alt="" />
        <p>
          <span>
            <FormattedMessage id="insurance_text2" />
          </span>
          <span>10000.000000</span>
        </p>
      </div>
      <div className="insurance_data_icon3 data_item">
        <img src={DataIcon3} alt="" />
        <p>
          <span>
            <FormattedMessage id="insurance_text3" />
          </span>
          <span>10000.000000</span>
        </p>
      </div>
      <div className="insurance_data_icon4 data_item">
        <img src={DataIcon4} alt="" />
        <p>
          <span>
            <FormattedMessage id="insurance_text23" />
          </span>
          <span>10000.000000</span>
        </p>
      </div>
    </div>
  </div>
)

export default ShowData
