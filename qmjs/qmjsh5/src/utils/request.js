import axios from 'axios'
import { getToken, setAuthToken, setToken } from '@/utils/token'
import { Toast } from 'antd-mobile'
const history = require('umi/lib/createHistory').default({
  basename: window.routerBase,
})
import Router from '@/utils/router'
import { getApiUrl } from '@/utils/url'
import setting from '@/utils/setting'

let service =(data)=>{
  return new Promise((resolve, reject) => {
    const serviceAxios = axios.create({
      baseURL: getApiUrl(data.url.indexOf('mock') === -1),
      headers: { 'Content-Type': 'application/json;charset=utf-8;multipart/form-data' },
      withCredentials: true,
      timeout: 10000
    })
    serviceAxios.interceptors.request.use(
      config => {
        if (data.url.indexOf('addBuriedPointLog') === -1) {
          console.log(config)
        }
        if(data.url.indexOf('sendSmkSms') > -1 || data.url.indexOf('sendSms') > -1) {
          config.headers.common['code'] = data.data.imgCode
        }
        config.headers.common['Authorization'] = getToken() || ''
        return config
      },
      error => {
        console.log(error)
        return Promise.reject(error)
      }
    )
    serviceAxios.interceptors.response.use(
      response => {
        if (data.url.indexOf('addBuriedPointLog') === -1 && data.url.indexOf('uploadImgThumbnail') === -1 && data.url.indexOf('uploadWatermark') === -1) {
          Toast.hide()
        }
        if (response.headers['authorization']) {
          setToken('')
          setToken(response.headers['authorization'])
        }
        const res = response.data
        if (data.url.indexOf('addBuriedPointLog') === -1) {
          console.log(res)
        }
        if(data.url.indexOf('imageCaptcha') > -1 && response.status == 200) {
          // let imageDataReader = new FileReader()
          // imageDataReader.readAsDataURL(response.data)
          // console.log(imageDataReader)
          // imageDataReader.onload = function () {
          //   let content = {
          //     imgCode: response.headers.code,
          //     imgCaptcha: this.result,
          //     code: 200
          //   }
          //   resolve(content)
          // }
          let content = {
            imgCode: response.headers.code,
            imgCaptcha: response.data.data,
            code: 200
          }
          resolve(content)
        }else {
          if (res.code === 200) {
            resolve(res)
          } else {
            resolve(Promise.reject(new Error(res.message || 'Error')))
          }
        }
      },
      error => {
        if (data.url.indexOf('addBuriedPointLog') === -1) {
          Toast.hide()
          console.log(error.response)
          if (error.response) {
            if (error.response.status === 460) {// 微信code过期
              resolve (error.response)
            } else if (error.response.status === 461) {// 微信未授权
              resolve (error.response)
            } else if (error.response.status === 462) {// 系统验证
              resolve (error.response)
              Toast.info(error.response.data.parameters.fieldErrors.message, 2)
            } else if (error.response.status === 463) {// 自定义验证
              resolve (error.response)
              Toast.info(error.response.data.parameters.fieldErrors[0].message, 2)
            } else {
              resolve (error.response)
            }
          } else {
            if (data.url.indexOf('addBuriedPointLog') === -1) {
              Toast.info('系统繁忙，请稍后重试！', 2)
              resolve ()
            }
          }
        }
      }
    )
    if (data.url.indexOf('used') === -1) {
      serviceAxios(data)
    } else {
      window.g_app._store.dispatch({type: 'index/accessType'}).then(res => {
        console.log(res)
        if (res === 1 || res === 0) {
          serviceAxios(data)
        } else if (res === 'WeChat') {
          if (getToken()) {
            serviceAxios(data)
          } else {
            const getUrlCode =()=> {
              let url = location.search
              let theRequest = {}
              if (url.indexOf('?') !== -1) {
                let str = url.substr(1)
                let strs = str.split('&')
                for(let i = 0; i < strs.length; i ++) {
                  theRequest[strs[i].split('=')[0]]=(strs[i].split('=')[1])
                }
              }
              return theRequest
            }
            let local = window.location.href
            let code = getUrlCode().code
            if (code == null || code === '' || code === undefined) {
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${setting.appId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
            } else {
              window.g_app._store.dispatch({ type: setting.tokenAuth, payload: {code: code} }).then(res => {
                if (res && res.code === 200) {
                  location.reload()
                } else {
                  if (res.status === 461) {
                    if (res.headers['authtoken']) {
                      setAuthToken('')
                      setAuthToken(res.headers['authtoken'])
                    }
                    Toast.info('微信未授权！')
                    Router.push('/login', { redirect: history.location.pathname })
                  } else if (res.status === 460) {
                    Router.push(history.location.pathname)
                    location.reload()
                  }
                }
              })
            }
          }
        }
      })
    }
  })
}

export default service
