import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import { Modal, NavBar, WingBlank, Toast, Result } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import BackToNativeHome from '@/components/back-to-native-home'
import Comments from '@/components/comments'
const operation = Modal.operation
const alert = Modal.alert
import WxImageViewer from 'react-wx-images-viewer'
import Router from '@/utils/router'
import InfiniteScroll from 'react-infinite-scroller'
import { convertDate } from '@/utils/methons'
import IconSVG from '@/components/icon-svg'
import PreviewImage from '@/components/preview-image'

@connect(({ association, community }) => ({ association, community }))
class AssociationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityList: [],
      defaultActivityList: [],
      showComments: false,
      dynamicActivityPkId: '',
      presidentFlag: false,
      previewImageShow: false,
      previewImageList: [],
      previewImageIndex: null,
      showShare: false,
      canClick: true,

      page: 0,
      size: 5,
      loading: true,
      canLoad: true,
      hasMore: true,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'buriedPoint/qmjs_activity_detail', payload: { objId: this.props.location.query.associationPkId }})
    this.preloadJs().then(()=>{})
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'association/detail', payload: {associationPkId: this.props.location.query.associationPkId} }).then(() => {
      this.associationActivity()
    })
  }
  showAll =(index, content)=> {
    let activityList = JSON.parse(JSON.stringify(this.state.defaultActivityList))
    if (content && content.length !== 82) {
      activityList[index].content = activityList[index].content.substring(0, 80) + '……'
    }
    this.setState({
      activityList: activityList
    })
  }
  closeComments =()=> {
    this.setState({
      showComments: false
    })
  }
  previewImage =(image, ind)=> {
    let list = []
    image.map(item => {
      list.push(item.originalImage)
    })
    this.setState({
      previewImageShow: true,
      previewImageList: list,
      previewImageIndex: ind
    })
  }

  joinAssociation =(associationPkId)=> {
    this.props.dispatch({ type: 'buriedPoint/qmjs_association_submitjoin_click', payload: { objId: associationPkId } })
    this.props.dispatch({ type:'community/joinAssociation', payload: { associationPkId: associationPkId } }).then(res => {
      if (res && res.code === 200) {
        Toast.info(res.message, 2)
      }
    })
  }
  associationActivity =()=> {
    let body = {
      associationPkId: this.props.location.query.associationPkId,
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'association/associationContent', payload: body }).then(res => {
      if (res && res.code === 200) {
        let activityList = JSON.parse(JSON.stringify(res.data.result))
        activityList.map(item => {
          if (item.content && item.content.length > 80) {
            item.content = item.content.substring(0, 80) + '……'
          }
        })
        let defaultActivityList = this.state.defaultActivityList.concat(res.data.result)
        this.setState({
          activityList: this.state.activityList.concat(activityList),
          defaultActivityList: defaultActivityList,
          loading: false,
          canLoad: true,
          hasMore: defaultActivityList.length !== parseInt(res.data.total),
        })
      }
      this.props.dispatch({ type:'index/hideLoading'})
    })
  }
  loadMoreData =()=> {
    console.log(111)
    if (this.state.canLoad && this.state.hasMore) {
      this.setState({
        canLoad: false,
        page: this.state.page + 1,
      })
      this.associationActivity()
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
  shareActivity =(item)=> {
    const that = this
    this.preloadJs().then(()=> {
      UmsApi.globalization.share({
        title: item.content || '来i体育协会，和会员们一起运动吧',
        desc: 'i体育，爱生活',
        link: window.location.href,
        imgUrl:item.images && item.images.length > 0 && item.images[0].thumbnail
      }, function(){
        that.showToast('分享失败！')
      },function(){
        that.showToast('分享成功！')
      })
    })
  }
  showToast =(message)=> {
    Toast.info(message, 2)
  }

  eventsLike =(index, activityPkId, item)=> {
    if (this.state.canClick) {
      this.setState({
        canClick: false
      })
      this.props.dispatch({ type:'community/activityLike', payload: {activityPkId: activityPkId} }).then(()=> {
        let activityList = this.state.activityList
        activityList[index].likeFlag = !activityList[index].likeFlag
        activityList[index].likeCount = activityList[index].likeCount + 1
        this.setState({
          canClick: true,
          activityList: activityList
        })
        this.props.dispatch({ type: 'buriedPoint/qmjs_like_click', payload: { objId: activityPkId, objType: item.releaseType.value === 0 ? '协会活动' : '协会动态' }})
      })
    }
  }
  cancelEventsLike =(index, activityPkId, item)=> {
    if (this.state.canClick) {
      this.setState({
        canClick: false
      })
      this.props.dispatch({ type:'community/cancelActivityLike', payload: {activityPkId: activityPkId} }).then(()=>{
        let activityList = this.state.activityList
        activityList[index].likeFlag = !activityList[index].likeFlag
        activityList[index].likeCount = activityList[index].likeCount - 1
        this.setState({
          canClick: true,
          activityList: activityList
        })
        this.props.dispatch({ type: 'buriedPoint/qmjs_like_cancel_click', payload: { objId: activityPkId, objType: item.releaseType.value === 0 ? '协会活动' : '协会动态' }})
      })
    }
  }
  refreshTotal =(total)=> {
    let activityList = this.state.activityList
    activityList.map(item => {
      if (item.activityPkId === this.state.dynamicActivityPkId) {
        item.compentCount = total
      }
    })
    this.setState({
      activityList: activityList
    })
  }
  getAction =(item, presidentFlag)=> {
    let action = []
    if (presidentFlag || item.userFlag) {
      action.push({ text: '删除', onPress: () => this.handleOperation(1, item) })
    }
    if (item.userFlag) {
      action.push({ text: '编辑', onPress: () => this.handleOperation(2, item) })
    }
    if (presidentFlag) {
      if (item.topStatus) {
        action.push({ text: '取消置顶', onPress: () => this.handleOperation(3, item) })
      } else {
        action.push({ text: '设为置顶', onPress: () => this.handleOperation(4, item) })
      }
      if (item.highlight) {
        action.push({ text: '取消精品', onPress: () => this.handleOperation(5, item) })
      } else {
        action.push({ text: '设为精品', onPress: () => this.handleOperation(6, item) })
      }
    }
    return action
  }

  handleOperation =(type, item)=> {
    console.log(item)
    if (type === 1) {
      alert(item.releaseType.value === 0 ? '删除活动' : '删除动态', item.releaseType.value === 0 ? '确认删除该活动?' : '确认删除该动态?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确认', onPress: () =>
          this.props.dispatch({ type:'association/removeActivity', payload: {activityPkId: item.activityPkId} }).then(res=> {
            if (res && res.code === 200) {
              Toast.info(res.message, 2)
              let activityList = this.state.activityList
              activityList = activityList.filter(data => data.activityPkId !== item.activityPkId)
              let defaultActivityList = this.state.defaultActivityList
              defaultActivityList = defaultActivityList.filter(data => data.activityPkId !== item.activityPkId)
              this.setState({
                activityList: activityList,
                defaultActivityList: defaultActivityList,
              })
              const detail = this.props.association.detail
              if (item.releaseType.value === 0) {
                detail.activityCount = detail.activityCount - 1
              } else {
                detail.dynamicCount = detail.dynamicCount - 1
              }
              this.props.dispatch({ type:'association/setDetail', payload: detail })
            }
          })
        },
      ])
    } else if (type === 2) {
      Router.push('/association/release/edit', {activityPkId: item.activityPkId})
    } else if (type === 3) {
      alert('取消置顶', '确认取消置顶?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确认', onPress: () =>
          this.props.dispatch({ type:'association/topActivity', payload: {activityPkId: item.activityPkId, topFlag: false} }).then(res=> {
            if (res && res.code === 200) {
              Toast.info(res.message, 2)
              this.setState({
                activityList: [],
                defaultActivityList: [],
                page: 0,
                size: 5
              })
              this.associationActivity()
            }
          })
        },
      ])
    } else if (type === 4) {
      alert('设为置顶', '确认设为置顶?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确认', onPress: () =>
          this.props.dispatch({ type:'association/topActivity', payload: {activityPkId: item.activityPkId, topFlag: true} }).then(res=> {
            if (res && res.code === 200) {
              Toast.info(res.message, 2)
              this.setState({
                activityList: [],
                defaultActivityList: [],
                page: 0,
                size: 5
              })
              this.associationActivity()
            }
          })
        },
      ])
    } else if (type === 5) {
      alert('取消精品', '确认取消精品?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确认', onPress: () =>
          this.props.dispatch({ type:'association/highlightActivity', payload: {activityPkId: item.activityPkId, highlightFlag: false} }).then(res=> {
            if (res && res.code === 200) {
              Toast.info(res.message, 2)
              this.setState({
                activityList: [],
                defaultActivityList: [],
                page: 0,
                size: 5
              })
              this.associationActivity()
            }
          })
        },
      ])
    } else if (type === 6) {
      alert('设为精品', '确认设为精品?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确认', onPress: () =>
          this.props.dispatch({ type:'association/highlightActivity', payload: {activityPkId: item.activityPkId, highlightFlag: true} }).then(res=> {
            if (res && res.code === 200) {
              Toast.info(res.message, 2)
              this.setState({
                activityList: [],
                defaultActivityList: [],
                page: 0,
                size: 5
              })
              this.associationActivity()
            }
          })
        },
      ])
    }
  }

  handleEnrollment =(activityPkId, associationPkId)=> {
    console.log(activityPkId)
    alert('报名', '确认报名?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
          this.props.dispatch({
            type: 'buriedPoint/qmjs_associationactivity_submitapply_click',
            payload: { objId: activityPkId }
          })
          this.props.dispatch({
            type: 'association/activityRegistration',
            payload: { activityPkId: activityPkId }
          }).then(res => {
            if (res && res.code === 200) {
              Toast.info(res.message, 2)
              let activityList = this.state.activityList
              activityList.map(item => {
                if (item.activityPkId === activityPkId) {
                  item.enrollCount = item.enrollCount + 1
                  item.enrollFlag = true
                }
              })
              this.setState({
                activityList: activityList
              })
            } else {
              alert('加入协会', '成为会员后才能参与才活动，确定要加入本协会吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                  text: '确认', onPress: () =>
                    this.props.dispatch({
                      type: 'community/joinAssociation',
                      payload: { associationPkId: associationPkId }
                    }).then(res => {
                      if (res && res.code === 200) {
                        Toast.info(res.message, 2)
                      }
                    })
                },
              ])
            }
          })
        }
      },
    ])
  }

  shareAssociation =(e, data)=> {
    e.stopPropagation()
    const that = this
    this.props.dispatch({ type: 'buriedPoint/qmjs_associationmaterial_invite_click', payload: { objId: this.props.location.query.associationPkId }})
    this.preloadJs().then(()=> {
      UmsApi.globalization.share({
        title: data.associationName,
        desc: data.introduction,
        link: window.location.href,
        imgUrl: data.avatarUrl[0].thumbnail
      }, function(){
        that.showToast('分享失败！')
      },function(){
        that.showToast('分享成功！')

      })
    })
  }

  render() {
    const { association } = this.props
    const detail = association.detail
    console.log(detail)
    return (
      <div className='detail-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >协会信息</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='scroll-wrapper'>
              <div id='padding-scroll'>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={1}
                  loadMore={this.loadMoreData}
                  hasMore={this.state.hasMore}
                  useWindow={false}
                >
                  {
                    detail  ?
                      <div className='association'>
                        <div className='association-list' onClick={()=>Router.push('/association/datum', { associationPkId: detail.associationPkId })}>
                          <img className='association-portrait' src={detail.avatarUrl && detail.avatarUrl.length > 0 && detail.avatarUrl[0].thumbnail || require('../../../assets/defaultPortrait.png')}/>
                          <div className='association-info'>
                            <div className='association-name'>{detail.associationName}</div>
                            <div className='association-detail'>{detail.tagName}·{detail.area ? detail.area[detail.area.length -1] : ''}</div>
                            <div className='association-info-content'>{detail.features}</div>
                          </div>
                          {
                            detail.associationMemberFlag ?
                              detail.presidentFlag ? this.state.showShare ? <span onClick={(e)=>this.shareAssociation(e, detail)}><div className='btn-xs' style={{marginLeft: 0}}>邀请会员</div></span> : '' :
                                this.state.showShare ? <span onClick={()=>this.shareAssociation(e, detail)}><div className='btn-xs' style={{marginLeft: 0}}>邀请会员</div></span> : <span><div className='btn-xs btn-xs-disabled' style={{marginLeft: 0}}>已加入</div></span>
                              :
                              detail.associationJoinTypeEnum.value === 2 ?
                                <div
                                  className='community-association-button community-association-button-disabled'

                                >{detail.associationJoinTypeEnum.name}</div>

                                :

                                <div
                                  className='community-association-button'
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    this.props.dispatch({ type: 'buriedPoint/qmjs_associationdetail_join_click', payload: { objId: detail.associationPkId } })
                                    alert('加入协会', '确认加入该协会?', [
                                      { text: '取消', onPress: () => console.log('cancel') },
                                      { text: '确认', onPress: () => this.joinAssociation(detail.associationPkId) },
                                    ])
                                  }}
                                >加入</div>
                          }
                        </div>
                        <div className='association-about'>
                          <div className='association-about-item'><span>{detail.dynamicCount}</span>动态</div>
                          <div className='association-about-item'><span>{detail.activityCount}</span>活动</div>
                          <div className='association-member' onClick={()=>{
                            this.props.dispatch({ type: 'buriedPoint/qmjs_associationdetail_member_click', payload: { objId: detail.associationPkId } })
                            Router.push('/association/members', { associationPkId: detail.associationPkId, presidentFlag: detail.presidentFlag })
                          }}>
                            <div className='association-member-image'>
                              {
                                detail.members && detail.members.map((item, index)=> {
                                  let className = 'member-image-' + (index + 1)
                                  return <img key={index} className={className} src={item.avatar && item.avatar.length > 0 && item.avatar[0].thumbnail || require('../../../assets/defaultPortrait.png')}/>
                                })
                              }
                            </div>
                            <div className='member-number'>{detail.memberCount}名<IconSvg type='right' size='xs'/></div>
                          </div>
                        </div>
                      </div>
                      : ''
                  }
                  {
                    this.state.activityList.length > 0 ?
                      this.state.activityList.map((item, index) => (
                        <div key={index} className={index === this.state.activityList.length - 1 ? 'community-activity-item community-activity-item-last' : 'community-activity-item'}>
                          <div className='community-activity-header'>
                            <img className='community-activity-portrait' src={item.avatar && item.avatar.length > 0 && item.avatar[0].thumbnail || require(`../../../assets/defaultPortrait.png`)} alt=''/>
                            <div className='community-activity-info'>
                              <div className='community-activity-detail'>
                                <div className='community-activity-name'>{item.nickname}{item.presidentFlag ? <span className='president-border'>会长</span> : ''}</div>
                                { item.releaseType.value === 0 ?
                                  <div className='community-activity-button-number'>
                                    <div className='community-activity-number' onClick={()=>Router.push('/association/participants', {activityPkId: item.activityPkId})}><IconSvg type='number' size='xs'/>{item.enrollCount}</div>
                                    { item.activityStatus === 0 ? <div className='btn-xs btn-xs-disabled' onClick={(e)=>{e.stopPropagation()}}>未开始</div> : '' }
                                    { item.activityStatus === 1 ?
                                      item.enrollFlag ?
                                        <div className='btn-xs btn-xs-disabled' onClick={(e)=>{e.stopPropagation()}}>已报名</div> :
                                        <div
                                          className='btn-xs'
                                          onClick={(e)=>{
                                            e.stopPropagation()
                                            this.props.dispatch({ type: 'buriedPoint/qmjs_associationlist_activityapply_click', payload: { objId: item.activityPkId }})
                                            this.handleEnrollment(item.activityPkId, detail.associationPkId)
                                          }}
                                        >立即报名</div>
                                      : '' }
                                    { item.activityStatus === 2 ? <div className='btn-xs btn-xs-disabled' onClick={(e)=>{e.stopPropagation()}}>进行中</div> : '' }
                                    { item.activityStatus === 3 ? <div className='btn-xs btn-xs-gray' onClick={(e)=>{e.stopPropagation()}}>已结束</div> : '' }
                                  </div>
                                  : '' }
                              </div>
                              {/*<span className='community-activity-sign'>{item.associationName}</span>*/}
                            </div>
                          </div>
                          <div className='community-activity-body'>
                            <div className='community-activity-content'>
                              { item.topStatus ? <span className='top-quality'><IconSvg type='top' size='xxs'/></span> : '' }
                              { item.highlight ? <IconSvg type='quality' size='xxs'/> : '' }
                              {
                                item.releaseType.value === 0 ?
                                  <span className='color-themes'>【活动】</span>
                                  :
                                  // '【动态】'
                                  ''
                              }
                              { item.content }
                              {
                                item.content && item.content.length > 80 ?
                                  <span className='pack-up' onClick={() =>this.showAll(index, item.content)}>{item.content.length === 82 ? <IconSvg type='bottom' size='xs'/> : <IconSvg type='to_top' size='xs'/>}</span> : ''
                              }
                            </div>
                            <div className='community-activity-image'>
                              {item.images && item.images.map((img, ind)=> (
                                <div
                                  key={ind}
                                  className='community-activity-image-item'
                                  onClick={()=>this.previewImage(item.images, ind)}
                                  style={{background: 'url(' + img.thumbnail + ') no-repeat center'}}
                                />
                              ))}
                            </div>
                          </div>
                          <div className='community-activity-footer'>
                            <div className='community-activity-time'>{convertDate(item.createdDate)}</div>
                            <div className='community-activity-operation'>
                              {
                                item.likeFlag ? <span className='color-themes' onClick={() => this.cancelEventsLike(index, item.activityPkId, item)}><IconSvg type='praise-activity' size='sm' />{item.likeCount}</span> :
                                  <span onClick={() => this.eventsLike(index, item.activityPkId, item)}><IconSvg type='praise' size='sm' />{item.likeCount}</span>
                              }
                              <span
                                onClick={()=>{
                                  this.props.dispatch({ type: 'buriedPoint/qmjs_comment_click', payload: { objId: item.activityPkId, objType: item.releaseType.value === 0 ? '协会活动' : '协会动态' }})
                                  this.setState({showComments: true, dynamicActivityPkId: item.activityPkId, presidentFlag: detail.presidentFlag})
                                }}
                              ><IconSvg type='comments' size='sm'/>{item.compentCount}</span>
                              { this.state.showShare ? <span onClick={()=>this.shareActivity(item)}><IconSvg type='share' size='sm'/></span> : '' }
                              { !item.userFlag && !detail.presidentFlag ? '' : <span><IconSvg type='more' size='sm' onClick={()=>operation(this.getAction(item, detail.presidentFlag))}/></span> }
                            </div>
                          </div>
                        </div>
                      )) :
                      <Result
                        className='none-data none-data-top'
                        img={<IconSVG type={'none'} size={'lg'}/>}
                        title=""
                        message="暂无活动动态"
                      />
                  }
                  { this.state.showComments ? <Comments presidentFlag={this.state.presidentFlag} dynamicActivityPkId={this.state.dynamicActivityPkId} refresh={this.refreshTotal.bind(this)} onClose={this.closeComments.bind(this)}/> : '' }
                  {
                    this.state.previewImageShow ? <WxImageViewer onClose={()=>this.setState({previewImageShow: false})} urls={this.state.previewImageList} index={this.state.previewImageIndex}/> : ''
                  }
                  {
                    this.state.hasMore ? '' : this.state.activityList.length > 0 ? <div className='bottom-text'>我也是有底线的</div> : ''
                  }
                </InfiniteScroll>
              </div>
              {
                detail.associationMemberFlag || detail.presidentFlag ?
                  <div
                    className='add-button'
                    onClick={()=> {
                      this.props.dispatch({ type: 'buriedPoint/qmjs_association_issue_click', payload: { objId: detail.associationPkId }})
                      Router.push('/association/release/add', { associationPkId: detail.associationPkId })
                    }}
                  ><IconSvg type='add' size='md'/></div>
                  :
                  <div
                    className='add-button'
                    onClick={() =>{
                      this.props.dispatch({ type: 'buriedPoint/qmjs_association_issue_click', payload: { objId: detail.associationPkId }})
                      alert('加入协会可发布内容', '确认加入协会?', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确认', onPress: () => this.joinAssociation(detail.associationPkId) },
                      ])
                    }}
                  ><IconSvg type='add' size='md'/></div>
              }
              {
                this.state.previewImageShow ? <PreviewImage hidePreviewImage={()=>this.setState({previewImageShow: false})} previewImageList={this.state.previewImageList} previewImageIndex={this.state.previewImageIndex}/> : ''
              }
            </WingBlank>
        }
      </div>
    )
  }
}

export default AssociationDetail
