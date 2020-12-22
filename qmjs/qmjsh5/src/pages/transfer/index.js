import React, { Component } from 'react'
import { NavBar, WingBlank } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import { formatMessage } from 'umi-plugin-locale'
import { removeToken } from '@/utils/token'

class Register extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    removeToken()
  }
  render() {
    return (
      <div className='login-register-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back'  size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        ><IconSvg type='logo' size='md'/>{formatMessage({ id: 'index.title' })}</NavBar>
        <WingBlank size="md" className='container login-container'></WingBlank>
      </div>
    )
  }
}

export default Register
