// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  // hash: true,
  // outputPath: 'qmjsadmin',
  // history: { type: 'browser' },
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/qmjsadmin/',
  // base: '/qmjsadmin/',
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes: [
    {
      path: '/login',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/login',
          component: './login',
        }
      ]
    },
    {
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/events/list',
        },
        {
          name: '活动赛事管理',
          icon: 'events',
          code: 'events',
          path: '/events',
          routes: [
            {
              name: '活动管理',
              icon: '',
              path: '/events/list',
              code: 'events_list',
              component: './events/list',
            },
            {
              name: '新建活动赛事',
              icon: '',
              path: '/events/create',
              code: 'eventsCreate',
              component: './events/create',
              hideInMenu: true,
            },
            {
              name: '编辑活动赛事',
              icon: '',
              path: '/events/editor',
              code: 'eventsEditor',
              component: './events/editor',
              hideInMenu: true,
            },
            {
              name: '报名信息查看',
              icon: '',
              path: '/events/enroll',
              code: 'eventsEnroll',
              component: './events/enroll',
              hideInMenu: true,
            }
          ]
        },
        {
          name: '运营位置管理',
          icon: 'location',
          path: '/location',
          code: 'location',
          component: './location/list',
        },
        {
          name: '账号管理',
          icon: 'account',
          path: '/account',
          code: 'account',
          component: './account/list',
        },
        {
          name: '角色管理',
          icon: 'role',
          path: '/role',
          code: 'role',
          component: './role/list',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
