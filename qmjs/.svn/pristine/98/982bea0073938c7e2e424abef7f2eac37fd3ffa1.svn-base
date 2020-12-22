import {Button, Form, Input, Modal, message} from 'antd'
import React from 'react'
import UploadImages from '@/components/UploadImages'
import {connect, history} from 'umi'
import CustomFormLook from './CustomFormLook'
import '../index.less'

const DetailForm = ({ hideDetailForm,lookOrderDetail, events: { enrollDetail = {}} }) => {
  const [form] = Form.useForm()
  return (
    <Modal
      width={700}
      title="查看报名详情"
      centered
      visible={true}
      okButtonProps={''}
      onCancel={() => hideDetailForm()}
      footer={<Button type="primary" onClick={()=>hideDetailForm()}>关闭</Button>}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name="basic"
      >
        <Form.Item
          name='itemName'
          label='报名项目'
          initialValue={enrollDetail.activityName}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          name='itemCost'
          label='报名费用'
          initialValue={enrollDetail.itemCost ? enrollDetail.itemCost : '免费'}
        >
          <Input suffix={enrollDetail.itemCost ? '元' : ''} disabled/>
        </Form.Item>
        <Form.Item
          name='name'
          label='姓名'
          initialValue={enrollDetail.name}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          name='mobile'
          label='手机号'
          initialValue={enrollDetail.mobile}
        >
          <Input disabled/>
        </Form.Item>
        {/* <Form.Item
          name='orderNo'
          label='手机号'
          initialValue={enrollDetail.orderNo}
        >
          <Input disabled/>
        </Form.Item> */}
        <CustomFormLook/>
        {/* <Form.Item
          label="保单图片"
          name="image"
          initialValue={''}
        >
          <UploadImages fileList={enrollDetail.insuranceImgs} disabled={true}/>
        </Form.Item> */}

        {
          enrollDetail.orderNo ?  
            <div className='order-base'>
              <Form.Item
                name='orderNo'
                label='订单编号'
              >
                <div style={{flex: 1}}>
                  <Input value={enrollDetail.orderNo} disabled/>
                </div>
                <div  className='order-base-text-1'>
                  <span >{enrollDetail.registrationStatus.name}</span>
                </div>
                
              </Form.Item>
              <Form.Item
                name='totalAmount'
                label='支付总金额'
              >
                <div style={{flex: 1}}>
                  <Input value={enrollDetail.totalAmount} disabled/>
                </div>
                <div className='order-base-text-2'>
                  <span onClick={()=>lookOrderDetail(enrollDetail.eventsEnrollPkId)}>查看订单详情</span>
                </div>
                
              </Form.Item>
            </div>
           
            

            // <div>
            //   <div style={{display: 'flex',justifyContent: 'space-between'}}>
            //     <Form.Item  label="订单编号"  initialValue={enrollDetail.orderNo} >
            //       <Input style={{width: '100px', marginLeft: '5px'}}></Input>
            //     </Form.Item>
            //     <span>{enrollDetail.registrationStatus.name}</span>
            //   </div> 
            //   <div style={{display: 'flex',justifyContent: 'space-between'}}>
            //     <Form.Item  label="支付总金额"  initialValue={enrollDetail.totalAmount} >
            //       <Input style={{width: '100px', marginLeft: '5px'}}></Input>
            //     </Form.Item>
            //     <span>查看订单详情</span>
            //   </div>
            // </div>
            : ''
        }

      
       
        
      </Form>
    </Modal>
  )
}

export default connect(({ events }) => ({
  events,
}))(DetailForm)
