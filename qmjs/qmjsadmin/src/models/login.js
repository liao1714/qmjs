import { authenticate } from '@/services/login'
import { accountInfo } from '@/services/account'
import { setAccountInfo, setPermissions } from '@/utils/accountInfo'
const LoginModel = {
  namespace: 'login',
  state: {
    loginForm: {
      username: '',
      password: ''
    },
  },
  effects: {
    *authenticate({ payload }, { call, put }) {
      const response = yield call(authenticate, payload)
      yield put({
        type: 'setLoginForm',
        payload: payload,
      })
      return response
    },
    *accountInfo({ payload }, { call, put }) {
      const response = yield call(accountInfo, payload)
      if (response && response.code === 200) {
        let accountInfo = {
          account: response.data.account,
          name: response.data.name,
          mobile: response.data.mobile,
          image: response.data.image,
        }
        setAccountInfo(accountInfo)
        setPermissions(response.data.codeArray)
      }
      return response
    },
  },
  reducers: {
    setLoginForm(state, { payload }) {
      return { ...state, loginForm: payload }
    },
  },
}
export default LoginModel
