import {Button, Form, Input, Select} from 'antd'
import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import {connect, history} from 'umi'


const SearchForm = ({ getSearchForm, dispatch, events: { enrollItems = [], } }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    dispatch({
      type: 'events/enrollItems',
      payload: {
        pkId: history.location.query.pkId,
      }
    })
  }, [])
  return (
    <Form
      form={form}
      name="search-form"
      className="search-form"
      layout={'inline'}
      onFinish={getSearchForm}
      labelCol={{span: 7}}
      wrapperCol={{span: 17}}
    >
      <Form.Item name='enrollItemCostPkId' label='报名项目' style={{width: '280px'}}>
        <Select allowClear>
          {
            enrollItems && enrollItems.map(((item, index) => (
              <Select.Option value={item.pkId} key={index}>{item.itemName}</Select.Option>
            )))
          }
        </Select>
      </Form.Item>
      <Form.Item name='name' label='报名人姓名' style={{width: '280px'}}>
        <Input placeholder="请输入报名人姓名" />
      </Form.Item>
      <Form.Item name='mobile' label='报名人手机' style={{width: '280px'}}>
        <Input placeholder="请输入报名人手机" />
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

export default connect(({ events }) => ({
  events,
}))(SearchForm)

