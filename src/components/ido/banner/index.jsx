import React from 'react'
import { FormattedMessage } from 'react-intl'
import './index.less'

const IdoBanner = () => (
  <div className='ido_banner'>
    <div className='ido_banner_box'>
      <div>
        <h2 className='ido_banner_title'>
          <FormattedMessage id='IBO_text54' />
        </h2>
        <p className='ido_banner_content'>
          <FormattedMessage id='IBO_text55' />
        </p>
      </div>
      <div className='ido_banner_apply'>
        <p>Want to launch your own IBO with Guard?</p>
        <a href='https://forms.gle/fKNM11HvKHQTH1TY9' target='_blank'>
          <i></i> Apply Now
        </a>
      </div>
    </div>
  </div>
)

export default IdoBanner
