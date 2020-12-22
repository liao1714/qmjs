import { activityContent, mineAssociation, findAssociation, joinAssociation, newActivityRead, activityLike, cancelActivityLike } from '@/services/community'
export default {
  namespace: 'community',
  state: {
    mineAssociationData: [],
    findAssociationData: [],
  },
  effects: {
    *activityContent({ payload, callback }, { call, put }) {
      return yield call(activityContent, payload)
    },
    *joinAssociation({ payload, callback }, { call, put }) {
      return yield call(joinAssociation, payload)
    },
    *newActivityRead({ payload, callback }, { call, put }) {
      return yield call(newActivityRead, payload)
    },
    *activityLike({ payload, callback }, { call, put }) {
      return yield call(activityLike, payload)
    },
    *cancelActivityLike({ payload, callback }, { call, put }) {
      return yield call(cancelActivityLike, payload)
    },
    *mineAssociation({ payload, callback }, { call, put }) {
      const response = yield call(mineAssociation, payload)
      if (response) {
        yield put({
          type: 'setMineAssociationData',
          payload: response.data
        })
      }
      return  response
    },
    *findAssociation({ payload, callback }, { call, put, select }) {
      const response = yield call(findAssociation, payload)
      let findAssociationData = yield select(state => {
        return state.community.findAssociationData
      })
      if (response && response.data.result.length !== 0) {
        findAssociationData = findAssociationData ? findAssociationData.concat(response.data.result) : response.data.result
        yield put({
          type: 'setFindAssociationData',
          payload: findAssociationData
        })
        return findAssociationData.length === parseInt(response.data.total)
      } else {
        return false
      }
    }
  },
  reducers: {
    setMineAssociationData(state, { payload }) {
      return {
        ...state,
        mineAssociationData: payload,
      }
    },
    setFindAssociationData(state, { payload }) {
      return {
        ...state,
        findAssociationData: payload,
      }
    },
    updateFindAssociationData(state, { payload }) {
      console.log(state)
      let findAssociationData = state.findAssociationData
      if (payload.type === 'DELETE') {
        findAssociationData = findAssociationData.filter(item => item.pkId !== payload.pkId)
      } else if (payload.type === 'UPDATE') {
        findAssociationData.map(item => {
          if (item.pkId === payload.pkId) {
            item.applyFlag = true
          }
        })
      }
      return {
        ...state,
        findAssociationData: findAssociationData,
      }
    },
  }
}
