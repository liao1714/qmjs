import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox } from 'antd-mobile'

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
      payAgree: false
    }
    
  }

  componentDidMount() {
    
  }

  
  
  render() {
    const { getFieldProps } = this.props.form
 

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
                      报名成功将短信通知你，请准确填写信息，以便办理各种手续和购买保险
                    </div>
                  </div>
                  <div className='enroll-info-content'>
                    <EnrollCustomForms  ref={(form) => this.customForms = form}></EnrollCustomForms>
                  </div>
                </div>

                <div className='pay-info' >
                  <div className='pay-info-text'>
                      支付方式
                  </div>
                  <div className="pay-info-wx">
                    <div className="pay-info-wx-text">
                      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2638031227,205623310&fm=26&gp=0.jpg"></img>
                      <span>微信支付</span>
                    </div>
                    
                        
                    <div onClick={() => this.setState({payAgree: !this.state.payAgree})}>
                      <Checkbox checked={this.state.payAgree}/>
                    </div>
                   
                  </div>
                  
                </div>
                <div className='op-info'>
                    <div className='agree-info'>
                      <div onClick={() => this.setState({agree: !this.state.agree})}>
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

