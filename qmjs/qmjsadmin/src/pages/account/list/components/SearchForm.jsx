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
      <Form.Item name='account' label='账号' style={{width: '250px'}}>
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item name='name' label='姓名' style={{width: '250px'}}>
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item name='mobile' label='手机号' style={{width: '250px'}}>
        <Input placeholder="请输入手机号" />
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
