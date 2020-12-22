import { sendSms, tokenAuth, tokenAuthWechat, uploadImgThumbnail, userInfo, getTagTabBar, tokenWgtyAuthWechat, sendSmkSms, uploadWatermark, imageCaptcha, getWxConfig } from '@/services'

export default {
  namespace: 'index',
  state: {
    tokenAuth: '',
    userInfo: '',
    loading: false,
    tagTabBarList: [],
    accessType: null,
  },
  effects: {
    *tokenAuth({ payload, callback }, { call, put }) {
      const response = yield call(tokenAuth, payload)
      if (response) {
        yield put({
          type: 'setTokenLoginAuth',
          payload: response && response.data
        })
      }
      return response
    },
    *tokenAuthWechat({ payload, callback }, { call, put }) {
      const response = yield call(tokenAuthWechat, payload)
      if (response) {
        yield put({
          type: 'setTokenLoginAuth',
          payload: response && response.data
        })
      }
      return response
    },
    *tokenWgtyAuthWechat({ payload, callback }, { call, put }) {
      const response = yield call(tokenWgtyAuthWechat, payload)
      if (response) {
        yield put({
          type: 'setTokenLoginAuth',
          payload: response && response.data
        })
      }
      return response
    },
    *userInfo({ payload, callback }, { call, put }) {
      const response = yield call(userInfo, payload)
      if (response) {
        yield put({
          type: 'setUserInfo',
          payload: response && response.data
        })
      }
      return response
    },
    *uploadImgThumbnail({ payload, callback }, { call, put }) {
      return yield call(uploadImgThumbnail, payload)
    },

    *uploadWatermark({ payload, callback }, { call, put }) {
      return yield call(uploadWatermark, payload)
    },

    *accessType({ payload, callback }, { call, put }) {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.indexOf('xmsmk') !== -1) {
        if (window.UmsApi === undefined) {
          document.addEventListener('OnUmsApiReady',
            function() {
              console.log('ready')
              UmsApi.page.hideNavigationBar()
            },
            false)
        } else {
          console.log('notReady')
          UmsApi.page.hideNavigationBar()
        }
        yield put({
          type: 'setAccessType',
          payload: 1
        })
        return 1
      } else if (ua.match(/MicroMessenger/i)=='micromessenger') {
        yield put({
          type: 'setAccessType',
          payload: 'WeChat'
        })
        return 'WeChat'
      } else {
        yield put({
          type: 'setAccessType',
          payload: 0
        })
        return 0
      }
    },
    *backToNativeHome({ payload, callback }, { call, put, select }) {
      const state = yield select(state => {
        return state
      })
      if (state.index.accessType === 1) {
        UmsApi.page.backToNativeHome()
      }
    },
    *sendSms({ payload, callback }, { call, put }) {
      return yield call(sendSms, payload)
    },
    *sendSmkSms({ payload, callback }, { call, put }) {
      return yield call(sendSmkSms, payload)
    },
    *tagTabBar({ payload, callback }, { call, put }) {
      const response = yield call(getTagTabBar, payload)
      response && response.data.map(item => {
        item.title = item.tagName
        item.lable = item.tagName
        item.value = item.tagPkId
      })
      yield put({
        type: 'setTagTabBarList',
        payload: response && response.data
      })
    },

    *imageCaptcha({ payload, callback }, { call, put }) {
      const response = yield call(imageCaptcha, payload)
      if(response) {
        return response
      }
    },

    *getWxConfig({ payload, callback }, { call, put }) {
      const response = yield call(getWxConfig, payload)
      if(response) {
        return response
      }
    }
  },
  reducers: {
    setTokenLoginAuth(state, { payload }) {
      return {
        ...state,
        tokenLoginAuth: payload,
      }
    },
    setUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      }
    },
    setAccessType(state, { payload }) {
      return {
        ...state,
        accessType: payload,
      }
    },
    setTagTabBarList(state, { payload }) {
      return {
        ...state,
        tagTabBarList: payload,
      }
    },
    loading(state) {
      return {
        ...state,
        loading: true,
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false,
      }
    },
  }
}
