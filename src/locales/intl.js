import {IntlProvider} from 'react-intl'
import en_US from './en_US'
import zh_CN from './zh_CN'
import {connect} from 'react-redux'


const config = {
  en: en_US,
  cn: zh_CN
}
const getLanguage = language => config[language] || config.en

function HandleMessages (props) {

  return (
    <IntlProvider
      key={props.language}
      locale={props.language}
      defaultLocale="cn"
      messages={getLanguage(props.language)}
    >
      {props.children}
    </IntlProvider>
  )
}

export default connect(state => state.index)(HandleMessages)
