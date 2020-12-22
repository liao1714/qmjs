import {
  Button,
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  Switch,
  Cascader,
  Checkbox,
  Row,
  Col,
  InputNumber,
  Space
} from 'antd'
import React, {useEffect, useState} from 'react'
import { Editor } from '@tinymce/tinymce-react'
import UploadImages from '@/components/UploadImages'
import Tag from './Tag'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
import '../index.less'
import cityData from '@/assets/province_city_area/province_city_area.json'
import {connect,history} from 'umi'
import moment from 'moment'
import CustomForms from '@/components/CustomForms'
import {uploadImgThumbnail} from '@/services'

const EditorForm = ({ submitLoading, submitForm, dispatch, events: { tagList = [], eventsDetail = {} }, loading, formTemplate: { curChooseTemplateId, templateList, globalEditForm, changeTemplatedId } }) => {
  let [registerForm, setRegisterForm] = useState([])
  useEffect(() => {

    dispatch({
      type: 'events/tagList',
      payload: {tagName: ''} ,
    })
    // dispatch({
    //   type: 'formTemplate/findEditByIdTemplate',
    //   payload: {
    //     id: eventsDetail.enrollFormTemplatePkId
    //   }
    // })

    dispatch({
      type: 'formTemplate/setGlobalEditForm',
      payload: eventsDetail.formFieldBos
    })
  }, [])

  console.log(eventsDetail)

  const [childrenForm] = Form.useForm()
  const [form] = Form.useForm()



  let defaultActivityProject = []
  eventsDetail.enrollItemCostArray.map(item => {
    item.id = item.pkId
    defaultActivityProject.push(item)
  })


  let [activityProject, setActivityProject] = useState(defaultActivityProject)

  let [showCustomForms, setShowCustomForms] = useState(false)
  let [showAddTag, setShowAddTag] = useState(false)

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
  }
  const tailLayout = {
    wrapperCol: { offset: 3, span: 8 },
  }
  const handleEditorChange =(v)=>{
    console.log(v)
    form.setFieldsValue({
      content: v
    })
  }
  const getCoverImage =(result)=>{
    console.log(result)
    form.setFieldsValue({
      coverImage: result
    })
  }
  const getHeaderImage =(result)=>{
    console.log(result)
    form.setFieldsValue({
      headerImage: result
    })
  }
  const checkTitle = (rule, value, callback) => {
    if (value.length < 5 || value.length > 30) {
      callback(new Error('标题长度为5~30个字符!'))
    } else {
      callback()
    }
  }
  const headerImage = eventsDetail.headerImg && eventsDetail.headerImg.length > 0 ? [{
    id: eventsDetail.headerImg[0].id,
    url: eventsDetail.headerImg[0].thumbnail,
    originalImage: eventsDetail.headerImg[0].originalImage,
    thumbnail: eventsDetail.headerImg[0].thumbnail,
  }] : []
  const coverImage = eventsDetail.cover && eventsDetail.cover.length > 0 ? [{
    id: eventsDetail.cover[0].id,
    url: eventsDetail.cover[0].thumbnail,
    originalImage: eventsDetail.cover[0].originalImage,
    thumbnail: eventsDetail.cover[0].thumbnail,
  }] : []

  eventsDetail.modes.forEach(element => {
    if(element.type == 2) {
      element.condition.birthRange[0] = moment(Number(element.condition.minBirthday))
      element.condition.birthRange[1] = moment(Number(element.condition.maxBirthday))
    }
  })
  if( eventsDetail.conditions[0].limit.type != 2) {
    eventsDetail.conditions[0].limit.birthRange = []
  }else {
    eventsDetail.conditions[0].limit.maxAge = ''
    eventsDetail.conditions[0].limit.minAge = ''
    eventsDetail.conditions[0].limit.birthRange[0] = moment(Number(eventsDetail.conditions[0].limit.minBirthday))
    eventsDetail.conditions[0].limit.birthRange[1] = moment(Number(eventsDetail.conditions[0].limit.maxBirthday))
  }
  let enrollMethodData = [
    {
      type: 0,
      condition: {
        minNumber: 1,
        maxNumber: 1
      }
    },
    {
      type: 1,
      condition: {
        minNumber: '',
        maxNumber: ''
      }
    },
    {
      type: 2,
      condition: {
        minAge: '',
        maxAge: '',
        type: 0,
        birthRange: []
      }
    }
  ]
  eventsDetail.enrollMode = eventsDetail.modes.map(item => {
    return item.type.toString()
  })

  enrollMethodData = enrollMethodData.map((item) => {
    let index = eventsDetail.enrollMode.indexOf(item.type.toString())
    if(index > -1) {
      item = eventsDetail.modes[index]
      if(item.type == 2 ) {
        if(item.condition.type != 1) {
          item.condition.maxAge = ''
          item.condition.minAge = ''
        }
        if(item.condition.type != 2) {
          item.condition.birthRange = []
        }
      }
    }
    return item
  })
  form.setFieldsValue({
    eventsType: eventsDetail.eventsType.value,
    title: eventsDetail.title,
    tagPkId: eventsDetail.tag.pkId,
    intro: eventsDetail.intro,
    content: eventsDetail.content,
    coverImage: coverImage,
    headerImage: headerImage,
    enrollUpper: eventsDetail.enrollUpper,
    enrollTime: [moment(eventsDetail.enrollBeginTime), moment(eventsDetail.enrollEndTime)],
    eventsTime: [moment(eventsDetail.eventsBeginTime), moment(eventsDetail.eventsEndTime)],
    itemCostArray: eventsDetail.enrollItemCostArray,
    insuranceRequired: eventsDetail.insuranceRequired,
    eventsHotline: eventsDetail.eventsHotline,
    area: eventsDetail.area,
    address: eventsDetail.address,
    longitude: eventsDetail.longitude,
    latitude: eventsDetail.latitude,

    condition: eventsDetail.conditions,
    enrollMode: eventsDetail.enrollMode,
    enrollMethodData: enrollMethodData,
    pkId: eventsDetail.pkId,
    // registerForm: eventsDetail.formFieldBos,
    templatePkId: eventsDetail.enrollFormTemplatePkId,

    modes: eventsDetail.modes,
    registerForm: globalEditForm

  })
  //检测报名人年龄是否填写
  const checkEnrollAge = (rule, value, callback) => {
    if(form.getFieldValue('condition')[0].limit.type == 1 ) {
      if (value == '' ) {
        callback(new Error('请填写年龄'))
      } else {
        callback()
      }
    }else {
      callback()
    }
  }
  const checkGroupNumber = (rule, value, callback) => {
    let index = form.getFieldValue('enrollMode').indexOf('1')
    if(index > -1) {
      if (value === '' ) {
        callback(new Error('请填写人数'))
      } else {
        callback()
      }
    }else {
      callback()
    }
  }

  const checkBirthday = (rule, value, callback) => {
    if(form.getFieldValue('condition')[0].limit.type === 2 ) {
      if (value === [] ) {
        callback(new Error('请输入日期'))
      } else {
        callback()
      }
    }else {
      callback()
    }
  }

  const checkBirthDate = (rule, value, callback) => {
    let index = form.getFieldValue('enrollMode').indexOf('2')
    if(index > -1) {
      console.log(form.getFieldValue('enrollMethodData')[index])
      let chooseRadioIndex = form.getFieldValue('enrollMode')[index]
      if(form.getFieldValue('enrollMethodData')[chooseRadioIndex].condition.type === 2) {
        if (value === '' ) {
          callback(new Error('请选择日期'))
        } else {
          callback()
        }
      }else {
        callback()
      }
    }else {
      console.log('没有勾选')
      callback()
    }
  }

  //检测家庭报名中的儿童年龄是否填写
  const checkChildrenAge = (rule, value, callback) => {
    //有勾选家庭报名
    console.log('form.getFieldValue')
    console.log(form.getFieldValue('enrollMode').indexOf('2'))
    let index = form.getFieldValue('enrollMode').indexOf('2')
    if(index > -1) {
      console.log(form.getFieldValue('enrollMethodData')[index])
      let chooseRadioIndex = form.getFieldValue('enrollMode')[index]
      if(form.getFieldValue('enrollMethodData')[chooseRadioIndex].condition.type == 1) {
        if (value == '' ) {
          callback(new Error('请填写年龄'))
        } else {
          callback()
        }
      }else {
        callback()
      }
    }else {
      console.log('没有勾选')
      callback()
    }
  }

  const chooseTemplate = () => {
    form.setFieldsValue({
      'registerForm': globalEditForm
    })
    setShowCustomForms(true)
    let templatePkId = form.getFieldValue('templatePkId')
    // let registerForm = form.getFieldValue('registerForm');
    dispatch({
      type: 'formTemplate/setCurChooseTemplate',
      payload: form.getFieldValue('templatePkId')
    })
    dispatch({
      type: 'formTemplate/setChangeTemplateId',
      payload: form.getFieldValue('templatePkId')
    })
    dispatch({
      type: 'formTemplate/findByIdTemplate',
      payload: {
        id: form.getFieldValue('templatePkId')
      }
    }).then(res => {
      if(!res.data.formFieldBos) {
        res.data.formFieldBos = []
      }
      childrenForm.setFieldsValue({
        'formComponentList': [...res.data.formFieldBos],
      })
    })
  }

  const confirmCustomForm  = () => {
    setShowCustomForms(false)
    dispatch({
      type: 'formTemplate/findEditByIdTemplate',
      payload: {
        id: changeTemplatedId
      }
    }).then(res => {
      if(res.code == 200) {
        res.data.formFieldBos = res.data.formFieldBos ? res.data.formFieldBos : []
        setRegisterForm(res.data.formFieldBos)
        form.setFieldsValue({
          'templatePkId' : changeTemplatedId,
          'registerForm': res.data.formFieldBos
        })
      }
    })
  }
  return (
    <Form
      form={form}
      {...formItemLayout}
      className='activity-events-create'
      name="basic"

    >
      <Form.Item
        name="eventsType"
        label="类型"
        rules={[{ required: true, message: '请选择类型!' }]}
      >
        <Radio.Group>
          <Radio value={0}>活动</Radio>
          {/*<Radio value={1}>赛事</Radio>*/}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="标题"
        name="title"
        rules={[
          { required: true, message: '请输入标题!'  },
          { validator: checkTitle }
        ]}
      >
        <Input maxLength={30} minLength={5}/>
      </Form.Item>
      <Form.Item
        label="运动标签"
        name="tagPkId"
        rules={[{ required: true, message: '请选择运动标签!' }]}
      >
        <div className='form-item-inline'>
          <Form.Item name="tagPkId" style={{marginBottom: 0}}>
            <Select>
              {
                tagList && tagList.map((item, index)=>(
                  <Select.Option key={index} value={item.pkId}>{item.tagName}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Button style={{marginLeft: '10px'}} type="primary" icon={<PlusOutlined />} onClick={()=>setShowAddTag(true)}>添加标签</Button>
        </div>
      </Form.Item>
      {/*<Form.Item*/}
      {/*  label="内容简介"*/}
      {/*  name="intro"*/}
      {/*  rules={[{ required: true, message: '请输入内容简介!' }]}*/}
      {/*>*/}
      {/*  <Input.TextArea />*/}
      {/*</Form.Item>*/}
      <Form.Item
        wrapperCol={{span: 22}}
        label="内容详情"
        name="content"
        rules={[{ required: true, message: '请输入内容详情!' }]}
      >
        <Editor
          initialValue={eventsDetail.content}
          init={{
            branding: false,
            language: 'zh_CN',
            height: 500,
            menubar: false,
            fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20tp 22pt 24pt 28pt 36pt',
            plugins: 'lists image colorpicker textcolor wordcount contextmenu preview print lineheight indent2em',
            toolbar: 'code lineheight | preview | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink image  | removeformat | indent2em | fontsizeselect | fontselect',
            images_upload_handler: (blobInfo, success, failure) => {
              // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
              // success(img)
              const formData = new FormData()
              formData.append('files', blobInfo.blob())
              uploadImgThumbnail(formData).then((res) => {
                if(res.code == 200) {
                  const {data = []} = res
                  if(data.length > 0) {
                    let contentImgIds = form.getFieldValue('contentImgIds') || []
                    contentImgIds.push(data[0].id)
                    form.setFieldsValue({
                      contentImgIds: contentImgIds
                    })
                    success(data[0].originalImage)
                  }else {
                    failure('上传成功，但是没有返回数据!')
                  }
                }else {
                  failure('上传失败')
                }
              })
            },
          }}
          onEditorChange={handleEditorChange}
        />
        <Input.TextArea style={{display: 'none'}}/>
      </Form.Item>
      <Form.Item
        label="封面图片"
        name="coverImage"
        rules={[{ required: true, message: '请选择封面图片!' }]}
      >
        <UploadImages getImageList={ getCoverImage } fileList={coverImage} aspect={646/240}/>
        <div className='form-info'>最佳尺寸：646*240px ，支持JPG、PNG、GIF。</div>
      </Form.Item>
      <Form.Item
        label="头部图片"
        name="headerImage"
        rules={[{ required: true, message: '请选择头部图片!' }]}
      >
        <UploadImages getImageList={ getHeaderImage } fileList={headerImage} aspect={750/600}/>
        <div className='form-info'>最佳尺寸：750*600px ，支持JPG、PNG、GIF。</div>
      </Form.Item>
      <Form.Item
        wrapperCol={{span: 4}}
        label="报名人数上限"
        name="enrollUpper"
      >
        <Input placeholder={'未填则为不限制'} suffix="人"/>
      </Form.Item>
      <Form.Item  label="报名人性别限制" name={['condition',0, 'sex'] } >
        <Radio.Group>
          <Row>
            <Col >
              <Radio value={0} >不限制</Radio>
            </Col>
            <Col >
              <Radio value={2} >男</Radio>
            </Col>
            <Col >
              <Radio value={1} >女</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>
      <Form.Item  name={['condition', 0, 'limit', 'type'] } label="报名人年龄限制" style={{ marginBottom: '0' }}>
        <Radio.Group>
          <div style={{display: 'flex',flexDirection: 'row'}}>
            <Radio value={0} style={{ marginTop: '3px'}}>不限制</Radio>
            <Radio value={1} style={{ marginTop: '3px'}}>限制年龄</Radio>
            <div className="ageInp">
              <Input.Group compact >
                <Form.Item name={['condition', 0, 'limit', 'minAge'] } style={{marginBottom: 0, width: '85px'}}
                  rules={[
                    {required: false,  message: ''  },
                    { validator: checkEnrollAge }
                  ]}
                >
                  <InputNumber min={1} max={200}  />
                  {/* <Input /> */}
                </Form.Item>
                <span style={{marginLeft: '10px', marginRight: '10px'}}> 一 </span>
                <Form.Item name={['condition', 0, 'limit', 'maxAge'] }  style={{marginBottom: 0, width: '85px'}}
                  rules={[
                    {required: false,  message: ''  },
                    { validator: checkEnrollAge }
                  ]}
                >
                  <InputNumber min={1} max={200}  />
                  {/* <Input /> */}
                </Form.Item>
              </Input.Group>
            </div>
            <Radio value={2} style={{ marginTop: '3px',marginLeft: '10px'}}>限制生日</Radio>
            <Form.Item
              rules={[
                {required: false,  message: ''  },
                { validator: checkBirthday }
              ]}
              name={['condition', 0, 'limit', 'birthRange'] }>
              <RangePicker placeholder={['开始日期', '结束日期']} showTime format="YYYY-MM-DD" />
            </Form.Item>
          </div>
        </Radio.Group>
      </Form.Item>
      <Form.Item className="enrollMethod" name={['enrollMode']} label="报名方式"  labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}>
        <Checkbox.Group>
          <Row>
            <Col span={4}>
              <Checkbox value="0" style={{ lineHeight: '32px' }}>
                单人报名（仅限登录本人报名）
              </Checkbox>
              <Form.Item name={['enrollMethodData', 0, 'type'] }  hidden>
                <Input />
              </Form.Item>
              <Form.Item name={['enrollMethodData', 0, 'condition', 'minNumber'] }  hidden>
                <Input />
              </Form.Item>
              <Form.Item name={['enrollMethodData', 0, 'condition', 'maxNumber'] }  hidden>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} className="teamItem">
              <Checkbox value="1"  >
                团队报名（每个团队人数范围
                <div className="groupInp" >
                  <Input.Group compact >
                    <Form.Item
                      rules={[
                        {required: false,  message: ''  },
                        { validator: checkGroupNumber }
                      ]}
                      name={['enrollMethodData', 1 , 'condition', 'minNumber'] } style={{marginBottom: 0, width: '85px'}}   >
                      {/* <Input /> */}
                      <InputNumber min={1} max={200}  />
                    </Form.Item>
                    <span style={{marginLeft: '10px', marginRight: '10px'}}> 一 </span>
                    <Form.Item
                      rules={[
                        {required: false,  message: ''  },
                        { validator: checkGroupNumber }
                      ]}
                      name={['enrollMethodData',1 , 'condition', 'maxNumber'] }  style={{marginBottom: 0, width: '85px'}}>
                      {/* <Input /> */}
                      <InputNumber min={1} max={200}  />
                    </Form.Item>
                  </Input.Group>
                </div>）
              </Checkbox>
              <Form.Item name={['enrollMethodData', 1, 'type'] }  hidden>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8} ></Col>
            <Col span={24} style={{marginTop: '20px'}}>
              <div style={{display: 'flex',alignItems: 'center'}}>
                <Checkbox value="2" style={{width: '100px'}}>
                    家庭报名
                </Checkbox>
                <Form.Item name={['enrollMethodData', 2, 'type'] }  hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['enrollMethodData',2 , 'condition', 'type'] } style={{marginBottom: '0px'}}>
                  <Radio.Group >
                    <div className="familyItem" >
                      <span style={{marginLeft: '5px',color: 'gray'}}>儿童年龄限制:</span>
                      <Radio value={0} >不限制</Radio>
                      <Form.Item name={['enrollMethodData', 2, 'condition', 'minAge'] }  hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item name={['enrollMethodData', 2, 'condition', 'maxAge'] }  hidden>
                        <Input />
                      </Form.Item>
                      <Radio value={1}>限制年龄</Radio>
                      <div className="familyInp">
                        <Input.Group compact  style={{display: 'flex', alignItems: 'center'}}>
                          <Form.Item
                            rules={[
                              {required: false,  message: ''  },
                              { validator: checkChildrenAge }
                            ]}
                            name={['enrollMethodData', 2, 'condition', 'minAge'] } style={{marginBottom: 0, width: '85px'}}   >
                            {/* <Input /> */}
                            <InputNumber min={1} max={200}  />
                          </Form.Item>
                          <span style={{marginLeft: '10px', marginRight: '10px'}}> 一 </span>
                          <Form.Item
                            rules={[
                              {required: false,  message: ''  },
                              { validator: checkChildrenAge }
                            ]}
                            name={['enrollMethodData', 2, 'condition', 'maxAge'] }  style={{marginBottom: 0, width: '85px'}}>
                            {/* <Input /> */}
                            <InputNumber min={1} max={200}  />
                          </Form.Item>
                          <span style={{marginLeft: '10px'}}>岁</span>
                        </Input.Group>
                      </div>
                      <Radio value={2} style={{marginLeft: '10px'}} >限制出生日期</Radio>
                      <Form.Item
                        style={{marginBottom: '0px'}}
                        rules={[
                          {required: false,  message: ''  },
                          { validator: checkBirthDate }
                        ]}
                        name={['enrollMethodData', 2, 'condition', 'birthRange'] }>
                        <RangePicker placeholder={['开始日期', '结束日期']} showTime format="YYYY-MM-DD" />
                      </Form.Item>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name="enrollTime"
        label="报名起止时间"
        rules= {[{ type: 'array', required: true, message: '请选择报名起止时间!' }]}
      >
        <RangePicker placeholder={['开始时间', '结束时间']} showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item
        name="eventsTime"
        label="活动起止时间"
        rules= {[{ type: 'array', required: true, message: '请选择活动起止时间!' }]}
      >
        <RangePicker placeholder={['开始时间', '结束时间']} showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item
        wrapperCol={{span: 20}}
        label="活动项目"
      >
        <div className='activity-project'>
          <Form.List name="itemCostArray">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} className='activity-project-item'>
                    <Form.Item
                      {...field}
                      wrapperCol={{span: 18}}
                      labelCol={{span: 6}}
                      label="项目"
                      name={[field.name, 'itemName']}
                      fieldKey={[field.fieldKey, 'itemName']}
                      rules={[{ required: true, message: '请输入活动项目!' }]}
                    >
                      <Input placeholder="请输入活动项目" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      wrapperCol={{span: 18}}
                      labelCol={{span: 6}}
                      label="费用"
                      name={[field.name, 'itemCost']}
                      fieldKey={[field.fieldKey, 'itemCost']}
                    >
                      <Input placeholder={'未填则为免费报名'} suffix="（元/人）"/>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      wrapperCol={{span: 18}}
                      labelCol={{span: 6}}
                      label="人数"
                      name={[{...field}.name, 'enrollUpper']}
                      fieldKey={[{...field}.fieldKey, 'enrollUpper']}
                    >
                      <Input placeholder={'未填则为不限制'}/>
                    </Form.Item>
                    {
                      index > 0 ?
                        <MinusCircleOutlined
                          onClick={() => {
                            remove({...field}.name)
                          }}
                        />
                        : <span className='anticon'/>
                    }
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    add()
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined />添加活动项目
                </Button>
              </>
            )}
          </Form.List>
        </div>
      </Form.Item>
      <Form.Item
        label="需要购买保险"
        rules= {[{ required: true, message: '请选择是否需要购买保险!' }]}
        name="insuranceRequired"
        valuePropName="checked"
      >
        <Switch checkedChildren="是" unCheckedChildren="否"/>
      </Form.Item>
      <Form.Item
        label="报名咨询电话"
        name="eventsHotline"
      >
        <Input placeholder={'若为座机请加上区号，如：0592-1000000'}/>
      </Form.Item>
      <Form.Item
        label="活动所属地区"
        name="area"
      >
        <Cascader options={cityData}/>
      </Form.Item>
      <Form.Item
        label="活动详细地址"
        name="address"
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{span: 4}}
        label="地址经度"
        name="longitude"
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{span: 4}}
        label="地址纬度"
        name="latitude"
      >
        <Input />
      </Form.Item>
      <Form.Item name= "templatePkId"  hidden  >
        <Input />
      </Form.Item>
      <Form.Item name= "modes"  hidden  >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{span: 20}}
        label="报名表单信息"
        // rules= {[{ required: true, message: '请输入报名表单信息!' }]}
        name={'registerForm'}
      >
        <div className='register-form'>
          {
            globalEditForm.map((item, index)=> (
              <div key={index} className='register-form-item'>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Form.Item
                    label="报名项名称"
                    name={['registerForm', index, 'labelName']}>
                    <Input readOnly={!item.delete} placeholder={item.title}/>
                  </Form.Item>
                  {
                    item.fixedFlag ? '' :
                      !item.expand.hasOwnProperty('items') ? '' :
                        <div className="subItems">
                          {
                            item.expand.items.map((subitem,subindex) => {
                              return  <Form.Item key={'subitem' +subindex}
                                label={
                                  <span>
                                    <div  className={item.type.value == 2 ? 'round' : 'square'}>
                                    </div>
                                  </span>
                                }
                                name={['registerForm', index, 'expand','items',subindex,'item']}>
                                <Input readOnly={!item.delete} placeholder={item.title}/>
                              </Form.Item>
                            })
                          }
                        </div>
                  }
                </div>
                <Form.Item
                  wrapperCol={{span: 17}}
                  labelCol={{span: 7}}
                  label="是否必填"
                  name={['registerForm', index, 'required']}
                  valuePropName="checked"
                >
                  <Switch disabled={!item.delete} checkedChildren="是" unCheckedChildren="否"/>
                </Form.Item>
              </div>
            ))
          }
          <Form.Item style={{marginBottom: 0}}>
            <Button type="primary" style={{marginLeft: '130px'}} onClick={()=>chooseTemplate()}>设置报名表单</Button>
          </Form.Item>
        </div>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button style={{marginRight: '20px'}} type="primary" loading={submitLoading} htmlType="submit" onClick={()=>submitForm(form, 1)}>保存</Button>
        <Button type="default" onClick={()=>history.go(-1)}>返回</Button>
      </Form.Item>
      {
        showAddTag ?
          <Tag showAddTag={showAddTag} hideAddTag={()=>setShowAddTag(false)}/>
          : ''
      }
      <CustomForms showCustomForms={showCustomForms} hideCustomForms={()=>setShowCustomForms(false)} confirmCustomForm={()=>confirmCustomForm()} childrenForm={childrenForm}  />
    </Form>
  )
}
export default connect(({ events, loading, formTemplate  }) => ({
  events,
  loading: loading.models.events,
  formTemplate
}))(EditorForm)
