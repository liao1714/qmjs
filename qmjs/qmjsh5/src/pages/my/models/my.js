import { activityNotice, getMyActivity, associationNotice, associationChek, editMineInfo } from '@/services/my'
export default {
  namespace: 'my',
  state: {
    mineActivityData: [],
    associationNoticeData: [],
    activityNoticeData: []
  },
  effects: {
    *mineActivity({ payload, callback }, { call, put, select }) {
      const response = yield call(getMyActivity, payload)
      let mineActivityData = yield select(state => {
        return state.my.mineActivityData
      })
      if (response && response.data.result.length !== 0) {
        mineActivityData = mineActivityData.concat(response.data.result)
        yield put({
          type: 'setMineActivityData',
          payload: mineActivityData
        })
        return mineActivityData.length === parseInt(response.data.total)
      } else {
        return false
      }
    },
    *associationChek({ payload, callback }, { call, put }) {
      return  yield call(associationChek, payload)
    },
    *editMineInfo({ payload, callback }, { call, put }) {
      return  yield call(editMineInfo, payload)
    },
    *associationNotice({ payload, callback }, { call, put, select }) {
      const response = yield call(associationNotice, payload)
      let associationNoticeData = yield select(state => {
        return state.my.associationNoticeData
      })
      if (response && response.data.result.length !== 0) {
        associationNoticeData = associationNoticeData.concat(response.data.result)
        yield put({
          type: 'setAssociationNoticeData',
          payload: associationNoticeData
        })
        return associationNoticeData.length === parseInt(response.data.total)
      } else {
        return false
      }
    },
    *activityNotice({ payload, callback }, { call, put, select }) {
      const response = yield call(activityNotice, payload)
      let activityNoticeData = yield select(state => {
        return state.my.activityNoticeData
      })
      if (response && response.data.result.length !== 0) {
        activityNoticeData = activityNoticeData.concat(response.data.result)
        yield put({
          type: 'setActivityNoticeData',
          payload: activityNoticeData
        })
        return activityNoticeData.length === parseInt(response.data.total)
      } else {
        return false
      }
    },
  },
  reducers: {
    setMineActivityData(state, { payload }) {
      return {
        ...state,
        mineActivityData: payload,
      }
    },
    setAssociationNoticeData(state, { payload }) {
      return {
        ...state,
        associationNoticeData: payload,
      }
    },
    setActivityNoticeData(state, { payload }) {
      return {
        ...state,
        activityNoticeData: payload,
      }
    },
  }
}
