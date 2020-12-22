import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import { NavBar, WingBlank, Picker, List, InputItem, ImagePicker, Switch, Modal, Toast } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import { createForm } from 'rc-form'
import BackToNativeHome from '@/components/back-to-native-home'
import city from '@/assets/json/province_city_area.json'
import { NotEmpty } from '@/utils/formValid'
import { uploadAvatarCropperImages, uploadOneByOne } from '@/utils/uploadImages'
import Router from '@/utils/router'
import CropperImage from '@/components/cropper-image'
import QRCode from 'qrcode.react'
import html2canvas from 'html2canvas'
import { convertBase64UrlToFile, compressImagesOneByOne, changeWxImagesOneByOne } from '@/utils/methons'
import wx from 'weixin-js-sdk'

const history = require('umi/lib/createHistory').default({
  basename: window.routerBase,
})
const alert = Modal.alert
@connect(({ index, association }) => ({ index, association }))
class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],

      showCropperImage: false,
      cropperImageUrl: '',

      showQrCode: false,
      associationInfo: {}
    }
  }
  componentDidMount() {
    console.log(window.location)
    this.props.dispatch({ type: 'buriedPoint/qmjs_community_dynamicissue' })
    this.props.dispatch({type: 'index/userInfo', payload: ''})
    this.props.dispatch({type: 'index/tagTabBar', payload: ''})
  }
  handleForm =()=> {
    console.log(this.props.form.getFieldsValue())
    const value = this.props.form.getFieldsValue()
    if (
      NotEmpty(this.state.files, '请上传协会logo') &&
      NotEmpty(value.associationName, '请输入协会名称') &&
      NotEmpty(value.tagPkId, '请选择运动类型') &&
      NotEmpty(value.features, '请输入协会特色') &&
      NotEmpty(value.introduction, '请输入协会介绍') &&
      NotEmpty(value.area, '请选择协会地区') &&
      NotEmpty(value.address, '请输入协会地址') &&
      NotEmpty(value.introduction, '请输入协会介绍')
    ) {
      let body = {
        ...value,
        tagPkId: value.tagPkId[0]
      }
      Toast.loading('提交中...', 0)
      uploadAvatarCropperImages(this.state.files).then(res => {
        body.avatarUrl = res
        this.props.dispatch({type: 'association/addAssociation', payload: body}).then(res => {
          if (res && res.code === 200) {
            Toast.info(res.message, 2)
            Router.replace('/association/datum', {associationPkId: res.data.pkId})
            this.setState({
              showQrCode: true,
              associationInfo: {...res.data}
            })
            html2canvas(this.refs.codeImage).then(canvas => {
              let imgData = [{
                file: convertBase64UrlToFile(canvas.toDataURL())
              }]
              uploadOneByOne(imgData).then(res => {
                let body = {
                  pkId: this.state.associationInfo.pkId,
                  qrCode: res
                }
                this.props.dispatch({type: 'association/addAssociationCode', payload: body})
              })
            })
          }
        })
      })
    }
  }
  onChange = (files, type, index) => {
    Toast.loading('图片加载中，请稍后...', 0)
    console.log(files, type, index)
    if (files.length > 0) {
      compressImagesOneByOne(files, 0.2).then(res => {
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
        console.log('ready')
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
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
    const { index } = this.props
    const { getFieldProps } = this.props.form
    let tagList = []
    index && index.tagTabBarList && index.tagTabBarList.map(item => {
      tagList.push({
        value: item.tagPkId,
        label: item.tagName,
      })
    })

    const ua = window.navigator.userAgent.toLowerCase()
    const isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1 //android终端
    const isiOS = !!ua.match(/\(i[^;]+;( U;)? cpu.+mac os x/) //ios终端

    return (
      <div className='create-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >创建协会</NavBar>
        <WingBlank size="md" className='container form-container'>
          <List>
            <InputItem
              className='require'
              // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
              placeholder='会长姓名'
              {...getFieldProps('name',{
                initialValue: index && index.userInfo && index.userInfo.userRealName,
              })}
            >会长姓名</InputItem>
            <InputItem
              className='require'
              // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
              placeholder='会长手机'
              {...getFieldProps('mobile',{
                initialValue: index && index.userInfo && index.userInfo.mobile,
              })}
            >会长手机</InputItem>
            <List.Item
              className='require image-require'
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
                    isiOS? 
                      <ImagePicker
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
                 
                </div>
              }
            >协会logo</List.Item>
            <InputItem
              maxLength={10}
              className='require'
              // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
              placeholder='协会名称'
              {...getFieldProps('associationName',{
                initialValue: '',
              })}
            >协会名称</InputItem>
            <Picker
              data={tagList}
              cols={1}
              extra={<span className='placeholder'>运动类型</span>}
              {...getFieldProps('tagPkId',{
                initialValue: [],
              })}
            >
              <List.Item className='require' arrow={'horizontal'}>运动类型</List.Item>
            </Picker>
            <InputItem
              className='require'
              maxLength={10}
              // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
              placeholder='协会特色'
              {...getFieldProps('features',{
                initialValue: '',
              })}
            >协会特色</InputItem>
            <InputItem
              className='require'
              maxLength={50}
              // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
              placeholder='协会介绍'
              {...getFieldProps('introduction',{
                initialValue: '',
              })}
            >协会介绍</InputItem>
            <Picker
              data={city}
              cols={3}
              {...getFieldProps('area',{
                initialValue: [],
              })}
              extra={<span className='placeholder'>协会地区</span>}
            >
              <List.Item className='require' arrow={'horizontal'}>协会地区</List.Item>
            </Picker>
            <InputItem
              className='require'
              // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
              placeholder='协会地址'
              {...getFieldProps('address',{
                initialValue: '',
              })}
            >协会地址</InputItem>
            <List.Item
              className='require'
              // arrow={'horizontal'}
              extra={<Switch
                {...getFieldProps('joinReview', {
                  initialValue: false,
                  valuePropName: 'checked'
                })}
                onClick={(checked) => {
                  this.props.form.setFieldsValue({
                    joinReview: checked,
                  })
                }}
              />}
            >入会审核</List.Item>
          </List>
        </WingBlank>
        <div className='button-wrapper'>
          <div
            className="btn-lg"
            onClick={() =>
              alert('创建', '确定创建吗？', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                  text: '确定',
                  onPress: () =>
                    new Promise((resolve) => {
                      this.props.dispatch({ type: 'buriedPoint/qmjs_associationlist_create_submitclick' })
                      this.handleForm()
                      resolve()
                    }),
                },
              ])
            }
          >立即创建</div>
        </div>
        { this.state.showCropperImage ? <CropperImage hideCropperImage={()=>this.setState({showCropperImage: false})} cropperImageUrl={this.state.cropperImageUrl} getCropData={this.getCropData}/> : '' }
        {
          this.state.showQrCode ?
            <div className='association-code' ref="codeImage">
              <img className='association-portrait' ref='associationPortrait' src={this.state.associationInfo.avatarUrl[0].thumbnail} crossOrigin="anonymous"/>
              <div className='association-name'>{this.state.associationInfo.associationName}</div>
              <div className='association-type'>{this.state.associationInfo.tagName}·{this.state.associationInfo.address}</div>
              <div className='association-content'>{this.state.associationInfo.features}</div>
              <div className='association-qr-code'>
                <QRCode
                  value={window.location.origin + '/qmjsh5/association/datum?accessType=' + history.location.query.accessType + '&associationPkId=' + this.state.associationInfo.pkId}
                  fgColor="#000000"
                />
              </div>
              <div className='association-info'>
                <img className='long-press' src={require('../../../assets/long_press.png')}/>
                <div className='association-message'>
                  <p>长按识别二维码</p>
                  <p>和我一起动起来</p>
                </div>
              </div>
            </div>
            : ''
        }
      </div>
    )
  }
}
export default createForm()(Create)
