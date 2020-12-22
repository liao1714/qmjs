import { removeActivityComment, pushActivityComment, getActivityDetail, activityComment, eventsLike, cancelEventsLike, enrollItemCost, signUpForm, signUp, enrollInfo, cancelEnroll, cancelReasons, teamEnrollForm, familyEnrollForm, signUpPay, orderDetail, specialEvents, userShare, ticketInformation, repeatSignUp, revoke } from '@/services/activity'
export default {
  namespace: 'activity',
  state: {
    detail: [],
    commentsModal: false,
    comments: [],
    commentsTotal: 0,
    enrollItemCostList: [],
    signUpForm: {},
    enrollInfo: {},
    formData: [],
    cancelReasons: [],


    enrollForm: null,
    orderDetail: {},
  },
  effects: {
    *detail({ payload, callback }, { call, put }) {
      const response = yield call(getActivityDetail, payload)
      if (response) {
        yield put({
          type: 'setDetail',
          payload:response.data
        })
      }
      return response
    },
    *activityComment({ payload, callback }, { call, put, select }) {
      return yield call(activityComment, payload)
    },
    *pushActivityComment({ payload, callback }, { call, put, select }) {
      return yield call(pushActivityComment, payload)
    },
    *removeActivityComment({ payload, callback }, { call, put, select }) {
      return yield call(removeActivityComment, payload)
    },
    *eventsLike({ payload, callback }, { call, put, select }) {
      const response = yield call(eventsLike, payload)
      let detail = yield select(state => {
        return state.activity.detail
      })
      detail.likeFlag = !detail.likeFlag
      detail.likeCount = detail.likeCount + 1
      yield put({
        type: 'setDetail',
        payload: detail
      })
      return response
    },
    *cancelEventsLike({ payload, callback }, { call, put, select }) {
      const response = yield call(cancelEventsLike, payload)
      let detail = yield select(state => {
        return state.activity.detail
      })
      detail.likeFlag = !detail.likeFlag
      detail.likeCount = detail.likeCount - 1
      yield put({
        type: 'setDetail',
        payload: detail
      })
      return response
    },
    *enrollItemCost({ payload, callback }, { call, put, select }) {
      const response = yield call(enrollItemCost, payload)
      if (response) {
        yield put({
          type: 'setEnrollItemCostList',
          payload: response.data
        })
      }
      return response
    },
    *signUpForm({ payload, callback }, { call, put, select }) {
      const response = yield call(signUpForm, payload)
      if (response) {
        response.data.signFormArray.map(item => {
          item.expand && item.expand.item && item.expand.item.map(it => {
            it.value = it.value.toString()
          })
        })
        yield put({
          type: 'setSignUpForm',
          payload: response.data
        })
        yield put({
          type: 'setFormData',
          payload: response.data.signFormArray
        })
      }
      return response
    },
    *signUp({ payload, callback }, { call, put, select }) {
      return yield call(signUp, payload)
    },
    *cancelEnroll({ payload, callback }, { call, put, select }) {
      return yield call(cancelEnroll, payload)
    },
    *enrollInfo({ payload, callback }, { call, put, select }) {
      const response = yield call(enrollInfo, payload)
      if (response) {
        response.data.formData.map(item => {
          item.defaultValue = JSON.parse(item.defaultValue)
          item.expand && item.expand.item && item.expand.item.map(it => {
            it.value = it.value.toString()
          })
        })
        yield put({
          type: 'setEnrollInfo',
          payload: response.data
        })
        yield put({
          type: 'setFormData',
          payload: response.data.formData
        })
      }
      return response
    },
    *cancelReasons({ payload, callback }, { call, put, select }) {
      const response = yield call(cancelReasons, payload)
      if (response) {
        yield put({
          type: 'setCancelReasons',
          payload: response.data
        })
      }
      return response
    },


    *personalEnrollForm({ payload, callback }, { call, put, select }) {
      const response = yield call(signUpForm, payload)
      if (response) {
        response.data.formFieldBos.map(item => {
          item.pkId = (new Date().getTime() + item.sequence).toString()
          item.expand && item.expand.items && item.expand.items.map(it => {
            it.label = it.item.toString()
            it.value = it.itemIndex
            if(item.type.value === 3) {
              it.pkId = it.itemIndex
            }
          })
        })
        yield put({
          type: 'setEnrollForm',
          payload: response.data
        })
      }
      return response
    },

    *teamEnrollForm({ payload, callback }, { call, put, select }) {
      const response = yield call(teamEnrollForm, payload)
      if (response) {
        response.data.formFieldBos.map(item => {
          item.pkId = (new Date().getTime() + item.sequence).toString()
          item.expand && item.expand.items && item.expand.items.map(it => {
            it.label = it.item.toString()
            it.value = it.itemIndex
            if(item.type.value === 3) {
              it.pkId = it.itemIndex
            }
          })
        })
        yield put({
          type: 'setEnrollForm',
          payload: response.data
        })
      }
      return response
    },

    *familyEnrollForm({ payload, callback }, { call, put, select }) {
      const response = yield call(familyEnrollForm, payload)
      if (response) {
        response.data.formFieldBos.map(item => {
          item.pkId = (new Date().getTime() + item.sequence).toString()
          item.expand && item.expand.items && item.expand.items.map(it => {
            it.label = it.item.toString()
            it.value = it.itemIndex
            if(item.type.value === 3) {
              it.pkId = it.itemIndex.toString()
            }
          })
        })
        yield put({
          type: 'setEnrollForm',
          payload: response.data
        })
      }
      return response
    },


    *enrollDetail({ payload, callback }, { call, put, select }) {
      const response = yield call(enrollInfo, payload)
      if (response) {
        response.data.formDatas.map(item => {
          item.map(subitem => {
            subitem.pkId = (new Date().getTime() + subitem.sequence).toString()
            subitem.expand && subitem.expand.items && subitem.expand.items.map(it => {
              it.label = it.item.toString()
              it.value = Number(it.itemIndex)
              if(subitem.type.value === 3) {
                it.pkId = it.itemIndex.toString()
                it.itemIndex = Number(it.itemIndex)
              }
            })
          })
        })
        console.log(response.data)
        yield put({
          type: 'setEnrollForm',
          payload: response.data
        })
      }
      return response
    },


    *signUpPay({ payload, callback }, { call, put, select }) {
      const response = yield call(signUpPay, payload)
      return response
    },

    *orderDetail({ payload, callback }, { call, put, select }) {
      const response = yield call(orderDetail, payload)
      if (response) {
        yield put({
          type: 'setOrderDetail',
          payload: response.data
        })
      }
      return response
    },

    *specialEvents({ payload, callback }, { call, put, select }) {
      const response = yield call(specialEvents, payload)
      return response
    },

    *userShare({ payload, callback }, { call, put, select }) {
      const response = yield call(userShare, payload)
      return response
    },

    *ticketInformation({ payload, callback }, { call, put, select }) {
      const response = yield call(ticketInformation, payload)
      return response
    },

    

    *repeatSignUp({ payload, callback }, { call, put, select }) {
      const response = yield call(repeatSignUp, payload)
      return response
    },

    *revoke({ payload, callback }, { call, put, select }) {
      const response = yield call(revoke, payload)
      return response
    },

    




    
  },
  reducers: {
    setDetail(state, { payload }) {
      return {
        ...state,
        detail: payload,
      }
    },
    setComments(state, { payload }) {
      return {
        ...state,
        comments: payload,
      }
    },
    setCommentsTotal(state, { payload }) {
      return {
        ...state,
        commentsTotal: payload,
      }
    },
    setEnrollItemCostList(state, { payload }) {
      return {
        ...state,
        enrollItemCostList: payload,
      }
    },
    setSignUpForm(state, { payload }) {
      return {
        ...state,
        signUpForm: payload,
      }
    },
    setEnrollInfo(state, { payload }) {
      return {
        ...state,
        enrollInfo: payload,
      }
    },
    setFormData(state, { payload }) {
      return {
        ...state,
        formData: payload,
      }
    },
    setCancelReasons(state, { payload }) {
      return {
        ...state,
        cancelReasons: payload,
      }
    },

    setEnrollForm(state, { payload }) {
      return {
        ...state,
        enrollForm: payload,
      }
    },

    setOrderDetail(state, { payload }) {
      return {
        ...state,
        orderDetail: payload,
      }
    }
  }
}
