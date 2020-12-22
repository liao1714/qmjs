import React, { Component } from 'react'
import './index.less'
import {  Modal, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'dva'
import wx from 'weixin-js-sdk'


@connect(({ activity }) => ({ activity }))
class CommonImagePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    // this.getImages()
  }

  getImages =()=> {
    let res = {
      data: {
        appid: 'wx8c18a73839283578',
        jsapi_ticket: 'O3SMpm8bG7kJnF36aXbe884dT69MDjTTxtuqKHoIis4jFKM_TQWJ8bEyuo57CM-LVlNtiq1y9PwKSZPehdxlMg',
        nonceStr: 'dfba24b9-9eda-4e64-8026-970caa76d4d8',
        signature: '5782e5e71ffd337469029da65a9823f0f0aa432d',
        timestamp: '1607045601',
        url: 'http://192.168.1.105:8088/qmjsh5/my/info?accessType=4'
      }
    }
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
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
          var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      })
    })

    // this.props.dispatch({ type:'index/getWxConfig', payload: { url: window.location.href }}).then(res => {
    //   console.log('getImages')
    //   console.log(res)
      
    
    //   wx.config({
    //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: res.data.appid, // 必填，公众号的唯一标识
    //     timestamp: res.data.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
    //     signature: res.data.signature,// 必填，签名
    //     jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
    //   })
    //   wx.ready(function(){
    //     wx.chooseImage({
    //       count: 1, // 默认9
    //       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //       success: function (res) {
    //         console.log(res)
    //         var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    //       }
    //     })
    //   })
    // })
  }

  



  render() {
    const ua = window.navigator.userAgent.toLowerCase()
    // if(ua.match(/MicroMessenger/i)=='micromessenger') {

    // }
    return (
      <div className='common-picker'>
        {
          ua.match(/MicroMessenger/i)=='micromessenger' ?
            <div className='common-picker-row'>
              {/* <div onClick={this.getImages} className='addImg'>+</div> */}
              <div className='img-item'>
                <img src='https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3872603124,776486264&fm=26&gp=0.jpg'></img>
              </div>
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
            />
        }
        
      </div>
      
    )
  }
}
export default CommonImagePicker
                                                