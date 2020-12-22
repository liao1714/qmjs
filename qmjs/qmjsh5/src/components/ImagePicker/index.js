import React, { Component } from 'react'
import './index.less'
import {  Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'dva'



@connect(({ activity }) => ({ activity }))
class ImagePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }

  getImages =()=> {
    this.props.dispatch({ type:'index/getWxConfig', payload: { url: window.location.href }}).then(res => {
      console.log(res)
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
    })
  }

  



  render() {
    const ua = window.navigator.userAgent.toLowerCase()
    // if(ua.match(/MicroMessenger/i)=='micromessenger') {

    // }
    return (
      <div className='picker'>
        {
          ua.match(/MicroMessenger/i)=='micromessenger' ?
            <div></div>
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
export default ImagePicker
