import React, {useMemo, useState} from 'react'
import MiningCard from '../card'
import './index.less'
import cx from 'classname'
import Arrow2 from '../../../assets/images/mining/arrow-2.png'
import Arrow2D from '../../../assets/images/mining/arrow-2-d.png'

export default function SwiperCards (props) {
  const {poolsArr} = props
  const [active, setActive] = useState(0)
  const onTab = type => {
    if (type === 'next' && active >= 1) {
      setActive(active - 1 )
    }
    if (type === 'pre' && active < poolsArr.length - 1) {
      setActive(active + 1 )
    }
  }
  useMemo(() => {
    const now = new Date().getTime() / 1000
    if (poolsArr[active].start_at > now) {
      setActive(1)
    }
  }, [])

  return (
    <div className="swiper-cards">
      {
        poolsArr.map((item, index) => (
          <div key={index} className={cx({
            'swiper-card': true,
            hidden: index + 1 < active || index - 1 > active,
            active: active === index,
            'active-r': index < active,
            'active-l': index > active
          })}>
            <MiningCard pools={item} cStyle={{marginTop: 0}}/>
          </div>
        ))
      }
      <div className="switch-tab switch-tab-l" onClick={() => onTab('pre')}>
        <img src={active === poolsArr.length - 1 ? Arrow2D : Arrow2} alt="<<"/>
      </div>
      <div className="switch-tab switch-tab-r" onClick={() =>  onTab('next')}>
        <img src={active === 0 ? Arrow2D : Arrow2} alt="<<"/>
      </div>
    </div>
  )
}
