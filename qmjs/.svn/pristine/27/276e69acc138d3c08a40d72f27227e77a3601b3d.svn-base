import React, { Component } from 'react'
import './index.less'
import { connect } from 'dva'
import IconSvg from '@/components/icon-svg'
import Comments from '@/components/comments'
import WxImageViewer from 'react-wx-images-viewer'
import Router from '@/utils/router'
import { convertDate } from '@/utils/methons'
import InfiniteScroll from 'react-infinite-scroller'
import { Modal, Result, Toast } from 'antd-mobile'
import IconSVG from '@/components/icon-svg'
import PreviewImage from '@/components/preview-image'
const alert = Modal.alert
@connect(({ community }) => ({ community }))
class CommunityActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultActivityList: [],
      activityList: [],
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
    this.props.dispatch({ type: 'buriedPoint/qmjs_community_activity' })
    this.getActivityContent()
    this.preloadJs().then(()=> {})
  }

  getActivityContent =()=> {
    let body = {
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'community/activityContent', payload: body }).then(res => {
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
    if (this.state.canLoad && this.state.hasMore) {
      this.setState({
        canLoad: false,
        page: this.state.page + 1,
      })
      this.getActivityContent()
    }
  }

  showAll =(index, content)=> {
    let activityList = JSON.parse(JSON.stringify(this.state.defaultActivityList))
    if (content.length !== 82) {
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
        title: 'i体育活动',
        desc: item.content,
        link: window.location.href,
        imgUrl:item.images[0].thumbnail
      }, function(){
        that.showToast('分享成功！')
      },function(){
        that.showToast('分享失败！')
      })
    })
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

  render() {
    return (
      this.state.loading ? '' :
        <div id='padding-scroll'>
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={this.loadMoreData}
            hasMore={this.state.hasMore}
            useWindow={false}
          >
            {
              this.state.activityList.length > 0 ?
                this.state.activityList.map((item, index) => (
                  <div key={index} className={index === this.state.activityList.length - 1 ? 'community-activity-item community-activity-item-last' : 'community-activity-item'}>
                    <div className='community-activity-header'>
                      <img className='community-activity-portrait' src={item.avatar && item.avatar.length > 0 && item.avatar[0].thumbnail || require(`../../assets/defaultPortrait.png`)} alt=''/>
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
                                      this.props.dispatch({ type: 'buriedPoint/qmjs_communitylist_activityapply_click', payload: { objId: item.activityPkId }})
                                      this.handleEnrollment(item.activityPkId, item.associationPkId)
                                    }}
                                  >立即报名</div>
                                : '' }
                              { item.activityStatus === 2 ? <div className='btn-xs btn-xs-disabled' onClick={(e)=>{e.stopPropagation()}}>进行中</div> : '' }
                              { item.activityStatus === 3 ? <div className='btn-xs btn-xs-gray' onClick={(e)=>{e.stopPropagation()}}>已结束</div> : '' }
                            </div>
                            : '' }
                        </div>
                        <span
                          className='community-activity-sign'
                          onClick={()=>{
                            this.props.dispatch({ type: 'buriedPoint/qmjs_association_name_click', payload: { objId: item.activityPkId }})
                            Router.push('/association/detail', { associationPkId: item.associationPkId })
                          }}
                        >{item.associationName}</span>
                      </div>
                    </div>
                    <div className='community-activity-body'>
                      <div className='community-activity-content'>
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
                            this.setState({showComments: true, dynamicActivityPkId: item.activityPkId, presidentFlag: item.presidentFlag})
                          }}
                        ><IconSvg type='comments' size='sm'/>{item.compentCount}</span>
                        { this.state.showShare ? <span onClick={()=>this.shareActivity(item)}><IconSvg type='share' size='sm'/></span> : '' }
                      </div>
                    </div>
                  </div>
                )) :
                <Result
                  className='none-data'
                  img={<IconSVG type={'none'} size={'lg'}/>}
                  title=""
                  message="暂无活动"
                />
            }
            { this.state.showComments ? <Comments presidentFlag={this.state.presidentFlag} dynamicActivityPkId={this.state.dynamicActivityPkId} refresh={this.refreshTotal.bind(this)} onClose={this.closeComments.bind(this)}/> : '' }
            {
              this.state.previewImageShow ? <PreviewImage hidePreviewImage={()=>this.setState({previewImageShow: false})} previewImageList={this.state.previewImageList} previewImageIndex={this.state.previewImageIndex}/> : ''
            }
          </InfiniteScroll>
        </div>
    )
  }
}
export default CommunityActivity
