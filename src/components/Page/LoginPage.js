import React, { useContext } from 'react';
import { Button, Form, Input, Space } from 'antd';
import authApi from '../../api/auth';
import roleApi from '../../api/roleApi'
import storageService from '../../api/storage'
import { LoginContext } from '../Context/LoginProvider';


const LoginPage = () => {

  const { setIsLogin } = useContext(LoginContext);

  const onFinish = (values) => {
    // const status = authApi.login(values).then(res => res.data).then(data => storageService.setAccessToken(data.token));

    authApi.login(values).then(res => {
      console.log(res.data.token);
      console.log(res.data.roleName);
      if (res.status === 200 && res.data.roleName === 'role_admin') {
        setIsLogin(true);
        storageService.setAccessToken(res.data.token)
      }else {
        window.alert("Permission Denied!!!")
      }
    });

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleTest = () => {
    roleApi.getAll()
      .then(res => res.data)
      .then(data => console.log(data))
  }


  return (
    <Space
      direction="vertical"
      size="middle"
      align="center"
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={handleTest}>test</Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
export default LoginPage;