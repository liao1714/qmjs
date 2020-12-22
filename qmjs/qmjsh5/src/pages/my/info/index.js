import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import {
  NavBar,
  WingBlank,
  Picker,
  List,
  InputItem,
  ImagePicker,
  Modal,
  Toast,
  DatePicker
} from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import { createForm } from 'rc-form'
import BackToNativeHome from '@/components/back-to-native-home'

import CommonImagePicker from '@/components/common-image-picker'

import CropperImage from '@/components/cropper-image'
import Router from '@/utils/router'
import { NotEmpty } from '@/utils/formValid'
import { uploadAvatarCropperImages } from '@/utils/uploadImages'
import { compressImagesOneByOne, changeWxImagesOneByOne } from '@/utils/methons'
import wx from 'weixin-js-sdk'

const alert = Modal.alert
@connect(({ index }) => ({ index }))
class Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeList: [
        { label: '身份证', value: '01' }
      ],
      files: [],
      loading: true,

      showCropperImage: false,
      cropperImageUrl: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'index/userInfo' }).then(res => {
      if (res && res.code === 200) {
        let files = []
        res.data.avatar && res.data.avatar.map(item => {
          files.push({
            id: item.id,
            thumbnail: item.thumbnail,
            originalImage: item.originalImage,
            url: item.thumbnail
          })
        })
        this.setState({
          files: files
        })
      }
      this.setState({
        loading: false
      })
      this.props.dispatch({ type:'index/hideLoading'})
    })
  }
  handleForm =()=> {
    const value = this.props.form.getFieldsValue()
    return new Promise(resolve => {
      if (
        NotEmpty(value.nickname, '请输入昵称！') &&
        NotEmpty(value.userRealName, '请输入姓名！') &&
        NotEmpty(value.mobile, '请输入手机号！') &&
        NotEmpty(value.certType, '请选择证件类型！') &&
        NotEmpty(value.certifId, '请输入证件号！')
      ) {
        let body = {
          nickname: value.nickname,
          introduction: value.introduction,
          userRealName: value.userRealName,
          mobile: value.mobile,
          birthDate: value.birthDate,
          certType: value.certType[0],
          certifId: value.certifId,
        }
        Toast.loading('提交中...', 0)
        uploadAvatarCropperImages(this.state.files).then(res => {
          body.avatar = res
          this.props.dispatch({type: 'my/editMineInfo', payload: body}).then(res => {
            if (res && res.code === 200) {
              Toast.info(res.message, 2)
            }
            resolve()
          })
        })
      }else {
        resolve()
      }
    })
  }
  onChange = (files, type, index) => {
    Toast.loading('图片加载中，请稍后...', 0)
    console.log(files, type, index)
    if (files.length > 0) {
      compressImagesOneByOne(files, 0.2).then(res => {
        console.log('res[0].url')
        console.log(res[0].url)
        this.setState({
          showCropperImage: true,
          cropperImageUrl: res[0].url
        })
      })
    } else {
      this.setState({
        files: files,
      })
      Toast.hide()
    }
  }
  getCropData =(data)=> {
    if (data) {
      this.setState({
        files: [{
          url: data
        }]
      })
    }
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
          count: 1, // 默认9
          // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if(res.errMsg == 'chooseImage:ok' && res.localIds.length > 0) {
              changeWxImagesOneByOne(res.localIds, 0.2).then(res => {
                that.setState({
                  showCropperImage: true,
                  cropperImageUrl: res[0].url
                })
              })
            }
          }
        })
      })
    })
  }

  delImages =()=> {
    this.setState({
      files: []
    })
  }


  render() {
    const { getFieldProps } = this.props.form
    const { index } = this.props
    const ua = window.navigator.userAgent.toLowerCase()
    const isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1 //android终端
    const isiOS = !!ua.match(/\(i[^;]+;( U;)? cpu.+mac os x/) //ios终端

    return (
      <div className='info-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >个人信息</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container form-container'>
              <List>
                <List.Item
                  // className='require image-require'
                  // arrow={'horizontal'}
                  extra={
                    <div className='image-wrapper'>
                      {
                        isAndroid? 
                          ua.match(/MicroMessenger/i)=='micromessenger' ?
                            <div className='common-picker-row'>
                              {
                                this.state.files.length < 1 ? 
                                  <div onClick={this.getImages} className='addImg'>+</div>
                                  :
                                  <div className='img-item'>
                                    <img src={this.state.files[0].url}></img>
                                    <div className='del' onClick={this.delImages}>x</div>
                                  </div>
                              }
                            </div>
                            : <ImagePicker
                              length={1}
                              files={this.state.files}
                              // onAddImageClick={console.log(123)}
                              onChange={this.onChange}
                              onImageClick={(index, fs) => console.log(index, fs)}
                              selectable={this.state.files.length < 1}
                              // accept="image/gif,image/jpeg,image/jpg,image/png"
                              accept="image/*"
                            /> : ''
                      }

                      {
                        isiOS? <ImagePicker
                          length={1}
                          files={this.state.files}
                          // onAddImageClick={console.log(123)}
                          onChange={this.onChange}
                          onImageClick={(index, fs) => console.log(index, fs)}
                          selectable={this.state.files.length < 1}
                          // accept="image/gif,image/jpeg,image/jpg,image/png"
                          accept="image/*"
                        /> : ''
                      }
                     
                      {/* <CommonImagePicker></CommonImagePicker> */}
                    </div>
                  }
                >头像</List.Item>
                <InputItem
                  className='require'
                  // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                  placeholder='昵称'
                  {...getFieldProps('nickname',{
                    initialValue: index.userInfo.nickname,
                  })}
                >昵称</InputItem>
                <InputItem
                  // className='require'
                  // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                  placeholder='简介'
                  {...getFieldProps('introduction',{
                    initialValue: index.userInfo.introduction,
                  })}
                >简介</InputItem>
                <InputItem
                  className='require'
                  // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                  placeholder='姓名'
                  {...getFieldProps('userRealName',{
                    initialValue: index.userInfo.userRealName,
                  })}
                >姓名</InputItem>
                <InputItem
                  disabled
                  className='require'
                  // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                  placeholder='手机号'
                  {...getFieldProps('mobile',{
                    initialValue: index.userInfo.mobile,
                  })}
                >手机号</InputItem>
                <DatePicker
                  mode="date"
                  title=''
                  extra={<span className='placeholder'>出生日期</span>}
                  {...getFieldProps('birthDate',{
                    initialValue: index.userInfo.birthDate ? new Date(index.userInfo.birthDate) : '',
                  })}
                  minDate={new Date(1900, 1, 1, 0, 0, 0)}
                  okText='确定'
                  dismissText='取消'
                >
                  <List.Item arrow={'horizontal'}>出生日期</List.Item>
                </DatePicker>
                <Picker
                  data={this.state.typeList}
                  cols={1}
                  extra={<span className='placeholder'>证件类型</span>}
                  {...getFieldProps('certType',{
                    initialValue: [index.userInfo.certType],
                  })}
                >
                  <List.Item arrow={'horizontal'} className='require'>证件类型</List.Item>
                </Picker>
                <InputItem
                  className='require'
                  // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                  placeholder='证件号'
                  {...getFieldProps('certifId',{
                    initialValue: index.userInfo.certifId,
                  })}
                >证件号</InputItem>
              </List>
            </WingBlank>
        }
        {
          this.state.loading ? '' :
            <div className='button-wrapper'>
              <div
                className="btn-lg"
                onClick={() =>
                  alert('提交', '确定提交吗？', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    {
                      text: '确定',
                      onPress: () =>
                        new Promise((resolve) => {
                          this.handleForm().then(()=> {
                            resolve()
                          })
                        }),
                    },
                  ])
                }
              >立即提交
              </div>
            </div>
        }
        { this.state.showCropperImage ? <CropperImage hideCropperImage={()=>this.setState({showCropperImage: false})} cropperImageUrl={this.state.cropperImageUrl} getCropData={this.getCropData}/> : '' }
      </div>
    )
  }
}
export default createForm()(Info)
