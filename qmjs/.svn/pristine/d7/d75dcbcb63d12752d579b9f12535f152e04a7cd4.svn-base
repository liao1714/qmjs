import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, NavBar, WingBlank, List, Button, Toast, Picker } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import html2canvas from 'html2canvas'
import BackToNativeHome from '@/components/back-to-native-home'
import './index.less'
import QRCode  from 'qrcode.react'
import { createForm } from 'rc-form'
import city from '@/assets/json/province_city_area.json'
import PreviewImage from '@/components/preview-image'
import Router from '@/utils/router'
import { convertUrlToBase64Url } from '@/utils/methons'
const alert = Modal.alert

@connect(({ association, index }) => ({ association, index }))
class Datum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      showCode: false,
      previewImageShow: false,
      previewImageList: [],
      previewImageIndex: null,
      showShare: false,
    }
  }
  componentDidMount() {
    this.preloadJs().then(()=>{})
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'association/associationInfo', payload: {associationPkId: this.props.location.query.associationPkId} }).then(res => {
      if (res && res.code === 200) {
        this.props.dispatch({ type: 'buriedPoint/qmjs_community_information', payload: { objId: this.props.location.query.associationPkId, objType: res.data.presidentFlag === null ? '未知' : res.data.presidentFlag ? '会长' : '会员' }})
      }
      this.setState({
        loading: false
      })
      this.props.dispatch({ type:'index/hideLoading'})
    })
  }
  hideModal =()=> {
    this.setState({
      showCode:false
    })
  }
  showModal =()=> {
    this.props.dispatch({ type: 'buriedPoint/qmjs_associationmaterial_code_click', payload: { objId: this.props.location.query.associationPkId }})
    this.setState({
      showCode: true
    })
  }
  saveCode =(qrCode) => {
    // qrCode = 'https://iconfont.alicdn.com/t/1543371585808.jpg@100h_100w.jpg'
    this.props.dispatch({ type: 'buriedPoint/qmjs_associationcode_save_click', payload: { objId: this.props.location.query.associationPkId }})
    this.preloadJs().then(()=> {
      convertUrlToBase64Url(qrCode).then(res => {
        var options = {
          base64Img: res,
          filePath: 'images'
        }
        var u = navigator.userAgent
        var app = navigator.appVersion
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isAndroid) {
          UmsApi.file.saveImage(options)
        } else {
          let data = {
            data: options
          }
          window.webkit.messageHandlers.saveImage.postMessage(data)
        }
      })
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
  preloadJs =()=> {
    let ua = navigator.userAgent
    const that = this
    return new Promise((resolve) =>{
      if (ua.toLowerCase().indexOf('xmsmk') !== -1) {
        if (window.UmsApi === undefined) {
          document.addEventListener('OnUmsApiReady',
            function() {
              resolve(true)
              that.setState({
                showShare: true
              })
            },
            false)
        } else {
          resolve(true)
          that.setState({
            showShare: true
          })
        }
      } else {
        console.log('非市民卡接入')
        that.setState({
          showShare: false
        })
      }
    })
  }
  shareAssociation =(data)=> {
    const that = this
    this.props.dispatch({ type: 'buriedPoint/qmjs_associationmaterial_invite_click', payload: { objId: this.props.location.query.associationPkId }})
    this.preloadJs().then(()=> {
      UmsApi.globalization.share({
        title: data.associationName,
        desc: data.introduction,
        link: window.location.href,
        imgUrl: data.avatarUrl[0].thumbnail
      }, function(){
        that.showToast('分享失败！')
      },function(){
        that.showToast('分享成功！')

      })
    })
  }
  shareAssociationImg =(qrCode)=> {
    const that = this
    this.props.dispatch({ type: 'buriedPoint/qmjs_associationcode_invite_click', payload: { objId: this.props.location.query.associationPkId }})
    this.preloadJs().then(()=> {
      UmsApi.globalization.share({
        title: '',
        desc: '',
        link: '',
        imgUrl: qrCode
      }, function(){
        that.showToast('分享成功！')
      },function(){
        that.showToast('分享失败！')
      })
    })
  }
  showToast =(message)=> {
    Toast.info(message, 2)
  }

  joinAssociation =(associationPkId)=> {
    this.props.dispatch({ type:'community/joinAssociation', payload: { associationPkId: associationPkId } }).then(res => {
      if (res && res.code === 200) {
        Toast.info(res.message, 2)
        this.props.dispatch({ type:'association/associationInfo', payload: {associationPkId: this.props.location.query.associationPkId} }).then(res => {})
      }
    })
  }
  render() {
    const { association } = this.props
    const { getFieldProps } = this.props.form
    return (
      <div className='datum-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >协会资料</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container form-container'>
              <List>
                <List.Item extra={<img className='datum-portrait' src={association.associationInfo.avatarUrl && association.associationInfo.avatarUrl.length > 0 && association.associationInfo.avatarUrl[0].thumbnail || require('../../../assets/defaultPortrait.png')} alt='' onClick={()=> this.previewImage(association.associationInfo.avatarUrl)}/>}>协会头像</List.Item>
                <List.Item extra={association.associationInfo.associationName}>协会名称</List.Item>
                <List.Item extra={association.associationInfo.tagName}>运动类型</List.Item>
                <List.Item extra={association.associationInfo.presidentName}>会长姓名</List.Item>
                <List.Item extra={association.associationInfo.mobile}>会长手机号</List.Item>
                <List.Item extra={association.associationInfo.features}>协会特色</List.Item>
                <List.Item extra={association.associationInfo.introduction}>协会介绍</List.Item>
                <Picker
                  disabled
                  data={city}
                  cols={3}
                  {...getFieldProps('area',{
                    initialValue: association.associationInfo.area,
                  })}
                  extra={<span className='placeholder'>协会地区</span>}
                >
                  <List.Item>协会地区</List.Item>
                </Picker>
                <List.Item extra={association.associationInfo.address}>协会地址</List.Item>
                <List.Item extra={association.associationInfo.joinReview ? '需要审核' : '不需要审核'}>入会审核</List.Item>
              </List>
              <div className='qr-code-wrapper'>
                <div className='qr-code'>
                  <QRCode
                    value={window.location.href}
                    fgColor="#000000"
                  />
                </div>
                { this.state.showShare ?
                  <div className='qr-code-info'>
                    <p>分享二维码到微信</p>
                    <p>邀请好友扫码加入</p>
                    <div className='qr-code-button'>
                      <div className='invite-friends' onClick={()=>this.shareAssociation(association.associationInfo)}>
                        <img src={require('../../../assets/wechat.png')}/>
                        邀请会员
                      </div>
                      <div className='save-code' onClick={()=>this.showModal()}>保存二维码</div>
                    </div>
                  </div>
                  :
                  <div className='qr-code-info'>
                    <p>邀请好友扫码加入</p>
                    <div className='save-code' onClick={()=>this.showModal()}>保存二维码</div>
                  </div>
                }
              </div>
              {
                association.associationInfo.presidentFlag ?
                  <div className='button-wrapper'>
                    <div className="btn-lg-border btn-lg-add" onClick={()=>Router.push('/association/members/add', {associationPkId: this.props.location.query.associationPkId})}>添加会员</div>
                    <div className="btn-lg-border-gray" onClick={()=>Router.push('/association/edit', {pkId: this.props.location.query.associationPkId})}>编辑资料</div>
                  </div>
                  :
                  <div className='button-wrapper'>
                    {
                      association.associationInfo.memberFlag ?
                        <div className="btn-lg-border" onClick={()=>Router.push('/association/detail', { associationPkId:  this.props.location.query.associationPkId })}>进入协会</div>
                        :
                        association.associationInfo.associationJoinTypeEnum.value === 2 ?
                          <div
                            className='join'

                          >{association.associationInfo.associationJoinTypeEnum.name}</div>
                          :
                          <div
                            className="join"
                            onClick={() =>
                              alert('加入协会', '确定加入协会吗？', [
                                { text: '取消', onPress: () => console.log('cancel') },
                                {
                                  text: '确定',
                                  onPress: () => this.joinAssociation(association.associationInfo.pkId)},
                              ])
                            }
                          >加入协会</div>
                    }
                  </div>
              }
            </WingBlank>
        }
        {
          this.state.loading ? '' :
            <Modal
              popup
              maskClosable={true}
              visible={this.state.showCode}
              animationType="slide-up"
              onClose={()=>this.hideModal()}
            >
              <div className='association-code-wrapper'>
                <img className='code-image' src={association.associationInfo.qrCode && association.associationInfo.qrCode.length> 0 && association.associationInfo.qrCode[0].thumbnail}/>
                { this.state.showShare ?
                  <div className='button-wrapper'>
                    <div className="btn-lg btn-lg-add" onClick={()=>this.shareAssociationImg(association.associationInfo.qrCode && association.associationInfo.qrCode.length> 0 && association.associationInfo.qrCode[0].thumbnail)}>分享到微信好友</div>
                    <div className="btn-lg" onClick={()=>this.saveCode(association.associationInfo.qrCode && association.associationInfo.qrCode.length> 0 && association.associationInfo.qrCode[0].thumbnail)}>保存到相册</div>
                  </div>
                  :
                  <div className='button-wrapper' style={{justifyContent: 'center'}}>
                    长按保存到相册
                  </div>
                }
              </div>
            </Modal>
        }
        {
          this.state.previewImageShow ? <PreviewImage hidePreviewImage={()=>this.setState({previewImageShow: false})} previewImageList={this.state.previewImageList} previewImageIndex={this.state.previewImageIndex}/> : ''
        }
      </div>
    )
  }
}
export default createForm()(Datum)
