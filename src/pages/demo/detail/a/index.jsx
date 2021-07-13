import { PureComponent } from 'react'
import { ReactSVG } from 'react-svg'
import { Button, DatePicker } from 'antd'

export default class A extends PureComponent {
  render() {
    return (
      <div>
        <Button type="primary">A~ antd组件演示</Button><br />
        <DatePicker.RangePicker />
        {/* <img src={require('@/images/photo.jpg')} alt="" srcSet="" /> */}
        {/* eslint-disable-next-line no-undef */}
        <div r-for={(item, index) in [1, 2, 3, 4]} key={index}>内容 {item + '-' + index}</div>
        <ReactSVG src={require('@/images/reject-icon.svg')} />
      </div>
    )
  }
}
