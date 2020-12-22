import React, { useState, Component } from 'react'
import {Button, Table, Modal, message, Pagination} from 'antd'
import SearchForm from './components/SearchForm'
import CreateForm from './components/CreateForm'
import EditorForm from './components/EditorForm'
import Sort from './components/Sort'
import { PlusOutlined, SwapOutlined } from '@ant-design/icons'
import {connect, history} from 'umi'
import './index.less'
import copy from 'copy-to-clipboard'
import {getPermissions} from '@/utils/accountInfo'

class Location extends Component {
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
      pkId: '',

      showCreateForm: false,
      showEditorForm: false,
      showSort: false,
    }
  }
  componentDidMount() {
    this.handleSearch()
  }

  getSearchForm =(v)=> {
    this.setState({
      keyword: v.keyword,
      status: v.status,
      effectiveBeginTime: v.effectiveTime && new Date(v.effectiveTime[0]).getTime(),
      effectiveEndTime: v.effectiveTime && new Date(v.effectiveTime[1]).getTime(),
    })
    this.handleSearch()
  }

  handleSearch =()=> {
    let body = {
      keyword: this.state.keyword,
      status: this.state.status,
      effectiveBeginTime: this.state.effectiveBeginTime,
      effectiveEndTime: this.state.effectiveEndTime,
      page: this.state.current - 1,
      size: this.state.pageSize,
    }
    this.setState({
      loading: true
    })
    console.log(body)
    this.props.dispatch({
      type: 'location/locationQuery',
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
      modalMessage = '上线后用户即可看见，确认发布吗？'
    } else if (type === 3) {
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
        type: 'location/locationOnline',
        payload: {
          pkId: this.state.pkId,
          status: 0
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
        type: 'location/locationOnline',
        payload: {
          pkId: this.state.pkId,
          status: 1
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
        type: 'location/locationDel',
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
  copyLink =(link)=> {
    copy(link)
    message.success('复制成功！', 2)
  }
  handleEdit =(pkId)=> {
    this.props.dispatch({
      type: 'location/locationDetail',
      payload: {
        pkId: pkId,
      }
    }).then(res => {
      if (res && res.code === 200) {
        this.setState({
          showEditorForm: true,
        })
      }
    })
  }
  showSort =()=> {
    this.props.dispatch({
      type: 'location/locationPageHomeBannerSortList',
      payload: {} ,
    }).then(res => {
      if (res && res.code === 200) {
        this.setState({
          showSort: true
        })
      }
    })
  }
  render(){
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
        title: '内容ID',
        key: '1',
        align: 'center',
        ellipsis: true,
        width: 60,
        fixed: 'left',
        dataIndex: 'contentId',
      },
      {
        title: '标题',
        key: '2',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'title',
      },
      {
        title: '状态',
        key: '3',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'status',
        render: (text) => <span>{text.name}</span>,
      },
      {
        title: '创建时间',
        key: '4',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'createdDate',
      },
      {
        title: '开始时间',
        key: '5',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'effectiveBeginTime',
      },
      {
        title: '结束时间',
        key: '6',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'effectiveEndTime',
      },
      {
        title: '操作',
        key: '11',
        align: 'center',
        width: 220,
        fixed: 'right',
        render: (text, record) => (
          <div style={{display: 'flex',justifyContent: 'center'}}>
            { getPermissions().includes('location_edit') && getPermissions().includes('location_detail') ? <Button type="link" onClick={()=>this.handleEdit(record.pkId)}>编辑</Button> : '' }
            { record.status.value === 1 && getPermissions().includes('location_online') ? <Button type="link" className='link-blue' onClick={()=>this.showModal(1, record.pkId)}>下线</Button> : '' }
            { record.status.value !== 1 && getPermissions().includes('location_online') ? <Button type="link" className='link-blue' onClick={()=>this.showModal(2, record.pkId)}>上线</Button> : '' }
            { record.status.value !== 1 && getPermissions().includes('location_del') ? <Button type="link" className='link-red' onClick={()=>this.showModal(3, record.pkId)}>删除</Button> : '' }
          </div>
        ),
      },
    ]
    return (
      <div className='main-wrapper'>
        { getPermissions().includes('location_query') ? <SearchForm getSearchForm={(v)=>this.getSearchForm(v)}/> : '' }
        <div className='button-wrapper'>
          { getPermissions().includes('location_add') ? <Button type="primary" onClick={()=>this.setState({showCreateForm: true})}><PlusOutlined />新增</Button> : '' }
          { getPermissions().includes('location_page_home_banner_sort_list') ? <Button style={{marginLeft: '20px'}} type="primary" onClick={()=>this.showSort()}><SwapOutlined />排序</Button> : '' }
        </div>
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
        { this.state.showCreateForm ? <CreateForm handleSearch={()=>this.handleSearch()} hideCreateForm={()=>this.setState({showCreateForm: false})}/> : '' }
        { this.state.showEditorForm ? <EditorForm handleSearch={()=>this.handleSearch()} hideEditorForm={()=>this.setState({showEditorForm: false})}/> : '' }
        { this.state.showSort ? <Sort hideSort={()=>this.setState({showSort: false})}/> : '' }
      </div>
    )
  }
}

export default connect(({ location }) => ({
  location,
}))(Location)
