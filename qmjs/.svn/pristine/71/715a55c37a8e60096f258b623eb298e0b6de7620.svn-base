import React from 'react'
import { TabBar } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './baseLayout.less'
import IconSvg from '@/components/icon-svg'
import { formatMessage } from 'umi-plugin-locale'
import Router from '@/utils/router'
import { removeTabKey } from '@/utils/tabKey'

class BaseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }

  isTabBarSelect = (url) => {
    const { location: { pathname } } = this.props
    return pathname === url
  }
  pathNav =(url)=> {
    Router.push(url)
    this.setState({
      show: false
    })
    const that = this
    setTimeout(function() {
      that.setState({
        show: true
      })
    } ,0)
    removeTabKey()
    if (url === '/community') {
      this.props.dispatch({ type: 'buriedPoint/qmjs_community_click' })
    } else if (url === '/my') {
      this.props.dispatch({ type: 'buriedPoint/qmjs_personal_click' })
    }
  }

  render() {
    const TabBarData = [
      {
        id: 'home',
        name: formatMessage({ id: 'index.tabMenu.home' }),
        icon: <IconSvg type="menu_icon_home" size='sm'/>,
        selectedIcon: <IconSvg type="menu_icon_homes"  size='sm'/>,
        url: '/home',
      },
      {
        id: 'community',
        name: formatMessage({ id: 'index.tabMenu.community' }),
        icon: <IconSvg type="menu_icon_shequ" size='sm'/>,
        selectedIcon: <IconSvg type="menu_icon_shequs" size='sm'/>,
        url: '/community',
      },
      {
        id: 'my',
        name: formatMessage({ id: 'index.tabMenu.my' }),
        icon: <IconSvg type="menu_icon_wode" size='sm'/>,
        selectedIcon: <IconSvg type="menu_icon_wodes" size='sm'/>,
        url: '/my',
      }
    ]
    return (
      <div className='base-layout-wrapper'>
        <TabBar
          unselectedTintColor="#999"
          tintColor="#cf4d54"
          barTintColor="white"
          tabBarPosition='bottom'
        >
          {
            TabBarData.map(t => {
              const isSelect = this.isTabBarSelect(t.url)
              return  (<TabBar.Item
                title={<span className={isSelect ? 'is-select' : ''}>{t.name}</span>}
                key={t.id}
                icon={<span className={isSelect ? 'is-select' : 'unselect'}>{t.icon}</span>}
                selectedIcon={<span className={isSelect ? 'is-select' : 'unselect'}>{t.selectedIcon}</span>}
                // badge={1}
                onPress={() => this.pathNav(t.url)}
                selected={isSelect}
                data-seed='logId'
              >
                {this.state.show && isSelect && this.props.children}
              </TabBar.Item>
              )
            })
          }
        </TabBar>
      </div>
    )
  }
}

export default BaseLayout
