import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import { NavBar, Toast, WingBlank } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import BackToNativeHome from '@/components/back-to-native-home'
import { formatDate } from '@/utils/methons'
import Router from '@/utils/router'
@connect(({ activity, index }) => ({ activity, index }))
class ActivityDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canClick: true,
      showShare: false
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'buriedPoint/qmjs_activity_detail', payload: { objId: this.props.location.query.pkId }})
    this.preloadJs().then(()=>{})
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'activity/detail', payload: {pkId: this.props.location.query.pkId} }).then(res => {
      this.props.dispatch({ type:'index/hideLoading'})
    })
  }
  eventsLike =()=> {
    if (this.state.canClick) {
      this.setState({
        canClick: false
      })
      this.props.dispatch({ type:'activity/eventsLike', payload: {pkId: this.props.location.query.pkId} }).then(()=> {
        this.props.dispatch({ type: 'buriedPoint/qmjs_like_click', payload: { objId: this.props.location.query.pkId, objType: '官网活动' }})
        this.setState({
          canClick: true
        })
      })
    }
  }
  cancelEventsLike =()=> {
    if (this.state.canClick) {
      this.setState({
        canClick: false
      })
      this.props.dispatch({ type:'activity/cancelEventsLike', payload: {pkId: this.props.location.query.pkId} }).then(()=>{
        this.props.dispatch({ type: 'buriedPoint/qmjs_like_cancel_click', payload: { objId: this.props.location.query.pkId, objType: '官网活动' }})
        this.setState({
          canClick: true
        })
      })
    }
  }
  preloadJs =()=> {
    let ua = navigator.userAgent
    const that = this
    return new Promise((resolve) =>{
      if (ua.toLowerCase().indexOf('xmsmk') !== -1) {
        if (window.UmsApi === undefined) {
          document.addEventListener('OnUmsApiReady',
            function() {
              resolve(true)
              that.setState({
                showShare: true
              })
            },
            false)
        } else {
          resolve(true)
          that.setState({
            showShare: true
          })
        }
      } else {
        console.log('非市民卡接入')
        that.setState({
          showShare: false
        })
      }
    })
  }

  showToast =(message)=> {
    Toast.info(message, 2)
  }

  shareActivity =(item)=> {
    const that = this
    this.preloadJs().then(()=> {
      UmsApi.globalization.share({
        title: item.title,
        desc: '来i体育，和我一起运动吧',
        link: window.location.href,
        imgUrl:item.headerImg[0].thumbnail
      }, function(){
        that.showToast('分享失败！')
      },function(){
        that.showToast('分享成功！')
      })
    })
  }
  render() {
    const { activity, index } = this.props
    const detail = activity.detail
    return (
      <div className='detail-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >活动赛事详情</NavBar>
        {
          index.loading ? '' :
            detail ?
              <WingBlank size="md" className='container' style={{padding: 0}}>
                <img src={detail && detail.headerImg && detail.headerImg.length > 0 && detail.headerImg[0].thumbnail} className='detail-img' alt=''/>
                <div className='detail-title'>{detail.tagName}&nbsp;·&nbsp;{detail.title}</div>
                <div className='detail-already-number'>
                  <div className='activity-total'>
                    <IconSvg type='activity-number' size='sm'/>
                    <span className='activity-number'>报名人数：</span>
                    <div className='detail-item-content'>{detail.enrollUpper === null ? '无限' : detail.enrollUpper}</div>
                  </div>
                  <div className='cur-number'>
                    <IconSvg type='number-blue' size='xs'/>
                    <span>{detail.enrollPersonCount}</span>人已报名
                  </div>
                </div>
                <div className='detail-item'>
                  <div className='detail-item-icon'>
                    <IconSvg type='activity-address' size='sm'/>
                    <span className='activity-address'>活动地址</span>
                  </div>
                  <div className='detail-item-content'>{detail.address}</div>
                </div>
                <div className='detail-item'>
                  <div className='detail-item-icon'>
                    <IconSvg type='registration-time' size='sm'/>
                    <span className='registration-time'>报名时间</span>
                  </div>
                  <div className='detail-item-content'>
                    开始时间：{formatDate(detail.enrollBeginTime, 'yyyy-MM-dd HH:mm')}<br/>
                    截止时间：{formatDate(detail.enrollEndTime, 'yyyy-MM-dd HH:mm')}
                  </div>
                </div>
                <div className='detail-item'>
                  <div className='detail-item-icon'>
                    <IconSvg type='activity-time' size='sm'/>
                    <span className='activity-time'>活动时间</span>
                  </div>
                  <div className='detail-item-content'>
                      开始时间：{formatDate(detail.eventsBeginTime, 'yyyy-MM-dd HH:mm')}<br/>
                      结束时间：{formatDate(detail.eventsEndTime, 'yyyy-MM-dd HH:mm')}
                  </div>
                </div>
                {/* <div className='detail-item'>
                  <div className='detail-item-icon'>
                    <IconSvg type='activity-number' size='sm'/>
                    <span className='activity-number'>报名人数</span>
                  </div>
                  <div className='detail-item-content'>{detail.enrollUpper === null ? '无限' : detail.enrollUpper}</div>
                </div> */}
                <div className='activity-project' >
                  <div className='introduce-title'>活动项目</div>
                  <div className='project-wrapper'>
                    {detail.itemArray && detail.itemArray.map((item,index) => (
                      <div key={index} className={item.b === 0 ? 'project-item-disable project-item' : 'project-item'}>
                        <div className='project-block-l'>
                          <div className='project-block-title'>
                            {item.itemName}
                            <div className='project-block-money'>
                              {item.itemCost > 0 ? '￥' + item.itemCost : '免费'}
                            </div>
                          </div>
                          <div className='project-block-number'>
                            {
                              item.remainingCount === null ? '' :
                                <span>
                                剩余名额：<span className={item.remainingCount < 10 ? 'residue-red residue' : 'residue'}>{item.remainingCount}</span>
                                </span>
                            }
                            已报名：<span className='have-sign'>{item.enrollCount}</span>
                          </div>
                        </div>
                        <div className='project-block-r'>
                         
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='activity-introduce'>
                  <div className='introduce-title'>活动介绍</div>
                  <div className='detail-introduce' dangerouslySetInnerHTML={{ __html: detail.content}}/>
                </div>
              </WingBlank>
              : ''
        }
        {
          index.loading ? '' :
            <div className='button-wrapper'>
              <div className='detail-share-praise'>
                { this.state.showShare ? <span onClick={()=>this.shareActivity(detail)}><IconSvg type='share' size='sm'/></span> : '' }
                {
                  detail.likeFlag ? <span className='color-themes' onClick={() => this.cancelEventsLike()}><IconSvg type='praise-activity'
                    size='sm' />{detail.likeCount}</span> :
                    <span onClick={() => this.eventsLike()}><IconSvg type='praise' size='sm' />{detail.likeCount}</span>
                }
              </div>
              <div className='detail-immediately'>
                { detail.enrollFlag ? <div className='btn-md' onClick={() => Router.push('/activity/lookEnrollment', { eventsEnrollPkId: detail.eventsEnrollPkId })}>已报名，查看报名</div> :
                  detail.activityStatus === 0 ? <div className='btn-md'>待开始</div> :
                    detail.activityStatus === 1 ? 
                    
                      <div style={{display: 'flex',width: '100%'}}>
                        {
                          detail.modes.map((item, index) => {
                            let linkPath = ''
                            if(item.type.value == 0) {
                              linkPath = '/activity/personalEnroll'
                            }else if(item.type.value == 1) {
                              linkPath = '/activity/teamEnroll'
                            } else if(item.type.value == 2) {
                              linkPath = '/activity/familyEnroll'
                            }                    
                            return <div style={{flex: 1,padding: '0 5px'}} key={index}>
                              <div className='btn-md' onClick={() => {
                                this.props.dispatch({ type: 'buriedPoint/qmjs_activitydetail_apply_click', payload: { objId: detail.pkId }})
                                Router.push(linkPath, { evensId: detail.pkId })
                              }}>{item.type.name}
                              </div>
                            </div>
                          })
                        }
                      </div>
                      :
                      detail.activityStatus === 2 ? <div className='btn-md'>进行中</div> :
                        detail.activityStatus === 3 ? <div className='btn-md btn-md-disabled'>已结束</div> : ''
                }
              </div>
            </div>
        }
      </div>
    )
  }
}

export default ActivityDetail
