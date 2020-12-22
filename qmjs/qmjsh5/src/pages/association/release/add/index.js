import React, { Component } from 'react'
import { connect } from 'dva'
import '../index.less'
import { NavBar, WingBlank, Picker, List, InputItem, TextareaItem,  DatePicker, ImagePicker, Modal, Toast, ActivityIndicator } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import { createForm } from 'rc-form'
import BackToNativeHome from '@/components/back-to-native-home'
import city from '@/assets/json/province_city_area.json'
import Router from '@/utils/router'
import { NotEmpty } from '@/utils/formValid'
import { uploadWatermarkOneByOne } from '@/utils/uploadImages'
import { compressImagesOneByOne, dataURLtoFile, changeWxImagesOneByOne } from '@/utils/methons'
import wx from 'weixin-js-sdk'

const alert = Modal.alert
@connect(({ association }) => ({ association }))
class Release extends Component {
  constructor(props) {
    super(props)
    this.state = {
      releaseList: [
        { label: '活动', value: 0 },
        { label: '动态', value: 1 }
      ],
      imgUrls: [],
      type: 0,
      imgList:[],

      animating: false,
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'buriedPoint/qmjs_community_dynamicissue', payload: { objId: this.props.location.query.associationPkId }})
    
  }
  handleForm =()=> {
    if(this.state.imgUrls.length > 9) {
      Toast.info('图片最多上传9张，请手动删除超出的图片', 3)
      return false
    }
    const value = this.props.form.getFieldsValue()
    if (value.releaseType[0] === 0) {
      let body = {
        associationPkId: this.props.location.query.associationPkId,
        releaseType: value.releaseType[0],
        content: value.content,
        imgUrls: value.imgUrls,
        enrollEndTime: new Date(value.enrollEndTime).getTime(),
        activityBeginTime: new Date(value.activityBeginTime).getTime(),
        activityEndTime: new Date(value.activityEndTime).getTime(),
        area: value.area,
        address: value.address,
        activityNumber: value.activityNumber,
      }
      if (body.content || body.imgUrls.length > 0) {
        if (
          NotEmpty(body.enrollEndTime, '请选择报名截止时间') &&
          NotEmpty(body.activityBeginTime, '请选择活动开始时间') &&
          NotEmpty(body.activityEndTime, '请选择活动结束时间') &&
          NotEmpty(body.area, '请选择活动地区') &&
          NotEmpty(body.address, '请输入活动地址') &&
          NotEmpty(body.activityNumber, '请输入活动人数')
        ) {
          Toast.loading('提交中...', 0)
          uploadWatermarkOneByOne(value.imgUrls, this.props.location.query.associationPkId).then(res => {
            body.imgUrls = res
            this.props.dispatch({type: 'association/pushActivity', payload: body}).then(res => {
              if (res && res.code === 200) {
                Toast.info(res.message, 2)
                Router.go(-1)
                this.props.dispatch({ type: 'buriedPoint/qmjs_community_dynamicissue', payload: { objId: this.props.location.query.associationPkId, objType: this.state.releaseList[body.releaseType].label }})
              }
            })
          })
        }
      } else {
        Toast.info('内容或者图片至少填一项', 2)
      }
    } else {
      let body = {
        associationPkId: this.props.location.query.associationPkId,
        releaseType: value.releaseType[0],
        content: value.content,
        imgUrls: value.imgUrls,
      }
      if (body.content || body.imgUrls.length > 0) {
        Toast.loading('提交中...', 0)
        uploadWatermarkOneByOne(value.imgUrls, this.props.location.query.associationPkId).then(res => {
          body.imgUrls = res
          this.props.dispatch({type: 'association/pushActivity', payload: body}).then(res => {
            if (res && res.code === 200) {
              Toast.info(res.message, 2)
              Router.go(-1)
              this.props.dispatch({ type: 'buriedPoint/qmjs_community_dynamicissue', payload: { objId: this.props.location.query.associationPkId, objType: this.state.releaseList[body.releaseType].label }})
            }
          })
        })
      } else {
        Toast.info('内容或者图片至少填一项', 2)
      }
    }
  }
  onChange = (files, type, index) => {
    console.log(files, type, index)
    // if(files.length > 9 || this.state.imgUrls.length > 9) {
    //   Toast.info('图片上传超过九张，请再上传一次', 2)
    //   return false
    // }

    // this.showToast()

    


    let ua = navigator.userAgent
    if (ua.toLowerCase().indexOf('xmsmk') > -1) {
      UmsApi.page.hideNavigationBar()
    }
    
    this.setState({ animating: !this.state.animating })

    compressImagesOneByOne(files, 2).then(res => {
      
      if (ua.toLowerCase().indexOf('xmsmk') > -1) {
        UmsApi.page.hideNavigationBar()
      }


      this.setState({ animating: !this.state.animating })
      this.setState({
        imgUrls: res
      })
      this.props.form.setFieldsValue({
        imgUrls: res
      })
    })
  }

  getImages =()=> {
    let that = this
    this.props.dispatch({ type:'index/getWxConfig', payload: { url: window.location.href }}).then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appid, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名
        jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function(){
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if(res.errMsg == 'chooseImage:ok' && res.localIds.length > 0) {
              changeWxImagesOneByOne(res.localIds, 2).then(res => {
                let imgUrls = that.state.imgUrls.concat(res)
                that.setState({
                  imgUrls: imgUrls,
                })
                that.props.form.setFieldsValue({
                  imgUrls: imgUrls,
                })
              })
            }
          }
        })
      })
    })
  }

  delImages =(index)=> {
    let imgUrls = JSON.parse(JSON.stringify(this.state.imgUrls)) 
    imgUrls.splice(index, 1)
    this.setState({
      imgUrls: imgUrls
    })
  }

  showToast = () => {
    this.setState({ animating: !this.state.animating })
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating })
    }, 1000)
  }


  render() {
    const { getFieldProps } = this.props.form
    const ua = window.navigator.userAgent.toLowerCase()
    const isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1 //android终端
    const isiOS = !!ua.match(/\(i[^;]+;( U;)? cpu.+mac os x/) //ios终端

    return (
      <div className='release-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >内容发布</NavBar>
        <WingBlank size="md" className='container form-container'>
          <List>
            <Picker
              data={this.state.releaseList}
              cols={1}
              onOk={(v)=>this.setState({type: v[0]})}
              extra={<span className='placeholder'>发布类型</span>}
              {...getFieldProps('releaseType',{
                initialValue: [0],
              })}
            >
              <List.Item className='require' arrow={'horizontal'}>发布类型</List.Item>
            </Picker>
            <TextareaItem
              title=""
              className='require'
              placeholder='请输入内容'
              rows={5}
              count={500}
              {...getFieldProps('content',{
                initialValue: '',
              })}
            >内容</TextareaItem>
            <img src="" id="image1" alt="" className="imgstyle" style={{width: '200px',height: '200px', display: 'none'}} />
            <List.Item className='require'>
              图片
              <List.Item.Brief>
                {/* <ImagePicker
                  multiple
                  files={this.state.imgUrls}
                  onChange={this.onChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={this.state.imgUrls.length < 9}
                  // accept="image/gif,image/jpeg,image/jpg,image/png"
                  accept="image/*"
                /> */}
                {
                  isAndroid? 
                    ua.match(/MicroMessenger/i)=='micromessenger' ?
                      <div className='common-picker-row'>
                        {
                          this.state.imgUrls.map((item, index) => {
                            return <div className='img-item' key={index}>
                              <img src={item.url}></img>
                              <div className='del' onClick={() =>this.delImages(index)}>x</div>
                            </div>
                          })
                        }
                        {
                          this.state.imgUrls.length < 9 ? 
                            <div onClick={this.getImages} className='addImg'>+</div>
                            :
                            ''
                        }
                      </div>
                      : <ImagePicker
                        multiple
                        files={this.state.imgUrls}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={this.state.imgUrls.length < 9}
                        // accept="image/gif,image/jpeg,image/jpg,image/png"
                        accept="image/*"
                      /> : ''
                }
                {
                  isiOS? <ImagePicker
                    multiple
                    files={this.state.imgUrls}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.imgUrls.length < 9}
                    // accept="image/gif,image/jpeg,image/jpg,image/png"
                    accept="image/*"
                  /> : ''
                }


                {/* <ImagePicker
                  multiple
                  files={this.state.imgUrls}
                  onChange={this.onChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={this.state.imgUrls.length < 9}
                  // accept="image/gif,image/jpeg,image/jpg,image/png"
                  accept="image/*"
                /> */}
                
              </List.Item.Brief>
              <InputItem
                {...getFieldProps('imgUrls', {
                  initialValue: [],
                })}
                className={'hidden'}
              />            </List.Item>
            {
              this.state.type === 0 ?
                <div>
                  <DatePicker
                    mode="datetime"
                    title=''
                    extra={<span className='placeholder'>报名截止时间</span>}
                    {...getFieldProps('enrollEndTime',{
                      initialValue: '',
                    })}
                    okText='确定'
                    dismissText='取消'
                  >
                    <List.Item className='require' arrow={'horizontal'}>报名截止时间</List.Item>
                  </DatePicker>
                  <DatePicker
                    mode="datetime"
                    title=''
                    extra={<span className='placeholder'>活动开始时间</span>}
                    {...getFieldProps('activityBeginTime',{
                      initialValue: '',
                    })}
                    okText='确定'
                    dismissText='取消'
                  >
                    <List.Item className='require' arrow={'horizontal'}>活动开始时间</List.Item>
                  </DatePicker>
                  <DatePicker
                    mode="datetime"
                    title=''
                    extra={<span className='placeholder'>活动结束时间</span>}
                    {...getFieldProps('activityEndTime',{
                      initialValue: '',
                    })}
                    okText='确定'
                    dismissText='取消'
                  >
                    <List.Item className='require' arrow={'horizontal'}>活动结束时间</List.Item>
                  </DatePicker>
                  <Picker
                    data={city}
                    cols={3}
                    {...getFieldProps('area',{
                      initialValue: [],
                    })}
                    extra={<span className='placeholder'>活动地区</span>}
                  >
                    <List.Item className='require' arrow={'horizontal'}>活动地区</List.Item>
                  </Picker>
                  <InputItem
                    className='require'
                    // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                    placeholder='活动地址'
                    {...getFieldProps('address',{
                      initialValue: '',
                    })}
                  >活动地址</InputItem>
                  <InputItem
                    type={'number'}
                    className='require'
                    // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                    placeholder='活动人数'
                    {...getFieldProps('activityNumber',{
                      initialValue: '',
                    })}
                  >活动人数</InputItem>
                </div>
                : ''
            }
          </List>
        </WingBlank>
        <div className='button-wrapper'>
          <div
            className="btn-lg"
            onClick={() =>
              alert('发布', '确定发布吗？', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                  text: '确定',
                  onPress: () =>
                    new Promise((resolve) => {
                      resolve()
                      this.handleForm()
                    }),
                },
              ])
            }
          >立即发布</div>
        </div>

        <div className="toast-example">
          <ActivityIndicator
            toast
            text="上传中..."
            animating={this.state.animating}
          />
        </div>
      </div>
    )
  }
}
export default createForm()(Release)
