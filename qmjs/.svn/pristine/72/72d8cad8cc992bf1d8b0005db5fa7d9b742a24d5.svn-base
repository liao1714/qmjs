import {Button, Form, Modal} from 'antd'
import React from 'react'
import {connect} from 'umi'
import { formatDate } from '@/utils/utils'
import '../index.less'

const OrderDetailForm = ({ hideOrderForm, events: { orderDetail = {}} }) => {
  const [form] = Form.useForm()
  console.log('orderDetail')
  console.log(orderDetail)
  return (
    <Modal
      width={1000}
      title="查看订单详情"
      centered
      visible={true}
      okButtonProps={''}
      onCancel={() => hideOrderForm()}
      footer={<Button type="primary" onClick={()=>hideOrderForm()}>关闭</Button>}
    >
      <Form >
        <div className="order-info">
          <div className="order-info-header">
            订单信息
          </div>
          <div className="order-info-body">
            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.orderNo ?
                <div className='order-info-block'>
                  <span>订单编号：</span>
                  <span>{orderDetail.orderMasterVo.orderNo }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.payerName ?
                <div className='order-info-block'>
                  <span>支付人：</span>
                  <span>{orderDetail.orderMasterVo.payerName }</span>
                </div> : ''
            }

            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.payerMobile ?
                <div className='order-info-block'>
                  <span>支付人手机：</span>
                  <span>{orderDetail.orderMasterVo.payerMobile }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.payType ?
                <div className='order-info-block'>
                  <span>支付方式：</span>
                  <span>{orderDetail.orderMasterVo.payType == '01' ? '微信支付' : '' }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.transactionSerialNumber ?
                <div className='order-info-block'>
                  <span>交易流水号：</span>
                  <span>{orderDetail.orderMasterVo.transactionSerialNumber }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.orderTime ?
                <div className='order-info-block'>
                  <span>下单时间：</span>
                  <span>{formatDate(orderDetail.orderMasterVo.orderTime, 'yyyy-MM-dd HH:mm:ss') }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.payTime ?
                <div className='order-info-block'>
                  <span>支付时间：</span>
                  <span>{formatDate(orderDetail.orderMasterVo.payTime, 'yyyy-MM-dd HH:mm:ss') }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.cancelTime ?
                <div className='order-info-block'>
                  <span>取消时间：</span>
                  <span>{formatDate(orderDetail.orderMasterVo.cancelTime, 'yyyy-MM-dd HH:mm:ss') }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.orderMasterVo && orderDetail.orderMasterVo.finishTime ?
                <div className='order-info-block'>
                  <span>完成时间：</span>
                  <span>{formatDate(orderDetail.orderMasterVo.finishTime, 'yyyy-MM-dd HH:mm:ss') }</span>
                </div> : ''
            }
          </div>
        </div>


        <div className="order-info">
          <div className="order-info-header">
            活动信息
          </div>
          <div className="order-info-body">
            {
              orderDetail && orderDetail.activityInformationVo && orderDetail.activityInformationVo.title ?
                <div className='order-info-block'>
                  <span>活动名称：</span>
                  <span>{orderDetail.activityInformationVo.title }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.activityInformationVo && orderDetail.activityInformationVo.itemName ?
                <div className='order-info-block'>
                  <span>报名项目：</span>
                  <span>{orderDetail.activityInformationVo.itemName + orderDetail.activityInformationVo.eventsMode.name }</span>
                </div> : ''
            }

            {
              orderDetail && orderDetail.activityInformationVo && orderDetail.activityInformationVo.itemCost ?
                <div className='order-info-block'>
                  <span>单价：</span>
                  <span>{orderDetail.activityInformationVo.itemCost }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.activityInformationVo && orderDetail.activityInformationVo.numebr ?
                <div className='order-info-block'>
                  <span>数量：</span>
                  <span>{orderDetail.activityInformationVo.numebr }</span>
                </div> : ''
            }

          </div>
        </div>

        <div className="order-info">
          <div className="order-info-header">
            退款信息
          </div>
          <div className="order-info-body">
            {
              orderDetail && orderDetail.refunderInfoVo && orderDetail.refunderInfoVo.refunderName ?
                <div className='order-info-block'>
                  <span>退款人：</span>
                  <span>{orderDetail.refunderInfoVo.refunderName }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.refunderInfoVo && orderDetail.refunderInfoVo.refunderMobile ?
                <div className='order-info-block'>
                  <span>退款人手机：</span>
                  <span>{orderDetail.refunderInfoVo.refunderMobile }</span>
                </div> : ''
            }

            {
              orderDetail && orderDetail.refunderInfoVo && orderDetail.refunderInfoVo.payType ?
                <div className='order-info-block'>
                  <span>支付方式：</span>
                  <span>{orderDetail.refunderInfoVo.payType == '01' ? '微信支付' : '' }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.refunderInfoVo && orderDetail.refunderInfoVo.refundType ?
                <div className='order-info-block'>
                  <span>退款类型：</span>
                  <span>{orderDetail.refunderInfoVo.refundType.name }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.refunderInfoVo && orderDetail.refunderInfoVo.refundAmount ?
                <div className='order-info-block'>
                  <span>退款金额：</span>
                  <span>{orderDetail.refunderInfoVo.refundAmount }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.refunderInfoVo && orderDetail.refunderInfoVo.transactionSerialNumber ?
                <div className='order-info-block'>
                  <span>交易流水号：</span>
                  <span>{orderDetail.refunderInfoVo.transactionSerialNumber }</span>
                </div> : ''
            }
            {
              orderDetail && orderDetail.refunderInfoVo && orderDetail.refunderInfoVo.createdDate ?
                <div className='order-info-block'>
                  <span>退款时间：</span>
                  <span>{formatDate(orderDetail.refunderInfoVo.createdDate, 'yyyy-MM-dd HH:mm:ss')  }</span>
                </div> : ''
            }


          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default connect(({ events }) => ({
  events,
}))(OrderDetailForm)
