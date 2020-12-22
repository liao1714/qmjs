import React, { useState, useEffect, useRef } from 'react'
import { Modal, Tag, Input, message, Button, Form, Radio, Row, Col, Divider, Checkbox, Switch } from 'antd'
import { connect } from 'umi'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import './index.less'

const CustomForms = ({
  hideCustomForms,
  confirmCustomForm,
  showCustomForms,
  dispatch,
  formTemplate: { templateList, curChooseTemplateId, changeTemplatedId, commonTemplateField, formComponentList },
  childrenForm,
}) => {

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [showAddEditForm, setShowAddEditForm] = useState(false)
  const [showConfirmForm, setShowConfirmForm] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [curTemplateId, setCurTemplateId] = useState('')//保存当前是否确定删除的模板ID

  let commonData = JSON.parse(JSON.stringify(commonTemplateField))
  commonData.forEach(element => {
    element.type = element.type.value
  })
  const commonFields = commonData
  const customFields = [
    {
      type: {
        value: 0,
        name: '单行文本'
      },
      labelName: '',
      placeholder: '',
      required: true,
      sequence: 0,
      editable: true,
      editLabel: true,
      expand: {
        value: '',
        vaildType: 0,
        maxLength: 50,
        minLength: 1,
        errorMsg: '只允许1-50个字符'
      },
      btName: '单行文本',
      fixedFlag: false
    },
    {
      type: {
        value: 1,
        name: '多行文本'
      },
      labelName: '',
      placeholder: '',
      required: true,
      sequence: 0,
      editable: true,
      editLabel: true,
      expand: {
        value: '',
        vaildType: 0,
        maxLength: 50,
        minLength: 1,
        errorMsg: '只允许1-50个字符'
      },
      btName: '多行文本',
      fixedFlag: false
    },

    {
      type: {
        value: 2,
        name: '单选'
      },
      labelName: '',
      placeholder: '',
      required: true,
      sequence: 0,
      editable:true,
      editLabel:true,
      expand:{
        items:[{
          item: '',
          itemIndex:0
        },{
          item: '',
          itemIndex:1
        }
        ],
        selectedItemIndex:[]
      },
      btName: '单选',
      fixedFlag: false
    },

    {
      type: {
        value: 3,
        name: '多选'
      },
      labelName: '',
      placeholder: '',
      required: true,
      sequence: 0,
      editable:true,
      editLabel:true,
      expand:{
        items:[{
          item: '',
          itemIndex:0
        },{
          item: '',
          itemIndex:1
        }
        ],
        selectedItemIndex:[0]
      },
      btName: '多选',
      fixedFlag: false
    },

    // {
    //   type: {
    //     value: 6,
    //     name: '单图'
    //   },
    //   labelName: '单图',
    //   placeholder: '',
    //   required: true,
    //   sequence: 0,
    //   editable:true,
    //   editLabel:true,
    //   expand:{
    //     vaildType: 5,
    //     images:[
    
    //     ],
    //     errorMsg: '图片不允许超过一张'
    //   },
    //   btName: '单图',
    //   fixedFlag: false
    // },
    
    // {
    //   type: {
    //     value: 11,
    //     name: '多图'
    //   },
    //   labelName: '多图',
    //   placeholder: '',
    //   required: true,
    //   sequence: 0,
    //   editable:true,
    //   editLabel:true,
    //   expand:{
    //     vaildType: 10,
    //     images:[
    
    //     ],
    //     errorMsg: '图片不允许超过9张'
    //   },
    //   btName: '多图',
    //   fixedFlag: false
    // },
  ]

  const form = childrenForm
  const submitForm = (form) => {
    form
      .validateFields()
      .then((res) => {
        console.log('res')
        console.log(res)
        setConfirmLoading(true)
        if(JSON.stringify(res) !== '{}') {
          res.formComponentList.forEach(item => {
            if(item.type.hasOwnProperty('value')) {
              item.type = item.type.value
            }
          })
        }else {
          res.formComponentList = []
        }
        dispatch({
          type: 'formTemplate/EditTemplate',
          payload: {
            id: changeTemplatedId,
            formTemplateFields: res.formComponentList,
          }
        }).then((res) => {
          setConfirmLoading(false)
          if (res && res.code === 200) {
            message.success(res.message)
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const isRepeat=(arr, field)=>{
    let hash = {}
    for(let i in arr) {
      if(arr[i][field] != ''){
        if(hash[arr[i][field]])
          return true
        hash[arr[i][field]] = true
      }
    }
    return false
  }

  /**
   * 光标离开检测重复
   * @param {index}  数组索引
   * @param {type}  输入框类型，1是一级输入框，2是二级输入框，如性别下的 男女
   * @param {subIndex}
   */
  const inputOnBlur =(index, type = 1, subIndex = '')=>{
    let formData = form.getFieldValue('formComponentList')
    if(type == 1) {
      if(isRepeat(form.getFieldValue('formComponentList'), 'labelName')) {
        formData[index].labelName = ''
        message.error('表单组件标题重复，请重新填写')
      }
    }else if(type == 2) {
      if(formData[index].expand.items[subIndex].item != '') {
        if(isRepeat(formData[index].expand.items,'item')) {
          formData[index].expand.items[subIndex].item = ''
          message.error('子组件标题重复，请重新填写')
        }
      }
    }
    form.setFieldsValue({
      'formComponentList': formData
    })

    setTimeout( dispatch({
      type: 'formTemplate/setComponentsList',
      payload: formData
    }), 100)
  }

  /**
   * 删除组件项
   * @param {*} index
   */
  const delFormItem =(index)=>{
    let LIST = [...form.getFieldValue('formComponentList')]
    LIST.splice(index,1)
    LIST.forEach((element, index) => {
      element.sequence = index
    })
    form.setFieldsValue({
      formComponentList: LIST,
    })
    setTimeout( dispatch({
      type: 'formTemplate/setComponentsList',
      payload: LIST
    }), 100)
  }

  const [addEditForm] = Form.useForm()
  const handleClose = () => {}
  const handleAddEditForm = () => {
    addEditForm.validateFields().then((res) => {
      console.log(res)
      dispatch({
        type: 'formTemplate/addTemplate',
        payload: {
          name: res.name,
        },
      }).then((res) => {
        if (res && res.code === 200) {
          message.success(res.message)
          setShowAddEditForm(false)
          dispatch({
            type: 'formTemplate/templateQuery',
            payload: {},
          })
        }
      })
    })
  }
  const handleShowAddEditForm = () => {
    console.log('templateList')
    console.log(templateList)
    setShowAddEditForm(true)
    addEditForm.resetFields()
  }

  const onChange = (e) => {
    dispatch({
      type: 'formTemplate/setChangeTemplateId',
      payload: e.target.value
    })
    dispatch({
      type: 'formTemplate/findByIdTemplate',
      payload: {
        id: e.target.value
      }
    }).then(res => {
      if(!res.data.formFieldBos) {
        res.data.formFieldBos = []
      }
      form.setFieldsValue({
        'formComponentList': [...res.data.formFieldBos],
      })
    })
  }

  const handleShowConfirmForm = (type, pkId) => {
    let modalMessage = ''
    if (type == 1) {
      modalMessage = '确定删除该模版'
    }
    setCurTemplateId(pkId)
    setConfirmMessage(modalMessage)
    setShowConfirmForm(true)
  }

  const confirmDelTemplate = () => {
    dispatch({
      type: 'formTemplate/delFormTemplate',
      payload: {
        id: curTemplateId,
      },
    }).then((res) => {
      if (res && res.code === 200) {
        message.success(res.message)
        setShowConfirmForm(false)
        dispatch({
          type: 'formTemplate/templateQuery',
          payload: {},
        }).then(result => {
          console.log('result')
          console.log(result)
          if(result.data.length > 0) {
            //删除当前选中的模板时
            if(curTemplateId == curChooseTemplateId) {
              console.log('删除当前选中的模板时')
              result.data[0].formFieldBos = result.data[0].formFieldBos ? result.data[0].formFieldBos : []

              //更新 当前选择的模板ID为默认第一项
              dispatch({
                type: 'formTemplate/setCurChooseTemplate',
                payload: result.data[0].id
              })
              form.setFieldsValue({
                formComponentList: result.data[0].formFieldBos,
              })
              setTimeout( dispatch({
                type: 'formTemplate/setComponentsList',
                payload: result.data[0].formFieldBos
              }), 100)
            }
            console.log('大于0')

          }
        })
      }
    })
  }

  //点击表单按钮,常用/自定义,type：1是常用表单，2是自定义表单
  const tapComponent = (item , type) => {
    console.log(item)
    if(type == 1) {
      let isSet = false
      if(form.getFieldValue('formComponentList') && form.getFieldValue('formComponentList').length > 0) {
        form.getFieldValue('formComponentList').forEach(element => {
          if(item.labelName == element.labelName) {
            isSet = true
            return false
          }
        })
      }
      if(isSet) {
        message.error('已经存在相同的表单项了')
        return false
      }
    }
    let LIST = form.getFieldValue('formComponentList') ? [...form.getFieldValue('formComponentList')] : []
    item.sequence = LIST.length

    if(typeof item.type != 'object') {
      let x = item.type
      item.type = {}
      item.type.value = x
    }

    LIST.push(item)
    form.setFieldsValue({
      'formComponentList': LIST
    })

    dispatch({
      type: 'formTemplate/setComponentsList',
      payload: LIST
    })
    setTimeout(function () {
      if (document.getElementById('scrollDiv') && document.getElementById('contentDiv')) {
        const divHeight = document.getElementById('contentDiv').offsetHeight
        const clientHeight = document.body.clientHeight * 0.7 - 139
        const scrollTop = divHeight - clientHeight
        console.log(divHeight)
        console.log(clientHeight)
        console.log(scrollTop)
        document.getElementById('scrollDiv').scrollTop = scrollTop > 0 ? scrollTop : 0
      }
    }, 0)
  }

  /**
   * 新增一项子项
   * @param {*} index
   */
  const addSubItem =(index)=> {
    let LIST = [...form.getFieldValue('formComponentList')]
    LIST[index].expand.items.push({
      item: '',
      itemIndex: LIST[index].expand.items.length
    })
    form.setFieldsValue({
      'formComponentList': LIST
    })

    setTimeout( dispatch({
      type: 'formTemplate/setComponentsList',
      payload: LIST
    }), 100)
  }

  const deleteSubItem =(index, subIndex)=> {
    console.log('deleteSubItem')
    let LIST = [...form.getFieldValue('formComponentList')]
    LIST[index].expand.items.splice(subIndex, 1)
    LIST[index].expand.items.forEach((element, index) => {
      element.itemIndex = index
    })
    form.setFieldsValue({
      'formComponentList': LIST
    })
    setTimeout( dispatch({
      type: 'formTemplate/setComponentsList',
      payload: LIST
    }), 100)
  }

  const strlen =(str)=> {
    var len = 0
    for (var i=0; i<str.length; i++) {
      var c = str.charCodeAt(i)
      //单字节加1
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
        len++
      }
      else {
        len+=2
      }
    }
    return len
  }

  return (
    <Modal
      className="custom-forms-wrapper"
      title="设置报名表单"
      centered
      width={1300}
      visible={showCustomForms}
      onCancel={hideCustomForms}
      footer={null}
    >
      <div className="custom-forms-container">
        <div className="custom-forms-list">
          <div className="custom-forms-list-add">
            <Button icon={<PlusOutlined />} className={'line-button'} onClick={() => handleShowAddEditForm()}>
              新增报名模板
            </Button>
          </div>
          <div className="custom-forms-list-wrapper">
            <div className="templateList">
              <Radio.Group onChange={onChange} value={changeTemplatedId}>
                {templateList.map((item, index) => (
                  <div className="templateList-item" key={'radio'+ index} style={{display: 'flex',alignItems: 'center'}}>
                    <Radio value={item.id}>{item.name}</Radio>
                    <Button type="text" onClick={() => handleShowConfirmForm(1, item.id)}>删除</Button>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="custom-forms-main">
          <Row>
            <Col span={12}>
              <div className="custom-forms-main-header">报名项名称</div>
            </Col>
            <Col span={4}>
              <div className="custom-forms-main-header">是否必填</div>
            </Col>
            <Col span={8}>
              <div className="custom-forms-main-header">操作</div>
            </Col>
          </Row>
          <Form name="basic" form={form}
            initialValues={{
              'formComponentList': formComponentList
            }}>
            <div className="content" id={'scrollDiv'}>
              <div id={'contentDiv'}>
                {
                  formComponentList && formComponentList.length > 0 &&
                  formComponentList.map((item, index) => {
                    if(!item.expand.hasOwnProperty('items')) {
                      return <Form.Item  style={{ marginBottom: 0 }} key={index}  >
                        <Row>
                          <Col span={12}>
                            <div className="item">
                              <Form.Item name={['formComponentList', index, 'labelName']}  rules={[{ required: true, message: item.placeholder }]}>
                                <Input placeholder={item.placeholder} disabled={!item.editLabel}  onBlur={() => inputOnBlur(index)}/>
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'type'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'placeholder'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'sequence'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'editable'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'editLabel'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'expand'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'fixedFlag'] }  hidden>
                                <Input />
                              </Form.Item>
                            </div>
                          </Col>
                          <Col span={4}>
                            <div className="item">
                              <Form.Item name={['formComponentList', index, 'required']} valuePropName="checked">
                                <Switch checkedChildren="是" unCheckedChildren="否"  />
                              </Form.Item>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="custom-forms-main-content" style={{cursor: 'pointer'}} onClick={() => delFormItem(index)}>删除</div>
                          </Col>
                        </Row>
                      </Form.Item>
                    }else {
                      return <Form.Item  style={{ marginBottom: 0 }} key={index}>
                        <Row>
                          <Col span={12}>
                            <div className="item">
                              <Form.Item name={['formComponentList', index, 'labelName']} rules={[{ required: true, message: item.placeholder }]}>

                                <Input placeholder={item.placeholder} disabled={!item.editLabel} onBlur={() => inputOnBlur(index)} />
                              </Form.Item>
                              {
                                item.fixedFlag && item.type.value != 5  ? '' :
                                  <div className="subitem" >
                                    {

                                      item.expand.items.map((subitem,subindex) => {

                                        return  <div style={{display: 'flex'}} key={'subitem-' + subindex}>
                                          <Form.Item label={
                                            <span>
                                              <div className={item.type.value == 2 ? 'round' : 'square'} >
                                              </div>
                                            </span>}
                                          key={'sub-'+subindex} name={['formComponentList', index, 'expand','items',subindex,'item']}  rules={[{ required: true, message: '请输子项标题' }]}>
                                            <Input placeholder={subitem.item} disabled={!item.editLabel} onBlur={() => inputOnBlur(index, 2, subindex)}/>

                                          </Form.Item>
                                          {
                                            subindex < 2 ?
                                              '' :
                                              <div style={{marginTop: '4px',marginLeft: '3px'}}>
                                                <MinusCircleOutlined
                                                  onClick={() => {
                                                    deleteSubItem(index, subindex)
                                                  }}/>
                                              </div>

                                          }
                                        </div>

                                      })

                                    }
                                    {
                                      !item.fixedFlag ? <Button onClick={() => addSubItem(index)}>添加</Button> : ''
                                    }
                                  </div>
                              }
                              <Form.Item name={['formComponentList', index, 'type'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'placeholder'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'sequence'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'editable'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'editLabel'] }  hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name={['formComponentList', index, 'expand'] }  hidden>
                                <Input />
                              </Form.Item>

                              <Form.Item name={['formComponentList', index, 'fixedFlag'] }  hidden>
                                <Input />
                              </Form.Item>
                            </div>
                          </Col>
                          <Col span={4}>
                            <div className="item">
                              <Form.Item name={['formComponentList', index, 'required']} valuePropName="checked">
                                <Switch checkedChildren="是" unCheckedChildren="否"  />
                              </Form.Item>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div className="custom-forms-main-content"  style={{cursor: 'pointer'}} onClick={() => delFormItem(index)}>删除</div>
                            {
                              !item.expand.items[0].hasOwnProperty('usedFlag')? '' :
                                <div className="subitem" >
                                  {
                                    item.expand.items.map((subitem,subindex) => {
                                      return  <div key={subindex} style={{display: 'flex', justifyContent: 'center'}}>
                                        <Form.Item name={['formComponentList', index, 'expand','items',subindex,'usedFlag']} valuePropName="checked">
                                          <Switch checkedChildren="启用" unCheckedChildren="停用"  />
                                        </Form.Item>
                                      </div>
                                    })
                                  }
                                </div>
                            }
                          </Col>
                        </Row>
                      </Form.Item>
                    }
                  })
                }
              </div>
            </div>
            <div className="bottom-bt">
              <div className="bt-group">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    onClick={() => submitForm(form)}
                    className={'line-button'}
                  >
                    保存报名模板
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="custom-forms-operation">
          <div className="custom-forms-operation-common">
            <div className="bt-group">
              {commonFields.map((item, index) => (
                <div className="bt-group-item" key={'common-' + index}>
                  <Button className={strlen(item.labelName) <= 8 ? 'min-w-1' : 'min-w-2'}  onClick={() => tapComponent(item, 1)}>+{item.labelName}</Button>
                </div>
              ))}
            </div>
          </div>
          <div className="custom-forms-operation-custom">
            <Divider>自定义字段</Divider>
            <div className="bt-group">
              {customFields.map((item, index) => (
                <div className="bt-group-item" key={'cust-' + index}>
                  <Button className={strlen(item.labelName) <= 8 ? 'min-w-1' : 'min-w-2'} onClick={() => tapComponent(item, 2)}>+{item.btName}</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="custom-forms-footer">
        <Button type="primary" onClick={() => confirmCustomForm()}>
          提交报名表单
        </Button>
        <Button style={{ marginLeft: '20px' }} onClick={() => hideCustomForms()}>
          取消
        </Button>
      </div>
      <Modal
        title="新增报名模板"
        centered
        width={450}
        visible={showAddEditForm}
        onCancel={() => setShowAddEditForm(false)}
        footer={null}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          form={addEditForm}
          name="basic"
          initialValues={{
            name: '',
          }}
        >
          <Form.Item
            name="name"
            label="模板名称"
            rules={[{ required: true, message: '请输入模板名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 19 }} style={{ marginBottom: 0 }}>
            <Button
              style={{ marginRight: '20px' }}
              type="primary"
              loading={confirmLoading}
              htmlType="submit"
              onClick={() => handleAddEditForm(addEditForm)}
            >
              确定
            </Button>
            <Button type="default" onClick={() => setShowAddEditForm(false)}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        className="confirm-modal"
        width={350}
        title={'提示'}
        centered
        visible={showConfirmForm}
        confirmLoading={confirmLoading}
        onOk={() => confirmDelTemplate()}
        onCancel={() => setShowConfirmForm(false)}
      >
        {confirmMessage}
      </Modal>
    </Modal>
  )
}
export default connect(({ events, formTemplate, loading }) => ({
  formTemplate,
  loading: loading.models.events,
}))(CustomForms)
