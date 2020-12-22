import React, { Component } from 'react'
import { connect } from 'dva'
import { NavBar, WingBlank, Toast } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import './index.less'
import Router from '@/utils/router'
import BackToNativeHome from '@/components/back-to-native-home'


@connect(({ activity }) => ({ activity }))
class Welfare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeList: [],
      hasBusCard: false,
      hasBrtCard: false,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'buriedPoint/qmjs_specific_activity' })
    this.props.dispatch({ type:'activity/specialEvents', payload: {primaryPkId: '785900649714810879'} }).then(res => {
      console.log('res')
      console.log(res)
      if(res && res.code == 200) {
        this.setState({
          activeList: res.data
        })
        let ua = navigator.userAgent
        if (ua.toLowerCase().indexOf('xmsmk') !== -1) {
          this.getTicketInformation()
        }
      }
    })
  }

  getTicketInformation = ()=> {
    this.props.dispatch({ type:'activity/ticketInformation', payload: {primaryPkId: '785900649714810879'} }).then(res => {
      // alert(JSON.stringify(res))
      if(res && res.code == 200) {
        if( res.data && res.data.userTicketInformation) {
          if(res.data.userTicketInformation.length > 0) {
            res.data.userTicketInformation.map(item => {
              if(item.ticketEnum.value == 0) {
                this.setState({
                  hasBusCard: true
                })
              }else if(item.ticketEnum.value == 1) {
                this.setState({
                  hasBrtCard: true
                })
              }
            })
          }
        }
      }
    })
  }

  shareNow= ()=> {
    let ua = navigator.userAgent
    if (ua.toLowerCase().indexOf('xmsmk') === -1) {
      location.href = 'https://smk.ixiamen.org.cn/smk/download-page/#/download-5.0?type=download'
      return false
    }
    const that = this
    this.preloadJs().then(()=> {
      UmsApi.globalization.share({
        title: '年底薅羊毛机会，点击转发，必得公交抵扣券！',
        desc: '厦门市民卡i体育，官方送福利啦！',
        link: window.location.href.replace('accessType=1','accessType=2'),
        // imgUrl: require('../../../assets/share-cover.jpg'),
        imgUrl: 'http://139.198.176.190/group1/M00/01/7E/i8awvl_ZeSaAINnjAAFNXiKVERg64.jpeg',
      }, function(success){
        // that.showToast(JSON.stringify(111))
        console.log('成功位置')
      },function(res){
        console.log('失败位置')
        if( res.errCode == '0000') {
          that.props.dispatch({ type:'activity/userShare', payload: {primaryPkId: '785900649714810879'} }).then(res => {
            if(res && res.code == 200) {
              that.getTicketInformation()
              that.showToast(res.message)
            }
          })
        }
      })
    })
  }

  enrollNow= (eventsPkId)=> {
    let ua = navigator.userAgent
    if (ua.toLowerCase().indexOf('xmsmk') === -1) {
      location.href = 'https://smk.ixiamen.org.cn/smk/download-page/#/download-5.0?type=download'
      return false
    }
    let linkPath = '/activity/detail'
    Router.push(linkPath, { pkId: eventsPkId })
  }

  preloadJs =()=> {
    let ua = navigator.userAgent
    return new Promise((resolve) =>{
      if (ua.toLowerCase().indexOf('xmsmk') !== -1) {
        if (window.UmsApi === undefined) {
          document.addEventListener('OnUmsApiReady',
            function() {
              resolve(true)
            },
            false)
        } else {
          resolve(true)
        }
      } else {
        console.log('非市民卡接入')
      }
    })
  }

  showToast =(message)=> {
    Toast.info(message, 2)
  }
  leftContentClick=()=> {
    if (this.props.location.query.redirect) {
      window.location.href = this.props.location.query.redirect
    } else {
      this.props.dispatch({ type:'index/backToNativeHome' })
    }
  }

  render() {
    return (
      <div className='welfare-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>this.leftContentClick()}/>
            {
              this.props.location.query.redirect ?
                <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
                : ''
            }
          </div>}
          rightContent=''
        >厦门市民卡i体育，官方送福利</NavBar>

        <WingBlank size="md" className='container' style={{padding: 0}}>
          <div className='body'>
            <div className='sharenow' onClick={this.shareNow}></div>
            {
              this.state.activeList.map((item,index) => {
                let number = index + 1
                return <div  key={index} className={'enroll-now-'+ number} onClick={()=>this.enrollNow(item.eventsPkId)}></div>
              })
            }
            {/* <div className='enroll-now-1' onClick={this.shareNow}></div>
            <div className='enroll-now-2' onClick={this.shareNow}></div>
            <div className='enroll-now-3' onClick={this.shareNow}></div> */}
            {
              this.state.hasBusCard ?
                <div className='card-box-1'>
                  <img src={require('../../../assets/text1.png')} className='card'></img>
                </div> : ''
            }

            {
              this.state.hasBrtCard ?
                <div className='card-box-2'>
                  <img src={require('../../../assets/text2.png')} className='card'></img>
                </div> : ''
            }




            <img src={require('../../../assets/pic1.jpg')}></img>
            <img src={require('../../../assets/pic2.jpg')}></img>
            <img src={require('../../../assets/pic3.jpg')}></img>
            <img src={require('../../../assets/pic4.jpg')}></img>
          </div>
        </WingBlank>

      </div>
    )
  }
}

export default Welfare

