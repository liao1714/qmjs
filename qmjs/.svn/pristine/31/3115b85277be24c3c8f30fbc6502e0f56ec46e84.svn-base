import {Button, Form, Input, Modal, message, Select} from 'antd'
import React, {useState} from 'react'
import {connect} from 'umi'

const EditorForm = ({ handleSearch, hideEditorForm, dispatch, account: { roleList, accountDetail } }) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const submitForm =(form)=> {
    form.validateFields().then(res => {
      setSubmitLoading(true)
      let body = {
        accountPkId: accountDetail.accountPkId,
        name: res.name,
        mobile: res.mobile,
        role: [res.role],
      }
      console.log(body)
      dispatch({
        type: 'account/accountEdit',
        payload: body,
      }).then(res =>{
        if (res && res.code === 200) {
          message.success(res.message, 2)
          hideEditorForm()
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
      title="修改用户"
      centered
      visible={true}
      onCancel={() => hideEditorForm()}
      footer={[]}
    >
      <Form
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
        form={form}
        name="basic"
        initialValues={{
          account: accountDetail.account,
          name: accountDetail.name,
          mobile: accountDetail.mobile,
          role: accountDetail.role[0],
        }}
      >
        <Form.Item
          name='account'
          label='账号'
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input readOnly/>
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
        <Form.Item wrapperCol={{offset: 4, span: 20}} style={{marginBottom: 0}}>
          <Button style={{marginRight: '20px'}} type="primary" loading={submitLoading} htmlType="submit" onClick={()=>submitForm(form)}>提交</Button>
          <Button type="default" onClick={() => hideEditorForm()}>取消</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default connect(({ account }) => ({
  account,
}))(EditorForm)
