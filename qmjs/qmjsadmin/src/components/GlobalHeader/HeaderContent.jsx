import React, { Component } from 'react'
import { connect } from 'umi'
import './index.less'
import { history } from 'umi'
import { Tag } from 'antd'
@connect(({ tabs }) => ({ tabs }))
class GlobalHeaderContent extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if (this.props.dispatch) {
      this.props.dispatch({
        type: 'tabs/addTabsList',
        payload: {pathname: history.location.pathname, query: history.location.query},
      })
    }
  }
  handleClose =(data, index, tabs)=> {
    if (data.sign) {
      if (index === 0) {
        history.replace({pathname: tabs[1].path, query: tabs[1].query})
      } else {
        history.replace({pathname: tabs[index - 1].path, query: tabs[index - 1].query})
      }
    }
    if (this.props.dispatch) {
      this.props.dispatch({
        type: 'tabs/deleteTabsList',
        payload: data.path,
      })
    }
  }
  handleClick =(data)=> {
    console.log(data)
    history.replace({pathname: data.path, query: data.query})
    this.props.dispatch({
      type: 'tabs/addTabsList',
      payload: {pathname: history.location.pathname, query: data.query},
    })
  }
  render() {
    const { tabs } = this.props
    const defaultRouter = [
      {
        name: '活动管理',
        path: '/events/list',
      },
      {
        name: '新建活动赛事',
        path: '/events/create',
      },
      {
        name: '编辑活动赛事',
        path: '/events/editor',
      },
      {
        name: '报名信息查看',
        path: '/events/enroll',
      },
      {
        name: '运营位置管理',
        path: '/location',
      },
      {
        name: '账号管理',
        path: '/account',
      },
      {
        name: '角色管理',
        path: '/role',
      },
    ]
    let tabsArr = []
    tabs.tabsList.map(data => {
      defaultRouter.map(item => {
        if (data.pathname === item.path) {
          if (item.path === history.location.pathname) {
            item.sign = true
          }
          item.query = data.query
          tabsArr.push(item)
        }
      })
    })
    return <div className='tabs-wrapper'>
      {tabsArr.map((data, index)=>(
        <Tag
          key={index}
          closable={tabsArr.length > 1}
          color={data.sign ? '#1890ff' : ''}
          onClick={e=>{
            e.preventDefault()
            this.handleClick(data)
          }}
          onClose={e => {
            e.preventDefault()
            this.handleClose(data, index, tabsArr)
          }}
        >
          {data.name}
        </Tag>
      ))}
    </div>
  }
}
export default GlobalHeaderContent
