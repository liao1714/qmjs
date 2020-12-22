import React, { Component } from 'react'
import './index.less'
import { Toast, Modal, InputItem, Result } from 'antd-mobile'
import { connect } from 'dva'
import IconSVG from '@/components/icon-svg'
import InfiniteScroll from 'react-infinite-scroller'
import { convertDate } from '@/utils/methons'
const alert = Modal.alert
@connect(({ activity }) => ({ activity }))
class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      commentsList: [],
      comments: '',
      total: 0,

      page: 0,
      size: 20,
      loading: true,
      canLoad: true,
      hasMore: true,
    }
  }

  componentDidMount() {
    this.getActivityComment()
  }

  getActivityComment =()=> {
    let body = {
      dynamicActivityPkId: this.props.dynamicActivityPkId,
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'activity/activityComment', payload: body }).then(res => {
      if (res && res.code === 200) {
        let commentsList = this.state.commentsList.concat(res.data.result)
        this.setState({
          commentsList: commentsList,
          canLoad: true,
          hasMore: commentsList.length !== parseInt(res.data.total),
          total: parseInt(res.data.total),
        })
      }
    })
  }
  loadMoreData =()=> {
    if (this.state.canLoad && this.state.hasMore) {
      this.setState({
        canLoad: false,
        page: this.state.page + 1,
      })
      this.getActivityComment()
    }
  }

  onClose(value) {
    this.props.onClose(value)
  }
  refresh(total) {
    this.props.refresh(total)
  }
  getComments =(value)=> {
    this.setState({
      comments: value
    })
  }
  handleComments =(e)=> {
    e.stopPropagation()
    if (this.state.comments) {
      let body = {
        dynamicActivityPkId: this.props.dynamicActivityPkId,
        comments: this.state.comments,
      }
      this.props.dispatch({ type:'activity/pushActivityComment', payload: body }).then(res => {
        if (res && res.code === 200) {
          const commentsList = this.state.commentsList
          commentsList.unshift(res.data)
          this.setState({
            commentsList: commentsList,
            total: this.state.total + 1,
            comments: '',
          })
          this.refresh(this.state.total)
        }
      })
    } else {
      Toast.info('请输入内容', 1)
    }
  }
  deleteComments =(compentPkId)=> {
    let body = {
      compentPkId: compentPkId,
    }
    this.props.dispatch({ type:'activity/removeActivityComment', payload: body }).then(res => {
      if (res && res.code === 200) {
        let commentsList = this.state.commentsList
        commentsList = commentsList.filter(item => item.compentPkId !== compentPkId)
        this.setState({
          commentsList: commentsList,
          total: this.state.total - 1,
        })
        this.refresh(this.state.total)
      }
    })
  }
  render() {
    console.log(this.state.commentsList)
    return (
      <Modal
        popup
        onClose={()=>this.onClose.bind(this, false)}
        visible={this.state.show}
        animationType="slide-up"
      >
        <div className='comments-wrapper'>
          <div className='comments-content'>
            <div className='comments-content-header'>
              <span>评论({this.state.total})条</span>
              <span onClick={this.onClose.bind(this, false)}>关闭</span>
            </div>
            <div className='comments-body'>
              <InfiniteScroll
                initialLoad={false}
                pageStart={1}
                loadMore={this.loadMoreData}
                hasMore={this.state.hasMore}
                useWindow={false}
              >
                {
                  this.state.commentsList.length > 0 ? this.state.commentsList.map((item, index)=> (
                    <div key={index} className='comments-item'>
                      <img className='comments-portrait' src={item.avatar && item.avatar.length > 0 && item.avatar[0].thumbnail || require('../../assets/defaultPortrait.png')}/>
                      <div className='comments-name-content'>
                        <div className='comments-name'>
                          {item.nickname}
                          <div className='comments-date'>{convertDate(item.createdDate)}</div>
                        </div>
                        <div className='comments-content'>{item.comments}</div>
                      </div>
                      {
                        item.userFlag || this.props.presidentFlag ?
                          <div className='comments-date-delete'>
                            <IconSVG
                              type={'delete'} size={'xs'}
                              onClick={(e) =>{
                                e.stopPropagation()
                                alert('删除评论', '确认删除该评论?', [
                                  { text: '取消', onPress: () => console.log('cancel') },
                                  { text: '确认', onPress: () => this.deleteComments(item.compentPkId) },
                                ])
                              }
                              }
                            />
                          </div>
                          : ''
                      }
                    </div>
                  ))
                    :
                    <Result
                      className='none-data'
                      img={<IconSVG type={'none'} size={'lg'}/>}
                      title=""
                      message="暂无评论"
                    />
                }
              </InfiniteScroll>
            </div>
          </div>
          <div className='comments-input'>
            <InputItem
              placeholder="说两句..."
              value={this.state.comments}
              onChange={(value)=>this.getComments(value)}
            />
            <div className='comments-button'>
              <div className='btn-sm' onClick={(e)=>this.handleComments(e)}>发表</div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
export default Comments
