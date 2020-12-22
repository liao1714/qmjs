import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, NavBar, WingBlank, Picker, List, InputItem, Radio, ImagePicker, Checkbox, Modal, Toast } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import router from 'umi/router'
import { createForm } from 'rc-form'
import BackToNativeHome from '@/components/back-to-native-home'
import EnrollCustomForms from '@/components/enroll-custom-forms'
import WxImageViewer from 'react-wx-images-viewer'
import { formatDate } from '@/utils/methons'
import Router from '@/utils/router'
import './index.less'

const RadioItem = Radio.RadioItem
const CheckboxItem = Checkbox.CheckboxItem
@connect(({ activity }) => ({ activity }))
class LookEnrollment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      insuranceImgs: [],
      agree: true,
      previewImageShow: false,
      previewImageList: [],
      previewImageIndex: null,
      showModal: false,
      reasonValue: '',
      loading: true
    }
  }
  componentDidMount() {
    this.props.dispatch({ type:'index/loading'})
    this.props.dispatch({ type: 'buriedPoint/qmjs_association_apply', payload: { objId: this.props.location.query.evensId }})
    // this.props.dispatch({type: 'activity/enrollItemCost', payload: { pkId: this.props.location.query.evensId }}).then(res => {
      
    // })

    this.props.dispatch({type: 'activity/enrollDetail', payload: { eventsEnrollPkId: this.props.location.query.eventsEnrollPkId }}).then(res => {
      this.props.dispatch({type: 'activity/cancelReasons'})
      this.props.dispatch({ type:'index/hideLoading'})
      this.setState({
        loading: false
      })
    })


  }
  setImagePicker = (files, pkId) => {
    console.log(files)
    console.log(pkId)
    // this.props.form.setFieldsValue({
    //   [pkId]: files
    // })
    // this.setState({
    //   imageFiles:{
    //     [pkId]: files
    //   }
    // })
    let list = []
    files && files.map(item => {
      list.push({
        url: item
      })
    })
    return list
  }
  previewImage =(image, index)=> {
    console.log(image)
    let arr = []
    image.map(item =>{
      arr.push(item.url)
    })
    this.setState({
      previewImageShow: true,
      previewImageList: arr,
      previewImageIndex: index
    })
  }
  onChange = (value) => {
    console.log(value)
    this.setState({
      reasonValue: value
    })
  }
  handleReason = (enrollItemCostPkId) => {
    console.log(this.state.reasonValue)
    if (this.state.reasonValue !== '') {
      let body = {
        enrollItemCostPkId: enrollItemCostPkId,
        cancelReason: this.state.reasonValue
      }
      Toast.loading('提交中...')
      this.props.dispatch({type: 'activity/cancelEnroll', payload: body}).then(res => {
        if (res && res.code === 200) {
          Toast.info(res.message, 2)
          this.setState({
            showModal: false
          })
          Router.go(-1)
          this.props.dispatch({ type: 'buriedPoint/qmjs_activityapply_cancle_click', payload: { objId: this.props.location.query.evensId, objType: '成功' }})
          Toast.info('取消成功！')
        } else {
          this.props.dispatch({ type: 'buriedPoint/qmjs_activityapply_cancle_click', payload: { objId: this.props.location.query.evensId, objType: '失败' }})
        }
      })
    } else {
      Toast.info('请选择取消原因', 2)
    }
  }

  lookOrderDetail = (eventsEnrollPkId) => {
    console.log(eventsEnrollPkId)
    Router.push('/activity/orderInfo', { eventsEnrollPkId: eventsEnrollPkId })
   
  }

  render() {
    const { activity } = this.props
    // activity &&  activity.enrollItemCostList && activity.enrollItemCostList.map(item => {
    //   item.label = item.itemName
    //   item.value = item.pkId
    // })
    const { getFieldProps } = this.props.form
    return (
      <div className='look-enrollment-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >报名详情</NavBar>
        {
          this.state.loading ? '' :
            <WingBlank size="md" className='container' style={{padding: 0}}>
              <div className='active-status'>
                <label>状态：</label>
                <span>{activity.enrollForm && activity.enrollForm.registrationStatus && activity.enrollForm.registrationStatus.name}</span>
              </div>
              <div className='active-info'>
                <div className='active-info-header'>报名信息</div>
                <div className='active-info-content'>
                  <List>
                    <InputItem
                      clear
                      value={activity.enrollForm && activity.enrollForm.activityName}
                      disabled
                    >活动名称
                    </InputItem>
                    <InputItem
                      clear
                      value={activity.enrollForm && activity.enrollForm.itemName}
                      disabled
                    >报名项目
                    </InputItem>
                    <InputItem
                      clear
                      value={activity.enrollForm && activity.enrollForm.eventsMode.name}
                      disabled
                    >报名方式
                    </InputItem>
                    <InputItem
                      clear
                      value={activity.enrollForm && activity.enrollForm.number}
                      disabled
                    >报名人数
                    </InputItem>
                    <InputItem
                      clear
                      // value={activity.enrollForm.itemCost == null ? '免费' : activity.enrollForm.itemCost}
                      disabled
                      // className='test'

                      extra={<span className='test'>{activity.enrollForm && activity.enrollForm.itemCost == null ? '免费' : activity.enrollForm && activity.enrollForm.itemCost}</span>}
                    >
                      单价
                    </InputItem>
                    <InputItem
                      clear
                      value={formatDate(activity.enrollForm && activity.enrollForm.createdDate, 'yyyy-MM-dd HH:mm')}
                      disabled
                    >报名时间
                    </InputItem>
                    {
                      activity.enrollForm && activity.enrollForm.cancelDate == null ? '' :
                        <InputItem
                          clear
                          value={formatDate(activity.enrollForm && activity.enrollForm.cancelDate, 'yyyy-MM-dd HH:mm')}
                          disabled
                        >取消时间
                        </InputItem>
                    }
                  </List>
                </div>
              </div>
              {
                (activity.enrollForm && activity.enrollForm.eventsMode.value == 0) || (activity.enrollForm && activity.enrollForm.eventsMode.value == 2)?
                  <div className='active-info'>
                    <div className='active-info-header'>报名人信息</div>
                    <div className='active-info-content'>
                      {
                        activity.enrollForm && activity.enrollForm.formDatas && activity.enrollForm.formDatas.map((item, index) => {
                          return  <EnrollCustomForms key={index} canedit={false} formIndex={index}  ref={(form) => this.customForms = form}/>
                        })
                      }
                    </div>
                  </div>
                  :''
              }
              {
                activity.enrollForm && activity.enrollForm.eventsMode.value == 1 ?
                  <div className='active-info'>
                    <div className='active-info-header'>团队信息</div>
                    <div className='active-info-content'>
                      <InputItem
                        clear
                        value={activity.enrollForm && activity.enrollForm.call}
                        disabled
                      >团队名称
                      </InputItem>
                      <InputItem
                        clear
                        value={activity.enrollForm && activity.enrollForm.name}
                        disabled
                      >团队联系人
                      </InputItem>
                      <InputItem
                        clear
                        value={activity.enrollForm && activity.enrollForm.mobile}
                        disabled
                      >联系电话
                      </InputItem>

                    </div>
                  </div>
                  :''
              }
              {
                activity.enrollForm && activity.enrollForm.eventsMode.value == 2 ?
                  <div className='active-info'>
                    <div className='active-info-header'>家庭信息</div>
                    <div className='active-info-content'>
                      <InputItem
                        clear
                        value={activity.enrollForm && activity.enrollForm.call}
                        disabled
                      >家庭名称
                      </InputItem>
                      <InputItem
                        clear
                        value={activity.enrollForm && activity.enrollForm.name}
                        disabled
                      >家庭联系人
                      </InputItem>
                      <InputItem
                        clear
                        value={activity.enrollForm && activity.enrollForm.mobile}
                        disabled
                      >联系电话
                      </InputItem>

                    </div>
                  </div>
                  :''
              }

              {
                activity.enrollForm && activity.enrollForm.eventsMode.value == 1 ?
                  <div>
                    {
                      activity.enrollForm && activity.enrollForm.formDatas && activity.enrollForm.formDatas.map((item, index) => {
                        return  <div key={index} className='active-info'>
                          <div className='active-info-header'>报名人{index+1}</div>
                          <div className='active-info-content'><EnrollCustomForms key={index} canedit={false} formIndex={index}  ref={(form) => this.customForms = form}></EnrollCustomForms></div>

                        </div>

                      })
                    }

                  </div>
                  :''
              }

              {
                activity.enrollForm && activity.enrollForm.orderNo ?
                  <div className='order-info' onClick={()=>this.lookOrderDetail(activity.enrollForm.eventsEnrollPkId)}>
                    <div className='order-block'>
                      <span>订单编号：{activity.enrollForm.orderNo}</span>
                      <span className='status'>{activity.enrollForm.registrationStatus && activity.enrollForm.registrationStatus.name}</span>
                    </div>
                    <div className='order-block'>
                      <div>
                        <span>{ activity.enrollForm.totalAmount && '支付总金额：'  }</span>
                        <span className='price'>{activity.enrollForm.totalAmount }</span>
                      </div>
                      
                      <span >{activity.enrollForm && activity.enrollForm.orderNo && '查看订单信息>'}</span>
                    </div>
                  </div> : ''
              }
            </WingBlank>
        }
        {/* <div className='button-wrapper'>
          <div className='am-checkbox-agree'>
            我已阅读并同意 <span>《赛事活动报名免责声明》</span>
          </div>
          {
            activity && activity.enrollInfo && activity.enrollInfo.cancelFlag ?  ''
              : <div className="btn-lg" onClick={()=>this.setState({showModal: true})}>取消报名</div>
          }
        </div> */}
        <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={false}
          onClose={()=>this.setState({showModal: false})}
          title="确定要取消报名吗？"
          footer={[
            { text: '再想想', onPress: () => this.setState({showModal: false}) },
            { text: '确定', onPress: () => this.handleReason(activity.enrollInfo.enrollItemCostPkId)},
          ]}
        >
          <div>
            <div className='cancel-message'>
              <div>只允许取消一次</div>
              <div>请选择你取消的原因</div>
            </div>
            <List>
              {activity && activity.cancelReasons && activity.cancelReasons.map(i => (
                <div key={i.value}>
                  <CheckboxItem key={i.value} checked={this.state.reasonValue === i.value} onChange={() => this.onChange(i.value)}>
                    {i.name}
                  </CheckboxItem>
                  {/*<RadioItem checked={this.state.reasonValue === i.value} onChange={() => this.onChange(i.value)}>*/}
                  {/*  {i.name}*/}
                  {/*</RadioItem>*/}
                </div>
              ))}
            </List>
          </div>
        </Modal>
        {
          this.state.previewImageShow ? <WxImageViewer onClose={()=>this.setState({previewImageShow: false})} urls={this.state.previewImageList} index={this.state.previewImageIndex}/> : ''
        }
      </div>
    )
  }
}
export default createForm()(LookEnrollment)
