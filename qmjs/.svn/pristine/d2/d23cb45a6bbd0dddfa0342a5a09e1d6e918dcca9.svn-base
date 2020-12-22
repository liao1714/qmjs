import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox, Icon } from 'antd-mobile'

import IconSvg from '@/components/icon-svg'
import EnrollCustomForms from '@/components/enroll-custom-forms'
import { formatDate } from '@/utils/methons'
import Router from '@/utils/router'
import './index.less'
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
    this.props.dispatch({type: 'activity/orderDetail', payload: { eventsEnrollPkId: this.props.location.query.eventsEnrollPkId }}).then(res => {
      console.log('res')
      console.log(res)
    })
  }



  render() {
    const { activity } = this.props

    return (
      <div className='orderinfo-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >订单详情</NavBar>

        <WingBlank size="md" className='container' style={{padding: 0}}>
          <div className='status-info'>
            <label>状态：</label>
            <span>{activity.orderDetail && activity.orderDetail.activityInformationVo && activity.orderDetail.activityInformationVo.registrationStatusEnum && activity.orderDetail.activityInformationVo.registrationStatusEnum.name}</span>
          </div>
          <div className='order-info'>
            <div className='order-header'>
              活动信息
            </div>
            <div className='order-content'>
              <div className='order-content-item'>
                <label>活动名称</label>
                <span>{activity.orderDetail && activity.orderDetail.activityInformationVo &&activity.orderDetail.activityInformationVo.title}</span>
              </div>
              <div className='order-content-item'>
                <label>报名项目</label>
                <span>{activity.orderDetail && activity.orderDetail.activityInformationVo &&activity.orderDetail.activityInformationVo.itemName + '(' + activity.orderDetail.activityInformationVo.eventsMode.name + ')'}</span>
              </div>
              <div className='order-content-item'>
                <label>单价</label>
                <span className='text-red'>{activity.orderDetail && activity.orderDetail.activityInformationVo && '￥' + activity.orderDetail.activityInformationVo.itemCost}</span>
              </div>
              <div className='order-content-item'>
                <label>数量</label>
                <span className='text-red'>{activity.orderDetail && activity.orderDetail.activityInformationVo && activity.orderDetail.activityInformationVo.numebr}</span>
              </div>
            </div>
          </div>

          <div className='order-info'>
            <div className='order-header'>
                  订单信息
            </div>
            <div className='order-content'>
              <div className='order-content-item'>
                <label>订单编号</label>
                <span>{activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.orderNo}</span>
              </div>
              <div className='order-content-item'>
                <label>支付人</label>
                <span>{activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.payerName}</span>
              </div>
              <div className='order-content-item'>
                <label>支付人手机</label>
                <span >{activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.payerMobile}</span>
              </div>
              <div className='order-content-item'>
                <label>支付方式</label>
                <span >{activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.payType == '01' ? '微信支付' : ''}</span>
              </div>
              <div className='order-content-item'>
                <label>交易流水号</label>
                <span >{activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.transactionSerialNumber}</span>
              </div>
              <div className='order-content-item'>
                <label>下单时间</label>
                <span >{activity.orderDetail && activity.orderDetail.orderMasterVo && formatDate(activity.orderDetail.orderMasterVo.orderTime, 'yyyy-MM-dd HH:mm')}</span>
              </div>
              {
                activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.payTime ?
                  <div className='order-content-item'>
                    <label>支付时间</label>
                    <span >{formatDate(activity.orderDetail.orderMasterVo.payTime, 'yyyy-MM-dd HH:mm')}</span>
                  </div>
                  : ''
              }

              {
                activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.cancelTime ?
                  <div className='order-content-item'>
                    <label>取消时间</label>
                    <span >{formatDate(activity.orderDetail.orderMasterVo.cancelTime, 'yyyy-MM-dd HH:mm')}</span>
                  </div>
                  : ''
              }
              {
                activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.finishTime ?
                  <div className='order-content-item'>
                    <label>完成时间</label>
                    <span >{formatDate(activity.orderDetail.orderMasterVo.finishTime, 'yyyy-MM-dd HH:mm')}</span>
                  </div>
                  : ''
              }
            </div>
          </div>

          {
            activity.orderDetail && activity.orderDetail.activityInformationVo && activity.orderDetail.activityInformationVo.registrationStatusEnum && activity.orderDetail.activityInformationVo.registrationStatusEnum.value == 1?
              <div className='order-info'>
                <div className='order-header'>
                  退款信息
                </div>
                <div className='order-content'>
                  {
                    activity.orderDetail && activity.orderDetail.refunderInfoVo && activity.orderDetail.refunderInfoVo.refundType ?
                      <div className='order-content-item'>
                        <label>退款类型</label>
                        <span >{activity.orderDetail.refunderInfoVo.refundType.name}</span>
                      </div>
                      : ''
                  }
                  {
                    activity.orderDetail && activity.orderDetail.refunderInfoVo && activity.orderDetail.refunderInfoVo.refundAmount ?
                      <div className='order-content-item'>
                        <label>退款金额</label>
                        <span >{'￥' + activity.orderDetail.refunderInfoVo.refundAmount}</span>
                      </div>
                      : ''
                  }

                  {
                    activity.orderDetail && activity.orderDetail.refunderInfoVo && activity.orderDetail.refunderInfoVo.payType ?
                      <div className='order-content-item'>
                        <label>支付方式</label>
                        <span >{'￥' + activity.orderDetail.refunderInfoVo.payType == '01' ? '微信支付' : '微信支付'}</span>
                      </div>
                      : ''
                  }

                  {
                    activity.orderDetail && activity.orderDetail.refunderInfoVo && activity.orderDetail.refunderInfoVo.transactionSerialNumber ?
                      <div className='order-content-item'>
                        <label>交易流水号</label>
                        <span >{ activity.orderDetail.refunderInfoVo.transactionSerialNumber }</span>
                      </div>
                      : ''
                  }

                  <div className='order-content-item'>
                    <label>下单时间</label>
                    <span >{activity.orderDetail && activity.orderDetail.orderMasterVo && formatDate(activity.orderDetail.orderMasterVo.orderTime, 'yyyy-MM-dd HH:mm')}</span>
                  </div>

                  {
                    activity.orderDetail && activity.orderDetail.refunderInfoVo && activity.orderDetail.refunderInfoVo.createdDate ?
                      <div className='order-content-item'>
                        <label>退款时间</label>
                        <span >{ formatDate(activity.orderDetail.refunderInfoVo.createdDate, 'yyyy-MM-dd HH:mm') }</span>
                      </div>
                      : ''
                  }


                  {
                    activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.cancelTime ?
                      <div className='order-content-item'>
                        <label>取消时间</label>
                        <span >{formatDate(activity.orderDetail.orderMasterVo.cancelTime, 'yyyy-MM-dd HH:mm')}</span>
                      </div>
                      : ''
                  }
                </div>
              </div>
              : ''
          }



          <div className='total-money'>
            <div>
              <label>订单总金额：</label>
              <span>￥{activity.orderDetail && activity.orderDetail.orderMasterVo && activity.orderDetail.orderMasterVo.totalAmount}</span>
            </div>
          </div>

        </WingBlank>
      </div>
    )
  }
}

export default EnrollInfo

