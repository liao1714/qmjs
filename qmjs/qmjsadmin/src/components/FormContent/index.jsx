import React, { useState, useEffect } from 'react'
import { Modal, Tag, Input, message, Button, Form, Radio, Row, Col, Checkbox, Switch } from 'antd'
import UploadImages from '@/components/UploadImages'

import { connect } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'
import { random } from 'lodash'




const FormContent = ({ dispatch, formTemplate: {formComponentList} }) => {

  const [form] = Form.useForm()
  let [initData, setInitData] = useState(formComponentList)

  const submitForm = (form) => {
    console.log('initFormData')
    console.log('formComponentList')
    console.log(formComponentList)
    console.log('form.getFieldsValue()')
    console.log(form.getFieldsValue())

    form
      .validateFields()
      .then((res) => {
        console.log('form-res')
        console.log(res)
        if(isRepeat(res.formComponentList,'label')) {
          message.error('存在相同的表单项目')
        }else {
          if(checkRepeat()) {
            message.error('子项目重复')
            return false
          }

          message.success('提交成功')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const isRepeat=(arr, field)=>{
    let hash = {}
    for(let i in arr) {
      if(hash[arr[i][field]])
        return true
      hash[arr[i][field]] = true
    }
    return false
  }


  const checkRepeat=()=> {
    let subItemRepeat = false
    for(let i = 0; i < formComponentList.length; i++) {
      if(formComponentList[i].hasOwnProperty('children') && formComponentList[i].children.length > 0) {
        if(isRepeat(formComponentList[i].children, 'label')) {
          subItemRepeat = true
          break
        }
      }
    }
    if(subItemRepeat) {
      return true
    }else {
      return false
    }
  }






  /**
   * 新增一项子项
   * @param {*} index
   */
  const addSubItem =(index)=>{
    formComponentList[index].children.push({
      name: '',
      label: '',
    })
    dispatch({
      type: 'formTemplate/setComponentsList',
      payload: formComponentList
    })
    form.setFieldsValue({
      'formComponentList': formComponentList
    })
  }





  //光标离开检测重复
  const inputOnBlur =(index)=>{
    console.log('blur')
    console.log(form.getFieldValue('formComponentList'))
    console.log(form.getFieldValue())
    // form.setFieldsValue({
    //   'formComponentList': form.getFieldValue('formComponentList')
    // });
    // if(isRepeat(form.getFieldsValue().formComponentList, 'labelName')) {
    //   let formData = form.getFieldsValue().formComponentList;
    //   formData[index].labelName = "";
    //   form.setFieldsValue({
    //     'formComponentList': formData
    //   });
    //   message.error('表单组件标题重复，请重新填写')
    // }
  }

  const addOne =()=> {
    let ary = [
      {
        type: 0,
        labelName: '姓名',
        placeholder: '请输入姓名',
        required: true,
        sequence: 0,
        editable: true,
        editLabel: false,
        expand: {
          value: '',
          vaildType: 0,
          maxLength: 50,
          minLength: 1,
          errorMsg: '姓名只允许1-50个字符'
        },
        btType: 'common',
        btName: '姓名',
      },
      {
        type: 0,
        labelName: '手机号',
        placeholder: '请输入手机号',
        required: true,
        sequence: 0,
        editable: true,
        editLabel: false,
        expand: {
          value: '',
          vaildType: 1,
          regexp: '[1][3,4,5,7,8][0-9]{9}$',
          errorMsg: '手机号格式不正确'
        },
        btType: 'common',
        btName: '手机号',
      },
      {
        type: 1,
        labelName: '个人描述',
        placeholder: '请输入个人描述',
        required: false,
        sequence: 0,
        editable: true,
        editLabel: false,
        expand: {
          value: '',
          vaildType: 0,
          maxLength: 50,
          minLength: 1,
          errorMsg: '个人描述只允许%d-%d个字符'
        },
        btType: 'common',
        btName: '个人描述',
      },

      {
        type: 4,
        labelName: '年龄',
        placeholder: '请输入年龄',
        required: true,
        sequence: 0,
        editable: true,
        editLabel: false,
        expand: {
          value: '',
          vaildType: 1,
          regexp: '^(?!0?$)\\d{0,2}?$',
          errorMsg: '年龄错误'
        },
        btType: 'common',
        btName: '年龄',
      },




      {
        type: 0,
        labelName: '',
        placeholder: '请输入单行文本标题',
        required: false,
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
        btType: 'cust'
      },
      {
        type: 1,
        labelName: '',
        placeholder: '请输入多行文本标题',
        required: false,
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
        btType: 'cust'
      },
    ]


    var num = Math.random()
    console.log(num)
    //获取1-10之间的随机数
    var num = Math.floor(Math.random() * 4) + 1
    let LIST = [...form.getFieldValue('formComponentList')]
    LIST.push(ary[num])
    form.setFieldsValue({
      'formComponentList': LIST
    })
    setTimeout(setInitData(LIST), 100)
  }


  /**
   * 删除组件项
   * @param {*} index
   */
  const delFormItem =(index)=>{
    console.log('del')
    // let LIST = [...initData]
    // LIST.splice(index,1)
    // form.setFieldsValue({
    //   formComponentList: LIST,
    // });
    // setTimeout( setInitData(LIST), 100);


    let LIST = [...form.getFieldValue('formComponentList')]
    LIST.splice(index,1)
    form.setFieldsValue({
      formComponentList: LIST,
    })
    setTimeout( setInitData(LIST), 100)
  }



  return (
    <Form name="basic" form={form}
      initialValues={{
        formComponentList: initData
      }}>
      <div className="content">
        {
          initData.map((item, index) => {
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
                    <div className="custom-forms-main-content" onClick={() => delFormItem(index)}>删除</div>
                  </Col>
                </Row>
              </Form.Item>
            }else {
              return <Form.Item  style={{ marginBottom: 0 }} key={index}>
                <Row>
                  <Col span={12}>
                    <div className="item">
                      <Form.Item name={['formComponentList', index, 'labelName']} rules={[{ required: true, message: item.placeholder }]}>

                        <Input placeholder={item.placeholder} disabled={!item.editLabel} />
                      </Form.Item>

                      <div className="subitem" >
                        {
                          item.expand.items.map((subitem,subindex) => {
                            return  <Form.Item key={'sub-'+subindex}>
                              <Input placeholder={subitem.item}   disabled={item.btType == 'common'} />
                            </Form.Item>
                          })

                        }
                        {
                          item.btType == 'cust'? <Button onClick={() => addSubItem(index)}>添加</Button> : ''
                        }


                      </div>
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
                    <div className="custom-forms-main-content" onClick={() => delFormItem(index)}>删除</div>
                  </Col>
                </Row>
              </Form.Item>
            }

          })
        }

      </div>





      <div className="bottom-bt">
        <div className="bt-group">
          <Form.Item>
            <Button
              style={{ marginRight: '20px' }}
              type="primary"
              htmlType="submit"
              onClick={() => submitForm(form)}
            >
              保存
            </Button>

          </Form.Item>


          <Form.Item>
            <Button
              style={{ marginRight: '20px' }}


              onClick={() => addOne()}
            >
              添加
            </Button>

          </Form.Item>
        </div>
      </div>


    </Form>
  )
}
export default connect(({ loading, formTemplate }) => ({
  formTemplate,
  loading: loading.models.events,
}))(FormContent)
