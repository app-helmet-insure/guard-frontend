import { PureComponent } from 'react'
import { Button } from 'antd'

export default class B extends PureComponent {
  render() {
    return (
      <div>
        <p className="content-box">xxxx</p>
        <Button type="primary">this is Page B~</Button>
      </div>
    )
  }
}
