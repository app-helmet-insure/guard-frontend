import React, {useMemo, useState} from 'react'
import './index.less'
import MiningBanner from '../../components/mining/banner'
import MiningCard from '../../components/mining/card'
import Header from '@/components/header'
import Footer from '@/components/footer'
import mining from '../../configs/mining'
import SwiperCards from '../../components/mining/swiper-cards'

const Mining = props => {
  const [miningMap, setMiningMap] = useState({})
  useMemo(() => {
    // 分类
    const map = {}
    for (let i = 0; i < mining.length; i++) {
      if (!map[mining[i].title + mining[i].cover] || mining[i].unstack) {
        if (mining[i].unstack) {
          map[mining[i].title + mining[i].cover + i] = [mining[i]]
        } else {
          map[mining[i].title + mining[i].cover] = [mining[i]]
        }
      } else {
        map[mining[i].title + mining[i].cover].push(mining[i])
      }
    }
    setMiningMap(map)
  }, [])

  const renderCards = () => {
    const components = []
    for (const i in miningMap) {
      if (miningMap[i].length > 1) {
        const poolsArr = miningMap[i].sort((a, b) => b.start_at - a.start_at)
        components.push(<SwiperCards poolsArr={poolsArr} key={i} />)
      } else {
        components.push(<MiningCard pools={miningMap[i][0]} key={i} />)
      }
    }
    console.log(components)
    return components
  }

  return (
    <div>
      <Header {...props} />
      <div className="page_box">
        <div className="mining_index">
          <MiningBanner/>
          <div className="mining_index_content">
            {renderCards()}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Mining
