import { PureComponent } from 'react'
import { Button, DatePicker } from 'antd'

export default class A extends PureComponent {
  render() {
    return (
      <div>
        <Button type="primary">A~ antd组件演示</Button><br />
        <DatePicker.RangePicker />
        {/* <img src={require('@/images/photo.jpg')} alt="" srcSet="" /> */}
        {/* eslint-disable-next-line no-undef */}
      </div>
    )
  }
}
