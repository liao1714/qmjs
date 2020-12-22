import { getHomeBanner, getHomeActivity, notice, clause } from '@/services/home'
export default {
  namespace: 'home',
  state: {
    bannerList: [],
    activityList: [],
    noticeList: [],

    clause: {}
  },
  effects: {
    *banner({ payload, callback }, { call, put }) {
      const response = yield call(getHomeBanner, payload)
      if (response) {
        yield put({
          type: 'setBannerList',
          payload: response.data
        })
      }
      return response
    },
    *notice({ payload, callback }, { call, put }) {
      const response = yield call(notice, payload)
      if (response) {
        yield put({
          type: 'setNoticeList',
          payload: response.data
        })
      }
      return response
    },
    *activity({ payload, callback }, { call, put, select }) {
      const response = yield call(getHomeActivity, payload)
      let activityList = yield select(state => {
        return state.home.activityList
      })
      if (response && response.data.result.length !== 0) {
        activityList = activityList.concat(response.data.result)
        yield put({
          type: 'setActivityList',
          payload: activityList
        })
        return activityList.length === parseInt(response.data.total)
      } else {
        return false
      }
    },

    *clause({ payload, callback }, { call, put, select }) {
      const response = yield call(clause, payload)
      // if (response) {
      //   yield put({
      //     type: 'setClause',
      //     payload: response.data
      //   })
      // }
      return response
     
    },
  },
  reducers: {
    setBannerList(state, { payload }) {
      return {
        ...state,
        bannerList: payload,
      }
    },
    setActivityList(state, { payload }) {
      return {
        ...state,
        activityList: payload,
      }
    },
    setNoticeList(state, { payload }) {
      return {
        ...state,
        noticeList: payload,
      }
    },

    setClause(state, { payload }) {
      return {
        ...state,
        clause: payload,
      }
    }
  },
}
