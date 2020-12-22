import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox, Button, Icon } from 'antd-mobile'

import IconSvg from '@/components/icon-svg'
import EnrollCustomForms from '@/components/enroll-custom-forms'
import { createForm } from 'rc-form'
import './index.less'

@connect(({ activity }) => ({ activity }))
class Personal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      agree: false,
      payAgree: false,
      teamNumber: []
    }
    
  }

  componentDidMount() {
    
  }

 

  
  
  render() {
    const { getFieldProps } = this.props.form

    const addEnrollPerson  =()=> {
      let teamNumber = [...this.state.teamNumber,{open: true}]
      console.log(teamNumber)
      this.setState({
        teamNumber: teamNumber
      })
    }

    const toggle =(index)=> {
      console.log('展开收起')
      let teamNumber = [...this.state.teamNumber]
      teamNumber[index].open = !teamNumber[index].open
      this.setState({
        teamNumber: teamNumber
      })
      console.log(teamNumber)
    }
 

    const enrollProject = [
      {
        label: '5km',
        value: 1
      },
      {
        label: '6km',
        value: 2
      },
      {
        label: '7km',
        value: 3
      },
      {
        label: '8km',
        value: 4
      },
    ]


    return (
      <div className='test-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back'  size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        >活动报名</NavBar>

            <WingBlank size="md" className='container' style={{padding: 0}}>
              <div className='enroll'>
                <div className='active-info'>
                  <div className='active-header'>
                    活动名称：2020厦门勇士杯
                  </div>
                  <div className='active-content'>
                    <List>
                      <Picker
                        data={enrollProject}
                        cols={1}
                        extra={<span className='placeholder'>请选择报名项目</span>}
                        {...getFieldProps('test',{
                          initialValue: [3]
                        })}
                      >
                        <List.Item className='require' arrow={'horizontal'}>选择报名项目</List.Item>
                      </Picker>
                      <InputItem
                          className="price"
                          clear
                          value={'189/人'}
                          disabled
                        >单价
                      </InputItem>
                    </List>
                  </div>
                </div>
                <div className='enroll-info'>
                  <div className='enroll-info-header'>
                    <div>
                      报名信息
                    </div>
                    <div className='desc'>
                      该活动团队报名人数为
                      <span style={{color: 'red'}}>2~5</span>
                      人，报名成功后将短信通知团队联系人，请准确填写报名人信息，
                      以便办理各种手续和购买保险
                    </div>
                  </div>
                  <div className='enroll-info-content'>
                    <List>
                        <InputItem
                        className='require'
                        // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true" />}
                        placeholder='为你的团队取个名字吧'
                        {...getFieldProps('teamName', {
                            initialValue: ''
                        })}
                        >团队名称</InputItem>
                        <InputItem
                        className='require'
                        // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true" />}
                        placeholder='请输入团队联系人'
                        {...getFieldProps('teamContact', {
                            initialValue: ''
                        })}
                        >团队联系人</InputItem>
                        <InputItem
                        className='require'
                        type='phone'
                        placeholder='请输入电话'
                        {...getFieldProps('teamPhone', {
                            initialValue: ''
                        })}
                        >联系电话</InputItem>
                    </List>
                    {
                        this.state.teamNumber.map((item, index) => {
                            return <div className='teamitem' key={index}>
                            <div className='teamitem-header'>
                              <div>
                                报名团员{index+1}
                              </div>
                              <div className='toggle' onClick={() => toggle(index)}>
                                <span>{item.open? '收起' : '展开'}</span>
                                <Icon type={item.open? 'up' : 'down'} />
                              </div>
                              
                               
                            </div>
                            <div className={ item.open? 'teamitem-body show' : 'teamitem-body hide'}>
                                <EnrollCustomForms  ref={(form) => this.customForms = form}></EnrollCustomForms>
                            </div>
                        </div>
                        })
                    }
                    

                    <div className='addTeamer'>
                        <div className='addBt' onClick={() => addEnrollPerson()} >
                            +添加报名人
                        </div>
                        
                    </div>
                    
                    
                  </div>
                </div>

                <div className='pay-info' >
                  <div className='pay-info-text'>
                      支付方式
                  </div>
                  <div className="pay-info-wx" onClick={() => this.setState({payAgree: !this.state.payAgree})}>
                    <div className="pay-info-wx-text">
                      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2638031227,205623310&fm=26&gp=0.jpg"></img>
                      <span>微信支付</span>
                    </div>
                    <div >
                      <Checkbox checked={this.state.payAgree}/>
                    </div>
                   
                  </div>
                  
                </div>
                <div className='op-info'>
                    <div className='agree-info'>
                      <div onClick={() => this.setState({agree: !this.state.agree})} >
                        <Checkbox checked={this.state.agree}/>
                        <span style={{marginLeft: '5px'}}>我已阅读并同意</span>
                        <span style={{color: 'lightblue'}}>赛事活动报名免责条款</span>
                      </div>
                      
                    </div>
                    <div className='enroll-op'>
                      <div className='enroll-op-left'>
                        <span>
                          总金额:
                        </span>
                        <span className='price'>￥945</span>
                      </div>
                      {/* this.props.form.getFieldsValue() */}
                      <div className='enroll-op-right' onClick={() => {console.log(this.customForms.getFieldsValue())}}>
                        立即报名
                      </div>
                    </div>
                </div>
              </div>
            </WingBlank>
      </div>
    )
  }
}

export default createForm()(Personal)

