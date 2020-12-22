import React, { Component } from 'react'
import { connect } from 'dva'
import { Checkbox, Toast, NavBar, WingBlank } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import { formatMessage } from 'umi-plugin-locale'
import { createForm } from 'rc-form'
import { MobileCheck, NotEmpty } from '@/utils/formValid'
import setting from '@/utils/setting'
import Router from '@/utils/router'
import CommonClause from '@/components/common-clause'
import './index.less'
import { getAuthToken } from '@/utils/token'

@connect(({ login, index }) => ({ login, index }))
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 60,
      message: '获取验证码',
      canGetCode: true,
      agree: false,
      showClauseModal: false,
      clauseArticle: '',
      imgCaptcha: '',
      imgCode: '',
      isCanTap: true
    }

    this.timeInterval = ''
  }

  getImgCode() {
    let that = this
    if(this.timeInterval) {
      window.clearInterval(this.timeInterval)
    }
    return new Promise(function(resolve, reject) {
      that.props.dispatch({ type: 'index/imageCaptcha' }).then(res => {
        if(res && res.code == 200) {
          that.setState({
            imgCaptcha: res.imgCaptcha,
            imgCode: res.imgCode,
          })
          resolve(res)
        }else {
          reject()
        }
      })
    })
  }

  componentDidMount() {
    this.props.dispatch({ type:'index/hideLoading'})
    this.getImgCode().then(res => {
      this.timeInterval = setInterval(() => {
        this.getImgCode()
      },300000)
    })
  }

  tapImgCaptcha() {
    window.clearInterval(this.timeInterval)
    this.getImgCode().then(res => {
      this.timeInterval = setInterval(() => {
        this.getImgCode()
      }, 300000)
    })
  }


  handleForm =()=> {
    const value = this.props.form.getFieldsValue()
    this.props.dispatch({ type:'index/accessType' }).then(res => {
      if (
        NotEmpty(value.mobile, '请输入手机号！') &&
        NotEmpty(value.code, '请输入验证码') &&
        NotEmpty(this.state.agree, '请勾选同意i体育《服务条款》和《隐私政策》！')
      ) {
        Toast.loading('登录中...', 0)
        if (res === 0) {
          let body = {
            mobile: value.mobile,
            smsCode: value.code,
          }
          this.props.dispatch({ type:'login/registerOther', payload: body }).then(res=> {
            if (res && res.code === 200) {
              Toast.info('登录成功！',1)
              let redirect = history.location && history.location.query && history.location.query.redirect
              if (redirect) {
                Router.replace(redirect)
              } else {
                if (res.data.firstFlag) {
                  Router.replace('/preference')
                } else {
                  Router.replace('/home')
                }
              }
            }
          })
        } else if (res === 'WeChat') {
          let body = {
            mobile: value.mobile,
            smsCode: value.code,
            authToken: getAuthToken()
          }
          this.props.dispatch({ type: setting.registerWechat, payload: body }).then(res=> {
            if (res && res.code === 200) {
              Toast.info('登录成功！',1)
              let redirect = history.location && history.location.query && history.location.query.redirect
              if (redirect) {
                Router.replace(redirect)
              } else {
                if (res.data.firstFlag) {
                  Router.replace('/preference')
                } else {
                  Router.replace('/home')
                }
              }
            }
          })
        }
      }
    })
  }
  getCode =()=> {    
    if (MobileCheck(this.props.form.getFieldsValue().mobile)) {
      if (this.state.canGetCode && this.state.isCanTap) {
        this.setState({
          isCanTap: false
        })
        let body = {
          mobile: this.props.form.getFieldsValue().mobile,
          imgCode: this.state.imgCode,
          code: this.props.form.getFieldsValue().imgCaptcha
        }
        this.props.dispatch({ type: setting.sendSms, payload: body }).then(res => {
          this.setState({
            isCanTap: true
          })
          if (res && res.code === 200) {
            Toast.info('获取验证码成功！')
            this.setState({
              canGetCode: false
            })
            const that = this
            let timer = setInterval(function() {
              let time = that.state.time
              time--
              that.setState({
                time: time,
                message: time + '后重新获取'
              })
              if (that.state.time === 0) {
                that.setState({
                  canGetCode: true,
                  time: 60,
                  message: '获取验证码'
                })
                clearInterval(timer)
              }
            }, 1000)
          }
        })
      }
    } else {
      Toast.info('手机号格式错误！', 2)
    }
  }

  lookClause(e, type) {
    e.stopPropagation()
    this.props.dispatch({ type: 'home/clause', payload: { clauseType: type } }).then(res => {
      if(res.code == 200) {
        this.setState({showClauseModal: true,clauseArticle: res.data.content})
      }
    })
  }

  onClose=()=> {
    this.setState({showClauseModal: false})
  }



  render() {
    const { getFieldProps } = this.props.form
    return (
      <div className='login-register-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back'  size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        ><IconSvg type='logo' size='md'/>{formatMessage({ id: 'index.title' })}</NavBar>
        
        <WingBlank size="md" className='container login-container'>
          {/* <div className='welcome-wrapper'>
            <img src={require('../../assets/logo.png')}/>
            <div className='welcome-wrapper-text'>
              <span className='welcome-wrapper-text-sm'>hi！欢迎来到</span>
              <span className='welcome-wrapper-text-sm'>i体育</span>
            </div>
          </div> */}

          <div className='bgimg'>
            <img src={require('../../assets/logo-bg.png')}/>
          </div>
          
          <div className='input-container'>
            <div className='input-item'>
              {/* <div className='input-title'>手机号码</div> */}
              <div className='input-wrapper'>
                {/* <span className='input-icon'>
                  <IconSvg type={'mobile'} size={'sm'}/>
                </span> */}
                <div className='input' >
                  <input
                    id='mobile'
                    type={'number'}
                    placeholder='请输入手机号'
                    {...getFieldProps('mobile',{
                      initialValue: '',
                    })}
                  />
                </div>
              </div>
            </div>

            <div className='input-item'>
              {/* <div className='input-title'>图片验证码</div> */}
              <div className='input-wrapper'>
                <div style={{display: 'flex',alignItems: 'center', flex: 1}}>
                  {/* <span className='input-icon'>
                    <IconSvg type={'code'} size={'sm'}/>
                  </span> */}
                  <div className='input'>
                    <input
                      placeholder='请输入图片验证码'
                      {...getFieldProps('imgCaptcha',{
                        initialValue: '',
                      })}
                    />
                  </div>
                </div>
                <div className='get-code' onClick={()=>this.tapImgCaptcha()}><img src={this.state.imgCaptcha}></img></div>
              </div>
            </div>

            <div className='input-item'>
              {/* <div className='input-title'>验证码</div> */}
              <div className='input-wrapper'>
                <div style={{display: 'flex',alignItems: 'center', flex: 1}}>
                  {/* <span className='input-icon'>
                    <IconSvg type={'code'} size={'sm'}/>
                  </span> */}
                  <div className='input'>
                    <input
                      type={'number'}
                      placeholder='请输入验证码'
                      {...getFieldProps('code',{
                        initialValue: '',
                      })}
                    />
                  </div>
                </div>
                <div className='get-code' onClick={()=>this.getCode()} >{this.state.message}</div>
              </div>
            </div>
            


            
            
            <div className='agree-checked-wrapper' onClick={() => this.setState({agree: !this.state.agree})}>
              <Checkbox checked={this.state.agree}/>
              <div className='agree-label'>
                登录即表示同意i体育<span><span onClick={(e) => { this.lookClause(e,'003')}  }>《服务条款》</span></span>和<span onClick={(e) => { this.lookClause(e,'002')}  }>《隐私政策》</span>
              </div>
            </div>

            <div className='login-bt' onClick={()=>this.handleForm()}>登录</div>
           
            
          </div>
          {/* <div className='bg'/> */}
        </WingBlank>
        <CommonClause showClauseModal={this.state.showClauseModal } clauseArticle={this.state.clauseArticle} onClose={this.onClose} ></CommonClause>
      </div>
    )
  }
}
export default createForm()(Login)
