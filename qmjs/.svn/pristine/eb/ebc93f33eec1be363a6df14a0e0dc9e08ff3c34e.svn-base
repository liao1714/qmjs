import { LogoutOutlined, FormOutlined, UserOutlined } from '@ant-design/icons'
import {Avatar, Button, Form, Input, Menu, message, Modal, Spin} from 'antd'
import React, {useState} from 'react'
import { history, connect } from 'umi'
import HeaderDropdown from '../HeaderDropdown'
import './index.less'
import UploadImages from '@/components/UploadImages'
import {getAccountInfo, setAccountInfo} from '@/utils/accountInfo'
const AvatarDropdown = ({ dispatch, account: { changePasswordData = {}, personalInformationData = {} } }) => {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showPersonalInformation, setShowPersonalInformation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [changePasswordForm] = Form.useForm()
  const [personalInformationForm] = Form.useForm()
  changePasswordForm.resetFields()
  personalInformationForm.resetFields()
  const getImage =(result)=>{
    console.log(result)
    personalInformationForm.setFieldsValue({
      image: result
    })
  }
  const onMenuClick = (event) => {
    const { key } = event
    if (key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'tabs/logout',
        })
      }
    } else if (key === 'change-password') {
      setShowChangePassword(true)
    } else if (key === 'personal-information') {
      console.log(getAccountInfo())
      dispatch({
        type: 'account/setPersonalInformationData',
        payload: {
          image: getAccountInfo().image && getAccountInfo().image.length > 0 ? getAccountInfo().image : [],
          name: getAccountInfo().name,
          mobile: getAccountInfo().mobile,
        },
      })
      setShowPersonalInformation(true)
    }
  }
  const handleChangePassword =()=> {
    dispatch({
      type: 'account/setChangePasswordData',
      payload: {
        password: changePasswordForm.getFieldsValue().password,
        newPassword: changePasswordForm.getFieldsValue().newPassword,
        confirmNewPassword: changePasswordForm.getFieldsValue().confirmNewPassword,
      },
    })
    changePasswordForm.validateFields().then(res => {
      console.log(res)
      setLoading(true)
      let body = {
        password: res.password,
        newPassword: res.newPassword,
        confirmNewPassword: res.confirmNewPassword,
      }
      dispatch({
        type: 'account/accountChangePassword',
        payload: body,
      }).then(res =>{
        if (res && res.code === 200) {
          message.success(res.message, 2)
          setShowChangePassword(false)
          dispatch({
            type: 'account/setChangePasswordData',
            payload: {
              password: '',
              newPassword: '',
              confirmNewPassword: '',
            },
          })
        }
        setLoading(false)
      })
    })
  }
  const cancelChangePassword =()=> {
    setShowChangePassword(false)
    dispatch({
      type: 'account/setChangePasswordData',
      payload: {
        password: '',
        newPassword: '',
        confirmNewPassword: '',
      },
    })
  }
  const handlePersonalInformation =()=> {
    console.log(personalInformationForm.getFieldsValue())
    dispatch({
      type: 'account/setPersonalInformationData',
      payload: {
        image: personalInformationForm.getFieldsValue().image,
        name: personalInformationForm.getFieldsValue().name,
        mobile: personalInformationForm.getFieldsValue().mobile,
      },
    })
    personalInformationForm.validateFields().then(res => {
      console.log(res)
      setLoading(true)
      let body = {
        image: res.image.length > 0 ? res.image : [],
        name: res.name,
        mobile: res.mobile,
      }
      let data = {...body}
      data.image = body.image.length > 0 ? [body.image[0].id] : []
      dispatch({
        type: 'account/editPersonalAccount',
        payload: data,
      }).then(res =>{
        if (res && res.code === 200) {
          message.success(res.message, 2)
          setShowPersonalInformation(false)
          setAccountInfo(body)
        }
        setLoading(false)
      })
    })
  }
  const cancelPersonalInformation =()=> {
    dispatch({
      type: 'account/setPersonalInformationData',
      payload: {
        image: [],
        name: '',
        mobile: '',
      },
    })
    setShowPersonalInformation(false)
  }

  changePasswordForm.setFieldsValue({
    password: changePasswordData.password,
    newPassword: changePasswordData.newPassword,
    confirmNewPassword: changePasswordData.confirmNewPassword,
  })
  personalInformationForm.setFieldsValue({
    image: personalInformationData.image,
    name: personalInformationData.name,
    mobile: personalInformationData.mobile
  })


  const menuHeaderDropdown = (
    <Menu className="" selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="personal-information">
        <UserOutlined />
        个人信息
      </Menu.Item>
      <Menu.Item key="change-password">
        <FormOutlined />
        修改密码
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <div>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className="header-portrait-wrapper">
          <Avatar
            size="small"
            className="header-user-portrait"
            src={getAccountInfo().image && getAccountInfo().image.length > 0 ? getAccountInfo().image[0].thumbnail : require('../../assets/defaultPortrait.png')}
            alt="avatar"
          />
          <span className="header-user-name">{getAccountInfo().name}</span>
        </span>
      </HeaderDropdown>
      <Modal
        width={500}
        title="修改密码"
        centered
        onCancel={()=>setShowChangePassword(false)}
        visible={showChangePassword}
        footer={[]}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          form={changePasswordForm}
          name="basic"
        >
          <Form.Item
            name="password"
            label="旧密码"
            rules={[{ required: true, message: '请输入旧密码!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="确认密码"
            rules={[{ required: true, message: '请输入确认密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 19 }} style={{marginBottom: 0}}>
            <Button style={{marginRight: '20px'}} type="primary" loading={loading} htmlType="submit" onClick={()=>handleChangePassword(changePasswordForm)}>提交</Button>
            <Button type="default" onClick={() => cancelChangePassword()}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        width={500}
        title="个人信息"
        centered
        onCancel={()=>setShowPersonalInformation(false)}
        visible={showPersonalInformation}
        footer={[]}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          form={personalInformationForm}
          name="basic"
          initialValues={{
            name: '',
            mobile: '',
          }}
        >
          <Form.Item
            label="头像上传"
            name="image"
            rules={[{ required: false, message: '请选择头像!' }]}
          >
            <UploadImages getImageList={ getImage } fileList={personalInformationData.image} aspect={1} thumbnail={true}/>
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 19 }} style={{marginBottom: 0}}>
            <Button style={{marginRight: '20px'}} type="primary" loading={loading} htmlType="submit" onClick={()=>handlePersonalInformation(personalInformationForm)}>修改</Button>
            <Button type="default" onClick={() => cancelPersonalInformation()}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({ account }) => ({
  account
}))(AvatarDropdown)
