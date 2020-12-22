import {Button, Col, Form, Input, Row, Select, DatePicker} from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker


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
      <Form.Item name='keyword' label='标题' style={{width: '250px'}}>
        <Input placeholder="请输入标题或ID" />
      </Form.Item>
      <Form.Item name='status' label='状态' style={{width: '250px'}}>
        <Select allowClear>
          <Select.Option value={1}>上线</Select.Option>
          <Select.Option value={0}>下线</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='effectiveTime' label='起止时间' style={{width: '350px'}}>
        <RangePicker placeholder={['开始时间', '结束时间']} showTime format="YYYY-MM-DD HH:mm" />
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
