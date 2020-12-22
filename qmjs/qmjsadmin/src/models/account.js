import {accountQuery, accountAdd, accountEdit, accountDel, accountActivate, accountResetPassword, accountFindAllRole, accountChangePassword, editPersonalAccount} from '@/services/account'
import { formatDate } from '@/utils/utils'

const AccountModel = {
  namespace: 'account',
  state: {
    accountList: [],
    roleList: [],
    accountDetail: {
      accountPkId: '',
      account: '',
      name: '',
      mobile: '',
      role: [],
    },
    changePasswordData: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    personalInformationData: {
      name: '',
      mobile: '',
      image: [],
    }
  },
  effects: {
    *accountQuery({ payload }, { call, put }) {
      const response = yield call(accountQuery, payload)
      if (response && response.code === 200) {
        response.data.result.map(item => {
          item.createdDate = formatDate(item.createdDate, 'yyyy-MM-dd HH:mm:ss')
        })
        yield put({
          type: 'setAccountList',
          payload: response.data,
        })
      }
      return response
    },
    *accountFindAllRole({ payload }, { call, put }) {
      const response = yield call(accountFindAllRole, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setRoleList',
          payload: response.data,
        })
      }
      return response
    },
    *accountAdd({ payload }, { call }) {
      return yield call(accountAdd, payload)
    },
    *accountEdit({ payload }, { call }) {
      return yield call(accountEdit, payload)
    },
    *accountDel({ payload }, { call }) {
      return yield call(accountDel, payload)
    },
    *accountActivate({ payload }, { call }) {
      return yield call(accountActivate, payload)
    },
    *accountResetPassword({ payload }, { call }) {
      return yield call(accountResetPassword, payload)
    },
    *accountChangePassword({ payload }, { call }) {
      return yield call(accountChangePassword, payload)
    },
    *editPersonalAccount({ payload }, { call }) {
      return yield call(editPersonalAccount, payload)
    },
  },
  reducers: {
    setAccountList(state, { payload }) {
      return { ...state, accountList: payload }
    },
    setRoleList(state, { payload }) {
      return { ...state, roleList: payload }
    },
    setAccountDetail(state, { payload }) {
      return { ...state, accountDetail: payload }
    },
    setChangePasswordData(state, { payload }) {
      return { ...state, changePasswordData: payload }
    },
    setPersonalInformationData(state, { payload }) {
      return { ...state, personalInformationData: payload }
    },
  },
}
export default AccountModel
