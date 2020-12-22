import {locationQuery,locationDel,locationOnline,locationAdd,locationEdit,locationDetail,locationPageHomeBannerSortList,locationSortPageHomeBanner} from '@/services/location'
import { formatDate } from '@/utils/utils'

const LocationModel = {
  namespace: 'location',
  state: {
    locationList: [],
    locationDetail: {},
    locationPageHomeBannerSortList: []
  },
  effects: {
    *locationQuery({ payload }, { call, put }) {
      const response = yield call(locationQuery, payload)
      if (response && response.code === 200) {
        response.data.result.map(item => {
          item.effectiveBeginTime = formatDate(item.effectiveBeginTime, 'yyyy-MM-dd HH:mm:ss')
          item.effectiveEndTime = formatDate(item.effectiveEndTime, 'yyyy-MM-dd HH:mm:ss')
          item.createdDate = formatDate(item.createdDate, 'yyyy-MM-dd HH:mm:ss')
        })
        yield put({
          type: 'setLocationList',
          payload: response.data,
        })
      }
      return response
    },
    *locationAdd({ payload }, { call, put }) {
      return yield call(locationAdd, payload)
    },
    *locationEdit({ payload }, { call, put }) {
      return yield call(locationEdit, payload)
    },
    *locationDetail({ payload }, { call, put }) {
      const response = yield call(locationDetail, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setLocationDetail',
          payload: response.data,
        })
      }
      return response
    },
    *locationDel({ payload }, { call, put }) {
      return yield call(locationDel, payload)
    },
    *locationOnline({ payload }, { call, put }) {
      return yield call(locationOnline, payload)
    },
    *locationPageHomeBannerSortList({ payload }, { call, put }) {
      const response = yield call(locationPageHomeBannerSortList, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setLocationPageHomeBannerSortList',
          payload: response.data,
        })
      }
      return response
    },
    *locationSortPageHomeBanner({ payload }, { call, put }) {
      return yield call(locationSortPageHomeBanner, payload)
    },
  },
  reducers: {
    setLocationList(state, { payload }) {
      return { ...state, locationList: payload }
    },
    setLocationDetail(state, { payload }) {
      return { ...state, locationDetail: payload }
    },
    setLocationPageHomeBannerSortList(state, { payload }) {
      return { ...state, locationPageHomeBannerSortList: payload }
    },
  },
}
export default LocationModel
