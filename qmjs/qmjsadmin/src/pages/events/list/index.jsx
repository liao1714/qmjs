import React, { useState, Component } from 'react'
import {Button, Table, Modal, message} from 'antd'
import SearchForm from './components/SearchForm'
import { PlusOutlined } from '@ant-design/icons'
import {connect, history} from 'umi'
import './index.less'
import copy from 'copy-to-clipboard'
import { getPermissions } from '@/utils/accountInfo'

class EventsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      loading: false,
      total: 0,
      pageSize: 20,
      current: 1,
      tableData: [],

      modalType: '',
      modalShow: false,
      modalLoading: false,
      modalMessage: '',
      pkId: ''
    }
  }
  componentDidMount() {
    this.handleSearch()
  }

  getSearchForm =(v)=> {
    this.setState({
      eventsType: v.eventsType,
      title: v.title,
      progress: v.progress,
      status: v.status,
    })
    this.handleSearch()
  }

  handleSearch =()=> {
    let body = {
      eventsType: this.state.eventsType,
      title: this.state.title,
      progress: this.state.progress,
      status: this.state.status,
      page: this.state.current - 1,
      size: this.state.pageSize,
    }
    this.setState({
      loading: true
    })
    console.log(body)
    this.props.dispatch({
      type: 'events/eventsQuery',
      payload: body
    }).then(res => {
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
  showModal =(type, pkId)=> {
    let modalMessage = ''
    if (type === 1) {
      modalMessage = '下线后将不再显示给用户，确认下线吗？'
    } else if (type === 2) {
      modalMessage = '发布后用户即可看见，确认发布吗？'
    } else if (type === 3) {
      modalMessage = '确定置顶吗？'
    } else if (type === 4) {
      modalMessage = '确定取消置顶吗？'
    } else if (type === 5) {
      modalMessage = '删除后不可找回，确认删除吗？'
    }
    this.setState({
      pkId: pkId,
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
        type: 'events/eventsOperation',
        payload: {
          pkId: this.state.pkId,
          operation: 2
        }
      }).then(res => {
        if (res && res.code === 200) {
          message.success(res.message, 2)
          this.setState({
            modalShow: false,
          })
          this.handleSearch()
        }
        this.setState({
          modalLoading: false,
        })
      })
    } else if (this.state.modalType === 2) {
      this.props.dispatch({
        type: 'events/eventsOperation',
        payload: {
          pkId: this.state.pkId,
          operation: 1
        }
      }).then(res => {
        if (res && res.code === 200) {
          message.success(res.message, 2)
          this.setState({
            modalShow: false,
          })
          this.handleSearch()
        }
        this.setState({
          modalLoading: false,
        })
      })
    } else if (this.state.modalType === 3) {
      this.props.dispatch({
        type: 'events/eventsTop',
        payload: {
          pkId: this.state.pkId,
          topStatus: true
        }
      }).then(res => {
        if (res && res.code === 200) {
          message.success(res.message, 2)
          this.setState({
            modalShow: false,
          })
          this.handleSearch()
        }
        this.setState({
          modalLoading: false,
        })
      })
    } else if (this.state.modalType === 4) {
      this.props.dispatch({
        type: 'events/eventsTop',
        payload: {
          pkId: this.state.pkId,
          topStatus: false
        }
      }).then(res => {
        if (res && res.code === 200) {
          message.success(res.message, 2)
          this.setState({
            modalShow: false,
          })
          this.handleSearch()
        }
        this.setState({
          modalLoading: false,
        })
      })
    } else if (this.state.modalType === 5) {
      this.props.dispatch({
        type: 'events/eventsDel',
        payload: {
          pkId: this.state.pkId,
        }
      }).then(res => {
        if (res && res.code === 200) {
          message.success(res.message, 2)
          this.setState({
            modalShow: false,
          })
          this.handleSearch()
        }
        this.setState({
          modalLoading: false,
        })
      })
    }
  }
  copyLink =(pkId)=> {
    this.props.dispatch({type: 'events/sharePrefix'}).then(res => {
      if (res && res.code === 200) {
        let link = res.data + '/qmjsh5/activity/detail?accessType=0&pkId=' + pkId
        copy(link)
        message.success('复制成功！', 2)
      }
    })

  }
  render(){
    console.log('render')
    const columns = [
      {
        title: '序号',
        key: 'sort',
        align: 'center',
        ellipsis: true,
        width: 60,
        fixed: 'left',
        render:(text,record,index)=>`${(this.state.current - 1) * this.state.pageSize + index+1}`,
      },
      {
        title: '标题',
        key: 'title',
        align: 'center',
        ellipsis: true,
        width: 150,
        fixed: 'left',
        dataIndex: 'title',
      },
      {
        title: '类型',
        key: 'eventsType',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'eventsType',
        render: (text) => <span>{text.name}</span>,
      },
      {
        title: '运动类型',
        key: 'tagName',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'tagName',
      },
      {
        title: '阅读人/次',
        key: 'readPersonCount',
        align: 'center',
        ellipsis: true,
        width: 120,
        render: (record) => <span>{record.readPersonCount}/{record.readCount}</span>,
      },
      {
        title: '报名人数',
        key: 'enrollPersonCount',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'enrollPersonCount',
        render: (text, record) => (
          getPermissions().includes('events_list_enroll_info') ?
            <Button type="link" onClick={()=>history.push({pathname: '/events/enroll', query: {pkId: record.pkId}})}>{text}</Button>
            :
            <span>{text}</span>
        ),
      },
      {
        title: '活动进度',
        key: 'eventsProgress',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'eventsProgress',
        render: (text) => <span>{text.name}</span>,
      },
      {
        title: '状态',
        key: 'status',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'status',
        render: (text) => <span>{text.name}</span>,
      },
      {
        title: '是否置顶',
        key: 'topStatus',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'topStatus',
        render: (text) => <span>{text ? '是' : '否'}</span>,
      },
      {
        title: '创建时间',
        key: 'createdDate',
        align: 'center',
        ellipsis: true,
        width: 180,
        dataIndex: 'createdDate',
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 320,
        fixed: 'right',
        render: (text, record) => (
          <div style={{display: 'flex',justifyContent: 'center'}}>
            { getPermissions().includes('events_list_edit') && getPermissions().includes('events_list_detail') ? <Button type="link" className='link-blue' onClick={()=>history.push({pathname:'/events/editor', query:{pkId: record.pkId}})}>编辑</Button> : '' }
            { record.status.value === 1 && getPermissions().includes('events_list_operation') ? <Button type="link" className='link-blue' onClick={()=>this.showModal(1, record.pkId)}>下线</Button> : '' }
            { record.status.value !== 1 && record.eventsProgress.value !== 3 && getPermissions().includes('events_list_operation') ? <Button type="link" className='link-blue' onClick={()=>this.showModal(2, record.pkId)}>发布</Button> : '' }
            { record.status.value === 1 ? <Button type="link" className='link-blue' onClick={()=>this.copyLink(record.pkId)}>复制链接</Button> : '' }
            { record.status.value === 1 && !record.topStatus && getPermissions().includes('events_list_top') ? <Button type="link" className='link-blue' onClick={()=>this.showModal(3, record.pkId)}>设置置顶</Button> : '' }
            { record.status.value === 1 && record.topStatus && getPermissions().includes('events_list_top') ? <Button type="link" className='link-red' onClick={()=>this.showModal(4, record.pkId)}>取消置顶</Button> : '' }
            { record.status.value !== 1 && getPermissions().includes('events_list_del') ? <Button type="link" className='link-red' danger onClick={()=>this.showModal(5, record.pkId)}>删除</Button> : '' }
          </div>
        ),
      },
    ]
    return (
      <div className='main-wrapper'>
        { getPermissions().includes('events_list_query') ? <SearchForm getSearchForm={(v)=>this.getSearchForm(v)}/> : '' }
        { getPermissions().includes('events_list_add') || getPermissions().includes('events_list_add_push') ? <div className='button-wrapper'><Button type="primary" htmlType="submit" onClick={()=>history.push('/events/create')}><PlusOutlined />发布活动</Button></div> : '' }
        <Table
          scroll={{y: 'calc(100% - 48px)'}}
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
      </div>
    )
  }
}

export default connect(({ events }) => ({
  events,
}))(EventsList)
