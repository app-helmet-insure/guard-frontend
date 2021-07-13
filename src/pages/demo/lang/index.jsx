import React from 'react'
import {connect} from 'react-redux'
import {changeLanguage} from '@/redux/actions/index'
import {FormattedMessage} from 'react-intl'


function LangTest (props) {
  const changeLanguage_ = () => {
    props.changeLanguage({language: props.language === 'en' ? 'cn' : 'en'})
  }
  return (
    <React.Fragment>
      <FormattedMessage
        id="WELCOME"
        values={{data: '深圳'}}
      />
      <button onClick={changeLanguage_}>{props.language}</button>
    </React.Fragment>
  )
}

export default connect(
  state => state.index, {
    changeLanguage
  }
)(LangTest)
