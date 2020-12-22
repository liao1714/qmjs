import React, { Component } from 'react'
import './index.less'
import { Picker, List, InputItem, DatePicker, ImagePicker, TextareaItem, Checkbox } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'dva'



@connect(({ activity }) => ({ activity }))
class CommonArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }


  render() {

    const test = '<h2>你好全世界</h2>'
    return (
      <div className='common-article'>
        <div className='detail-introduce' dangerouslySetInnerHTML={{ __html: test}}/>
      </div>
    )
  }
}
export default CommonArticle
