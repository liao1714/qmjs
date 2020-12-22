import React, { Component } from 'react'
import BaseLayout from './baseLayout'
import { connect } from 'dva'
import { getToken, setAuthToken } from '@/utils/token'
import { Toast } from 'antd-mobile'
import Loading from '@/components/loading'
const history = require('umi/lib/createHistory').default({
  basename: window.routerBase,
})
import Router from '@/utils/router'
import setting from '@/utils/setting'
const ULR_NO_LAYOUT = ['/home', '/community', '/my']
@connect(({ index }) => ({ index }))
class Index extends Component {

  componentDidMount() {
    if (location.href.indexOf('cropper_image') > -1 || location.href.indexOf('preview_image') > -1) {
      Router.go(-1)
    }
    this.props.dispatch({ type:'index/accessType' }).then(res => {
      if (res === 1) {
        this.getTokenAuth('full').then(res => {
          if(location.href.indexOf('welfare') > -1 ) {
            Router.replace('/activity/welfare')
          }else {
            if (res.data.firstFlag) {
              Router.replace('/preference')
            } else {
              Router.replace('/home')
            }
          }
          
        })
      } else if (res === 'WeChat') {
        if (history.location.pathname === '/') {
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
            this.props.dispatch({ type: setting.tokenAuth, payload: {code: code} }).then(res => {
              if (res && res.code === 200) {
                if (res.data.firstFlag) {
                  Router.replace('/preference')
                } else {
                  Router.replace('/home')
                }
              } else {
                if (res && res.status === 461) {
                  if (res.headers['authtoken']) {
                    setAuthToken('')
                    setAuthToken(res.headers['authtoken'])
                  }
                  Toast.info('微信未授权！')
                  Router.replace('/login', { redirect: history.location.pathname })
                } else if (res && res.status === 460) {
                  Router.replace(history.location.pathname)
                  location.reload()
                }
              }
            })
          }
        }
      } else if (res === 0) {
        if (getToken()) {
          if (this.props.match.path === '/') {
            Router.replace('/home')
          }
        } else {
          Router.replace('/login')
        }
      }
    })
  }

  preloadJs =()=> {
    let ua = navigator.userAgent
    return new Promise((resolve) =>{
      if (ua.toLowerCase().indexOf('xmsmk') !== -1) {
        if (window.UmsApi === undefined) {
          document.addEventListener('OnUmsApiReady',
            function() {
              resolve(true)
            },
            false)
        } else {
          resolve(true)
        }
      } else {
        console.log('非市民卡接入')
      }
    })
  }

  getTokenAuth =(type, sceneType='')=> {
    const dispatch = this.props.dispatch
    const that = this
    return new Promise(resolve => {
      this.preloadJs().then(res => {
        UmsApi.globalization.getToken({
          tokenType: type,
          sceneType: sceneType
        }, function(data) {
          // that.showToast(data.token)
          dispatch({ type:'index/tokenAuth', payload: {token: data.token} }).then(res => {
            if (res && res.code === 200) {
              resolve(res)
            }
          })
        }, function(data) {
          console.log(data)
        })
      })
    })
  }

  showToast =(token)=> {
    Toast.info(token, 20)
  }
  renderBody = () => {
    const {location: {pathname}, children } = this.props
    if (ULR_NO_LAYOUT.includes(pathname)) {
      return  (<BaseLayout {...this.props} />)
    }
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }

  getAdapter =() => {
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('xmsmk') !== -1) {
      return 'iphone-11'
    } else {
      return 'iphone-11'
    }
  }

  render() {
    return (
      <React.Fragment>
        <Loading/>
        <div className={`${this.getAdapter()} page-container`}>
          {this.renderBody()}
        </div>
      </React.Fragment>
    )
  }
}

export default Index
