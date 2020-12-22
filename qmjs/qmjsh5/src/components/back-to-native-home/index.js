import React, { Component } from 'react'
import './index.less'
import { connect } from 'dva'
@connect(({ index }) => ({ index }))
class BackToNativeHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showBackToNativeHome: false
    }
  }
  componentDidMount() {
    this.props.dispatch({ type:'index/accessType' }).then(res => {
      console.log(res)
      if (res === 1) {
        this.setState({
          showBackToNativeHome: true
        })
      }
    })
  }
  backToNativeHome =()=> {
    this.props.dispatch({ type:'index/backToNativeHome' })
  }
  render() {
    return (this.state.showBackToNativeHome ? <span className='back-to-native-home' onClick={()=>this.backToNativeHome()}>关闭</span> : '')
  }
}
export default BackToNativeHome
