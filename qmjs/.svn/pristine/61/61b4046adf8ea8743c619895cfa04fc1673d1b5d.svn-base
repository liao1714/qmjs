import React, { Component } from 'react'
import { connect } from 'dva'
import './index.less'
import { Button, NavBar, WingBlank, Picker, List, InputItem, DatePicker, ImagePicker, Checkbox, Modal, Toast } from 'antd-mobile'
import IconSvg from '@/components/icon-svg'
import router from 'umi/router'
import { createForm } from 'rc-form'
import BackToNativeHome from '@/components/back-to-native-home'
import CustomForms from '@/components/custom-forms'
import { NotEmpty } from '@/utils/formValid'
import { uploadImages, uploadOneByOne } from '@/utils/uploadImages'
import WxImageViewer from 'react-wx-images-viewer'
import Router from '@/utils/router'
import { checkImagesSize } from '@/utils/methons'
const CheckboxItem = Checkbox.CheckboxItem
const alert = Modal.alert
@connect(({ activity }) => ({ activity }))
class Enrollment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      insuranceImgs: [],
      agree: false,
      previewImageShow: false,
      previewImageList: [],
      previewImageIndex: null,
      enrollItemCostList: [],
      itemCost: 0
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'buriedPoint/qmjs_activity_apply', payload: { objId: this.props.location.query.evensId }})
    this.props.dispatch({type: 'activity/enrollItemCost', payload: { pkId: this.props.location.query.evensId }}).then(res => {
      if (res && res.code === 200) {
        this.setState({
          enrollItemCostList: res.data
        })
        this.props.dispatch({type: 'activity/signUpForm', payload: { pkId: this.props.location.query.evensId }})
      }
    })
  }
  handleForm =(data)=> {
    const that = this
    console.log(that.customForms)
    return new Promise((resolve, reject) => {
      let fixedForms = that.props.form.getFieldsValue()
      let customForms = that.customForms.getFieldsValue()
      console.log(fixedForms)
      console.log(customForms)
      if (
        NotEmpty(fixedForms.enrollItemCostPkId, '请选择报名项目') &&
        NotEmpty(fixedForms.name, '请输入姓名') &&
        NotEmpty(fixedForms.mobile, '请输入手机号')
      ) {
        if (data.insuranceRequired) {
          if (NotEmpty(fixedForms.insuranceImgs, '请上传保单')) {
            if (this.state.agree) {
              let imagesFiles = []
              for (let key in customForms) {
                if (customForms[key] instanceof Date) {
                  customForms[key] = new Date(customForms[key]).getTime()
                }
                if (customForms[key] instanceof Array && customForms[key].length > 0) {
                  if (customForms[key][0].url) {
                    imagesFiles.push({
                      key: key,
                      files: customForms[key]
                    })
                  }
                }
              }
              console.log(imagesFiles)
              let fixedBody = {
                enrollItemCostPkId: fixedForms.enrollItemCostPkId[0],
                name: fixedForms.name,
                mobile: fixedForms.mobile,
                insuranceImgs: [],
              }
              Toast.loading('提交中...', 0)
              uploadOneByOne(that.state.insuranceImgs).then(res => {
                fixedBody.insuranceImgs = res
                uploadImages(imagesFiles).then(res => {
                  res.map(item => {
                    customForms[item.key] = item.value
                  })
                  let itemArray =[]
                  for (let key in customForms) {
                    itemArray.push({
                      pkId: key,
                      value: customForms[key]
                    })
                  }
                  let body = {
                    ...fixedBody,
                    itemArray: itemArray
                  }
                  console.log(body)
                  that.props.dispatch({type: 'activity/signUp', payload: body}).then(res => {
                    if (res && res.code === 200) {
                      Router.replace('/activity/detail', { pkId: this.props.location.query.evensId })
                      Toast.info(res.message, 2)
                    }
                    resolve()
                  })
                })
              })
            } else {
              Toast.info('请勾选我已阅读并同意《赛事活动报名免责声明》')
              resolve()
            }
          } else {
            resolve()
          }
        } else {
          if (this.state.agree) {
            let imagesFiles = []
            for (let key in customForms) {
              if (customForms[key] instanceof Date) {
                customForms[key] = new Date(customForms[key]).getTime()
              }
              if (customForms[key] instanceof Array && customForms[key].length > 0) {
                if (customForms[key][0].url) {
                  imagesFiles.push({
                    key: key,
                    files: customForms[key]
                  })
                }
              }
            }
            console.log(imagesFiles)
            let fixedBody = {
              enrollItemCostPkId: fixedForms.enrollItemCostPkId[0],
              name: fixedForms.name,
              mobile: fixedForms.mobile,
              insuranceImgs: [],
            }
            Toast.loading('提交中...', 0)
            uploadOneByOne(that.state.insuranceImgs).then(res => {
              fixedBody.insuranceImgs = res
              uploadImages(imagesFiles).then(res => {
                res.map(item => {
                  customForms[item.key] = item.value
                })
                let itemArray =[]
                for (let key in customForms) {
                  itemArray.push({
                    pkId: key,
                    value: customForms[key]
                  })
                }
                let body = {
                  ...fixedBody,
                  itemArray: itemArray
                }
                that.props.dispatch({type: 'activity/signUp', payload: body}).then(res => {
                  if (res && res.code === 200) {
                    Router.replace('/activity/detail', { pkId: this.props.location.query.evensId })
                    Toast.info(res.message, 2)
                  }
                  resolve()
                })
              })
            })
          } else {
            Toast.info('请勾选我已阅读并同意《赛事活动报名免责声明》')
            resolve()
          }
        }
      }
    })
  }

  insuranceImagePicker = (files) => {
    console.log(files)
    if (!checkImagesSize(files)) {
      this.setState({
        insuranceImgs: files
      })
      this.props.form.setFieldsValue({
        insuranceImgs: files
      })
    }
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
  enrollItemCostPkIdChange =(v)=> {
    console.log(v)
    this.props.form.setFieldsValue({
      enrollItemCostPkId: v
    })
    this.state.enrollItemCostList.map(item => {
      if (item.pkId === v[0]) {
        this.setState({
          itemCost: item.itemCost
        })
      }
    })
  }
  render() {
    const { activity } = this.props
    activity && activity.enrollItemCostList.length > 0 && activity.enrollItemCostList.map(item => {
      item.label = item.itemName
      item.value = item.pkId
    })
    const { getFieldProps } = this.props.form
    return (
      <div className='enrollment-page'>
        <NavBar
          mode='light'
          leftContent={<div>
            <IconSvg type='back'  size='sm' onClick={()=>Router.go(-1)}/>
            <BackToNativeHome onClick={()=>this.props.dispatch({ type:'index/backToNativeHome' })}/>
          </div>}
          rightContent=''
        >活动报名</NavBar>
        <WingBlank size="md" className='container form-container'>
          <List>
            <Picker
              data={activity.enrollItemCostList}
              cols={1}
              extra={<span className='placeholder'>请选择报名项目</span>}
              {...getFieldProps('enrollItemCostPkId',{
                initialValue: this.props.location.query.itemId ? [this.props.location.query.itemId] : activity.enrollItemCostList.length === 1 ? [activity.enrollItemCostList[0].pkId] : [],
              })}
              onChange={(v)=> this.enrollItemCostPkIdChange(v)}
            >
              <List.Item className='require' arrow={'horizontal'}>报名项目</List.Item>
            </Picker>
            <InputItem
              className='require'
              // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
              placeholder='请输入姓名'
              {...getFieldProps('name',{
                initialValue: activity && activity.signUpForm && activity.signUpForm.realName,
              })}
            >姓名</InputItem>
            <InputItem
              className='require'
              // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"/>}
              placeholder='请输入手机号'
              {...getFieldProps('mobile',{
                initialValue: activity && activity.signUpForm && activity.signUpForm.mobile,
              })}
            >手机号</InputItem>
            <CustomForms signFormArray={activity && activity.signUpForm && activity.signUpForm.signFormArray} ref={(form) => this.customForms = form}/>
            {/*<List.Item className='require'>*/}
            {/*  <div className='list-button'>*/}
            {/*    <span>保险购买</span>*/}
            {/*    <Button type="primary" size='small'>购买保险</Button>*/}
            {/*  </div>*/}
            {/*</List.Item>*/}
            {
              activity && activity.signUpForm && activity.signUpForm.insuranceRequired ?
                <List.Item className='require'>
                  保单上传
                  <List.Item.Brief>
                    <ImagePicker
                      multiple
                      files={this.state.insuranceImgs}
                      onChange={(v)=>this.insuranceImagePicker(v)}
                      onImageClick={(index, fs) => this.previewImage(fs, index)}
                      selectable={this.state.insuranceImgs.length < 3}
                      // accept="image/gif,image/jpeg,image/jpg,image/png"
                      accept="image/*"
                    />
                  </List.Item.Brief>
                  <InputItem
                    {...getFieldProps('insuranceImgs', {
                      initialValue: '',
                    })}
                    className={'hidden'}
                  />
                </List.Item>
                : ''
            }
          </List>
        </WingBlank>
        <div className='button-wrapper'>
          <div className='agree-checked-wrapper' onClick={() => this.setState({agree: !this.state.agree})}>
            <Checkbox checked={this.state.agree}/>
            <div className='agree-label'>
              我已阅读并同意 <span>《赛事活动报名免责声明》</span>
            </div>
          </div>
          <div
            className="btn-lg"
            onClick={() => {
              this.props.dispatch({ type: 'buriedPoint/qmjs_activity_applytry', payload: { objId: this.props.location.query.evensId }})
              alert('报名', this.state.itemCost>0 ? '本次报名需支付报名费' + this.state.itemCost +'元，成功报名后，报名人员将联系您进行支付，确定报名吗？' : '确定报名吗？', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                  text: '确定',
                  onPress: () =>
                    new Promise((resolve) => {
                      this.handleForm(activity.signUpForm).then(() => {
                        this.props.dispatch({ type: 'buriedPoint/qmjs_activity_apply_submit', payload: { objId: this.props.location.query.evensId }})
                        resolve()
                      })
                    }),
                },
              ])
            }}
          >立即报名</div>
        </div>
        {
          this.state.previewImageShow ? <WxImageViewer onClose={()=>this.setState({previewImageShow: false})} urls={this.state.previewImageList} index={this.state.previewImageIndex}/> : ''
        }
      </div>
    )
  }
}
export default createForm()(Enrollment)
