import React, { Component } from 'react'
import {Button, Table, Modal, message} from 'antd'
import SearchForm from './components/SearchForm'
import CreateForm from './components/CreateForm'
import EditorForm from './components/EditorForm'
import { PlusOutlined } from '@ant-design/icons'
import {connect} from 'umi'
import './index.less'
import {getPermissions} from "@/utils/accountInfo";

class Role extends Component {
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
    }
  }
  componentDidMount() {
    this.handleSearch()
  }

  getSearchForm =(v)=> {
    this.setState({
      roleName: v.roleName,
      activated: v.activated,
    })
    this.handleSearch()
  }

  handleSearch =()=> {
    let body = {
      roleName: this.state.roleName,
      activated: this.state.activated,
      page: this.state.current - 1,
      size: this.state.pageSize,
    }
    this.setState({
      loading: true
    })
    console.log(body)
    this.props.dispatch({
      type: 'role/roleQuery',
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
      modalMessage = '确认启用该角色吗？'
    } else if (type === 2) {
      modalMessage = '确认禁用该角色吗？'
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
        type: 'role/roleActivate',
        payload: {
          pkId: this.state.pkId,
          activateFlag: true
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
        type: 'role/roleActivate',
        payload: {
          pkId: this.state.pkId,
          activateFlag: false
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
        type: 'role/roleDel',
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
  handleEdit =(record)=> {
    this.props.dispatch({
      type: 'role/roleResources',
      payload: {rolePkId: record.pkId} ,
    }).then(res => {
      if (res && res.code === 200) {
        this.props.dispatch({
          type: 'role/setRoleDetail',
          payload: {
            pkId: record.pkId,
            roleName: record.roleName,
            description: record.description,
          }
        })
        this.setState({
          showEditorForm: true
        })
      }
    })
  }
  showAdd =()=> {
    this.props.dispatch({
      type: 'role/roleResources',
      payload: {rolePkId: ''} ,
    }).then(res => {
      if (res && res.code === 200) {
        this.setState({
          showCreateForm: true
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
        title: '角色名称',
        key: '1',
        align: 'center',
        ellipsis: true,
        width: 60,
        fixed: 'left',
        dataIndex: 'roleName',
      },
      {
        title: '角色介绍',
        key: '2',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'description',
      },
      {
        title: '状态',
        key: '3',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'activated',
        render: (text) => <span>{text ? '启用' : '禁用'}</span>,
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
        title: '操作',
        key: '11',
        align: 'center',
        width: 150,
        fixed: 'right',
        render: (text, record) => (
          record.roleName === '系统管理员' ? '' :
            <div style={{display: 'flex',justifyContent: 'center'}}>
              { getPermissions().includes('role_edit') ? <Button type="link" onClick={()=>this.handleEdit(record)}>编辑</Button> : '' }
              { !record.activated && getPermissions().includes('role_activate') ? <Button type="link" className='link-blue' onClick={()=>this.showModal(1, record.pkId)}>启用</Button> : '' }
              { record.activated && getPermissions().includes('role_activate') ? <Button type="link" className='link-red' onClick={()=>this.showModal(2, record.pkId)}>禁用</Button> : '' }
              { !record.activated && getPermissions().includes('role_del') ? <Button type="link" className='link-red' onClick={()=>this.showModal(3, record.pkId)}>删除</Button> : '' }
            </div>
        ),
      },
    ]
    return (
      <div className='main-wrapper'>
        { getPermissions().includes('role_query') ? <SearchForm getSearchForm={(v)=>this.getSearchForm(v)}/> : '' }
        { getPermissions().includes('role_add') ? <div className='button-wrapper'><Button type="primary" onClick={()=>this.showAdd()}><PlusOutlined />新增</Button></div> : '' }
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
      </div>
    )
  }
}

export default connect(({ role }) => ({
  role,
}))(Role)
