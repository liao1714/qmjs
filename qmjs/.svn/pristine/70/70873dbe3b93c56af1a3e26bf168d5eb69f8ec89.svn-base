import React, { Component } from 'react'
import './index.less'
import { connect } from 'dva'
import { Modal, Result, Toast } from 'antd-mobile'
import IconSVG from '@/components/icon-svg'
import { convertDate, formatDate } from '@/utils/methons'
import InfiniteScroll from 'react-infinite-scroller'
import Router from '@/utils/router'

@connect(({ my }) => ({ my }))
class ActivityNotice extends Component {
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
    this.getDefault().then(res => {
      this.setState({
        loading: false,
        hasMore: !res,
      })
    })
  }

  getActivityNoticeData =()=> {
    let body = {
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'my/activityNotice', payload: body }).then(res => {
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
      this.getActivityNoticeData()
    }
  }

  getDefault =()=> {
    return new Promise(resolve => {
      this.props.dispatch({ type:'index/loading'})
      this.props.dispatch({ type:'my/setActivityNoticeData', payload: []})
      this.props.dispatch({ type:'my/activityNotice', payload: { size: this.state.size, page: this.state.page } }).then(res=> {
        resolve(res)
        this.props.dispatch({ type:'index/hideLoading'})
      })
    })
  }

  render() {
    const { my } = this.props
    return (
      !this.state.loading ?
        <div className='notice-wrapper' id='scroll'>
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={this.loadMoreData}
            hasMore={this.state.hasMore}
            useWindow={false}
          >
            {
              my.activityNoticeData.length > 0 ? my.activityNoticeData.map((item, index) => (
                <div key={index} className='notice-list'>
                  <div className='notice-list-header'>
                    <div className='notice-association'>活动赛事</div>
                    <div className='notice-time'>{convertDate(item.createdDate)}</div>
                  </div>
                  <div className='notice-list-body'>
                    <div className='notice-list-title'>{item.title}</div>
                    <div className='notice-list-message'>{item.content}</div>
                  </div>
                  <div className='notice-list-operation'>
                    <span style={{display: 'flex'}}>
                      { item.childNoticeType.value === 6 ? <div className='btn-sm' onClick={()=>Router.push('/activity/detail', { pkId: item.relationId })}>查看活动</div> : '' }
                    </span>
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
        : ''
    )
  }
}
export default ActivityNotice
