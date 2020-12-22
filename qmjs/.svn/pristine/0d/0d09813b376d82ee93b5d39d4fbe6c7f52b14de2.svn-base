import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox, Button, Icon, Toast, Modal } from 'antd-mobile'

import IconSvg from '@/components/icon-svg'
import EnrollCustomForms from '@/components/enroll-custom-forms'
import { NotEmpty } from '@/utils/formValid'
import { createForm } from 'rc-form'
import CommonClause from '@/components/common-clause'
import './index.less'
import Router from '@/utils/router'
import BackToNativeHome from '@/components/back-to-native-home'

@connect(({ activity }) => ({ activity }))
class FamilyEnroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      agree: false,
      payAgree: false,
      enrollItemCostList: [],
      chooseIndex: null,
      teamNumber: [],
      loading: true,
      confirmModal: false,
      formParams: null,
      showClauseModal: false,
      clauseArticle: '',
    }
  }

  componentDidMount() {

    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'activity/detail', payload: {pkId: this.props.location.query.evensId} }).then(res => {
      this.props.dispatch({type: 'activity/enrollItemCost', payload: { pkId: this.props.location.query.evensId }}).then(res => {
        if (res && res.code === 200) {
          this.setState({
            enrollItemCostList: res.data
          })
          if(res.data.length == 1) {
            this.setState({
              chooseIndex: 0
            })
          }
          this.props.dispatch({type: 'activity/familyEnrollForm', payload: { pkId: this.props.location.query.evensId }}).then(res => {
            this.props.dispatch({ type:'index/hideLoading'})
            this.setState({
              loading: false
            })
          })
        }
      })
    })
  }

  confirmProject = (value) => {
    let curIndex = ''
    for(let i = 0; i < this.props.activity.enrollItemCostList.length; i++) {
      if(this.props.activity.enrollItemCostList[i].pkId == value[0]) {
        curIndex = Number(i)
        break
      }
    }
    this.setState({
      chooseIndex: curIndex
    })
  };

  enrollNow = (formData) =>{
    this.props.dispatch({ type: 'buriedPoint/qmjs_activity_applytry', payload: { objId: this.props.location.query.evensId }})
    if(!this.state.agree) {
      Toast.info('请勾选我已阅读并同意《赛事活动报名免责声明》')
      return false
    }
    let fixedForms = this.props.form.getFieldsValue()
    if(NotEmpty(fixedForms.enrollItemCostPkId, '请选择项目')) {
      let fixedForms = this.props.form.getFieldsValue()
      let keyAry = Object.keys(formData)
      let formBody = JSON.parse(JSON.stringify(this.props.activity.enrollForm.formFieldBos))
      let checkRequired = true

      for(let i = 0; i < formBody.length; i++) {
        // let item = formBody[i]
        let index = keyAry.indexOf(formBody[i].pkId)
        let keyName = keyAry[index]
        if(index > -1) {
          let type = formBody[i].type.value
          if(type == 0 || type == 1 || type == 4 || type == 9) {

            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder? formBody[i].placeholder : '请输入' + formBody[i].labelName)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.value = formData[keyName]
          }else if(type == 2) {
            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder? formBody[i].placeholder : '请选择' + formBody[i].labelName)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = formData[keyName]
          }else if(type == 3) {
            let checkedAry = []
            formData[keyName].forEach((item, index) => {
              if(item) {
                checkedAry.push(index)
              }
            })
            if(formBody[i].required && !NotEmpty(checkedAry, formBody[i].placeholder? formBody[i].placeholder : '请选择' + formBody[i].labelName)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = checkedAry
          }else if(type == 5) {
            if(formBody[i].required && (!NotEmpty(formData[keyName], formBody[i].placeholder) || !NotEmpty(formData[keyName + '-card'], formBody[i].placeholder))) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = formData[keyName]
            formBody[i].expand.value = formData[keyName + '-card']
          }else if(type == 6 || type == 11) {
            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.images = formData[keyName]
          }else if(type == 7 ) {
            if(formBody[i].required && (!NotEmpty(formData[keyName], formBody[i].placeholder) || !NotEmpty(formData[keyName + '-detail'], '请输入详细地址'))) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = formData[keyName]
            formBody[i].expand.value = formData[keyName + '-detail']
          }else if(type == 8 ) {
            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.value = new Date(formData[keyName]).getTime()
          }else if(type == 10 ) {
            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = formData[keyName]
          }
          let saveType = formBody[i].type.value
          formBody[i].type = ''
          formBody[i].type =  saveType
        }
      }


      // formBody.map(item => {
      //   let index = keyAry.indexOf(item.pkId)
      //   let keyName = keyAry[index]
      //   if(index > -1) {
      //     let type = item.type.value
      //     if(type == 0 || type == 1 || type == 4 || type == 9) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.value = formData[keyName]
      //     }else if(type == 2) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = formData[keyName]
      //     }else if(type == 3) {
      //       let checkedAry = []
      //       formData[keyName].forEach((item, index) => {
      //         if(item) {
      //           checkedAry.push(index)
      //         }
      //       })
      //       if(item.required && !NotEmpty(checkedAry, item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = checkedAry
      //     }else if(type == 5) {
      //       if(item.required && (!NotEmpty(formData[keyName], item.placeholder) || !NotEmpty(formData[keyName + '-card'], item.placeholder))) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = formData[keyName]
      //       item.expand.value = formData[keyName + '-card']
      //     }else if(type == 6 || type == 11) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.images = formData[keyName]
      //     }else if(type == 7 ) {
      //       if(item.required && (!NotEmpty(formData[keyName], item.placeholder) || !NotEmpty(formData[keyName + '-detail'], '请输入详细地址'))) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = formData[keyName]
      //       item.expand.value = formData[keyName + '-detail']
      //     }else if(type == 8 ) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.value = new Date(formData[keyName]).getTime()
      //     }else if(type == 10 ) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = formData[keyName]
      //     }
      //     let saveType = item.type.value
      //     item.type = ''
      //     item.type =  saveType
      //   }
      // })

      if(checkRequired) {
        let fixedBody = {
          enrollItemCostPkId: fixedForms.enrollItemCostPkId[0],
          name: fixedForms.name,
          mobile: fixedForms.mobile,
          call: fixedForms.call,
          type: 2,
        }
        let body = {
          ...fixedBody,
          itemArray: [formBody]
        }

        this.setState({
          confirmModal: true,
          formParams: body
        })
      }
    }
  }


  preloadJs =()=> {
    // Promise语法是ES6⽀持的，其他不⽀持的请⾃⾏转成ES5
    let ua = window.navigator.userAgent.toLowerCase()
    return new Promise((resolve, rejct) =>{
      if (ua.indexOf('xmsmk') !== -1) {
        if (window.UmsApi === undefined) {
          document.addEventListener('OnUmsApiReady',
            function() {
              resolve(true)
            },
            false)
        } else {
          resolve(true)
        }
      }else {
        // ⾮市⺠卡接⼊
        reject('⾮市⺠卡接⼊')
      }
    })
  }

  confirmEnroll = () =>{
    Toast.loading('提交中...', 0)
    let formParams = this.state.formParams
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('xmsmk') !== -1) {
      this.preloadJs().then(res =>{
        // 调⽤市⺠卡相关⽅法
        console.log('是市名卡')
        this.props.dispatch({type: 'activity/signUp', payload: formParams}).then(res => {
          if (res && res.code === 200) {
            // Router.replace('/activity/enrollSuccess', { evensId: this.props.location.query.evensId })
            // Toast.info(res.message, 2)
            if(res.data.orderNo) {
              this.props.dispatch({type: 'activity/signUpPay', payload: {orderNo: res.data.orderNo}}).then(res => {
                location.href = res.data.payData
              })
            }else {
              Router.replace('/activity/enrollSuccess', { eventsEnrollPkId: res.data.eventsEnrollPkId })
              Toast.info(res.message, 2)
            }
          }
        })
      })
    }else {
      this.props.dispatch({type: 'activity/signUp', payload: formParams}).then(res => {
        if (res && res.code === 200) {
          if(res.data.payData) {
            location.href = res.data.payData
            // Router.replace('/activity/enrollSuccess', { evensId: this.props.location.query.evensId })
            // Toast.info(res.message, 2)
          }else {
            if(res.data.orderNo) {
              this.props.dispatch({type: 'activity/signUpPay', payload: {orderNo: res.data.orderNo}}).then(res => {
                location.href = res.data.payData
              })
            }else {
              Router.replace('/activity/enrollSuccess', { eventsEnrollPkId: res.data.eventsEnrollPkId })
              Toast.info(res.message, 2)
            }
          }
        }
      })
    }
    this.onClose('confirmModal')
  }

  onClose = (key) => {
    this.setState({
      [key]: false,
    })
  }

  lookClause(e, type) {
    e.stopPropagation()
    this.props.dispatch({ type: 'home/clause', payload: { clauseType: type } }).then(res => {
      if(res.code == 200) {
        this.setState({showClauseModal: true, clauseArticle: res.data.content})
      }
    })
  }

  checkIsEnroll =()=> {
    let enrollItemCostPkId = this.props.activity.enrollItemCostList[this.state.chooseIndex].pkId
    this.props.dispatch({ type:'activity/repeatSignUp', payload: {enrollItemCostPkId: enrollItemCostPkId} }).then(res => {
      if(res && res.code == 200) {
        if(res.data) {
          Router.go(-1)
        }
      }
    })
  }

  unifyPay =(orderNumber)=>{
    let that = this
    UmsApi.page.processUnifyPay({orderNo: orderNumber}, function(data) {
    // data中respCode为：0000 表示成功，其他情况失败
      console.log('返回数据:'+JSON.stringify(data))
      // that.checkIsEnroll()
      Router.go(-1)
    },function(data){
    //失败
      console.log('返回数据:'+JSON.stringify(data))
    })
  }



  onCloseClauseModal=()=> {
    this.setState({
      showClauseModal: false,
      agree: true
    })
  }

  moneyEnroll = (formData) => {
    this.props.dispatch({ type: 'buriedPoint/qmjs_activity_applytry', payload: { objId: this.props.location.query.evensId }})
    if(!this.state.agree) {
      Toast.info('请勾选我已阅读并同意《赛事活动报名免责声明》')
      return false
    }
    let fixedForms = this.props.form.getFieldsValue()
    if(NotEmpty(fixedForms.enrollItemCostPkId, '请选择项目')) {
      let fixedForms = this.props.form.getFieldsValue()
      let keyAry = Object.keys(formData)
      let formBody = JSON.parse(JSON.stringify(this.props.activity.enrollForm.formFieldBos))
      let checkRequired = true

      for(let i = 0; i < formBody.length; i++) {
        // let item = formBody[i]
        let index = keyAry.indexOf(formBody[i].pkId)
        let keyName = keyAry[index]
        if(index > -1) {
          let type = formBody[i].type.value
          if(type == 0 || type == 1 || type == 4 || type == 9) {

            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder? formBody[i].placeholder : '请输入' + formBody[i].labelName)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.value = formData[keyName]
          }else if(type == 2) {
            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder? formBody[i].placeholder : '请选择' + formBody[i].labelName)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = formData[keyName]
          }else if(type == 3) {
            let checkedAry = []
            formData[keyName].forEach((item, index) => {
              if(item) {
                checkedAry.push(index)
              }
            })
            if(formBody[i].required && !NotEmpty(checkedAry, formBody[i].placeholder? formBody[i].placeholder : '请选择' + formBody[i].labelName)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = checkedAry
          }else if(type == 5) {
            if(formBody[i].required && (!NotEmpty(formData[keyName], formBody[i].placeholder) || !NotEmpty(formData[keyName + '-card'], formBody[i].placeholder))) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = formData[keyName]
            formBody[i].expand.value = formData[keyName + '-card']
          }else if(type == 6 || type == 11) {
            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.images = formData[keyName]
          }else if(type == 7 ) {
            if(formBody[i].required && (!NotEmpty(formData[keyName], formBody[i].placeholder) || !NotEmpty(formData[keyName + '-detail'], '请输入详细地址'))) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = formData[keyName]
            formBody[i].expand.value = formData[keyName + '-detail']
          }else if(type == 8 ) {
            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.value = new Date(formData[keyName]).getTime()
          }else if(type == 10 ) {
            if(formBody[i].required && !NotEmpty(formData[keyName], formBody[i].placeholder)) {
              checkRequired = false
              return false
            }
            formBody[i].expand.selectedItemIndex = formData[keyName]
          }
          let saveType = formBody[i].type.value
          formBody[i].type = ''
          formBody[i].type =  saveType
        }
      }


      // formBody.map(item => {
      //   let index = keyAry.indexOf(item.pkId)
      //   let keyName = keyAry[index]
      //   if(index > -1) {
      //     let type = item.type.value
      //     if(type == 0 || type == 1 || type == 4 || type == 9) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.value = formData[keyName]
      //     }else if(type == 2) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = formData[keyName]
      //     }else if(type == 3) {
      //       let checkedAry = []
      //       formData[keyName].forEach((item, index) => {
      //         if(item) {
      //           checkedAry.push(index)
      //         }
      //       })
      //       if(item.required && !NotEmpty(checkedAry, item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = checkedAry
      //     }else if(type == 5) {
      //       if(item.required && (!NotEmpty(formData[keyName], item.placeholder) || !NotEmpty(formData[keyName + '-card'], item.placeholder))) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = formData[keyName]
      //       item.expand.value = formData[keyName + '-card']
      //     }else if(type == 6 || type == 11) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.images = formData[keyName]
      //     }else if(type == 7 ) {
      //       if(item.required && (!NotEmpty(formData[keyName], item.placeholder) || !NotEmpty(formData[keyName + '-detail'], '请输入详细地址'))) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = formData[keyName]
      //       item.expand.value = formData[keyName + '-detail']
      //     }else if(type == 8 ) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.value = new Date(formData[keyName]).getTime()
      //     }else if(type == 10 ) {
      //       if(item.required && !NotEmpty(formData[keyName], item.placeholder)) {
      //         checkRequired = false
      //         return false
      //       }
      //       item.expand.selectedItemIndex = formData[keyName]
      //     }
      //     let saveType = item.type.value
      //     item.type = ''
      //     item.type =  saveType
      //   }

      // })

      if(checkRequired) {

        let fixedBody = {
          enrollItemCostPkId: fixedForms.enrollItemCostPkId[0],
          name: fixedForms.name,
          mobile: fixedForms.mobile,
          call: fixedForms.call,
          type: 2,
        }
        let body = {
          ...fixedBody,
          itemArray: [formBody]
        }
        Toast.loading('提交中...', 0)
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.indexOf('xmsmk') !== -1) {
          this.preloadJs().then(res =>{
            // 调⽤市⺠卡相关⽅法
            console.log('是市名卡')
            this.props.dispatch({type: 'activity/signUp', payload: body}).then(res => {
              if (res && res.code === 200) {
                // Router.replace('/activity/enrollSuccess', { evensId: this.props.location.query.evensId })
                // Toast.info(res.message, 2)
                if(res.data.orderNo) {
                  // this.props.dispatch({type: 'activity/signUpPay', payload: {orderNo: res.data.orderNo}}).then(res => {
                  //   location.href = res.data.payData
                  // })
                  this.unifyPay(res.data.orderNo)
                }else {
                  Router.replace('/activity/enrollSuccess', { eventsEnrollPkId: res.data.eventsEnrollPkId })
                  Toast.info(res.message, 2)
                }
              }
            })
          })
        }else {
          this.props.dispatch({type: 'activity/signUp', payload: body}).then(res => {
            if (res && res.code === 200) {
              if(res.data.payData) {
                location.href = res.data.payData
                // Toast.info(res.message, 2)
                // Router.replace('/activity/enrollSuccess', { evensId: this.props.location.query.evensId })
              }else {
                if(res.data.orderNo) {
                  this.props.dispatch({type: 'activity/signUpPay', payload: {orderNo: res.data.orderNo}}).then(res => {
                    location.href = res.data.payData
                  })
                }else {
                  //免费
                  Router.replace('/activity/enrollSuccess', { eventsEnrollPkId: res.data.eventsEnrollPkId })
                  Toast.info(res.message, 2)
                }
              }
            }
          })
        }
        this.onClose('confirmModal')
      }
    }
  }






  render() {
    const { getFieldProps } = this.props.form
    const { activity } = this.props
    activity && activity.enrollItemCostList.length > 0 && activity.enrollItemCostList.map(item => {
      item.label = item.itemName
      item.value = item.pkId
      // item.itemCost = item.itemCost == null ? '免费' : item.itemCost
    })

    const detail = activity.detail

    return (
      <div className='family-enroll-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >活动报名</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container' style={{padding: 0}}>
              <div className='enroll'>
                <div className='active-info'>
                  <div className='active-header'>
                    活动名称：{detail.title}
                  </div>
                  <div className='active-content'>
                    <List>
                      <Picker
                        data={activity.enrollItemCostList}
                        cols={1}
                        extra={<span className='placeholder'>请选择报名项目</span>}
                        onOk={e=>this.confirmProject(e)}
                        {...getFieldProps('enrollItemCostPkId',{
                          initialValue: activity.enrollItemCostList.length === 1 ? [activity.enrollItemCostList[0].pkId] : []
                        })}
                      >
                        <List.Item className='require' arrow={'horizontal'}>选择报名项目</List.Item>
                      </Picker>
                      <InputItem
                        className="head-price"
                        clear
                        {...getFieldProps('price',{
                          initialValue:  this.state.chooseIndex !== null ? activity.enrollItemCostList[this.state.chooseIndex].itemCost == null ? '免费' : activity.enrollItemCostList[this.state.chooseIndex].itemCost : ''
                        })}
                        disabled
                      >单价
                      </InputItem>
                    </List>
                  </div>
                </div>
                <div className='enroll-info'>
                  <div className='enroll-info-header'>
                    <div>
                      报名信息
                    </div>
                    <div className='desc'>
                      报名成功后将短信通知家庭联系人，请准确填写报名人信息，以便办理各种手续和购买保险
                    </div>
                  </div>
                  <div className='enroll-info-content'>
                    <List>
                      <InputItem
                        className='require'
                        // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true" />}
                        placeholder='例如：小饼干家庭'
                        {...getFieldProps('call', {
                          initialValue: ''
                        })}
                      >家庭名称</InputItem>
                      <InputItem
                        className='require'
                        // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true" />}
                        placeholder='请输入家庭联系人'
                        {...getFieldProps('name', {
                          initialValue: activity.enrollForm && activity.enrollForm.realName
                        })}
                      >家庭联系人</InputItem>
                      <InputItem
                        className='require'
                        type='phone'
                        placeholder='请输入电话'
                        {...getFieldProps('mobile', {
                          initialValue: activity.enrollForm && activity.enrollForm.mobile
                        })}
                      >联系电话</InputItem>
                    </List>
                    <EnrollCustomForms  canedit={true}   ref={(form) => this.customForms = form}></EnrollCustomForms>
                  </div>
                </div>

                {/* <div className='pay-info' >
                  <div className='pay-info-text'>
                      支付方式
                  </div>
                  <div className="pay-info-wx" onClick={() => this.setState({payAgree: !this.state.payAgree})}>
                    <div className="pay-info-wx-text">
                      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2638031227,205623310&fm=26&gp=0.jpg"></img>
                      <span>微信支付</span>
                    </div>
                    <div >
                      <Checkbox checked={this.state.payAgree}/>
                    </div>
                  </div>
                </div> */}

              </div>
            </WingBlank>
        }
        <div className='op-info'>
          <div className='agree-checked-wrapper' onClick={() => this.setState({agree: !this.state.agree})}>
            <Checkbox checked={this.state.agree}/>
            <div className='agree-label'>
                我已阅读并同意<span onClick={(e) => { this.lookClause(e,'001')} }>《报名条款》</span>
            </div>
          </div>
          <div className='enroll-op'>
            <div className='enroll-op-left'>
              <span>总金额:</span>
              <span className='price'>{this.state.chooseIndex !== null ? activity.enrollItemCostList[this.state.chooseIndex].itemCost ==null ? '免费' : '￥' + activity.enrollItemCostList[this.state.chooseIndex].itemCost  : ''}</span>
            </div>
            {/* this.props.form.getFieldsValue() */}
            {/* <div className='enroll-op-right btn-md' onClick={ e=> this.enrollNow(this.customForms.getFieldsValue())}>
                  立即报名
            </div> */}
            <div className='enroll-op-right btn-md' onClick={ e=>  this.state.chooseIndex !== null? activity.enrollItemCostList[this.state.chooseIndex].itemCost ==null ? this.enrollNow(this.customForms.getFieldsValue()) : this.moneyEnroll(this.customForms.getFieldsValue()) : Toast.info('请选择项目') }>立即报名</div>
          </div>
        </div>
        <Modal
          visible={this.state.confirmModal}
          transparent
          maskClosable={false}
          onClose={e=>this.onClose('confirmModal')}
          footer={[{ text: '取消', onPress: () => {  this.onClose('confirmModal') } },{ text: '确定', onPress: () => { this.confirmEnroll() } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => { }}
        >
          <div style={{ height: 100, overflow: 'scroll', display: 'flex', alignItems: 'center',justifyContent: 'center' }}>

            {
              this.state.chooseIndex !== null ? activity.enrollItemCostList[this.state.chooseIndex].itemCost ?
                <div>
                  <span>本次报名需支付报名费</span><span>{activity.enrollItemCostList[this.state.chooseIndex].itemCost + '元'}</span>
                  <span>,成功报名后，报名人员将联系您进行支付，确定报名吗？</span>
                </div> : '确定报名吗'
                : ''
            }
          </div>
        </Modal>
        <CommonClause showClauseModal={this.state.showClauseModal } clauseArticle={this.state.clauseArticle} onClose={this.onCloseClauseModal} ></CommonClause>
      </div>
    )
  }

}
export default createForm()(FamilyEnroll)

