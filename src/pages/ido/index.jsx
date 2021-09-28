import React from 'react'
import { idoPools } from '../../configs/ido'
import './index.less'
import IdoBanner from '../../components/ido/banner'
import Header from '@/components/header'
import Footer from '@/components/footer'
import IdoCard from '@/components/ido/card'


const Ido = (props) => (
  <div>
    <Header {...props} />
    <div className='page_box'>
      <div className='ido_index'>
        <IdoBanner />
        <div className='ido_index_content'>
          
          {idoPools.map((item, index) => {
            return <IdoCard pools={item} key={index} />
          })}
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default Ido
