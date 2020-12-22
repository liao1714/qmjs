import React, { Component } from 'react'
import './index.less'
import {  Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'dva'



@connect(({ activity }) => ({ activity }))
class CommonClause extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }



  render() {
    return (
      <div className='clause'>
        <Modal
          visible={this.props.showClauseModal}
          transparent
          maskClosable={false}
          footer={[{ text: '我已阅读', onPress: () => {  this.props.onClose() } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 400, overflow: 'scroll' }}>
            <div className='detail-introduce' dangerouslySetInnerHTML={{ __html: this.props.clauseArticle}}/>
          </div>
        </Modal>
      </div>
      
    )
  }
}
export default CommonClause
