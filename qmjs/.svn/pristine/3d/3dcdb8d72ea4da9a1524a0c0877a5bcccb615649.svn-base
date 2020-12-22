import {removeToken} from '@/utils/token'
import {removeAccountInfo, removePermissions} from '@/utils/accountInfo'
import {history} from 'umi'


const TabsModel = {
  namespace: 'tabs',
  state: {
    tabsList: [],
  },
  effects: {
    *addTabsList({ payload }, { call, put, select }) {
      const tabsList = yield select(state => {
        return state
      })
      let pathname = []
      tabsList.tabs.tabsList.map(item => {
        pathname.push(item.pathname)
      })
      if (!pathname.includes(payload.pathname)) {
        tabsList.tabs.tabsList.unshift(payload)
      } else {
        tabsList.tabs.tabsList.map(item => {
          if (item.pathname === payload.pathname) {
            item.query = payload.query
          }
        })
      }
      yield put({
        type: 'setTabsList',
        payload: tabsList.tabs.tabsList
      })
    },
    *deleteTabsList({ payload }, { call, put, select }) {
      let tabsList = yield select(state => {
        return state
      })
      tabsList.tabs.tabsList = tabsList.tabs.tabsList.filter(tag => tag.pathname !== payload)
      yield put({
        type: 'setTabsList',
        payload: tabsList.tabs.tabsList
      })
    },
    *logout({ payload }, { call, put }) {
      removeToken()
      removeAccountInfo()
      removePermissions()
      history.push({pathname:'/login', query:{redirect: history.location.pathname}})
      yield put({
        type: 'setTabsList',
        payload: [],
      })
    },
  },
  reducers: {
    setTabsList(state, { payload }) {
      return {
        ...state,
        tabsList: payload,
      }
    },
  },
}
export default TabsModel
