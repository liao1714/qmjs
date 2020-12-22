import {Button, Form, Input, Modal, message, Tree} from 'antd'
import React, {useState} from 'react'
import {connect} from 'umi'

const EditorForm = ({ handleSearch, hideEditorForm, dispatch, role: { resourcesRoles, authResources, roleDetail } }) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  const submitForm =(form)=> {
    form.validateFields().then(res => {
      setSubmitLoading(true)
      let body = {
        pkId: roleDetail.pkId,
        roleName: res.roleName,
        description: res.description,
        authArray: res.authArray,
      }
      console.log(body)
      dispatch({
        type: 'role/roleEdit',
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

  const [expandedKeys, setExpandedKeys] = useState(authResources)
  const [checkedKeys, setCheckedKeys] = useState(authResources)
  const [selectedKeys, setSelectedKeys] = useState(authResources)
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys) // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeys, e) => {
    console.log(checkedKeys.concat(e.halfCheckedKeys))
    setCheckedKeys(checkedKeys)
    form.setFieldsValue({
      authArray: checkedKeys.concat(e.halfCheckedKeys)
    })
  }

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info)
    setSelectedKeys(selectedKeys)
  }

  console.log(resourcesRoles)

  return (
    <Modal
      width={800}
      title="编辑角色"
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
          roleName: roleDetail.roleName,
          description: roleDetail.description,
          authArray: authResources
        }}
      >
        <Form.Item
          name='roleName'
          label='角色名称'
          rules={[{ required: true, message: '请输入角色名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='角色描述'
          rules={[{ required: false, message: '请输入角色描述!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='authArray'
          label='角色权限'
          rules={[{ required: true, message: '请选择角色权限!' }]}
        >
          <div className='auth-wrapper'>
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={resourcesRoles}
            />
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 4, span: 20}} style={{marginBottom: 0}}>
          <Button style={{marginRight: '20px'}} type="primary" loading={submitLoading} htmlType="submit" onClick={()=>submitForm(form)}>提交</Button>
          <Button type="default" onClick={() => hideEditorForm()}>取消</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default connect(({ role }) => ({
  role,
}))(EditorForm)
