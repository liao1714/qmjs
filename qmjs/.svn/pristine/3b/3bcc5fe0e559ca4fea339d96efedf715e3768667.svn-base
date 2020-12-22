/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout'
import React from 'react'
import {connect, Link, useIntl, history} from 'umi'
import {Button, Result} from 'antd'
import Authorized from '@/utils/Authorized'
import {getAuthorityFromRouter} from '@/utils/utils'
import RightContent from '@/components/GlobalHeader/RightContent'
import HeaderContent from '@/components/GlobalHeader/HeaderContent'
import LayoutHeader from '@/components/LayoutHeader'
import logo from '../assets/logo.svg'
import {getToken} from '@/utils/token'
import {ReactSVG} from 'react-svg'
import {getPermissions} from '@/utils/accountInfo'


const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings
  } = props
  console.log(children)
  const menuDataRender = (menuList) =>
    menuList.map((item) => {
      item.icon = item.icon ? <span className='menu-icon'><ReactSVG src={require('../assets/svg/' + item.icon + '.svg')}/></span> : ''
      if (getPermissions().includes(item.code)) {
        return {
          ...item,
          children: item.children ? menuDataRender(item.children) : undefined
        }
      }
    })

  if (!getToken()) {
    dispatch({
      type: 'login/logout',
    })
  }
  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      })
    }
  }
  history.listen(route => {
    if (dispatch) {
      dispatch({
        type: 'tabs/addTabsList',
        payload: {pathname: route.pathname, query: route.query},
      })
    }
  })
  const handleMenuClick = (payload)=> {}
  const { formatMessage } = useIntl()
  return (
    <>
      <LayoutHeader />
      <ProLayout
        logo={logo}
        // formatMessage={formatMessage}
        menuHeaderRender={()=>{return ''}}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return <span>{defaultDom}</span>
          }
          return <Link to={menuItemProps.path} onClick={()=>handleMenuClick(menuItemProps)}>{defaultDom}</Link>
        }}
        subMenuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return <span>{defaultDom}</span>
          }
          return <span>{defaultDom}</span>
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        footerRender={()=>{return <div/>}}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent/>}
        // headerContentRender={headerContent}
        headerContentRender={() => <HeaderContent/>}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
    </>
  )
}

export default connect(({ global, settings, tabs }) => ({
  collapsed: global.collapsed,
  settings,
  tabsList: tabs.tabsList,
}))(BasicLayout)
