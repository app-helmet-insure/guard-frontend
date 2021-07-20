import React from 'react'
import {Drawer} from 'antd'
import './index.less'
import LogoSvg from '../../assets/images/logo2.svg'
import LoadingSvg from '../../assets/images/loading.svg'
import {FormattedMessage} from 'react-intl'
import {formatAddress} from '../../utils'
import {navList} from '../header'
import {Link} from 'react-router-dom'

function DrawerMenu ({account, active, chainId, visible, setVisible, connectWalletClick, location}) {
  const onClose = () => {
    setVisible(false)
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
              <Link to={item.path}><h1 className={location.pathname === item.path ? 'active' : ''}>{item.name}</h1></Link>
              {item.children && item.children.map(cItem => <Link to={cItem.path} key={cItem.path}><p className={location.pathname === cItem.path ? 'active' : ''}>{cItem.name}</p></Link>)}
            </React.Fragment>
          ))
        }
        <div>简体中文</div>
        <div>English</div>
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
      </div>
    </Drawer>
  )
}
export default DrawerMenu
