import React from 'react'
import './index.less'
import IdoBanner from '../../components/ido/banner'
import Header from '@/components/header'
import Footer from '@/components/footer'


const Ido = props => (
  <div>
    <Header {...props} />
    <div className="page_box">
      <div className="ido_index">
        <IdoBanner/>
        <div className="ido_index_content">

        </div>
      </div>
    </div>
    <Footer/>
  </div>
)

export default Ido
