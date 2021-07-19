import React from 'react'
import './index.less'
import DiscordSvg from '../../assets/images/footer-icon/discord.svg'
import MediumSvg from '../../assets/images/footer-icon/medium.svg'
import TelegramSvg from '../../assets/images/footer-icon/telegram.svg'
import TwitterSvg from '../../assets/images/footer-icon/twitter.svg'
import LanguageSvg from '../../assets/images/footer-icon/language.svg'
import ArrowSvg from '../../assets/images/footer-icon/arrow.svg'
import {connect} from 'react-redux'
import {changeLanguage} from '../../redux/actions'

import {languageConfig} from '../../locales/intl'

function renderLanguage(props) {
  const list = []
  for (const i in languageConfig) {
    list.push((
      <div className="language_select_item" key={i} onClick={() => props.changeLanguage({language: i})}>
        <div className="flex_center">{languageConfig[i].title}</div>
      </div>
    ))
  }
  return {
    name: languageConfig[props.language].title,
    list
  }
}

function Footer(props) {
  const renderLanguageData = renderLanguage(props)
  console.log(renderLanguageData)
  return (
    <div className="footer">
      <div className="powered flex_center powered_pc_v">Powered by GUARD Core team</div>
      <div className="footer_link flex_center">
        <img src={DiscordSvg} alt="" className="discord_svg"/>
        <img src={MediumSvg} alt="" className="medium_svg"/>
        <img src={TelegramSvg} alt="" className="telegram_svg"/>
        <img src={TwitterSvg} alt="" className="twitter_svg"/>
      </div>
      <div className="powered flex_center powered_h5_v">Powered by GUARD Core team</div>
      <div className="language_switch flex_center">
        <div className="language_select">
          <div className="language_select_list">
            {renderLanguageData.list}
          </div>
          <img src={LanguageSvg} alt=""/>
          {renderLanguageData.name}
          <img src={ArrowSvg} className="language_arrow" alt=""/>
        </div>
      </div>
    </div>
  )
}
export default connect(
  state => state.index, {
    changeLanguage
  }
)(Footer)
