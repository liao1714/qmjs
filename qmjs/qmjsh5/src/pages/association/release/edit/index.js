import React, { Component } from 'react'
import { connect } from 'dva'
import '../index.less'
import { NavBar, WingBlank, Picker, List, InputItem, TextareaItem,  DatePicker, ImagePicker, Modal, Toast } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import { createForm } from 'rc-form'
import BackToNativeHome from '@/components/back-to-native-home'
import city from '@/assets/json/province_city_area.json'
import Router from '@/utils/router'
import { NotEmpty } from '@/utils/formValid'
import { uploadOneByOne } from '@/utils/uploadImages'
import {changeWxImagesOneByOne } from '@/utils/methons'
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
      detailActivity: '',
      loading: true
    }
  }
  componentDidMount() {
    this.props.dispatch({type: 'index/loading'})
    this.props.dispatch({type: 'association/detailActivity', payload: {activityPkId: this.props.location.query.activityPkId}}).then(res => {
      if (res && res.code === 200) {
        console.log(11111)
        console.log(res)
        let imgUrls = []
        res.data.imgUrls && res.data.imgUrls.map(item => {
          imgUrls.push({
            url: item.thumbnail
          })
        })
        this.setState({
          type: res.data.releaseType.value,
          detailActivity: res.data,
          imgUrls: imgUrls,
          loading: false,
        })
      }
      this.props.dispatch({type: 'index/hideLoading'})
    })
  }
  handleForm =()=> {
    return  new Promise(resolve => {
      const value = this.props.form.getFieldsValue()
      let body = {
        activityPkId: this.props.location.query.activityPkId,
        content: value.content,
      }
      console.log(body)
      Toast.loading('提交中...', 0)
      this.props.dispatch({type: 'association/editActivity', payload: body}).then(res => {
        if (res && res.code === 200) {
          Toast.info(res.message, 2)
          setTimeout(() => {
            Router.go(-1)
          }, 1000)
          
        }
        resolve()
      })
    })
  }
  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      imgUrls: files
    })
    this.props.form.setFieldsValue({
      imgUrls: files
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
  render() {
    const { getFieldProps } = this.props.form
    const ua = window.navigator.userAgent.toLowerCase()
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
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container form-container'>
              <List>
                <Picker
                  disabled
                  data={this.state.releaseList}
                  cols={1}
                  onOk={(v)=>this.setState({type: v[0]})}
                  extra={<span className='placeholder'>发布类型</span>}
                  {...getFieldProps('releaseType',{
                    initialValue: [this.state.detailActivity.releaseType.value],
                  })}
                >
                  <List.Item className='require'>发布类型</List.Item>
                </Picker>
                <TextareaItem
                  title=""
                  className='require'
                  placeholder='请输入内容'
                  rows={5}
                  count={500}
                  {...getFieldProps('content',{
                    initialValue: this.state.detailActivity.content,
                  })}
                >内容</TextareaItem>
                {
                  this.state.imgUrls.length > 0 ?
                    <List.Item className='require'>
                      图片
                      <List.Item.Brief>
                        {
                          ua.match(/MicroMessenger/i) == 'micromessenger' ?
                            <div className='common-picker-row'>
                              {
                                this.state.imgUrls.map((item, index) => {
                                  return <div className='img-item' key={index}>
                                    <img src={item.url}></img>
                                    {/* <div className='del' onClick={() =>this.delImages(index)}>x</div> */}
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
                              disableDelete
                              accept="image/*"
                            />
                        }
                        {/* <ImagePicker
                          multiple
                          files={this.state.imgUrls}
                          onChange={this.onChange}
                          onImageClick={(index, fs) => console.log(index, fs)}
                          disableDelete
                          selectable={false}
                          // accept="image/gif,image/jpeg,image/jpg,image/png"
                          accept="image/*"
                        /> */}
                      </List.Item.Brief>
                      <InputItem
                        {...getFieldProps('imgUrls', {
                          initialValue: [],
                        })}
                        className={'hidden'}
                      />
                    </List.Item>
                    : ''
                }
                {
                  this.state.type === 0 ?
                    <div>
                      <DatePicker
                        disabled
                        mode="datetime"
                        title=''
                        extra={<span className='placeholder'>报名截止时间</span>}
                        {...getFieldProps('enrollEndTime',{
                          initialValue: this.state.detailActivity.enrollEndTime ? new Date(this.state.detailActivity.enrollEndTime) : '',
                        })}
                        okText='确定'
                        dismissText='取消'
                      >
                        <List.Item className='require'>报名截止时间</List.Item>
                      </DatePicker>
                      <DatePicker
                        disabled
                        mode="datetime"
                        title=''
                        extra={<span className='placeholder'>活动开始时间</span>}
                        {...getFieldProps('activityBeginTime',{
                          initialValue: this.state.detailActivity.activityBeginTime ? new Date(this.state.detailActivity.activityBeginTime) : '',
                        })}
                        okText='确定'
                        dismissText='取消'
                      >
                        <List.Item className='require'>活动开始时间</List.Item>
                      </DatePicker>
                      <DatePicker
                        disabled
                        mode="datetime"
                        title=''
                        extra={<span className='placeholder'>活动结束时间</span>}
                        {...getFieldProps('activityEndTime',{
                          initialValue: this.state.detailActivity.activityEndTime ? new Date(this.state.detailActivity.activityEndTime) : '',
                        })}
                        okText='确定'
                        dismissText='取消'
                      >
                        <List.Item className='require'>活动结束时间</List.Item>
                      </DatePicker>
                      <Picker
                        disabled
                        data={city}
                        cols={3}
                        {...getFieldProps('area',{
                          initialValue: this.state.detailActivity.area,
                        })}
                        extra={<span className='placeholder'>活动地区</span>}
                      >
                        <List.Item className='require'>活动地区</List.Item>
                      </Picker>
                      <InputItem
                        disabled
                        className='require'
                        // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                        placeholder='活动地址'
                        {...getFieldProps('address',{
                          initialValue: this.state.detailActivity.address,
                        })}
                      >活动地址</InputItem>
                      <InputItem
                        disabled
                        type={'number'}
                        className='require'
                        // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
                        placeholder='活动人数'
                        {...getFieldProps('activityNumber',{
                          initialValue: this.state.detailActivity.activityNumber,
                        })}
                      >活动人数</InputItem>
                    </div>
                    : ''
                }
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
                          this.handleForm().then(() => {
                            resolve()
                          })
                        }),
                    },
                  ])
                }
              >立即提交</div>
            </div>
        }
      </div>
    )
  }
}
export default createForm()(Release)
