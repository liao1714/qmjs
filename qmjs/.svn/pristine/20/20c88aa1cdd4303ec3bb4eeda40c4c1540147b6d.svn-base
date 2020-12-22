import React, { Component } from 'react'
import { connect } from 'dva'

import { NavBar, Toast, WingBlank } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import BackToNativeHome from '@/components/back-to-native-home'
import { formatDate } from '@/utils/methons'
import Router from '@/utils/router'
@connect(({ activity, index }) => ({ activity, index }))
class Blank extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    if(this.props.location.query.payData) {
      alert('跳到了空白页')
      // location.href = this.props.location.query.payData
    }
  }



  render() {
    const { activity, index } = this.props
    const detail = activity.detail
    return (
      <div className='detail-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        ></NavBar>
        <WingBlank size="md" className='container' style={{padding: 0}}>
                
        </WingBlank>

        
      </div>
    )
  }
}

export default Blank
