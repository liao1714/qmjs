import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, NavBar, Result, WingBlank, Toast } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import BackToNativeHome from '@/components/back-to-native-home'
import './index.less'
import Router from '@/utils/router'
import InfiniteScroll from 'react-infinite-scroller'
import IconSVG from '@/components/icon-svg'
import { formatDate } from '@/utils/methons'
const alert = Modal.alert

@connect(({ association }) => ({ association }))
class Participants extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      size: 16,
      loading: true,
      canLoad: true,
      hasMore: true,

      participantsList: [],
      total: 0
    }
  }
  componentDidMount() {
    this.getParticipants()
  }
  getParticipants =()=> {
    let body = {
      activityPkId: this.props.location.query.activityPkId,
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'association/participants', payload: body }).then(res => {
      if (res && res.code === 200) {
        let participantsList = this.state.participantsList.concat(res.data.result)
        this.setState({
          participantsList: this.state.participantsList.concat(participantsList),
          loading: false,
          canLoad: true,
          hasMore: participantsList.length !== parseInt(res.data.total),
          total: parseInt(res.data.total)
        })
      }
      this.props.dispatch({ type:'index/hideLoading'})
    })
  }
  loadMoreData =()=> {
    if (this.state.canLoad && this.state.hasMore) {
      this.setState({
        canLoad: false,
        page: this.state.page + 1,
      })
      this.getParticipants()
    }
  }
  cancelEnrollment =(signupPkId)=> {
    this.props.dispatch({ type:'association/cancelActivityRegistration', payload: { activityPkId: this.props.location.query.activityPkId }}).then(res => {
      if (res && res.code === 200 ) {
        Toast.info(res.message, 2)
        let participantsList = this.state.participantsList
        participantsList = participantsList.filter(item => item.signupPkId !== signupPkId)
        this.setState({
          participantsList: participantsList,
          total: this.state.total - 1
        })
      }
    })
  }
  render() {
    return (
      <div className='detail-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >报名人数</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container scroll-wrapper'>
              <div id='scroll'>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={1}
                  loadMore={this.loadMoreData}
                  hasMore={this.state.hasMore}
                  useWindow={false}
                >
                  <div className='participants-number'>本活动共有<span>{this.state.total}</span>人报名</div>
                  <div className='participants-wrapper'>
                    {
                      this.state.participantsList.length > 0 ?
                        this.state.participantsList.map((item, index)=> (
                          <div key={index} className='participants-item'>
                           
                            <div className='participants-name-portrait'>
                              <div className='participants-name-left'>
                                <img className='participants-portrait' src={item.avatar && item.avatar.length > 0 && item.avatar[0].thumbnail || require('../../../assets/defaultPortrait.png')}/>
                                <div className='participants-name'>
                                  <span className='nickname'>{item.nickname}</span>
                                  <span className='name'>{item.realname}</span>
                                </div>
                              </div>
                              {item.oneselfFlag ?
                                <div className='participants-name-right'>
                                  <div
                                    className='cancel-button'
                                    onClick={() =>
                                      alert('取消报名', '确认要取消报名吗?', [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        { text: '确认', onPress: () => this.cancelEnrollment(item.signupPkId) },
                                      ])
                                    }
                                  >取消报名</div>
                                  <div className='participants-date'>{formatDate(item.createdDate, 'yyyy-MM-dd HH:mm')}</div>
                                </div>
                                : ''}
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
                  </div>
                </InfiniteScroll>
              </div>
            </WingBlank>
        }
      </div>
    )
  }
}
export default Participants
