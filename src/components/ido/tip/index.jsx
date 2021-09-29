import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'

const IdoBanner = (props) => (
  <div className='ido_tip'>
    <div className='ido_tip_box'>
      <p className='ido_tip_content'>
        <FormattedMessage id={props.tipContent} />
      </p>
    </div>
  </div>
)

export default IdoBanner
