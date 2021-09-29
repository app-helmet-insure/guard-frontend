import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'

const IdoBanner = () => (
  <div className="ido_banner">
    <div className="ido_banner_box">
      <h2 className="ido_banner_title">
        <FormattedMessage id="mining_text1" />
      </h2>
      <p className="ido_banner_content">
        <FormattedMessage id="mining_text2" />
      </p>
    </div>
  </div>
)

export default IdoBanner
