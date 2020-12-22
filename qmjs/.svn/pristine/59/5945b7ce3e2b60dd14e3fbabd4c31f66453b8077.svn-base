import { getPreferenceList, smkPreferences } from '@/services/preference'
export default {
  namespace: 'preference',
  state: {
    preferenceList: []
  },
  effects: {
    *preferenceList({ payload, callback }, { call, put }) {
      const response = yield call(getPreferenceList, payload)
      console.log(response)
      if (response) {
        response.data.map(item => {
          item.sign = false
        })
        yield put({
          type: 'setPreferenceList',
          payload: response.data || []
        })
      }
      return response
    },
    *smkPreferences({ payload, callback }, { call, put }) {
      return yield call(smkPreferences, payload)
    }
  },
  reducers: {
    setPreferenceList(state, { payload }) {
      return {
        ...state,
        preferenceList: payload,
      }
    }
  }
}
