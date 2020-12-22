import React, { Component } from 'react'
import {Button, Table, Modal, message} from 'antd'
import SearchForm from './components/SearchForm'
import CreateForm from './components/CreateForm'
import EditorForm from './components/EditorForm'
import { PlusOutlined } from '@ant-design/icons'
import {connect} from 'umi'
import './index.less'
import {getPermissions} from '@/utils/accountInfo'

class Account extends Component {
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
      account: v.account,
      name: v.name,
      mobile: v.mobile,
    })
    this.handleSearch()
  }

  handleSearch =()=> {
    let body = {
      account: this.state.account,
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
      type: 'account/accountQuery',
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
      modalMessage = '确认启用该用户吗？'
    } else if (type === 2) {
      modalMessage = '确认禁用该用户吗？'
    } else if (type === 3) {
      modalMessage = '删除后不可找回，确认删除吗？'
    } else if (type === 4) {
      modalMessage = '确认重置该用户密码吗？'
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
        type: 'account/accountActivate',
        payload: {
          accountPkId: this.state.pkId,
          activated: true
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
        type: 'account/accountActivate',
        payload: {
          accountPkId: this.state.pkId,
          activated: false
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
        type: 'account/accountDel',
        payload: {
          accountPkId: this.state.pkId,
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
        type: 'account/accountResetPassword',
        payload: {
          accountPkId: this.state.pkId,
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
      type: 'account/accountFindAllRole',
    }).then(res => {
      if (res && res.code === 200) {
        this.props.dispatch({
          type: 'account/setAccountDetail',
          payload: {
            accountPkId: record.accountPkId,
            account: record.account,
            name: record.name,
            mobile: record.mobile,
            role: record.roleList,
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
      type: 'account/accountFindAllRole',
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
        title: '账号',
        key: '1',
        align: 'center',
        ellipsis: true,
        width: 60,
        fixed: 'left',
        dataIndex: 'account',
      },
      {
        title: '姓名',
        key: '2',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'name',
      },
      {
        title: '手机号',
        key: '3',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'mobile',
      },
      {
        title: '角色',
        key: '4',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'roleName',
      },
      {
        title: '状态',
        key: '5',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'activated',
        render: (text) => <span>{text ? '启用' : '禁用'}</span>,
      },
      {
        title: '创建时间',
        key: '6',
        align: 'center',
        ellipsis: true,
        width: 120,
        dataIndex: 'createdDate',
      },
      {
        title: '操作',
        key: '7',
        align: 'center',
        width: 200,
        fixed: 'right',
        render: (text, record) => (
          <div style={{display: 'flex',justifyContent: 'center'}}>
            { getPermissions().includes('account_edit_account') ? <Button type="link" className='link-blue' onClick={()=>this.handleEdit(record)}>编辑</Button> : '' }
            { !record.activated && getPermissions().includes('account_activated_account') ? <Button type="link" className='link-blue' onClick={()=>this.showModal(1, record.accountPkId)}>启用</Button> : '' }
            { record.activated && getPermissions().includes('account_activated_account') ? <Button type="link" className='link-red' onClick={()=>this.showModal(2, record.accountPkId)}>禁用</Button> : '' }
            { !record.activated && getPermissions().includes('account_delete_account') ? <Button type="link" className='link-red' onClick={()=>this.showModal(3, record.accountPkId)}>删除</Button> : '' }
            { getPermissions().includes('account_reset_password') ? <Button type="link" className='link-blue' onClick={()=>this.showModal(4, record.accountPkId)}>重置密码</Button> : '' }
          </div>
        ),
      },
    ]
    return (
      <div className='main-wrapper'>
        { getPermissions().includes('account_query') ? <SearchForm getSearchForm={(v)=>this.getSearchForm(v)}/> : '' }
        { getPermissions().includes('account_add') ? <div className='button-wrapper'><Button type="primary" onClick={()=>this.showAdd()}><PlusOutlined />新增</Button></div> : '' }
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

export default connect(({ account }) => ({
  account,
}))(Account)
