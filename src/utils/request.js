import axios from 'axios'
import { Modal } from 'antd'

const service = axios.create({
  baseURL: '/',
  timeout: 15000,
})

service.interceptors.request.use(
  function (config) {
    return config
  },
  error => {
    const modal = Modal.error({
      width: 500,
      content: error.message,
      maskClosable: false,
      onOk: () => {
        modal.destroy()
      },
    })
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  function (config) {
    return config
  },
  error => {
    const modal = Modal.error({
      width: 500,
      content: error.response ? `${error.response.statusText}` : 'response timeout！',
      maskClosable: false,
      onOk: () => {
        modal.destroy()
      },
    })
    return Promise.reject(error)
  }
)

export default service
