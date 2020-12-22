import React, { Component } from 'react'
import { connect } from 'dva'
import { Toast, Modal, NavBar, WingBlank, Checkbox } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import BackToNativeHome from '@/components/back-to-native-home'
import './index.less'
import Router from '@/utils/router'
const alert = Modal.alert
const CheckboxItem = Checkbox.CheckboxItem
@connect(({ association }) => ({ association }))
class Delete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkList: [],
      loading: true
    }
  }
  componentDidMount() {
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'association/associationMembers', payload: { associationPkId: this.props.location.query.associationPkId } }).then(res => {
      this.props.dispatch({ type:'index/hideLoading'})
      this.setState({
        loading: false,
      })
    })
  }
  onChange =(v, pkId)=> {
    console.log(v.target.checked)
    let arr = this.state.checkList
    if (v.target.checked) {
      arr.push(pkId)
    } else {
      arr = arr.filter(item => item !== pkId)
    }
    this.setState({
      checkList: arr
    })
  }
  handleDelete =()=> {
    console.log(this.state.checkList)
    if (this.state.checkList.length > 0) {
      alert('删除成员', '被移出后将不能在看到协会的内容，确认要将所选成员移出该协会吗？', [
        { text: '取消', onPress: () => console.log('cancel') },
        {
          text: '确定',
          onPress: () =>
            new Promise((resolve) => {
              let body = {
                associationPkId: this.props.location.query.associationPkId,
                userPkIdArray: this.state.checkList
              }
              Toast.info('移除中...', 0)
              this.props.dispatch({type: 'association/removeAssociationMember', payload: body}).then(res =>{
                if (res && res.code === 200) {
                  Toast.info(res.message, 1)
                  this.props.dispatch({ type:'association/associationMembers', payload: { associationPkId: this.props.location.query.associationPkId }})
                  resolve()
                }
              })
            }),
        },
      ])
    } else {
      Toast.info('请勾选要移除的会员', 1)
    }
  }
  render() {
    const { association } = this.props
    return (
      <div className='delete-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >删除成员</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container'>
              <div className='members-wrapper'>
                {
                  association.associationMembers && association.associationMembers.map((item, index) =>(
                    <div key={index} className='members-item'>
                      <div className='members-portrait-wrapper'>
                        { index !== 0 ? <CheckboxItem onChange={(v) => this.onChange(v, item.pkId)}/> : '' }
                        <img className='members-portrait' src={item.avatar && item.avatar.length > 0 && item.avatar[0].thumbnail || require('../../../../assets/defaultPortrait.png')}/>
                        {item.associationRole.value === 1 ? <span className='president'>{item.associationRole.name}</span> : ''}
                      </div>
                      <div className='members-name'>{item.nickName}</div>
                    </div>
                  ))
                }
              </div>
            </WingBlank>
        }
        {
          this.state.loading ? '' :
            <div className='button-wrapper'>
              <div
                className="btn-lg"
                onClick={() =>this.handleDelete()}
              >立即删除</div>
            </div>
        }
      </div>
    )
  }
}
export default Delete
