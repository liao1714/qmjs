import {
  addTag,
  cancelEnroll,
  enrollDetail,
  enrollInfo,
  enrollItems,
  eventsAdd,
  eventsAddPush,
  eventsDel,
  eventsDetail,
  eventsEdit,
  eventsOperation,
  eventsQuery,
  eventsTop,
  getTagList,
  enrollHeader,
  sharePrefix,
  refund,
  orderDetails,
  tagSort,
  tagEdit,
  dataExport
} from '@/services/events'
import {formatDate} from '@/utils/utils'

const EventsModel = {
  namespace: 'events',
  state: {
    tagList: [],
    eventsList: [],
    eventsDetail: {},
    enrollInfo: {},
    enrollDetail: {},
    formData: [],
    enrollItems: [],
    orderDetail: {}
  },
  effects: {
    *eventsQuery({ payload }, { call, put }) {
      const response = yield call(eventsQuery, payload)
      if (response && response.code === 200) {
        response.data.result.map(item => {
          item.createdDate = formatDate(item.createdDate, 'yyyy-MM-dd HH:mm:ss')
        })
        yield put({
          type: 'setEventsList',
          payload: response.data,
        })
      }
      return response
    },
    *tagList({ payload }, { call, put }) {
      const response = yield call(getTagList, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setTagList',
          payload: response.data,
        })
      }
      return response
    },
    *addTag({ payload }, { call, put }) {
      return yield call(addTag, payload)
    },
    *eventsAddPush({ payload }, { call, put }) {
      return yield call(eventsAddPush, payload)
    },
    *eventsOperation({ payload }, { call, put }) {
      return yield call(eventsOperation, payload)
    },
    *eventsTop({ payload }, { call, put }) {
      return yield call(eventsTop, payload)
    },
    *eventsDel({ payload }, { call, put }) {
      return yield call(eventsDel, payload)
    },
    *eventsAdd({ payload }, { call, put }) {
      return yield call(eventsAdd, payload)
    },
    *eventsEdit({ payload }, { call, put }) {
      return yield call(eventsEdit, payload)
    },
    *eventsDetail({ payload }, { call, put }) {
      const response = yield call(eventsDetail, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setEventsDetail',
          payload: response.data,
        })
      }
      return response
    },
    *enrollItems({ payload }, { call, put }) {
      const response = yield call(enrollItems, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setEnrollItems',
          payload: response.data,
        })
      }
      return response
    },
    *enrollHeader({ payload }, { call, put }) {
      return yield call(enrollHeader, payload)
    },
    *enrollInfo({ payload }, { call, put }) {
      const response = yield call(enrollInfo, payload)
      if (response && response.code === 200) {
        response.data.result.map(item => {
          item.createdDate = formatDate(item.createdDate, 'yyyy-MM-dd HH:mm:ss')
        })
        yield put({
          type: 'setEnrollInfo',
          payload: response.data,
        })
      }
      return response
    },
    *enrollDetail({ payload }, { call, put }) {
      const response = yield call(enrollDetail, payload)
      if (response && response.code === 200) {
        // const insuranceImgs = []
        // response.data.insuranceImgs.map(item => {
        //   insuranceImgs.push({
        //     url: item
        //   })
        // })
        // response.data.insuranceImgs = insuranceImgs
        yield put({
          type: 'setEnrollDetail',
          payload: response.data,
        })

        yield put({
          type: 'setFormData',
          payload: response.data.formDatas,
        })
      }
      return response
    },
    *cancelEnroll({ payload }, { call, put }) {
      return yield call(cancelEnroll, payload)
    },
    *sharePrefix({ payload }, { call, put }) {
      return yield call(sharePrefix, payload)
    },


    *refund({ payload }, { call, put }) {
      return yield call(refund, payload)
    },

    *orderDetails({ payload }, { call, put }) {
      const response = yield call(orderDetails, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setOrderDetail',
          payload: response.data,
        })

      
      }
      return response
    },

    
    *tagSort({ payload }, { call, put }) {
      const response = yield call(tagSort, payload)
      return response
    },

    *tagEdit({ payload }, { call, put }) {
      const response = yield call(tagEdit, payload)
      return response
    },

    *dataExport({ payload }, { call, put }) {
      const response = yield call(dataExport, payload)
      return response
    },

  },
  reducers: {
    setTagList(state, { payload }) {
      return { ...state, tagList: payload }
    },
    setEventsList(state, { payload }) {
      return { ...state, setEventsList: payload }
    },
    setEventsDetail(state, { payload }) {
      return { ...state, eventsDetail: payload }
    },
    setEnrollInfo(state, { payload }) {
      return { ...state, enrollInfo: payload }
    },
    setEnrollDetail(state, { payload }) {
      return { ...state, enrollDetail: payload }
    },
    setFormData(state, { payload }) {
      return { ...state, formData: payload }
    },
    setEnrollItems(state, { payload }) {
      return { ...state, enrollItems: payload }
    },
    setOrderDetail(state, { payload }) {
      return { ...state, orderDetail: payload }
    },

    
  },
}
export default EventsModel
