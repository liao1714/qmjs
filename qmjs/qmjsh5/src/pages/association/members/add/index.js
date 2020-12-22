import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, NavBar, Toast, WingBlank, List, InputItem, SwipeAction } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import BackToNativeHome from '@/components/back-to-native-home'
import { createForm } from 'rc-form'
import './index.less'
import Router from '@/utils/router'
const alert = Modal.alert
const prompt = Modal.prompt
@connect(({ association }) => ({ association }))
class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addList: []
    }
  }
  componentDidMount() {
  }
  handleAdd =()=> {
    const addList = this.state.addList
    if (addList.length > 0) {
      console.log('添加')
      console.log(addList)
      const list = []
      addList.map(item => {
        list.push(item.userPkId)
      })
      let body = {
        associationPkId: this.props.location.query.associationPkId,
        userPkIdArray: list
      }
      Toast.loading('提交中...', 0)
      this.props.dispatch({type: 'association/addAssociationMember', payload: body}).then(res => {
        if (res && res.code === 200) {
          Toast.info(res.message, 1)
          Router.go(-1)
        }
      })
    } else {
      Toast.info('请至少添加至少一位会员！', 2)
    }
  }
  checkArr =(list)=> {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === '' || list[i].phone === '') {
        return false
      }
    }
    return true
  }
  checkContains =(list, phone)=> {
    for (let i = 0; i < list.length; i++) {
      if (list[i].phone === phone) {
        return true
      }
    }
    return false
  }
  addNewList =()=> {
    this.state.addList.push({
      id: new Date().getTime(),
      name: '',
      phone: '',
      userPkId: ''
    })
    this.setState({
      addList: this.state.addList
    })
  }
  delete =(id)=> {
    console.log(id)
    let arr = this.state.addList
    arr = arr.filter(item => item.id !== id)
    this.setState({
      addList: arr
    })
  }
  getPhone =(index)=> {
    console.log('获取手机号')
    prompt('添加会员', '请输入会员手机号',
      [
        {
          text: '取消',
          onPress: value => new Promise((resolve) => {
            resolve(value)
          }),
        },
        {
          text: '确定',
          onPress: value => new Promise((resolve, reject) => {
            if (value) {
              if (this.checkContains(this.state.addList, value)) {
                Toast.info('该会员已添加', 1)
              } else {
                Toast.loading('查询中...', 0)
                this.props.dispatch({type: 'association/otherUser', payload: { associationPkId: this.props.location.query.associationPkId, mobile: value }}).then(res => {
                  if (res && res.code === 200) {
                    const addList = this.state.addList
                    console.log(addList)
                    addList.push({
                      id: new Date().getTime(),
                      name: res.data.nickname,
                      phone: res.data.mobile,
                      userPkId: res.data.pkId
                    })
                    this.setState({
                      addList: addList
                    })
                    resolve()
                  }
                })
              }
            } else {
              Toast.info('请输入手机号', 1)
            }
          }),
        },
      ], 'default', null, ['请输入手机号!'])
  }
  render() {
    const { getFieldProps } = this.props.form
    return (
      <div className='add-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >添加成员</NavBar>
        <WingBlank size="md" className='container form-container'>
          {
            this.state.addList.map((item, index) => (
              <SwipeAction
                key={index}
                style={{ backgroundColor: 'gray' }}
                autoClose
                disabled={index === 0}
                right={[
                  {
                    text: '取消',
                    onPress: () => console.log('取消'),
                    style: { backgroundColor: '#ddd', color: 'white' },
                  },
                  {
                    text: '删除',
                    onPress: () => this.delete(item.id),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                  },
                ]}
              >
                <List>
                  <List.Item
                    extra={item.name || <span className='placeholder-color'>姓名</span>}
                    className='require'
                    // arrow="horizontal"
                  >姓名</List.Item>
                  <List.Item
                    extra={item.phone || <span className='placeholder-color'>将用作登录账号</span>}
                    className='require'
                    // arrow="horizontal"
                  >手机号</List.Item>
                  {/*<InputItem*/}
                  {/*  disabled*/}
                  {/*  className='require'*/}
                  {/*  extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}*/}
                  {/*  placeholder="姓名"*/}
                  {/*  clear*/}
                  {/*  {...getFieldProps('addList[' + index + '].name',{*/}
                  {/*    initialValue: '',*/}
                  {/*  })}*/}
                  {/*>姓名</InputItem>*/}
                  {/*<InputItem*/}
                  {/*  disabled*/}
                  {/*  className='require'*/}
                  {/*  extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}*/}
                  {/*  placeholder="将用作登录账号"*/}
                  {/*  clear*/}
                  {/*  {...getFieldProps('addList[' + index + '].phone',{*/}
                  {/*    initialValue: '',*/}
                  {/*  })}*/}
                  {/*>手机号</InputItem>*/}
                </List>
              </SwipeAction>
            ))
          }
          <div className='margin'/>
          <div className='members-add-button'>
            <span onClick={()=> this.getPhone()}><IconSvg type='add'  size='xxs'/>添加</span>
          </div>
          <div className='margin'/>
          <div className='placeholder-block'>
            <span>请务必添加已注册i体育的成员</span>
          </div>
        </WingBlank>
        <div className='button-wrapper'>
          <div
            className="btn-lg"
            onClick={() =>
              alert('添加成员', '确定添加吗？', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                  text: '确定',
                  onPress: () =>
                    new Promise((resolve) => {
                      this.handleAdd()
                      resolve()
                    }),
                },
              ])
            }
          >立即提交</div>
        </div>
      </div>
    )
  }
}
export default createForm()(Add)
