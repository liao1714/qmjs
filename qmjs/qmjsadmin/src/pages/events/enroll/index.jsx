import React, { useState, Component } from 'react'
import {Button, Table, Modal, message, Pagination, Radio, Form,  Row, Col, Input, InputNumber } from 'antd'
import SearchForm from './components/SearchForm'
import DetailForm from './components/DetailForm'

import OrderDetailForm from './components/OrderDetailForm'

import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import {connect, history} from 'umi'
import './index.less'
import { exportExcel } from '@/utils/exportExcel'
import {getPermissions} from '@/utils/accountInfo'

import { FormInstance } from 'antd/lib/form'
import QRCode from 'qrcode.react'

class EventsEnroll extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      loading: false,
      total: 0,
      pageSize: 20,
      current: 1,
      tableData: [],

      enrollHeader: {},

      modalType: '',
      modalShow: false,
      modalLoading: false,
      modalMessage: '',
      enrollItemCostPkId: '',
      userPkId: '',
      maxRefundMoney: '',

      showDetailForm: false,
      returnMoneyModal: false,
      orderDetailModal: false,
      curUserPkId: '',

      signInDownShow: false
    }
  }
  componentDidMount() {
    this.handleSearch()
    this.props.dispatch({
      type: 'events/enrollHeader',
      payload: {
        pkId: history.location.query.pkId,
      }
    }).then(res => {
      if (res && res.code === 200) {
        console.log(res)
        this.setState({
          enrollHeader: res.data
        })
      }
    })
  }

  getSearchForm =(v)=> {
    this.setState({
      enrollItemCostPkId: v.enrollItemCostPkId,
      name: v.name,
      mobile: v.mobile,
    })
    this.handleSearch()
  }

  handleSearch =()=> {
    let body = {
      pkId: history.location.query.pkId,
      enrollItemCostPkId: this.state.enrollItemCostPkId,
      name: this.state.name,
      mobile: this.state.mobile,
      page: this.state.current - 1,
      size: this.state.pageSize,
    }
    this.setState({
      loading: true
    })
    console.log(body)
    this.props.dispatch({
      type: 'events/enrollInfo',
      payload: body
    }).then(res => {
      console.log(res)
      if (res && res.code === 200) {
        this.setState({
          total: res.data.total,
          tableData: res.data.result,
        })
      }
      this.setState({
        loading: false
      })
    })
  }

  change =(current, pageSize) => {
    new Promise((resolve, reject) => {
      this.setState({
        current: current,
        pageSize: pageSize,
      })
      resolve()
    }).then(() => {
      this.handleSearch()
    })
  }



  showModal =(type, enrollItemCostPkId, userPkId)=> {
    let modalMessage = ''
    if (type === 1) {
      modalMessage = '每个用户只能取消一次，取消前务必和用户确认，确定要取消吗？'
    }
    this.setState({
      userPkId: userPkId,
      enrollItemCostPkId: enrollItemCostPkId,
      modalType: type,
      modalMessage: modalMessage,
      modalShow: true,
    })
  }
  modalOnOk =()=> {
    this.setState({
      modalLoading: true
    })
    if (this.state.modalType === 1) {
      this.props.dispatch({
        type: 'events/cancelEnroll',
        payload: {
          userPkId: this.state.userPkId,
          enrollItemCostPkId: this.state.enrollItemCostPkId
        }
      }).then(res => {
        if (res && res.code === 200) {
          message.success(res.message, 2)
          this.setState({
            modalShow: false,
          })
          this.setState({
            enrollItemCostPkId: ''
          })
          this.handleSearch()
        }
        this.setState({
          modalLoading: false,
        })
      })
    }
  }
  exportData =()=> {
    // const columns = [
    //   {
    //     title: '报名人姓名',
    //     dataIndex: 'name',
    //     key: 'name',
    //     width: 60,
    //   },
    //   {
    //     title: '报名人手机号',
    //     dataIndex: 'mobile',
    //     key: 'mobile',
    //     width: 120,
    //   },
    //   {
    //     title: '报名方式',
    //     dataIndex: 'eventsModeEnum',
    //     key: 'eventsModeEnum',
    //     width: 120,
    //   },

    //   {
    //     title: '报名项目',
    //     dataIndex: 'itemName',
    //     key: 'itemName',
    //     width: 120,
    //   },
    //   {
    //     title: '单价',
    //     dataIndex: 'itemAmount',
    //     key: 'itemAmount',
    //     width: 120,
    //   },
    //   {
    //     title: '人数',
    //     dataIndex: 'number',
    //     key: 'number',
    //     width: 120,
    //   },
    //   {
    //     title: '状态',
    //     dataIndex: 'registrationStatusEnum',
    //     key: 'registrationStatusEnum',
    //     width: 120,
    //   },

    //   {
    //     title: '报名来源',
    //     dataIndex: 'source',
    //     key: 'source',
    //     width: 120,
    //   },

    //   {
    //     title: '是否退款',
    //     dataIndex: 'refundStatus',
    //     key: 'refundStatus',
    //     width: 120,
    //   },
    //   {
    //     title: '退款金额',
    //     dataIndex: 'refundAmount',
    //     key: 'refundAmount',
    //     width: 120,
    //   },


    //   {
    //     title: '报名时间',
    //     dataIndex: 'createdDate',
    //     key: 'createdDate',
    //     width: 120,
    //   }
    // ]
    // let tableData = []
    // this.state.tableData.map(item => {
    //   tableData.push({
    //     name: item.name,
    //     mobile: item.mobile,
    //     eventsModeEnum: item.eventsModeEnum.name,
    //     itemName: item.itemName,
    //     itemAmount: item.itemAmount? item.itemAmount : '免费',
    //     number: item.number,
    //     registrationStatusEnum: item.registrationStatusEnum.name,
    //     source: item.source.description,
    //     refundStatus: item.refundStatus? '是' : '否',
    //     refundAmount: item.refundAmount? item.refundAmount : '无',
    //     createdDate: item.createdDate,
    //   })
    // })
    // if (tableData.length === 0) {
    //   message.warning('无数据可导出！', 2)
    // } else {
    //   exportExcel(columns, tableData, '报名数据')
    //   message.success('导出成功！', 2)
    // }


    this.props.dispatch({
      type: 'events/dataExport',
      payload: {
        // pkId: history.location.query.pkId,
        eventsPkId: history.location.query.pkId,
      }
    }).then(res => {
      let blob = new Blob([res], {
        type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob)
      } else {
        let elink = document.createElement('a')
        elink.download = '报名信息.xls'
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
        message.success('导出成功！', 2)
      }
    })
  }
  handleTitle =()=> {
    return (
      <div className='table-title-wrapper'>
        <div className='events-info'>活动/赛事：{this.state.enrollHeader.title}</div>
        <div className='enroll-number'>报名人数：{this.state.total}</div>
      </div>
    )
  }
  handleDetail =(userPkId, eventsEnrollPkId)=> {
    this.props.dispatch({
      type: 'events/enrollDetail',
      payload: {
        // pkId: history.location.query.pkId,
        eventsEnrollPkId: eventsEnrollPkId,
        userPkId: userPkId
      }
    }).then(res => {
      if (res && res.code === 200) {
        this.setState({
          showDetailForm: true,
          curUserPkId: userPkId
        })
      }
    })
  }

  handleCancel =(type)=> {
    if(type == 1) {
      this.formRef.current.resetFields()
      this.setState({
        returnMoneyModal: false,
      })
    }else if(type == 2) {
      this.setState({
        signInDownShow: false,
      })
    }

  }


  handleOk =()=> {

    let returnData = this.formRef.current.getFieldValue().returnData
    let body = {
      enrollItemCostPkId: this.state.enrollItemCostPkId,
      userPkId: this.state.userPkId,
      operationType: returnData.operationType,
      refundType: returnData.refundType,
      cancelReason: 4
    }
    if( returnData.refundType == 1 ) {
      if(returnData.refundAmount == '' || returnData.refundAmount == 0 || !returnData.refundAmount) {
        message.error('请填写退款金额')
        return false
      }else {
        if(Number(returnData.refundAmount) >= Number(this.state.maxRefundMoney)) {
          message.error('部分退款金额需要小于最多可退金额')
          return false
        }
        body.refundAmount = returnData.refundAmount
      }
    }
    this.setState({
      modalLoading: true
    })
    this.props.dispatch({
      type: 'events/refund',
      payload: body
    }).then(res => {
      this.setState({
        modalLoading: false
      })
      this.formRef.current.resetFields()
      if (res && res.code === 200) {
        message.success(res.message, 2)
        this.setState({
          returnMoneyModal: false,
        })
        this.handleSearch()
      }
    })

  }

  lookOrderDetail =(e)=> {
    let body = {
      eventsEnrollPkId: e,
      userPkId: this.state.curUserPkId
    }
    this.props.dispatch({
      type: 'events/orderDetails',
      payload: body
    }).then(res => {
      console.log('res')
      console.log(res)

      this.setState({
        orderDetailModal: true,
      })
    })
  }

  hideOrderForm() {
    this.setState({
      orderDetailModal: false
    })
  }


  clearNoNum =(value)=>{
    const reg = /^(-)*(\d+)\.(\d\d).*$/
    if(value) {
      let returnData = this.formRef.current.getFieldValue().returnData
      returnData.refundAmount = value.toString().replace(reg, '$1$2.$3')
      this.formRef.current.setFieldsValue({
        returnData: returnData
      })
    }
  }

  openSignInModal =()=> {
    this.setState({
      signInDownShow: true
    })
  }

  confirmDown =()=> {
    const canvasImg = document.getElementById('qrCode') // 获取canvas类型的二维码
    const img = new Image()
    img.src = canvasImg.toDataURL('image/png') // 将canvas对象转换为图片的data url
    const downLink = document.getElementById('down_link')
    downLink.href = img.src
    console.log( downLink.href)
    downLink.download = '签到二维码' // 图片name
    downLink.click()
  }




  render(){
    console.log(this.state.tableData)
    const columns = [
      {
        title: '序号',
        key: '0',
        align: 'center',
        ellipsis: true,
        width: 60,
        fixed: 'left',
        render:(text,record,index)=>`${(this.state.current - 1) * this.state.pageSize + index+1}`,
      },
      {
        title: '报名人姓名',
        key: '1',
        align: 'center',
        ellipsis: true,
        width: 60,
        fixed: 'left',
        dataIndex: 'name',
      },
      {
        title: '报名人手机号',
        key: '2',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'mobile',
      },
      {
        title: '报名方式',
        key: '3',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'eventsModeEnum',
        render: (text) => <span>{text ? text.name : ''}</span>,

      },

      {
        title: '报名项目',
        key: '4',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'itemName',
      },

      {
        title: '单价',
        key: '5',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'itemAmount',
        render: (text) => <span>{text ? text : '免费'}</span>,
      },

      {
        title: '人数',
        key: '6',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'number',
      },

      {
        title: '状态',
        key: '7',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'registrationStatusEnum',
        render: (text) => <span>{text && text.name}</span>,
      },




      {
        title: '报名来源',
        key: '7',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'source',
        render: (text) => <span>{text && text.description}</span>,
      },

      {
        title: '是否退款',
        key: '8',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'refundStatus',
        render: (text) => <span>{text ? '是' : '否'}</span>,
      },

      {
        title: '退款金额',
        key: '9',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'refundAmount',
        render: (text) => <span>{text ? text : ''}</span>,
      },




      {
        title: '报名时间',
        key: '10',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'createdDate',
      },
      {
        title: '操作',
        key: '11',
        align: 'center',
        width: 220,
        fixed: 'right',
        render: (text, record) => (
          <div style={{display: 'flex',justifyContent: 'center'}}>
            { getPermissions().includes('events_list_enroll_detail') ? <Button type="link" onClick={()=>this.handleDetail(record.userPkId,record.eventsEnrollPkId)}>报名详情</Button> : '' }
            { getPermissions().includes('events_list_cancel_enroll')  && record.registrationStatusEnum.value !=1 ? <Button type="link" onClick={()=>this.showModal(1, record.eventsItemCostPkId, record.userPkId)}>取消报名</Button> : '' }

            { record.itemAmount && !record.refundStatus && record.registrationStatusEnum.value == 0 ? <Button type="link" onClick={()=>this.setState({returnMoneyModal: true,userPkId: record.userPkId,
              enrollItemCostPkId: record.eventsItemCostPkId, maxRefundMoney: record.totalAmount})}>退款</Button> : '' }
          </div>
        ),
      },
    ]
    return (
      <div className='main-wrapper'>
        <SearchForm getSearchForm={(v)=>this.getSearchForm(v)}/>
        <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', alignItems: 'center'}}>
          <div className='button-wrapper' >
            <Button type="primary" onClick={()=>this.exportData()}><VerticalAlignBottomOutlined />导出报名信息</Button>
          </div>
          <div className='signInDown' onClick={()=>this.openSignInModal()}>签到二维码下载</div>
        </div>

        <Table
          title={()=> this.handleTitle()}
          scroll={{y: 'calc(100% - 48px - 35px)'}}
          align={'center'}
          loading={this.state.loading}
          size={'middle'}
          columns={columns}
          dataSource={this.state.tableData}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: () => `共${this.state.total}条`,
            pageSize: this.state.pageSize,
            current: this.state.current,
            total: this.state.total,
            onChange: (current, pageSize) => this.change(current, pageSize),
          }}
        />
        <Modal
          className='confirm-modal'
          width={350}
          title={'提示'}
          centered
          visible={this.state.modalShow}
          confirmLoading={this.state.modalLoading}
          onOk={() => this.modalOnOk()}
          onCancel={() => this.setState({modalShow: false})}
        >
          {this.state.modalMessage}
        </Modal>
        <Modal
          title="退款"
          confirmLoading={this.state.modalLoading}
          visible={this.state.returnMoneyModal}
          onOk={this.handleOk}
          onCancel={()=>this.handleCancel(1)}
        >
          <Form
            ref={this.formRef}
            // form={this.test}
            initialValues={{
              returnData: {
                operationType: 0,
                refundType: 0,
                refundAmount: ''
              }
            }}
          >
            <Form.Item label="操作类型" name={['returnData','operationType'] }  >
              <Radio.Group >
                <Row>
                  <Col >
                    <Radio value={0} >退款</Radio>
                  </Col>
                  <Col >
                    <Radio value={1} >款项已退，仅修改状态</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            <div style={{display: 'flex'}}>
              <Form.Item  label="退款金额" name={['returnData','refundType'] } >
                <Radio.Group>
                  <Row>
                    <Col style={{display: 'flex',alignItems: 'center'}} >
                      <Radio value={0} >全额</Radio>
                    </Col>
                    <Col style={{display: 'flex',alignItems: 'center'}}>
                      <Radio value={1} style={{display: 'flex' ,alignItems: 'center'}} >
                        部分
                      </Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>
              <Form.Item name={['returnData','refundAmount']} style={{marginBottom: 0}}>
                {/* <Input style={{width: '100px', marginLeft: '5px'}}></Input> */}
                <InputNumber  onChange={(e)=>this.clearNoNum(e)} />
              </Form.Item>
              <div style={{display: 'flex',marginLeft: '10px', position: 'relative', top: '5px'}}>
              最多可退<span style={{color: 'red'}}>{this.state.maxRefundMoney}</span>
              </div>

            </div>
            <div style={{color: 'gray'}}>款项将从公司银行账户原路退回到用户的支付账户</div>
          </Form>
        </Modal>

        <Modal
          title="签到二维码下载"
          confirmLoading={this.state.modalLoading}
          visible={this.state.signInDownShow}
          onOk={this.confirmDown}
          okText={'下载'}
          onCancel={()=>this.handleCancel(2)}
        >
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <QRCode
              id="qrCode"
              value={ '/qmjsh5/association/datum?accessType=4' }
              fgColor="#000000"
            />
            <a  id='down_link'></a>
          </div>

        </Modal>

        {/* <Modal
          title="订单详情"
          visible={this.state.orderDetailModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
          >
            <div className="order-info">
              <div className="order-info-header">
                订单信息
              </div>
              <div className="order-info-body">
                <div className='order-info-block'>
                  <span>订单编号：</span>
                </div>
                <div className='order-info-block'>

                </div>
                <div className='order-info-block'>

                </div>
              </div>
            </div>
          </Form>
        </Modal> */}


        { this.state.orderDetailModal ? <OrderDetailForm hideOrderForm={()=>this.setState({orderDetailModal: false})} /> : '' }



        { this.state.showDetailForm ? <DetailForm hideDetailForm={()=>this.setState({showDetailForm: false})} lookOrderDetail={(e)=>this.lookOrderDetail(e)}/> : '' }
      </div>
    )
  }
}

export default connect(({ location, events }) => ({
  location, events
}))(EventsEnroll)
