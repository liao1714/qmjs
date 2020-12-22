import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox, Icon } from 'antd-mobile'

import IconSvg from '@/components/icon-svg'
import EnrollCustomForms from '@/components/enroll-custom-forms'

import './index.less'
import Router from '@/utils/router';
import BackToNativeHome from '@/components/back-to-native-home';

@connect(({ activity }) => ({ activity }))
class EnrollInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      agree: false,
      payAgree: false
    }

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='enrollinfo-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >报名信息</NavBar>

        <WingBlank size="md" className='container' style={{padding: 0}}>
          <div className='enroll'>
            <div className='enroll-status'>
              <span>状态：</span>
              <span className='flag'>已报名</span>
            </div>
            <div className='enroll-info'>
              <div className='enroll-info-header'>
                    报名信息
              </div>
              <div className='enroll-info-content'>
                <div className='enroll-info-content-item'>
                  <label>活动名称</label>
                  <span>2020厦门勇士杯</span>
                </div>
                <div className='enroll-info-content-item'>
                  <label>报名项目</label>
                  <span>5km</span>
                </div>
                <div className='enroll-info-content-item'>
                  <label>报名方式</label>
                  <span>个人报名</span>
                </div>
                <div className='enroll-info-content-item'>
                  <label>报名人数</label>
                  <span>￥99</span>
                </div>
                <div className='enroll-info-content-item'>
                  <label>单价</label>
                  <span>￥88</span>
                </div>
                <div className='enroll-info-content-item'>
                  <label>报名时间</label>
                  <span>2020-10-10 11：10</span>
                </div>
                <div className='enroll-info-content-item'>
                  <label>取消时间</label>
                  <span>2020-10-10 11：10</span>
                </div>
              </div>
            </div>
            <div className='personal-info'>
              <div className='personal-info-header'>
                    报名人信息
              </div>
              <div className='personal-info-content'>
                <EnrollCustomForms ></EnrollCustomForms>
              </div>

            </div>
            <div className='order-info'>
              <div className='order-info-number'>
                <label>订单编号：2020121312321321312</label>
                <span>已付款</span>
              </div>
              <div className='order-info-money'>
                <div>
                  <label>支付总金额</label>

                  <span className='price'>￥945</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <span>查看订单信息</span>
                  <Icon type={'right'} />
                </div>


              </div>
            </div>
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default EnrollInfo

