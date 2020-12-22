import {roleQuery, roleAdd, roleEdit, roleDel, roleActivate, roleResources} from '@/services/role'
import { formatDate } from '@/utils/utils'

const RoleModel = {
  namespace: 'role',
  state: {
    roleList: [],
    resourcesRoles: [],
    authResources: [],
    roleDetail: {
      pkId: '',
      roleName: '',
      description: '',
    }
  },
  effects: {
    *roleQuery({ payload }, { call, put }) {
      const response = yield call(roleQuery, payload)
      if (response && response.code === 200) {
        response.data.result.map(item => {
          item.createdDate = formatDate(item.createdDate, 'yyyy-MM-dd HH:mm:ss')
        })
        yield put({
          type: 'setRoleList',
          payload: response.data,
        })
      }
      return response
    },
    *roleResources({ payload }, { call, put }) {
      const response = yield call(roleResources, payload)
      if (response && response.code === 200) {
        yield put({
          type: 'setResourcesRoles',
          payload: response.data.resourcesRoles,
        })
        yield put({
          type: 'setAuthResources',
          payload: response.data.authResources,
        })
      }
      return response
    },
    *roleAdd({ payload }, { call }) {
      return yield call(roleAdd, payload)
    },
    *roleEdit({ payload }, { call }) {
      return yield call(roleEdit, payload)
    },
    *roleDel({ payload }, { call }) {
      return yield call(roleDel, payload)
    },
    *roleActivate({ payload }, { call }) {
      return yield call(roleActivate, payload)
    },
  },
  reducers: {
    setRoleList(state, { payload }) {
      return { ...state, roleList: payload }
    },
    setResourcesRoles(state, { payload }) {
      return { ...state, resourcesRoles: payload }
    },
    setAuthResources(state, { payload }) {
      return { ...state, authResources: payload }
    },
    setRoleDetail(state, { payload }) {
      return { ...state, roleDetail: payload }
    },
  },
}
export default RoleModel
