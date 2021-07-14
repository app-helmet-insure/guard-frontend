import React from 'react'
import {Button, Drawer} from 'antd'
import './index.less'
import LogoSvg from '../../assets/images/logo2.svg'
import LoadingSvg from '../../assets/images/loading.svg'
import {FormattedMessage} from 'react-intl'
import {formatAddress} from '../../utils'

function DrawerMenu({account, active, visible, setVisible, connectWalletClick}) {
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
        <h1><FormattedMessage id="header_text1"/></h1>
        <p>我的保单</p>
        <p>我发布的保险</p>
        <p>我的结算</p>
        <h1><FormattedMessage id="header_text2"/></h1>
        <div>简体中文</div>
        <div>English</div>
      </div>
      <div className="wall">
        {
          active ? (
            <div className="btn flex_center">
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
