import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox, Icon } from 'antd-mobile'

import IconSvg from '@/components/icon-svg'
import EnrollCustomForms from '@/components/enroll-custom-forms'

import './index.less'

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
      <div className='orderinfo-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back'  size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        >报名信息</NavBar>

            <WingBlank size="md" className='container' style={{padding: 0}}>
              <div className='status-info'>
                <label>状态：</label>
                <span>已付款</span>
              </div>
              <div className='order-info'>
                <div className='order-header'>
                  活动信息
                </div>
                <div className='order-content'>
                  <div className='order-content-item'>
                    <label>活动名称</label>
                    <span>2020厦门勇士杯</span>
                  </div>
                  <div className='order-content-item'>
                    <label>报名项目</label>
                    <span>5km(团队报名)</span>
                  </div>
                  <div className='order-content-item'>
                    <label>单价</label>
                    <span className='text-red'>￥189</span>
                  </div>
                  <div className='order-content-item'>
                    <label>数量</label>
                    <span className='text-red'>5</span>
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
                    <span>202056465464646</span>
                  </div>
                  <div className='order-content-item'>
                    <label>支付人</label>
                    <span>小关</span>
                  </div>
                  <div className='order-content-item'>
                    <label>支付人手机</label>
                    <span >18359201211</span>
                  </div>
                  <div className='order-content-item'>
                    <label>支付方式</label>
                    <span >微信支付</span>
                  </div>
                  <div className='order-content-item'>
                    <label>交易流水号</label>
                    <span >202056456465143</span>
                  </div>
                  <div className='order-content-item'>
                    <label>下单时间</label>
                    <span >2020.10.21 11：00：22</span>
                  </div>
                  <div className='order-content-item'>
                    <label>支付时间</label>
                    <span >2020.10.21 11：00：22</span>
                  </div>
                  <div className='order-content-item'>
                    <label>取消时间</label>
                    <span >2020.10.21 11：00：22</span>
                  </div>
                  <div className='order-content-item'>
                    <label>完成时间</label>
                    <span >2020.10.21 11：00：22</span>
                  </div>
                </div>
              </div>

              <div className='order-info'>
                <div className='order-header'>
                  退款信息
                </div>
                <div className='order-content'>
                  <div className='order-content-item'>
                    <label>退款类型</label>
                    <span>全额退款</span>
                  </div>
                  <div className='order-content-item'>
                    <label>退款金额</label>
                    <span className='text-red'>￥189</span>
                  </div>
                  <div className='order-content-item'>
                    <label>支付方式</label>
                    <span >微信支付</span>
                  </div>
                  <div className='order-content-item'>
                    <label>交易流水号</label>
                    <span >20205465646465</span>
                  </div>
                  <div className='order-content-item'>
                    <label>下单时间</label>
                    <span >2020.10.21 11：00：20</span>
                  </div>
                  <div className='order-content-item'>
                    <label>下单时间</label>
                    <span >2020.10.21 11：00：22</span>
                  </div>
                  <div className='order-content-item'>
                    <label>退款时间</label>
                    <span >2020.10.21 11：00：22</span>
                  </div>
                  <div className='order-content-item'>
                    <label>取消时间</label>
                    <span >2020.10.21 11：00：22</span>
                  </div>
                  <div className='order-content-item'>
                    <label>完成时间</label>
                    <span >2020.10.21 11：00：22</span>
                  </div>
                </div>
              </div>

              <div className='total-money'>
                <div>
                  <label>订单总金额：</label>
                  <span>￥945</span>
                </div>
              </div>
              
            </WingBlank>
      </div>
    )
  }
}

export default EnrollInfo

