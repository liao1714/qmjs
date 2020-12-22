import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import { List, Badge, Picker, NavBar, WingBlank, Icon } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import { setLocale, getLocale, formatMessage } from 'umi-plugin-locale'
import Router from '@/utils/router'
import PreviewImage from '@/components/preview-image'
const Item = List.Item
@connect(({ my, index }) => ({ my, index }))
class My extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewImageShow: false,
      previewImageList: [],
      previewImageIndex: null,
      loading: true
    }
  }

  componentDidMount() {
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'index/userInfo' }).then(res => {
      this.setState({
        loading: false
      })
      this.props.dispatch({ type:'index/hideLoading'})
    })
  }
  previewImage =(image)=> {
    let list = []
    image.map(item => {
      list.push(item.originalImage)
    })
    this.setState({
      previewImageShow: true,
      previewImageList: list,
      previewImageIndex: 0
    })
  }
  render() {
    const { index } = this.props
    const data = [
      { value: 'zh-CN', label: '中文' },
      { value: 'en-US', label: '英文' },
    ]
    return (
      <div className='my-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back'  size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        ><IconSvg type='logo' size='md'/>{formatMessage({ id: 'index.title' })}</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container' style={{padding: 0}}>
              <div className='my-header-wrapper'>
                {
                  index.userInfo ?
                    <div className='my-header'    onClick={()=>Router.push('/my/info')}>
                      <div className='my-header-baseInfo'> 
                        {
                          index.userInfo.avatar === null || index.userInfo.avatar.length === 0 ?
                            <img
                              className='my-portrait'
                              src={require('../../assets/defaultPortrait.png')}
                              alt=''
                            />
                            :
                            <img
                              className='my-portrait'
                              src={index.userInfo.avatar[0].thumbnail}
                              alt=''
                              onClick={(e)=>{
                                e.stopPropagation()
                                this.previewImage(index.userInfo.avatar)
                              }}
                            />
                        }
                        <div className='nickname-introduction'>
                          <div className='my-nickname'>{index.userInfo.nickname}</div>
                          {
                            index.userInfo.introduction ? <div className='my-introduction'>{index.userInfo.introduction}</div> : ''
                          }
                        </div>
                      </div>
                      {/* <div><Icon type={'right'} color='#fff' ></Icon></div> */}
                    </div> : ''
                }
              </div>
              <div className='list-wrapper'>
                <List>
                  <Item
                    arrow="horizontal"
                    thumb={<IconSvg type='icon_wo_huod' size='md'/>}
                    multipleLine
                    extra={<Badge text={index.userInfo.eventsCount} overflowCount={99} />}
                    onClick={()=>Router.push('/my/activity')}
                  >
                   我报名的活动
                  </Item>
                  <Item
                    arrow="horizontal"
                    thumb={<IconSvg type='icon_wo_geren' size='md'/>}
                    multipleLine
                    extra={index.userInfo.certLevel && index.userInfo.certLevel.value === 0 ? '未认证' : '已认证'}
                    onClick={()=>Router.push('/my/info')}
                  >
                    个人信息
                  </Item>
                  <Item
                    arrow="horizontal"
                    thumb={<IconSvg type='icon_wo_xiaoxi' size='md'/>}
                    multipleLine
                    extra={<Badge text={index.userInfo.noticeCount} overflowCount={99} />}
                    onClick={()=>Router.push('/my/notice')}
                  >
                    系统消息
                  </Item>
                  {/*<Picker*/}
                  {/*  data={data}*/}
                  {/*  cols={1}*/}
                  {/*  value={[getLocale()]}*/}
                  {/*  onChange={v => getLocale() === v}*/}
                  {/*  onOk={v => setLocale(v)}*/}
                  {/*>*/}
                  {/*  <List.Item arrow="horizontal">*/}
                  {/*    <div className='svg-language'><IconSvg type='language' size='xs'/></div>*/}
                  {/*    语言设置*/}
                  {/*  </List.Item>*/}
                  {/*</Picker>*/}
                </List>
              </div>
              {
                this.state.previewImageShow ? <PreviewImage hidePreviewImage={()=>this.setState({previewImageShow: false})} previewImageList={this.state.previewImageList} previewImageIndex={this.state.previewImageIndex}/> : ''
              }
            </WingBlank>
        }
      </div>
    )
  }
}

export default My
