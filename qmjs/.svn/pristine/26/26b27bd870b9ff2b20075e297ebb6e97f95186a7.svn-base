import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import { NavBar, Toast, WingBlank } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import router from 'umi/router'
import { formatMessage } from 'umi-plugin-locale'
import Router from '@/utils/router'
@connect(({ preference }) => ({ preference }))
class Preference extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sexData: [
        { value: 1, name: '男', sign: false, type: 'man' },
        { value: 2, name: '女', sign: false, type: 'woman' }
      ],
      preferenceList: [],
      sex: 0,
      tagPkId: []
    }
  }
  componentDidMount() {
    this.props.dispatch({ type:'preference/preferenceList' }).then(res => {
      console.log(res)
      if (res && res.code === 200) {
        this.setState({
          preferenceList: res.data
        })
      }
    })
  }
  getPreference =(index)=> {
    let preferenceList = this.state.preferenceList
    preferenceList[index].sign = !preferenceList[index].sign
    const tagPkId = []
    preferenceList && preferenceList.map(item => {
      if (item.sign) {
        tagPkId.push(item.pkId)
      }
    })
    this.setState({
      preferenceList: preferenceList,
      tagPkId: tagPkId
    })
  }
  getSex =(index)=> {
    let sexData = this.state.sexData
    sexData.map((item, ind) => {
      if (ind === index) {
        item.sign = !item.sign
        if (item.sign) {
          this.setState({
            sex: item.value
          })
        } else {
          this.setState({
            sex: 0
          })
        }
      } else {
        item.sign = false
      }}
    )
    this.setState({
      sexData: sexData
    })
  }
  toHome =(type)=> {
    console.log(this.state.sex)
    console.log(this.state.tagPkId)
    if (type === 0) {
      Router.replace('/home')
    } else {
      let body = {
        sex: this.state.sex,
        tagPkId: this.state.tagPkId,
      }
      Toast.loading('提交中...', 0)
      this.props.dispatch({type: 'preference/smkPreferences', payload: body}).then(res => {
        if (res && res.code === 200) {
          Toast.info(res.message,1)
        }
        Router.replace('/home')
      })
    }
  }
  render() {
    return (
      <div className='preference-page'>
        <NavBar
          mode='light'
          leftContent={<IconSvg type='back'  size='sm' onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>}
          rightContent=''
        ><IconSvg type='logo' size='md'/>{formatMessage({ id: 'index.title' })}</NavBar>
        <WingBlank size="md" className='container'>
          <div className='preference-header'><span onClick={()=>this.toHome(0)}>跳过</span></div>
          <div className='sex-title'>您的性别</div>
          <div className='sex-wrapper'>
            {this.state.sexData.map((item, index) => (
              <div key={index} className={item.sign ? 'sex-item sex-item-active' : 'sex-item'} onClick={()=>this.getSex(index)}>
                <div className={'sex-icon-' + item.type + ' sex-icon'}>
                  <IconSvg type={item.type} size='lg'/>
                </div>
                <span className={'sex-name-' + item.type + ' sex-name'}>{item.name}</span>
              </div>
            ))}
          </div>
          <div className='preference-title'>请选择您喜欢的运动</div>
          <div className='preference-wrapper'>
            {this.state.preferenceList && this.state.preferenceList.map((item, index) => (
              <div onClick={()=>this.getPreference(index)} key={index} className={item.sign ? 'preference-list preference-list-active' : 'preference-list'}>{item.tagName}</div>
            ))}
          </div>
        </WingBlank>
        <div className='button-wrapper'>
          <div className='btn-lg' onClick={()=>this.toHome(1)}>开始体验</div>
        </div>
      </div>
    )
  }
}

export default Preference
