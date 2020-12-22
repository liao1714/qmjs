import {Button, Col, Form, Input, Row, Select} from 'antd'
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
      <Form.Item name='title' label='标题' style={{width: '250px'}}>
        <Input placeholder="" />
      </Form.Item>
      <Form.Item name='eventsType' label='类型' style={{width: '250px'}}>
        <Select allowClear>
          <Select.Option value={0}>活动</Select.Option>
          <Select.Option value={1}>赛事</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='progress' label='活动进度' style={{width: '250px'}}>
        <Select allowClear>
          <Select.Option value={0}>待开始</Select.Option>
          <Select.Option value={1}>报名中</Select.Option>
          <Select.Option value={2}>活动中</Select.Option>
          <Select.Option value={3}>已结束</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='status' label='状态' style={{width: '250px'}}>
        <Select allowClear>
          <Select.Option value={0}>待发布</Select.Option>
          <Select.Option value={1}>已发布</Select.Option>
          <Select.Option value={2}>已下线</Select.Option>
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
