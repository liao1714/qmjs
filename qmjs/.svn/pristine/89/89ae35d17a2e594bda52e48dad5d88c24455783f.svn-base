import { Button, Col, Form, Input, Row, Select, DatePicker, Modal, message } from 'antd';
import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import UploadImages from '@/components/UploadImages';
import { connect, history } from 'umi';
const { RangePicker } = DatePicker;

const CreateForm = ({ handleSearch, hideCreateForm, dispatch }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const getImage = (result) => {
    console.log(result);
    form.setFieldsValue({
      image: result,
    });
  };
  const submitForm = (form) => {
    form
      .validateFields()
      .then((res) => {
        setSubmitLoading(true);
        let body = {
          belongType: res.belongType,
          title: res.title,
          image: [res.image[0].id],
          urlType: res.urlType,
          forwordUrl: res.forwordUrl,
          effectiveBeginTime: res.effectiveTime && new Date(res.effectiveTime[0]).getTime(),
          effectiveEndTime: res.effectiveTime && new Date(res.effectiveTime[1]).getTime(),
          status: res.status,
        };
        console.log(body);
        dispatch({
          type: 'location/locationAdd',
          payload: body,
        }).then((res) => {
          if (res && res.code === 200) {
            message.success(res.message, 2);
            hideCreateForm();
            handleSearch();
          }
          setSubmitLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };
  return (
    <Modal
      width={800}
      title="新增运营位"
      centered
      visible={true}
      onCancel={() => hideCreateForm()}
      footer={[]}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        initialValues={{
          eventsType: 0,
          tagPkId: null,
          insuranceRequired: true,
          registerForm: [
            { name: '姓名', required: true },
            { name: '手机号', required: true },
          ],
        }}
      >
        <Form.Item
          wrapperCol={{ span: 12 }}
          name="belongType"
          label="运营类型"
          rules={[{ required: true, message: '运营类型!' }]}
        >
          <Select allowClear>
            <Select.Option value={0}>首页banner位</Select.Option>
            <Select.Option value={1}>首页功能位</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="图片上传"
          name="image"
          rules={[{ required: true, message: '请选择图片!' }]}
        >
          <UploadImages getImageList={getImage} fileList={[]} aspect={750 / 388} thumbnail={true} />
          <div className="form-info">最佳尺寸：750*388px ，支持JPG、PNG、GIF。</div>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12 }}
          name="urlType"
          label="跳转类型"
          rules={[{ required: true, message: '请选择跳转类型!' }]}
        >
          <Select allowClear>
            <Select.Option value={0}>内部链接</Select.Option>
            <Select.Option value={1}>外部链接</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12 }}
          name="forwordUrl"
          label="跳转地址"
          rules={[{ required: true, message: '请输入跳转地址!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12 }}
          name="effectiveTime"
          label="起止时间"
          rules={[{ type: 'array', required: true, message: '请选择起止时间!' }]}
        >
          <RangePicker placeholder={['开始时间', '结束时间']} showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12 }}
          name="status"
          label="状态"
          rules={[{ required: true, message: '请选择状态!' }]}
        >
          <Select allowClear>
            <Select.Option value={0}>下线</Select.Option>
            <Select.Option value={1}>上线</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout} style={{ marginBottom: 0 }}>
          <Button
            style={{ marginRight: '20px' }}
            type="primary"
            loading={submitLoading}
            htmlType="submit"
            onClick={() => submitForm(form)}
          >
            提交
          </Button>
          <Button type="default" onClick={() => hideCreateForm()}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ location }) => ({
  location,
}))(CreateForm);
