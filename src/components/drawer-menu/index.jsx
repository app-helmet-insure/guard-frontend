import React from 'react'
import {Drawer} from 'antd'
import './index.less'
import LogoSvg from '../../assets/images/logo_h5.svg'
import {FormattedMessage} from 'react-intl'
import {formatAddress} from '../../utils'
import {navList} from '../header'
import {Link} from 'react-router-dom'
import HelmetSvg from '../../assets/images/helmet.svg'
import {connect} from 'react-redux'
import {changeLanguage} from '../../redux/actions'
import {languageConfig} from '../../locales/intl'
import NewIcon from '../../assets/images/new.svg'

function DrawerMenu ({ account, active, chainId, visible, setVisible, connectWalletClick, location, changeLanguage, language, visibleHeaderClaim, setVisibleHeaderClaim}) {
  const onClose = () => {
    setVisible(false)
  }

  const goClaim = () => {
    setVisible(false)
    setVisibleHeaderClaim(true)
  }

  const languageList = []
  for (const i in languageConfig) {
    languageList.push((
      <div key={i} className={language === i ? 'active' : ''} onClick={() => changeLanguage({language: i})}>{languageConfig[i].title}</div>
    ))
  }

  return (
    <Drawer
      title={null}
      placement="left"
      closable={false}
      onClose={onClose}
      visible={visible}
      className="drawer_menu"
    >
      <img src={LogoSvg} alt="" className="logo"/>
      <div className="menu-li">
        {
          navList.map(item => (
            <React.Fragment key={item.path}>
              <Link to={item.path}><h1 className={location.pathname === item.path ? 'active' : ''}>
                <span>{item.name}
                  {
                    item.isNew && <img className="is_new_icon" src={NewIcon} alt=""/>
                  }
                </span>

              </h1></Link>
              {item.children && item.children.map(cItem => <Link to={cItem.path} key={cItem.path}><p className={location.pathname === cItem.path ? 'active' : ''}>{cItem.name}</p></Link>)}
            </React.Fragment>
          ))
        }
        {languageList}
      </div>
      <div className="wall">
        {
          active ? (
            <div className="btn flex_center" onClick={connectWalletClick}>
              {formatAddress(account, 6, 5)}
              <span/>
            </div>
          ) : (
            <div className="btn flex_center" onClick={connectWalletClick}>
              <FormattedMessage id="header_text3"/>
            </div>
          )
        }
        {/* <div className="btn flex_center">*/}
        {/*  <FormattedMessage id="header_text4"/>*/}
        {/*  <img src={LoadingSvg} alt="" className="loading_ani"/>*/}
        {/* </div>*/}
        <a href="https://www.helmet.insure/" className="btn to_helmet flex_center">
          <img src={HelmetSvg} alt=""/>
          <FormattedMessage id="header_text7" values={{name: 'Helmet'}}/>
        </a>
        <a className="btn header_claim flex_center" onClick={goClaim}><FormattedMessage id="header_claim_dialog_text1" /></a>
      </div>
    </Drawer>
  )
}
export default connect(
  state => state.index, {
    changeLanguage
  }
)(DrawerMenu)
