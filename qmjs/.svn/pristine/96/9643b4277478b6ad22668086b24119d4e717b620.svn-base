import {Button, Col, Form, Input, Row, Select, DatePicker} from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'


const SearchForm = (props) => {
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      name="search-form"
      className="search-form"
      layout={'inline'}
      onFinish={props.getSearchForm}
      labelCol={{span: 6}}
      wrapperCol={{span: 18}}
    >
      <Form.Item name='roleName' label='角色名称' style={{width: '250px'}}>
        <Input placeholder="请输入角色名称" />
      </Form.Item>
      <Form.Item name='activated' label='状态' style={{width: '250px'}}>
        <Select allowClear>
          <Select.Option value={true}>启用</Select.Option>
          <Select.Option value={false}>禁用</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        <SearchOutlined />搜索
      </Button>
      <Button
        style={{ margin: '0 8px' }}
        onClick={() => {
          form.resetFields()
        }}
      >
        清空
      </Button>
    </Form>
  )
}

export default SearchForm
