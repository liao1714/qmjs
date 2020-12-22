import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import { NavBar, WingBlank, Result, } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import BackToNativeHome from '@/components/back-to-native-home'
import Router from '@/utils/router'
import IconSVG from '@/components/icon-svg'
import InfiniteScroll from 'react-infinite-scroller'
import { formatDate } from '@/utils/methons'
import defaultActivity from '@/assets/defaultPortrait.png'

@connect(({ my }) => ({ my }))
class MyActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      size: 5,
      loading: true,
      canLoad: true,
      hasMore: true,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type:'my/setMineActivityData', payload: []})
    this.getMineActivity()
  }
  getMineActivity =()=> {
    let body = {
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'my/mineActivity', payload: body }).then(res => {
      this.setState({
        canLoad: true,
        hasMore: !res,
      })
      this.props.dispatch({ type:'index/hideLoading'})
    })
  }
  loadMoreData =()=> {
    if (this.state.canLoad && this.state.hasMore) {
      this.setState({
        canLoad: false,
        page: this.state.page + 1,
      })
      this.getMineActivity()
    }
  }
  render() {
    const { my } = this.props
    console.log(my)
    return (
      <div className='my-activity-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >我的活动</NavBar>
        <WingBlank size="md" className='container'>
          <div id='scroll'>
            <InfiniteScroll
              initialLoad={false}
              pageStart={1}
              loadMore={this.loadMoreData}
              hasMore={this.state.hasMore}
              useWindow={false}
            >
              {
                my.mineActivityData.length > 0 ? my.mineActivityData.map((item, index) =>(
                  <div key={index} className='my-activity-item' onClick={()=> Router.push('/activity/detail', { pkId: item.pkId })}>
                    { item.activityStatus === 0 ? <div className='my-activity-ongoing'>未开始</div> : '' }
                    { item.activityStatus === 1 ? <div className='my-activity-ongoing'>报名中</div> : '' }
                    { item.activityStatus === 2 ? <div className='my-activity-ongoing'>活动中</div> : '' }
                    { item.activityStatus === 3 ? <div className='my-activity-ended'>已结束</div> : '' }
                    {/* 图片如果为空或者加载出错则用默认图片显示。 */}
                    <img className='my-activity-image' src={item.headerImg.length == 0 ? defaultActivity : item.headerImg[0].thumbnail} onError={ e => e.target.src = defaultActivity} />
                    <div className='my-activity-title'>{item.title}</div>
                    <div className='my-activity-time-number'>
                      <div className='my-activity-time'>
                        <IconSvg type='time'  size='xxs'/>
                          活动时间：
                        {formatDate(item.eventsBeginTime, 'yyyy-MM-dd')}—{formatDate(item.eventsEndTime, 'yyyy-MM-dd')}
                      </div>
                      <div className='my-activity-number'>
                        {/* <IconSvg type='number'  size='xxs'/> */}
                        {/* <span>{item.enrollCount}</span> */}
                        <span>{item.registrationStatusEnum.name}</span>
                        {/* 已报名 */}
                      </div>
                    </div>
                  </div>
                ))
                  :
                  <Result
                    className='none-data'
                    img={<IconSVG type={'none'} size={'lg'}/>}
                    title=""
                    message="暂无数据"
                  />
              }
            </InfiniteScroll>
          </div>
        </WingBlank>
      </div>
    )
  }
}
export default MyActivity
