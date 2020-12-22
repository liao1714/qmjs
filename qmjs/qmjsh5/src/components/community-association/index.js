import React, { Component } from 'react'
import './index.less'
import { connect } from 'dva'
import { Button, Modal, Result, Toast, WingBlank } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import Router from '@/utils/router'
import IconSVG from '@/components/icon-svg'
const alert = Modal.alert
import InfiniteScroll from 'react-infinite-scroller'

@connect(({ community }) => ({ community }))
class CommunityAssociation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      size: 10,
      loading: true,
      canLoad: true,
      hasMore: true,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'buriedPoint/qmjs_community_associationlist' })
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'community/setFindAssociationData', payload: []})
    this.props.dispatch({ type:'community/mineAssociation'}).then(() => {
      this.props.dispatch({ type:'community/findAssociation', payload: { size: this.state.size, page: this.state.page } }).then(res=> {
        this.setState({
          loading: false,
          hasMore: !res,
        })
        this.props.dispatch({ type:'index/hideLoading'})
      })
    })
  }
  getFindAssociationData =()=> {
    let body = {
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'community/findAssociation', payload: body }).then(res => {
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
      this.getFindAssociationData()
    }
  }

  joinAssociation =(associationPkId)=> {
    this.props.dispatch({ type:'community/joinAssociation', payload: { associationPkId: associationPkId } }).then(res => {
      if (res && res.code === 200) {
        if (res.message === '加入成功') {
          this.props.dispatch({ type:'community/updateFindAssociationData', payload: { pkId: associationPkId, type: 'DELETE' } })
          this.props.dispatch({ type:'community/mineAssociation'})
        } else {
          this.props.dispatch({ type:'community/updateFindAssociationData', payload: { pkId: associationPkId, type: 'UPDATE' } })
        }
        Toast.info(res.message, 2)
      }
    })
  }
  toAssociationDetail =(item)=> {
    this.props.dispatch({ type: 'buriedPoint/qmjs_community_myassociation_click', payload: { objId: item.associationPkId } })
    this.props.dispatch({ type:'community/newActivityRead', payload: { dynamicActivityPkId: item.dynamicActivityPkId } }).then(res => {
      if (res && res.code === 200) {
        Router.push('/association/detail', { associationPkId: item.associationPkId })
      }
    })
  }

  render() {
    const { community } = this.props
    return (
      !this.state.loading ?
        <div id='padding-scroll' className='com-association'>
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={this.loadMoreData}
            hasMore={this.state.hasMore}
            useWindow={false}
          >
            <div className='my-association'>
              <div className='association-header'>
                <div className='association-title'><span>我的协会</span><label></label></div>
                <div
                  className='association-create'
                  onClick={()=>{
                    this.props.dispatch({ type: 'buriedPoint/qmjs_associationlist_create01_click' })
                    Router.push('/association/create')
                  }}
                ><IconSvg type='add' size='xxs' /><span >创建协会</span></div>
              </div>
              <div className='association-body'>
                {
                  community && community.mineAssociationData.length > 0 ?
                    community.mineAssociationData.map((item, index)=> (
                      <div key={index} className={index === community.mineAssociationData.length - 1 ? 'association-list association-list-last' : 'association-list'} onClick={()=> this.toAssociationDetail(item)}>
                        <img className='association-portrait' src={item.avatarUrl && item.avatarUrl.length > 0 && item.avatarUrl[0].thumbnail || require('../../assets/defaultPortrait.png')}/>
                        <div className='association-info'>
                          <div className='association-info-block'>
                            <div style={{display:'flex',flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
                              <div className='association-name'>
                                <div className='name-block'>
                                  <label>{item.associationName}</label>
                                  {/* <IconSvg type='icon_new' size='md'/>  */}
                                  {item.content ? !item.readFlag ? <img src={require('../../assets/new2x.png')} ></img> : '' : ''}
                                </div>
                                {/* {item.presidentFlag ? <span className='president-border'>会长</span> : ''} */}
                              </div>
                              { item.content ?  <div className='association-content'>
                                {item.releaseType && item.releaseType.value === 0 ? <img src={require('../../assets/active.png')}></img>: ''}
                                {/* {item.releaseType && item.releaseType.value === 1 ? <span className='spaceText'>{item.content}</span> : ''} */}
                                {/* {item.releaseType && item.releaseType.value === 1 ? ' ' : ' '} */}
                                <div className='content-div'>{' ' + item.content}</div>
                              </div> : '' }
                            </div>
                            {
                              item.presidentFlag ?
                                <div className='hz-block'>
                                  <IconSvg type='icon_huizh' size='md'/>
                                </div> : ''
                            }    
                        
                          </div>


                         
                        </div>                                     
                      </div>
                    ))
                    :
                    <Result
                      className='none-data'
                      img={<IconSVG type={'none'} size={'lg'}/>}
                      title=""
                      message="未加入任何协会"
                    />
                }
              </div>
            </div>
            <div className='find-association'>
              <div className='association-header'>
                <div className='association-title'><span>发现协会</span><label></label></div>
              </div>
              <div className='association-body find-body'>
                {
                  community && community.findAssociationData.length > 0 ?
                    community.findAssociationData.map((item, index)=> (
                      <div key={index} className={index === community.findAssociationData.length - 1 ? 'association-list association-list-last' : 'association-list'} onClick={()=>Router.push('/association/detail', { associationPkId: item.pkId })}>
                        <img className='association-portrait' src={item.avatarUrl && item.avatarUrl.length > 0 && item.avatarUrl[0].thumbnail || require('../../assets/defaultPortrait.png')}/>
                        <div className='association-info'>
                          <div className='association-name'>{item.associationName}</div>
                          <div className='association-detail'>{item.tagName}·{item.area[item.area.length - 1]}·{item.memberCount}人</div>
                          <div className='association-info-content'>{item.features}</div>
                        </div>
                        <div>
                          {
                            item.applyFlag ?
                              <div style={{marginLeft: 0}} className='apply-join apply-join-disable'>待审核</div>
                              :
                              <div
                                style={{marginLeft: 0}}
                                className='apply-join'
                                onClick={(e) =>{
                                  e.stopPropagation()
                                  this.props.dispatch({ type: 'buriedPoint/qmjs_associationlist_join_click', payload: { objId: item.associationPkId } })
                                  alert('加入协会', '确认加入该协会?', [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确认', onPress: () => this.joinAssociation(item.pkId) },
                                  ])
                                }
                                }
                              >申请加入</div>
                          }
                        </div>
                      </div>
                    ))
                    :
                    <Result
                      className='none-data'
                      img={<IconSVG type={'none'} size={'lg'}/>}
                      title=""
                      message="暂无其他协会"
                    />
                }
              </div>
            </div>
            <div className='my-association-button'>
              <div className='create-association'>
                <div
                  className='create-asso-bt'
                  onClick={()=>{
                    this.props.dispatch({ type: 'buriedPoint/qmjs_associationlist_create02_click' })
                    Router.push('/association/create')
                  }}
                >创建协会<IconSvg type='add' size='xxs'/>
                </div>
              </div>
            </div>
          </InfiniteScroll>
        </div>
        : ''
    )
  }
}
export default CommunityAssociation
