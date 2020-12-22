import React, {Component} from 'react'
import { connect } from 'dva'
import {Form, Input, Button, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import {history} from 'umi'

class Login extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  onFinish =(values) => {
    const { dispatch } = this.props
    dispatch({
      type: 'login/authenticate',
      payload: { ...values },
    }).then(res => {
      if (res && res.code === 200) {
        message.success({
          content: res.message,
          duration: 2
        })
        dispatch({
          type: 'login/accountInfo',
        }).then(res => {
          if (res && res.code === 200) {
            let redirect = history.location.query.redirect
            history.replace(redirect || '/')
          }
        })
      }
    })
  }
  render(){
    const { submitting, login } = this.props
    return (
      <div className='login-wrapper'>
        <div className='login'>
          <div className='login-title'>i体育运营管理后台</div>
          <Form
            name="basic"
            className="login-form"
            initialValues={{
              username: login.loginForm.username,
              password: login.loginForm.password,
            }}
            onFinish={this.onFinish}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '必填项不允许为空!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号!"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '必填项不允许为空!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码!"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={submitting}
              >登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/authenticate'],
}))(Login)
