import React from 'react'
import './index.less'
import Footer from '@/components/footer'
import LogoSvg from '../../assets/images/logo.svg'
import PosterSvg from '../../assets/images/home/poster.svg'
import GithubSvg from '../../assets/images/home/github.svg'
import LauchAppSvg from '../../assets/images/home/lauch-app.svg'
import {Button} from 'antd'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

function Home () {
  return (
    <div>
      <div className="page_box_1">
        <div className="home_page">
          <div className="logo">
            <img src={LogoSvg} alt=""/>
          </div>
          <div className="home_page_view_m">
            <div className="home_page_view_m_t">
              <h1>GURAD.INSURE</h1>
              <p><FormattedMessage id="home_text1"/></p>
              <div className="btn_view">
                <a href="https://github.com/app-helmet-insure/guard-frontend" target="_blank">
                  <Button className="btn_github btn_primary" ghost type="primary" icon={<img src={GithubSvg} alt="" className="btn_icon"/>}>View GitHub</Button>
                </a>
                <Link to="/insurance">
                  <Button className="btn_lauch_app btn_primary" type="primary" icon={<img src={LauchAppSvg} alt="" className="btn_icon"/>}>Lauch APP</Button>
                </Link>
              </div>
            </div>
            <div className="poster">
              <img src={PosterSvg} alt=""/>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
