import React, { Component } from 'react'
import { connect } from 'dva'
import { NavBar, WingBlank } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import router from 'umi/router'
import BackToNativeHome from '@/components/back-to-native-home'
import './index.less'
import Router from '@/utils/router'
@connect(({ association }) => ({ association }))
class Members extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      presidentFlag: false
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'buriedPoint/qmjs_community_member', payload: { objId: this.props.location.query.associationPkId }})
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type:'association/associationMembers', payload: { associationPkId: this.props.location.query.associationPkId } }).then(res => {
      this.props.dispatch({ type:'index/hideLoading'})
      this.setState({
        loading: false,
        presidentFlag: this.props.location.query.presidentFlag
      })
    })
  }
  render() {
    const { association } = this.props
    return (
      <div className='detail-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >会员（{association.associationMembers && association.associationMembers.length}）</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container'>
              <div className='members-wrapper'>
                {
                  association.associationMembers && association.associationMembers.map((item, index) =>(
                    <div key={index} className='members-item'>
                      <div className='members-portrait-wrapper'>
                        <img className='members-portrait' src={item.avatar && item.avatar.length > 0 && item.avatar[0].thumbnail || require('../../../assets/defaultPortrait.png')}/>
                        {item.associationRole.value === 1 ? <span className='president'>{item.associationRole.name}</span> : ''}
                      </div>
                      <div className='members-name'>{item.nickName}</div>
                    </div>
                  ))
                }
                {
                  this.state.presidentFlag ?
                    <div className='members-item'>
                      <div
                        className='members-portrait-wrapper members-operation'
                        onClick={()=>Router.push('/association/members/add', { associationPkId: this.props.location.query.associationPkId, presidentFlag: this.props.location.query.presidentFlag } )}
                      >
                        <IconSvg type='add'  size='sm'/>
                      </div>
                    </div>
                    : ''
                }
                {
                  this.state.presidentFlag ?
                    <div className='members-item'>
                      <div
                        className='members-portrait-wrapper members-operation'
                        onClick={()=>Router.push('/association/members/delete', { associationPkId: this.props.location.query.associationPkId, presidentFlag: this.props.location.query.presidentFlag })}
                      >
                        <IconSvg type='remove' size='sm'/>
                      </div>
                    </div>
                    : ''
                }
              </div>
            </WingBlank>
        }
      </div>
    )
  }
}
export default Members
