import React, { Component } from 'react'
import style from './index.css'
import { connect } from 'dva'
@connect(({ index }) => ({ index }))
class Loading extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { index } = this.props
    return (
      index.loading ?
        <div className={style.loading}>
          {/*<div className={style.line_scale}>*/}
          {/*  <div/>*/}
          {/*  <div/>*/}
          {/*  <div/>*/}
          {/*  <div/>*/}
          {/*  <div/>*/}
          {/*</div>*/}
          <img className={style.gif} src={require('../../assets/loading.gif')}/>
        </div>
        : ''
    )
  }
}
export default Loading
