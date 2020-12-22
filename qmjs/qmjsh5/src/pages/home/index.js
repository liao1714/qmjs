import React, { Component } from 'react'
import { connect } from 'dva'
import { NavBar, WingBlank, Carousel, List, Badge, Tabs, NoticeBar  } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import HomeActivity from '@/components/home-activity'
import './index.less'
import { formatMessage } from 'umi-plugin-locale'
import { getUrlParam } from '@/utils/methons'
import Router from '@/utils/router'
import InfiniteScroll from 'react-infinite-scroller'

@connect(({ home, index }) => ({ home, index }))
class Home extends Component {
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
    this.props.dispatch({ type: 'buriedPoint/qmjs_home' })
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'home/banner' }).then(res=> {
      if (res && res.code === 200) {
        this.props.dispatch({ type:'index/tagTabBar' }).then(()=> {
          this.props.dispatch({ type: 'home/notice' }).then(()=> {
            this.props.dispatch({ type:'home/setActivityList', payload: [] })
            let body = {
              tagPkId: this.state.tagPkId,
              page: this.state.page,
              size: this.state.size,
            }
            this.props.dispatch({ type:'home/activity', payload: body }).then(res => {
              this.setState({
                canLoad: true,
                hasMore: !res,
                loading: false
              })
              this.props.dispatch({ type:'index/hideLoading'})
            })
          })
        })
      }
    })
  }


  getHomeActivity =()=> {
    let body = {
      tagPkId: this.state.tagPkId,
      page: this.state.page,
      size: this.state.size,
    }
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'home/activity', payload: body }).then(res => {
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
      this.getHomeActivity()
    }
  }

  getHomeActivityTab =(tagPkId)=> {
    this.props.dispatch({ type:'home/setActivityList', payload: [] })
    new Promise((resolve, reject) => {
      this.setState({
        page: 0,
        none: false,
        addPage: true,
        tagPkId: tagPkId
      })
      resolve()
    }).then(() => {
      this.getHomeActivity()
    })
  }
  toCampusFitness =()=> {
    const that = this
    this.props.dispatch({ type:'index/accessType' }).then(res => {
      if (res === 1) {
        UmsApi.globalization.liveDetection({
          sceneType: '00',
          isFinish: 1
        },
        function(res) {
          console.log('返回数据:' + JSON.stringify(res))
          window.location.href = 'http://ijs.sports.xm.gov.cn/wx/#/home'
          that.props.dispatch({ type: 'buriedPoint/qmjs_schoolfitness_click' })
        },
        function(err) {
          console.log('返回数据:' + JSON.stringify(err))
        })
      } else {
        window.location.href = 'http://ijs.sports.xm.gov.cn/wx/#/home'
        that.props.dispatch({ type: 'buriedPoint/qmjs_schoolfitness_click' })
      }
    })
  }
  toForwordUrl =(item)=> {
    console.log(item)
    this.props.dispatch({ type: 'buriedPoint/qmjs_homebanner_click', payload: { objId: item.pkId }})
    if (item.urlType.value === 0) {
      if (getUrlParam('pkId', item.forwordUrl)) {
        Router.push('/activity/detail', { pkId: getUrlParam('pkId', item.forwordUrl) })
      }
    } else {
      if (item.forwordUrl.indexOf('?') === -1) {
        window.location.href = item.forwordUrl + '?redirect=' + window.location.href
      } else {
        window.location.href = item.forwordUrl + '&redirect=' + window.location.href
      }
    }
  }

  toBanner =(item)=> {
    this.props.dispatch({ type: 'buriedPoint/qmjs_homebanner_show', payload: { objId: item.pkId }})
  }
  toNotice =()=> {
    this.props.dispatch({ type: 'buriedPoint/qmjs_homenotice_click' })
    Router.push('/my/notice')
  }


  render() {
    const { home, index } = this.props
    console.log('home')
    console.log(home)
    // home.noticeList = [
    //   {
    //     title: '你好'
    //   },
    //   {
    //     title: '白部'
    //   },
    // ]
    let tabs = [{ title: '全部', tagPkId: '' },]
    tabs = index.tagTabBarList ? tabs.concat(index.tagTabBarList) : []
    return (
      <div className='home-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back'  size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        ><IconSvg type='logo' size='md'/>{formatMessage({ id: 'index.title' })}</NavBar>
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

                  {
                    home && home.bannerList && home.bannerList.length > 0 ?
                      <div className='parent-wrapper'>
                        <Carousel
                          className='banner-wrapper'
                          autoplay={true}
                          infinite={true}
                          autoplayInterval={3000}
                          afterChange={index => this.toBanner(home.bannerList[index])}
                        >
                          {home.bannerList.map((item, index) => (
                            <img
                              key={index}
                              className='banner-img'
                              src={item.image && item.image.length > 0 ? item.image[0].thumbnail : ''}
                              alt=''
                              onClick={()=>this.toForwordUrl(item)}
                            />
                          ))}
                        </Carousel></div> : ''
                  }
                  {
                    home.noticeList.length > 0 ?
                      <List className='notice-wrapper'>
                        <NoticeBar
                          // mode="link"
                          icon={
                            <Badge className='notice-icon'>
                              <IconSvg type='icon_tongzhi' size='xxs'/>

                            </Badge>
                          }
                        >
                          <div className='carousel-block'>
                            <Carousel
                              className="my-carousel"
                              vertical
                              dots={false}
                              dragging={false}
                              swiping={false}
                              autoplay
                              infinite
                              speed={200}
                              autoplayInterval={3000}
                              resetAutoplay={false}
                            >
                              {home.noticeList.map((item, index) => (
                                <div className="v-item" key={index} onClick={()=>this.toNotice()}><span>{item.title}</span></div>
                              ))}
                            </Carousel>
                            <span className='notice-number'>{home.noticeList.length}</span>
                          </div>
                        </NoticeBar>
                      </List>
                      : ''
                  }
                  {/*<div className='campus-fitness'>*/}
                  {/*  <List>*/}
                  {/*    <List.Item*/}
                  {/*      arrow="horizontal"*/}
                  {/*      thumb={<img src={require('../../assets/campus-fitness.png')}/>}*/}
                  {/*      multipleLine*/}
                  {/*      onClick={() => this.toCampusFitness()}*/}
                  {/*    >*/}
                  {/*      校园健身*/}
                  {/*    </List.Item>*/}
                  {/*  </List>*/}
                  {/*</div>*/}
                  <div className='tabs-wrapper'>
                    {
                      tabs.length > 0 ?
                        <Tabs
                          tabBarBackgroundColor='#f8f8f8'
                          // tabBarUnderlineStyle={{width:'30px',marginLeft:'20px',background:'#1491ED'}}
                          tabs={tabs}
                          initialPage={0}
                          onChange={(tab, index) => {
                            this.props.dispatch({ type: 'buriedPoint/qmjs_homeactivity_tagclick', payload: { objId: tab.tagPkId }})
                            this.getHomeActivityTab(tab.tagPkId)
                          }}
                          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
                        />
                        : ''
                    }
                  </div>
                  <HomeActivity/>
                  {
                    this.state.hasMore ? '' : <div className='bottom-text'>我也是有底线的</div>
                  }

                </InfiniteScroll>
              </div>
            </WingBlank>
        }
      </div>
    )
  }
}


export default Home
