import { createDiscreteApi } from 'naive-ui'
import axios from 'axios'

const { message } = createDiscreteApi(
  ['message'],
)

const http = axios.create()

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    const res = response.data

    // code: 200 自定义的成功状态码
    if (res.code !== 200) {
      message.error(res.message || '未知错误')
      return Promise.reject(new Error(res.message || 'Error'))
    }
    else {
      return res
    }
  },
  (error) => {
    const { response } = error
    if (response) {
      message.error(response.data.message || '未知错误')
      return Promise.reject(response.data)
    }
  },
)

export default http
