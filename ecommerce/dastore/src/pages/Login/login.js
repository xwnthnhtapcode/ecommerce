import React, { useState } from 'react';
import "./login.css";
import userApi from "../../apis/userApi";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Divider, Alert, Row, notification } from 'antd';
import backgroundLogin from "../../assets/image/background-client.gif";

const Login = () => {

  const [isLogin, setLogin] = useState(true);

  let history = useHistory();

  const onFinish = values => {
    userApi.login(values.email, values.password)
      .then(function (response) {
        console.log(response);
        if (response.user.role === "isClient") {
          history.push("/home");
        } else {
          setLogin(false);
          notification["error"]({
            message: `Thông báo`,
            description:
              'Bạn không có quyền truy cập vào hệ thống',

          });
        }
      })
      .catch(error => {
        console.log("email or password error" + error)
      });
  }
  
  const handleLink = () => {
    history.push("/register");
  }

  return (
    <div className="imageBackground">
      <div id="formContainer" >
        <div id="form-Login">
          <div className="formContentLeft"
          >
            <img className="formImg" src={backgroundLogin} alt='spaceship' />
          </div>
          <Row justify="center">
            <Form
              style={{ marginBottom: 8 }}
              name="normal_login"
              className="loginform"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item style={{ marginBottom: 3, marginTop: 65 }}>
                <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">CHÀO MỪNG BẠN ĐẾN VỚI DASTORE!</Divider>
              </Form.Item>
              <Form.Item style={{ marginBottom: 16, textAlign: "center" }}>
                <p className="text">Vui lòng đăng nhập để tiếp tục</p>
              </Form.Item>
              <>
                {isLogin === false ?
                  <Form.Item style={{ marginBottom: 16 }}>
                    <Alert
                      message="Tài khoản hoặc mật khẩu sai"
                      type="error"
                      showIcon
                    />

                  </Form.Item>
                  : ""}
              </>
              <Form.Item
                style={{ marginBottom: 20 }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input
                  style={{ height: 34, borderRadius: 5 }}
                  prefix={<UserOutlined className="siteformitemicon" />}
                  placeholder="Username" />
              </Form.Item >
              <Form.Item
                style={{ marginBottom: 8 }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="siteformitemicon" />}
                  type="password"
                  placeholder="Password"
                  style={{ height: 34, borderRadius: 5 }}
                />
              </Form.Item>

              <Form.Item >
                <div onClick={() => handleLink()} className="register">Đăng ký tài khoản</div>
              </Form.Item>

              <Form.Item style={{ width: '100%', marginTop: 20 }}>
                <Button className="button" type="primary" htmlType="submit"  >
                  Đăng Nhập
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Login;



