import React, { Component } from 'react'
import { NavBar, Tabs } from 'antd-mobile'
import CommunityActivity from '@/components/community-activity'
import CommunityAssociation from '@/components/community-association'
import './index.less'
import { formatMessage } from 'umi-plugin-locale'
import IconSvg from '@/components/icon-svg'
import { connect } from 'dva'
import { setTabKey, getTabKey } from '@/utils/tabKey'

@connect(({ index, community }) => ({ index, community }))
class Community extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabKey: getTabKey()
    }
  }
  componentDidMount() {
    if (!getTabKey()) {
      let body = {
        page: 0,
        size: 5,
      }
      // this.props.dispatch({ type:'community/activityContent', payload: body }).then(res => {
      //   if (res && res.code === 200) {
      //     if (res.data.result.length === 0) {
      //       console.log(111111111)
      //       setTabKey('1')
      //       this.setState({
      //         tabKey: '1'
      //       })
      //     } else {
      //       setTabKey('0')
      //       this.setState({
      //         tabKey: '0'
      //       })
      //     }
      //   }
      // })
      setTabKey('1')
      this.setState({
        tabKey: '1'
      })
    }
  }
  setTab =(tab)=> {
    setTabKey(tab.sub)
    this.setState({
      tabKey: tab.sub
    })
  }
  render() {
    const { community } = this.props
    const tabs = [
      { title: '活动', sub: '0' },
      { title: '协会 ', sub: '1' }
    ]
    console.log(getTabKey())
    return (
      <div className='community-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back' size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        ><IconSvg type='logo' size='md'/>{formatMessage({ id: 'index.title' })}</NavBar>
        {
          this.state.tabKey !== null ?
            <Tabs
              swipeable={false}
              className=''
              tabs={tabs}
              initialPage={parseInt(getTabKey())}
              onChange={(tab, index) => {
                this.setTab(tab)
                if (tab.sub === '1') {
                  this.props.dispatch({ type: 'buriedPoint/qmjs_community_association_click' })
                } else {
                  this.props.dispatch({ type: 'buriedPoint/qmjs_community_activity_click' })
                }
              }}
            >
              <div className='scroll-wrapper'>
                { this.state.tabKey === '0' ? <CommunityActivity/> : '' }
              </div>
              <div className='scroll-wrapper'>
                { this.state.tabKey === '1' ? <CommunityAssociation/> : '' }
              </div>
            </Tabs>
            : ''
        }
      </div>
    )
  }
}

export default Community
