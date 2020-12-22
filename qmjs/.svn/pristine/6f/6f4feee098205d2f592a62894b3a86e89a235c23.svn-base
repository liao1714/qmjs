import { registerOther, registerWechat, registerWgtyWechat } from '@/services'
export default {
  namespace: 'login',
  state: {
  },
  effects: {
    *registerWechat({ payload, callback }, { call, put }) {
      return yield call(registerWechat, payload)
    },
    *registerWgtyWechat({ payload, callback }, { call, put }) {
      return yield call(registerWgtyWechat, payload)
    },
    *registerOther({ payload, callback }, { call, put }) {
      return yield call(registerOther, payload)
    },
  },
  reducers: {
  },
}
