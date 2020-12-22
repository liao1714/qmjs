import {Button, Form, Input, Modal, message, Select} from 'antd'
import React, {useState} from 'react'
import {connect} from 'umi'

const CreateForm = ({ handleSearch, hideCreateForm, dispatch, account: { roleList } }) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const submitForm =(form)=> {
    form.validateFields().then(res => {
      setSubmitLoading(true)
      let body = {
        account: res.account,
        name: res.name,
        mobile: res.mobile,
        role: [res.role],
        password: res.password,
        confirmPassword: res.confirmPassword,
      }
      console.log(body)
      dispatch({
        type: 'account/accountAdd',
        payload: body,
      }).then(res =>{
        if (res && res.code === 200) {
          message.success(res.message, 2)
          hideCreateForm()
          handleSearch()
        }
        setSubmitLoading(false)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Modal
      width={800}
      title="新增用户"
      centered
      visible={true}
      onCancel={() => hideCreateForm()}
      footer={[]}
    >
      <Form
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
        form={form}
        name="basic"
        initialValues={{
          account: '',
          name: '',
          mobile: '',
          role: '',
          password: '',
          confirmPassword: '',
        }}
      >
        <Form.Item
          name='account'
          label='账号'
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='name'
          label='姓名'
          rules={[{ required: true, message: '请输入姓名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='mobile'
          label='手机号'
          rules={[{ required: true, message: '请输入手机号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label='角色'
          rules={[{ required: true, message: '请选择角色!' }]}
        >
          <Select
            // mode="multiple"
          >
            {
              roleList && roleList.map((item, index)=>(
                <Select.Option key={index} value={item.pkId}>{item.roleName}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          name='password'
          label='登录密码'
          rules={[{ required: true, message: '请输入登录密码!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='确认登录密码'
          rules={[{ required: true, message: '请输入确认登录密码!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 4, span: 20}} style={{marginBottom: 0}}>
          <Button style={{marginRight: '20px'}} type="primary" loading={submitLoading} htmlType="submit" onClick={()=>submitForm(form)}>提交</Button>
          <Button type="default" onClick={() => hideCreateForm()}>取消</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default connect(({ account }) => ({
  account,
}))(CreateForm)
