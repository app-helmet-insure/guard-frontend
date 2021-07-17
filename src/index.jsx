import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {ConfigProvider, Empty} from 'antd'
import App from './App'
import store from './redux/store'
import './assets/css/index.less'
import '@/utils/request'
import {Web3ReactProvider} from '@web3-react/core'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import Intl from './locales/intl'
import {getLibrary} from './web3/getLibrary'
import Context from './context'

ReactDom.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN} renderEmpty={Empty}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Context>
          <Intl>
            <App/>
          </Intl>
        </Context>
      </Web3ReactProvider>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
