import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {ConfigProvider, Empty} from 'antd'
import App from './App'
import store from './redux/store'
import '@/utils/request'
import { Web3ReactProvider } from '@web3-react/core'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import Intl from './locales/intl'
import {getLibrary} from './web3/getLibrary'

ReactDom.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN} renderEmpty={Empty}>
      <Intl>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App/>
        </Web3ReactProvider>
      </Intl>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
