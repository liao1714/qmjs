import React, {Component, useState} from 'react'
import CreateForm from './components/CreateForm'
import './index.less'
import {connect, history} from 'umi'
import {message} from 'antd'


class EventsCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitLoading: false,
      draftLoading: false
    }
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'formTemplate/templateQuery',
    //   payload: {} ,
    // }).then(res => {
    //   console.log('test-res')
    //   console.log(res)
    //   if(res.data.length > 0) {
    //     this.props.dispatch({
    //       type: 'formTemplate/setCurChooseTemplate',
    //       payload: res.data[0].id
    //     })

    //     this.props.dispatch({
    //       type: 'formTemplate/setComponentsList',
    //       payload: res.data[0].formFieldBos
    //     })

    //     console.log('获取第一项内容')
    //   }
    // })


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
    

    if(form.getFieldValue('confirmTemplateId') == '') {
      message.error('请选择表单模板')
      return false
    }
    form.validateFields().then(res => {
     
      // res.content = res.content.replace(/..\/..\/qmjsres\//g, 'https://buss.ixiamen.org.cn/qmjsres/')
      this.setState({
        submitLoading: true
      })
      if(res.condition.limit.type == 2) {
        res.condition.limit.minBirthday = res.condition.limit.birthRange && new Date(res.condition.limit.birthRange[0]).getTime()
        res.condition.limit.maxBirthday = res.condition.limit.birthRange && new Date(res.condition.limit.birthRange[1]).getTime()

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
        condition: res.condition,
        templatePkId: form.getFieldValue('confirmTemplateId'),
        contentImgIds: contentImgIds
      }

      console.log('body')
      console.log(body)


      this.props.dispatch({
        type: 'events/eventsAddPush',
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
  submitDraftForm =(form, type)=> {
    console.log(form.getFieldValue())
    const allField = form.getFieldValue()
    const {contentImgIds = []} = allField
    if(form.getFieldValue('confirmTemplateId') == '') {
      message.error('请选择表单模板')
      return false
    }
    form.validateFields().then(res => {
      console.log(res)
      console.log('res')
      this.setState({
        submitDraftLoading: true
      })

      if(res.condition.limit.type == 2) {
        res.condition.limit.minBirthday = res.condition.limit.birthRange && new Date(res.condition.limit.birthRange[0]).getTime()
        res.condition.limit.maxBirthday = res.condition.limit.birthRange && new Date(res.condition.limit.birthRange[1]).getTime()

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
        contentImgIds: contentImgIds,

        eventsModeDTOS: enrollMethodData,
        condition: res.condition,
        templatePkId: form.getFieldValue('confirmTemplateId')


      }
      console.log(body)
      this.props.dispatch({
        type: 'events/eventsAdd',
        payload: body,
      }).then(res =>{
        if (res && res.code === 200) {
          message.success(res.message, 2)
          history.push('/')
        }
        this.setState({
          submitDraftLoading: false
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }
  render(){

    return (
      <div className='main-wrapper'>
        <CreateForm
          submitLoading={this.state.submitLoading}
          submitDraftLoading={this.state.submitDraftLoading}
          submitForm={(form, type)=>this.submitForm(form, type)}
          submitDraftForm={(form, type)=>this.submitDraftForm(form, type)}
        />
      </div>
    )
  }
}

export default connect(({ events, formTemplate }) => ({
  events,
  formTemplate
}))(EventsCreate)
