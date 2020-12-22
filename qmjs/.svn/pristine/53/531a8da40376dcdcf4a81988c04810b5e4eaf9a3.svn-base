import React, {Component, useState} from 'react'
import EditorForm from './components/EditorForm'
import './index.less'
import {connect, history} from 'umi'
import {message} from 'antd'

class EventsEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitLoading: false,
      loading: false
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'events/eventsDetail',
      payload: {pkId: history.location.query.pkId} ,
    }).then(res => {
      this.setState({
        loading: true
      })
    })

    this.props.dispatch({
      type: 'formTemplate/templateQuery',
      payload: {} ,
    })

    this.props.dispatch({
      type: 'formTemplate/templateFieldQuery',
      payload: {} ,
    }).then(res => {
      console.log('常用报名表单')
      console.log(res)
      
    })

    

  }

  submitForm =(form, type)=> {
    const allField = form.getFieldValue()
    const {contentImgIds = []} = allField
    form.validateFields().then(res => {
      if(res.templatePkId == '') {
        message.error('请选择表单模板')
        return false
      }
      this.setState({
        submitLoading: true
      })
      // res.content = res.content.replace(/..\/..\/qmjsres\//g, 'https://buss.ixiamen.org.cn/qmjsres/')


      if(res.condition[0].limit.type == 2) {

        res.condition[0].limit.minBirthday = res.condition[0].limit.birthRange && new Date(res.condition[0].limit.birthRange[0]).getTime()
        res.condition[0].limit.maxBirthday = res.condition[0].limit.birthRange && new Date(res.condition[0].limit.birthRange[1]).getTime()
      }

      let enrollMethodData = []
      res.enrollMode.forEach((element, index) => {
        enrollMethodData[index] = res.enrollMethodData[element]
      })
      enrollMethodData.forEach((item, index) => {
        if(item.type == 2) {
          if(item.condition.type == 2) {
            item.condition.minBirthday =  item.condition.birthRange && new Date(item.condition.birthRange[0]).getTime()
            item.condition.maxBirthday =  item.condition.birthRange && new Date(item.condition.birthRange[1]).getTime()
          }
        }
      })


      
      let body = {
        pkId: history.location.query.pkId,
        eventsType: res.eventsType,
        title: res.title,
        intro: res.intro,
        content: res.content,
        cover: [res.coverImage[0].id],
        headerImg: [res.headerImage[0].id],
        enrollUpper: res.enrollUpper,
        enrollBeginTime: res.enrollTime && new Date(res.enrollTime[0]).getTime(),
        enrollEndTime: res.enrollTime && new Date(res.enrollTime[1]).getTime(),
        eventsBeginTime: res.eventsTime && new Date(res.eventsTime[0]).getTime(),
        eventsEndTime: res.eventsTime && new Date(res.eventsTime[1]).getTime(),
        eventsHotline: res.eventsHotline,
        area: res.area,
        address: res.address,
        longitude: res.longitude,
        latitude: res.latitude,
        tagPkId: res.tagPkId,
        itemCostArray: res.itemCostArray,
        insuranceRequired: res.insuranceRequired,


        eventsModeDTOS: enrollMethodData,
        templatePkId: res.templatePkId,
        condition: res.condition[0],
        modes: res.modes,
        contentImgIds: contentImgIds


      }
      let setDetail = {...body}
      setDetail.eventsType = {
        value: body.eventsType
      }
      setDetail.tag = {
        pkId: body.tagPkId
      }
      setDetail.itemCostArray.map(item => {
        item.pkId = new Date().getTime()
      })
      setDetail.conditions = res.condition,

      setDetail.enrollItemCostArray = setDetail.itemCostArray
      this.props.dispatch({
        type: 'events/setEventsDetail',
        payload: setDetail,
      })
      console.log(setDetail)
      console.log(body)
      this.props.dispatch({
        type: 'events/eventsEdit',
        payload: body,
      }).then(res =>{
        if (res && res.code === 200) {
          message.success(res.message, 2)
          history.push('/')
        }
        this.setState({
          submitLoading: false
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }
  render(){
    return (
      <div className='main-wrapper'>
        {
          this.state.loading ?
            <EditorForm
              submitLoading={this.state.submitLoading}
              submitForm={(form, type)=>this.submitForm(form, type)}
            />  : ''
        }
      </div>
    )
  }
}

export default connect(({ events }) => ({
  events,
}))(EventsEditor)
