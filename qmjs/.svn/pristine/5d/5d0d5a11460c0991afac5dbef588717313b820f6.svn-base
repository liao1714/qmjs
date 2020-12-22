import React, { Component } from 'react'
import { connect } from 'dva'
import { NavBar, Tabs } from 'antd-mobile'
import BackToNativeHome from '@/components/back-to-native-home'
import './index.less'
import IconSvg from '@/components/icon-svg'
import Router from '@/utils/router'
import AssociationNotice from '@/components/association-notice'
import ActivityNotice from '@/components/activity-notice'
@connect(({ index }) => ({ index }))
class Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabKey: ''
    }
  }
  componentDidMount() {
    this.setState({
      tabKey: 't1'
    })
  }
  render() {
    const tabs = [
      { title: '协会通知', sub: 't1' },
      { title: '活动通知', sub: 't2' }
    ]
    return (
      <div className='notice-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >系统消息</NavBar>
        <Tabs
          swipeable={false}
          className=''
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { this.setState({tabKey: tab.sub}) }}
        >
          <div className='auto-container'>
            { this.state.tabKey === 't1' ? <AssociationNotice/> : '' }
          </div>
          <div className='auto-container'>
            { this.state.tabKey === 't2' ? <ActivityNotice/> : '' }
          </div>
        </Tabs>
      </div>
    )
  }
}

export default Notice
