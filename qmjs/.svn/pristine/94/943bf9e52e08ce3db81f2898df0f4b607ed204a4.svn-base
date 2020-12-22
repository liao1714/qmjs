import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox, Toast, Icon, Button } from 'antd-mobile'
import { NotEmpty } from '@/utils/formValid'
import IconSvg from '@/components/icon-svg'
import EnrollCustomForms from '@/components/enroll-custom-forms'
import { createForm } from 'rc-form'
import './index.less'
import Router from '@/utils/router'
import BackToNativeHome from '@/components/back-to-native-home';


@connect(({ activity }) => ({ activity }))
class EnrollSuccess extends Component {
  constructor(props) {
    super(props)
    this.state = {


    }
  }

  componentDidMount() {

  }


  lookDetail = () => {
    Router.push('/activity/lookEnrollment', { eventsEnrollPkId: this.props.location.query.eventsEnrollPkId })
  }

  back = () => {
    Router.go(-1)
  }



  render() {






    return (
      <div className='enroll-success-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >活动报名</NavBar>

        <WingBlank size="md" className='container' style={{padding: 0}}>

          <div className='success-box'>
            <div className='success-box-header'>
              <Icon type={'check-circle'} className='success-box-header-icon'></Icon>
              <span>报名成功</span>

            </div>
            <div className='success-box-msg'>您已成功报名，请准时参加活动</div>
            <div className='success-box-bt'>
              {/* <Button style={{borderRadius: '12px'}} type="primary"  onClick={ e=> this.lookDetail()}>查看报名详情</Button> */}
              <div className='btn-md lookDetail' onClick={ e=> this.lookDetail()} >
                  查看报名详情
              </div>
              {/* <div className=' btn-md' onClick={ e=> this.back()}>
                  返回
                  </div> */}
              <Button style={{borderRadius: '12px',marginTop: '10px'}} size='large' onClick={ e=> this.back()}>返回</Button>
            </div>
          </div>

        </WingBlank>

      </div>
    )
  }
}

export default createForm()(EnrollSuccess)

