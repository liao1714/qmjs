import axios from 'axios'
import { message } from 'antd'
import { getToken, setToken, removeToken } from '@/utils/token'
import { refreshToken } from '@/services'
import apiUrl from '@/utils/url'
import {history} from 'umi'

const service = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json;charset=utf-8;multipart/form-data;' }, // 设置传输内容的类型和编码
  withCredentials: true, // 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
  timeout: 60000, // request timeout
})

service.interceptors.request.use(
  config => {
    console.log(config)
    config.headers.common['Authorization'] = getToken() || ''
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    console.log(response)
    if (response.headers['authorization']) {
      removeToken()
      setToken(response.headers['authorization'])
    }
    if (response.headers['refreshtoken'] === 'true' && response.config.url !== '/api/v1/backstage/account/refreshToken') {
      console.log('refreshtoken')
      refreshToken()
    }
    const res = response.data
    console.log(response.data)
    return res
  },
  error => {
    console.log(error)
    if (error.response) {
      console.log(error.response)
      if (error.response.status === 401) { //过期
        message.warning({
          content: '登录凭证已过期,请重新登录!',
          duration: 1
        })
        removeToken()
        history.push('/login')
      } else if (error.response.status === 465) {// 用户名或者密码错误
        message.warning({
          content: error.response.data.detail,
          duration: 1
        })
      } else if (error.response.status === 403) {
        message.warning({
          content: error.response.data.detail,
          duration: 1
        })
      } else if (error.response.status === 400) {
        message.warning({
          content: error.response.data.message,
          duration: 2
        })
      } else if (error.response.status === 462) { //自定义校验
        message.warning({
          content: error.response.data.parameters.fieldErrors.message,
          duration: 2
        })
      } else if (error.response.status === 463) { //系统校验
        message.warning({
          content: error.response.data.parameters.fieldErrors[0].message,
          duration: 2
        })
      } else {
        message.error('系统繁忙，请稍后重试！', 2)
      }
    } else {
      message.error('系统繁忙，请稍后重试！', 2)
    }
    return error
  }
)

export default service
