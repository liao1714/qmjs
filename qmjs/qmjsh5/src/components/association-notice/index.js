import React, { Component } from 'react'
import './index.less'
import { connect } from 'dva'
import { Modal, Result, Toast } from 'antd-mobile'
import IconSVG from '@/components/icon-svg'
import { convertDate, formatDate } from '@/utils/methons'
import InfiniteScroll from 'react-infinite-scroller'
import Router from '@/utils/router'

const alert = Modal.alert
const prompt = Modal.prompt

@connect(({ my }) => ({ my }))
class AssociationNotice extends Component {
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

  getAssociationNoticeData =()=> {
    let body = {
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'my/associationNotice', payload: body }).then(res => {
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
      this.getAssociationNoticeData()
    }
  }

  getDefault =()=> {
    return new Promise(resolve => {
      this.props.dispatch({ type:'index/loading'})
      this.props.dispatch({ type:'my/setAssociationNoticeData', payload: []})
      this.props.dispatch({ type:'my/associationNotice', payload: { size: this.state.size, page: this.state.page } }).then(res=> {
        resolve(res)
        this.props.dispatch({ type:'index/hideLoading'})
      })
    })
  }

  associationChek =(pkId, operateType, rejectMsg)=> {
    return new Promise(resolve => {
      let body = {
        pkId: pkId,
        operateType: operateType,
        rejectMsg: rejectMsg,
      }
      Toast.loading('提交中...', 0)
      if (operateType === 0) {
        if (body.rejectMsg) {
          this.props.dispatch({ type:'my/associationChek', payload: body}).then(res => {
            if (res && res.code === 200) {
              Toast.info(res.message)
              this.getDefault().then(res => {})
            }
            resolve()
          })
        } else {
          Toast.info('请输入拒绝原因！')
        }
      } else {
        this.props.dispatch({ type:'my/associationChek', payload: body}).then(res => {
          if (res && res.code === 200) {
            Toast.info(res.message)
            this.getDefault().then(res => {})
          }
          resolve()
        })
      }
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
              my.associationNoticeData.length > 0 ? my.associationNoticeData.map((item, index) => (
                <div key={index} className='notice-list'>
                  <div className='notice-list-header'>
                    <img className='notice-portrait' src={item.association.avatarUrls && item.association.avatarUrls.length > 0 && item.association.avatarUrls[0].thumbnail || require('../../assets/defaultPortrait.png')}/>
                    <div className='notice-association'>{item.association.associationName}</div>
                    <div className='notice-time'>{convertDate(item.createdDate)}</div>
                  </div>
                  <div className='notice-list-body'>
                    <div className='notice-list-title'>{item.title}</div>
                    <div className='notice-list-message'>{item.content}</div>
                  </div>
                  <div className='notice-list-operation'>
                    <span style={{display: 'flex'}}>
                      {
                        item.childNoticeType.value === 0 && item.association.checkStatus.value === 0 ?
                          <div
                            className='btn-sm'
                            onClick={() => prompt('拒绝加入', '拒绝原因',
                              [
                                {
                                  text: '取消',
                                  onPress: value => new Promise((resolve) => {
                                    resolve()
                                  }),
                                },
                                {
                                  text: '确定',
                                  onPress: value => new Promise((resolve, reject) => {
                                    this.associationChek(item.pkId, 0, value).then(res => {
                                      resolve()
                                    })
                                  }),
                                },
                              ], 'default', null, ['请输入拒绝原因'])}
                          >拒绝</div>
                          : ''
                      }
                      {
                        item.childNoticeType.value === 0 && item.association.checkStatus.value === 0 ?
                          <div
                            className='btn-sm'
                            onClick={(e) =>{
                              e.stopPropagation()
                              alert('通过审核', '确定通过后该会员成功加入?', [
                                { text: '取消', onPress: () => console.log('cancel') },
                                { text: '确认', onPress: () => this.associationChek(item.pkId, 1, '') },
                              ])
                            }}
                          >通过</div>
                          : ''
                      }
                      {
                        item.childNoticeType.value === 0 && item.association.checkStatus.value === 1 ?
                          <div className='btn-sm btn-sm-disabled'>已通过</div>
                          : ''
                      }
                      {
                        item.childNoticeType.value === 0 && item.association.checkStatus.value === 2 ?
                          <div className='btn-sm btn-sm-gray'>已拒绝</div>
                          : ''
                      }
                      { item.childNoticeType.value === 1 ? <div className='btn-sm' onClick={()=>Router.push('/association/detail', { associationPkId: item.association.pkId })}>进入协会</div> : '' }
                      { item.childNoticeType.value === 2 ? <div className='btn-sm' onClick={()=>Router.push('/association/detail', { associationPkId: item.association.pkId })}>进入协会</div> : '' }
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
export default AssociationNotice
