import React, { Component } from 'react'
import './index.less'
import { Picker, List, InputItem, DatePicker, ImagePicker, TextareaItem, Checkbox } from 'antd-mobile'
import { createForm } from 'rc-form'
import city from '@/assets/json/province_city_area.json'
import nation from '@/assets/json/nationality.json'
import { connect } from 'dva'
import WxImageViewer from 'react-wx-images-viewer'
import { compressImagesOneByOne, changeWxImagesOneByOne } from '@/utils/methons'

import { uploadImages, uploadFormOneByOne } from '@/utils/uploadImages'
import wx from 'weixin-js-sdk'

const CheckboxItem = Checkbox.CheckboxItem


@connect(({ activity }) => ({ activity }))
class EnrollCustomForms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFiles: {},
      previewImageShow: false,
      previewImageList: [],
      previewImageIndex: null
    }
  }
  componentDidMount() {

  }

  setImagePicker = (files, pkId) => {
    // this.props.form.setFieldsValue({
    //   [pkId]: files
    // })
    // this.setState({
    //   imageFiles:{
    //     [pkId]: files
    //   }
    // })
    console.log('files')
    console.log(files)
    let list = []
    files && files.map(item => {
      list.push({
        url: item.thumbnail
      })
    })
    console.log('list')
    console.log(list)
    return list
  }


  imagePickerChange = (files,operationType, pkId) => {
    if(operationType == 'remove') {
      this.state.imageFiles[pkId] = files
      this.setState({
        imageFiles: this.state.imageFiles
      })
      return false
    }
    let testFile = []
    let alreadyUploadImg = []
    files.map(item => {
      if(item.file) {
        testFile.push(item)
      }else {
        alreadyUploadImg.push(item)
      }
    })
    compressImagesOneByOne(files, 2).then(res => {
      uploadFormOneByOne(testFile).then(res => {
        res.map(item => {
          item.url = item.thumbnail
        })
        alreadyUploadImg = alreadyUploadImg.concat(res)
        this.props.form.setFieldsValue({
          [pkId]: alreadyUploadImg
        })
        this.state.imageFiles[pkId] = alreadyUploadImg
        this.setState({
          imageFiles: this.state.imageFiles
        })
      })
    })


   
  }
  previewImage =(image, index)=> {
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

  getImages =(pkId,maxImg)=> {
    let that = this
    this.props.dispatch({ type:'index/getWxConfig', payload: { url: window.location.href }}).then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appid, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名
        jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function(){
        wx.chooseImage({
          count: maxImg, // 默认9
          // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if(res.errMsg == 'chooseImage:ok' && res.localIds.length > 0) {
              changeWxImagesOneByOne(res.localIds, 2).then(res => {
                uploadFormOneByOne(res).then(res => {
                  res.map(item => {
                    item.url = item.thumbnail
                  })

                  let imgUrls = []
                  if(that.state.imageFiles[pkId]) {
                    imgUrls = that.state.imageFiles[pkId].concat(res)
                  }else {
                    imgUrls = res
                  }
                  that.props.form.setFieldsValue({
                    [pkId]: imgUrls
                  })
                  that.state.imageFiles[pkId] = imgUrls
                  that.setState({
                    imageFiles: that.state.imageFiles
                  })
                })
              })
            }
          }
        })
      })
    })
  }

  delImages =( index, pkId)=> {
    this.state.imageFiles[pkId].splice(index, 1)
    if(this.state.imageFiles[pkId].length == 0) {
      delete this.state.imageFiles[pkId]
    }
    this.setState({
      imageFiles: this.state.imageFiles
    })    
  }



  render() {
    const { activity } = this.props
    const { getFieldProps } = this.props.form
    let enrollFormData = null
    let formIndex = this.props.formIndex
    if(activity.enrollForm) {
      if(!this.props.canedit) {
        if(activity.enrollForm.formDatas) {
          enrollFormData = activity.enrollForm.formDatas[formIndex]
        }
      }else {
        if(activity.enrollForm.formFieldBos) {
          enrollFormData = activity.enrollForm.formFieldBos.length > 0 && activity.enrollForm.formFieldBos
        }
      }
    }
    const ua = window.navigator.userAgent.toLowerCase()
    const isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1 //android终端
    const isiOS = !!ua.match(/\(i[^;]+;( U;)? cpu.+mac os x/) //ios终端


    return (
      <div className='custom-forms'>
        <List>
          {
            enrollFormData && enrollFormData.map((item, index) => {
              return (
                <div key={index}>

                  {
                    item.type.value === 0 ?
                      !this.props.canedit && !item.expand.value ? '' :
                        <InputItem className={item.required? 'require' : ''}
                          placeholder={item.placeholder}
                          disabled={!this.props.canedit}
                          {...getFieldProps(item.pkId,{
                            initialValue: item.expand.value
                          })}
                          clear>
                          {item.labelName}
                        </InputItem>
                      : ''
                  }

                  {
                    item.type.value === 1  ?
                      !this.props.canedit && !item.expand.value ? '' :
                        <TextareaItem
                          className={item.required? 'require' : ''}
                          title={item.labelName}
                          placeholder={item.placeholder}
                          disabled={!this.props.canedit}
                          {...getFieldProps(item.pkId,{
                            initialValue: item.expand.value
                          })}

                          rows={3}
                        // autoHeight
                        />
                      : ''
                  }

                  {
                    item.type.value === 2  ?
                      !this.props.canedit && !item.expand.selectedItemIndex.length > 0 ? '' :
                        <Picker
                          data={item.expand.items}
                          cols={1}
                          disabled={!this.props.canedit}
                          {...getFieldProps(item.pkId,{
                            initialValue: item.expand.selectedItemIndex
                          })}
                        >
                          <List.Item className={item.required? 'require' : ''} arrow={!this.props.canedit ? '' : 'horizontal'}> {item.labelName}</List.Item>
                        </Picker>
                      : ''
                  }

                  {
                    item.type.value === 3  ?
                      !this.props.canedit && !item.expand.selectedItemIndex.length > 0 ? '' :
                        <List renderHeader={() => item.labelName}>
                          {item.expand.items.map((i,subindex) => (
                            <CheckboxItem
                              key={i.value}
                              disabled={!this.props.canedit}
                              className={!this.props.canedit ? 'disabled-checkbox-item' : ''}
                              {...getFieldProps(item.pkId + '[' + i.pkId + ']' ,{
                                initialValue: item.expand.selectedItemIndex.includes(i.itemIndex),
                                valuePropName: 'checked',
                              })}
                            >
                              {i.label}
                            </CheckboxItem>
                          ))}
                        </List>
                      : ''
                  }

                  {
                    item.type.value === 4  ?
                      !this.props.canedit && !item.expand.value ? '' :
                        <InputItem type='money' className={item.required? 'require' : ''}
                          placeholder={item.placeholder}
                          disabled={!this.props.canedit}
                          {...getFieldProps(item.pkId,{
                            initialValue: item.expand.value
                          })}
                          clear>
                          {item.labelName}
                        </InputItem>
                      : ''
                  }


                  {
                    item.type.value === 5  ?
                      !this.props.canedit && !item.expand.value ? '' :
                        <div>
                          <Picker
                            data={item.expand.items.filter(subitem => {return subitem.usedFlag})}
                            cols={1}
                            disabled={!this.props.canedit}
                            {...getFieldProps(item.pkId,{
                              initialValue: item.expand.selectedItemIndex
                            })}
                          >
                            <List.Item className={item.required? 'require' : ''} arrow={!this.props.canedit ? '' : 'horizontal'}> {item.labelName}</List.Item>
                          </Picker>
                          <InputItem className={item.required? 'require' : ''}
                            {...getFieldProps(item.pkId + '-card',{
                              initialValue: item.expand.value
                            })}
                            placeholder='请输入证件号'
                            disabled={!this.props.canedit}
                            clear>
                        证件号
                          </InputItem>
                        </div>


                      : ''
                  }
                  
                  {
                    item.type.value === 6  ?
                      !this.props.canedit && !item.expand.images.length > 0 ? '' :
                        <List.Item
                          className={item.required ? 'require' : ''}
                        >
                          {item.labelName}
                          <List.Item.Brief>
                            {
                              isAndroid? 
                                ua.match(/MicroMessenger/i) == 'micromessenger'  && this.props.canedit? 
                                  <div className='common-picker-row'>
                                    {
                                      this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId].map((imgitem, imgindex) => {
                                        return <div className='img-item' key={imgindex}>
                                          <img src={imgitem.url} onClick={()=>this.previewImage(this.state.imageFiles[item.pkId],imgindex)}></img>
                                          <div className='del' onClick={() =>this.delImages(imgindex, item.pkId)}>x</div>
                                        </div>
                                      })
                                    }
                                    {
                                      !this.state.imageFiles[item.pkId] && this.props.canedit ? 
                                        <div onClick={()=>this.getImages(item.pkId, 1)} className='addImg'>+</div>
                                        :
                                        ''
                                    }
                                  </div>
                                  :  <ImagePicker
                                    files={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId] : this.setImagePicker(item.expand.images, item.pkId)}
                                    onChange={(files,operationType) => this.imagePickerChange(files,operationType, item.pkId)}
                                    onImageClick={(index, fs) => this.previewImage(fs, index)}
                                    selectable={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId].length < 1 : false}
                                    accept="image/*"
                                    disableDelete={!this.props.canedit}
                                  /> : ''
                            }
                            {
                              isiOS? 
                                <ImagePicker
                                  files={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId] : this.setImagePicker(item.expand.images, item.pkId)}
                                  onChange={(files,operationType) => this.imagePickerChange(files,operationType, item.pkId)}
                                  onImageClick={(index, fs) => this.previewImage(fs, index)}
                                  selectable={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId].length < 1 : false}
                                  accept="image/*"
                                  disableDelete={!this.props.canedit}
                                /> : ''
                            }
                          </List.Item.Brief>
                          <InputItem
                            {...getFieldProps(item.pkId, {
                              initialValue: item.expand.images,
                            })}
                            className={'hidden'}
                          />
                        </List.Item>
                      : ''
                  }

                  {/* {
                    item.type.value === 6  ?
                      !this.props.canedit && !item.expand.images.length > 0 ? '' :
                      
                        <List.Item
                          className={item.required ? 'require' : ''}
                        >
                          {item.labelName}
                          <List.Item.Brief>
                            <ImagePicker
                              files={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId] : this.setImagePicker(item.expand.images, item.pkId)}
                              onChange={(files,operationType) => this.imagePickerChange(files,operationType, item.pkId)}
                              onImageClick={(index, fs) => this.previewImage(fs, index)}
                              selectable={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId].length < 1 : false}
                              accept="image/*"
                              disableDelete={!this.props.canedit}
                            />
                          </List.Item.Brief>
                          <InputItem
                            {...getFieldProps(item.pkId, {
                              initialValue: item.expand.images,
                            })}
                            className={'hidden'}
                          />
                        </List.Item>
                      : ''
                  } */}
                  {
                    item.type.value === 7  ?
                      !this.props.canedit && !item.expand.selectedItemIndex.length > 0 ? '' :
                        <div>
                          <Picker
                            data={city}
                            cols={3}
                            disabled={!this.props.canedit}
                            {...getFieldProps(item.pkId, {
                              initialValue: item.expand.selectedItemIndex || [],
                            })}
                            extra={<span className='placeholder'>{item.placeholder}</span>}>
                            <List.Item
                              className={item.required? 'require' : ''}
                              arrow={!this.props.canedit ? '' : 'horizontal'}>{item.labelName}</List.Item>
                          </Picker>
                          <InputItem className={item.required? 'require' : ''}
                            {...getFieldProps(item.pkId +'-detail',{
                              initialValue: item.expand.value
                            })}
                            disabled={!this.props.canedit}
                            placeholder='请输入详细地址'
                            clear>
                        详细地址
                          </InputItem>
                        </div>
                      : ''
                  }

                  {
                    item.type.value === 8  ?
                      !this.props.canedit && !item.expand.value ? '' :
                        <DatePicker
                          mode="date"
                          title=''
                          cols={1}
                          disabled={!this.props.canedit}
                          {...getFieldProps(item.pkId,{
                            initialValue: item.expand.value != '' ? new Date(parseInt(item.expand.value)) : ''
                          })}
                          minDate={new Date(1900, 1, 1, 0, 0, 0)}
                        >
                          <List.Item className={item.required? 'require' : ''} arrow={!this.props.canedit ? '' : 'horizontal'}> {item.labelName}</List.Item>
                        </DatePicker>
                      : ''
                  }

                  {
                    item.type.value === 9  ?
                      !this.props.canedit && !item.expand.value ? '' :
                        <InputItem className={item.required? 'require' : ''}
                          {...getFieldProps(item.pkId,{
                            initialValue: item.expand.value
                          })}
                          disabled={!this.props.canedit}
                          placeholder={item.placeholder}
                          clear>
                          {item.labelName}
                        </InputItem>
                      : ''
                  }

                  {
                    item.type.value === 10  ?
                      !this.props.canedit && !item.expand.selectedItemIndex.length > 0 ? '' :
                        <Picker
                          data={nation}
                          cols={1}
                          disabled={!this.props.canedit}
                          {...getFieldProps(item.pkId,{
                            initialValue: item.expand.selectedItemIndex
                          })}
                        >
                          <List.Item className={item.required? 'require' : ''} arrow={!this.props.canedit ? '' : 'horizontal'}> {item.labelName}</List.Item>
                        </Picker>
                      : ''
                  }
                  {
                    item.type.value === 11  ?
                      !this.props.canedit && !item.expand.images.length > 0 ? '' :
                        <List.Item
                          className={item.required ? 'require' : ''}
                        >
                          {item.labelName}
                          <List.Item.Brief>
                            {
                              ua.match(/MicroMessenger/i) == 'micromessenger'  && this.props.canedit? 
                                <div className='common-picker-row'>
                                  {
                                    this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId].map((imgitem, imgindex) => {
                                      return <div className='img-item' key={imgindex}>
                                        <img src={imgitem.url} onClick={()=>this.previewImage(this.state.imageFiles[item.pkId],imgindex)}></img>
                                        <div className='del' onClick={() =>this.delImages(imgindex, item.pkId)}>x</div>
                                      </div>
                                    })
                                  }
                                  {
                                    !this.state.imageFiles[item.pkId] && this.props.canedit ? 
                                      <div onClick={()=>this.getImages(item.pkId, 9)} className='addImg'>+</div>
                                      :
                                      ''
                                  }
                                  {
                                    this.state.imageFiles[item.pkId] && this.props.canedit && this.state.imageFiles[item.pkId].length < 9 ? 
                                      <div onClick={()=>this.getImages(item.pkId, 9)} className='addImg'>+</div>
                                      :
                                      ''
                                  }
                                </div>
                                :
                                <ImagePicker
                                  files={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId] : this.setImagePicker(item.expand.images, item.pkId)}
                                  onChange={(files, operationType) => this.imagePickerChange(files, operationType, item.pkId)}
                                  onImageClick={(index, fs) => this.previewImage(fs, index)}
                                  selectable={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId].length < 9 : false}
                                  // accept="image/gif,image/jpeg,image/jpg,image/png"
                                  accept="image/*"
                                  disableDelete={!this.props.canedit}
                                  multiple
                                />
                            }
                            
                          </List.Item.Brief>
                          <InputItem
                            {...getFieldProps(item.pkId, {
                              initialValue: item.expand.images,
                            })}
                            className={'hidden'}
                          />
                        </List.Item>
                      : ''
                  }

                  {/* {
                    item.type.value === 11  ?
                      !this.props.canedit && !item.expand.images.length > 0 ? '' :
                        <List.Item
                          className={item.required ? 'require' : ''}
                        >
                          {item.labelName}
                          <List.Item.Brief>
                            <ImagePicker
                              files={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId] : this.setImagePicker(item.expand.images, item.pkId)}
                              onChange={(files, operationType) => this.imagePickerChange(files, operationType, item.pkId)}
                              onImageClick={(index, fs) => this.previewImage(fs, index)}
                              selectable={this.props.canedit ?this.state.imageFiles[item.pkId] && this.state.imageFiles[item.pkId].length < 9 : false}
                              // accept="image/gif,image/jpeg,image/jpg,image/png"
                              accept="image/*"
                              disableDelete={!this.props.canedit}
                              multiple
                            />
                          </List.Item.Brief>
                          <InputItem
                            {...getFieldProps(item.pkId, {
                              initialValue: item.expand.images,
                            })}
                            className={'hidden'}
                          />
                        </List.Item>
                      : ''
                  } */}
                </div>
              )
            })
          }
        </List>
        {
          this.state.previewImageShow ? <WxImageViewer onClose={()=>this.setState({previewImageShow: false})} urls={this.state.previewImageList} index={this.state.previewImageIndex}/> : ''
        }
      </div>
    )
  }
}
export default createForm()(EnrollCustomForms)
