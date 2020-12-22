import { cancelActivityRegistration, activityRegistration, editActivity, detailActivity, highlightActivity, topActivity, removeActivity, removeAssociationMember, addAssociationMember, getAssociationDetail, associationMembers, getAssociationParticipants, addAssociation, addAssociationCode, associationInfo, updateAssociation, pushActivity, associationContent, otherUser } from '@/services/association'
export default {
  namespace: 'association',
  state: {
    detail: {},
    associationMembers: [],
    associationInfo: {},
  },
  effects: {
    *detail({ payload, callback }, { call, put }) {
      const response = yield call(getAssociationDetail, payload)
      if (response) {
        yield put({
          type: 'setDetail',
          payload: response.data
        })
      }
      return response
    },
    *associationMembers({ payload, callback }, { call, put }) {
      const response = yield call(associationMembers, payload)
      if (response) {
        yield put({
          type: 'setAssociationMembers',
          payload: response.data
        })
      }
      return response
    },
    *participants({ payload, callback }, { call, put }) {
      return yield call(getAssociationParticipants, payload)
    },
    *cancelActivityRegistration({ payload, callback }, { call, put }) {
      return yield call(cancelActivityRegistration, payload)
    },
    *addAssociation({ payload, callback }, { call, put }) {
      return yield call(addAssociation, payload)
    },
    *addAssociationCode({ payload, callback }, { call, put }) {
      return yield call(addAssociationCode, payload)
    },
    *associationContent({ payload, callback }, { call, put }) {
      return yield call(associationContent, payload)
    },
    *updateAssociation({ payload, callback }, { call, put }) {
      return yield call(updateAssociation, payload)
    },
    *pushActivity({ payload, callback }, { call, put }) {
      return yield call(pushActivity, payload)
    },
    *otherUser({ payload, callback }, { call, put }) {
      return yield call(otherUser, payload)
    },
    *addAssociationMember({ payload, callback }, { call, put }) {
      return yield call(addAssociationMember, payload)
    },
    *removeAssociationMember({ payload, callback }, { call, put }) {
      return yield call(removeAssociationMember, payload)
    },
    *removeActivity({ payload, callback }, { call, put }) {
      return yield call(removeActivity, payload)
    },
    *topActivity({ payload, callback }, { call, put }) {
      return yield call(topActivity, payload)
    },
    *highlightActivity({ payload, callback }, { call, put }) {
      return yield call(highlightActivity, payload)
    },
    *detailActivity({ payload, callback }, { call, put }) {
      return yield call(detailActivity, payload)
    },
    *editActivity({ payload, callback }, { call, put }) {
      return yield call(editActivity, payload)
    },
    *activityRegistration({ payload, callback }, { call, put }) {
      return yield call(activityRegistration, payload)
    },
    *associationInfo({ payload, callback }, { call, put }) {
      const response = yield call(associationInfo, payload)
      if (response) {
        yield put({
          type: 'setAssociationInfo',
          payload: response.data
        })
      }
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
    setAssociationMembers(state, { payload }) {
      return {
        ...state,
        associationMembers: payload,
      }
    },
    setParticipants(state, { payload }) {
      return {
        ...state,
        participants: payload,
      }
    },
    setAssociationInfo(state, { payload }) {
      return {
        ...state,
        associationInfo: payload,
      }
    },
  }
}
