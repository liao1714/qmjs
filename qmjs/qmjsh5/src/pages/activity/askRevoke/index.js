import React, { Component } from 'react'
import { connect } from 'dva'
import { List, Badge, Picker, NavBar, WingBlank, InputItem, Checkbox, Toast, Icon, Button } from 'antd-mobile'
import { NotEmpty } from '@/utils/formValid'
import IconSvg from '@/components/icon-svg'
import Router from '@/utils/router'


@connect(({ activity }) => ({ activity }))
class Welfare extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  componentDidMount() {
    this.props.dispatch({ type:'activity/revoke', payload: {primaryPkId: '785900649714810879'} }).then(res => {
      console.log('res')
      console.log(res)

      Toast.info(JSON.stringify(res), 3)
     
    })
  }


  render() {
    return (
      <div className='revoke-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back'  size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        >tp</NavBar>

        <WingBlank size="md" className='container' style={{padding: 0}}>
          
        </WingBlank>

      </div>
    )
  }
}

export default Welfare

