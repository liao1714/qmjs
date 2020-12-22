import React, { Component } from 'react'
import { connect } from 'umi'
import Avatar from './AvatarDropdown'
import './index.less'
@connect(({ tabs }) => ({ tabs }))
class LayoutHeader extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
    return <div className='layout-header'>
      <div className='layout-header-left'>
        <img className='header-logo' src={require('../../assets/logo.png')}/>
        <div className='header-title'>i体育运营管理后台</div>
      </div>
      <div className='layout-header-right'>
        <div className='header-portrait'>
          <Avatar />
        </div>
        <div className='header-name'/>
      </div>
    </div>
  }
}
export default LayoutHeader
