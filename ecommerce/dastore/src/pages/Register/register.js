import React, { useState, useEffect } from "react";
import "./register.css";
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Divider, Form, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, AimOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";

const { Search } = Input;

const RegisterCustomer = () => {

    const [delivery, setDelivery] = useState([]);
    let history = useHistory();

    const onFinish = async (values) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var date = yyyy + "-" + mm + "-" + dd;

        console.log(values)
        try {
            const formatData = {
                "email": values.email,
                "username": values.username,
                "password": values.password,
                "phone": values.phoneNo,
                "role": "isClient",
            }
            await axiosClient.post("http://localhost:3100/api/auth/register", formatData)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: "Thông báo",
                            description: "Đăng kí không thành công",

                        });
                    }
                    else {
                        notification["success"]({
                            message: "Thông báo",
                            description: "Đăng kí thành công",
                        });
                        setTimeout(function () {
                            history.push("/login");
                        }, 1000);
                    }
                }
                );
        } catch (error) {
            throw error;
        }
    }
    return (
        <div>
            <div className="imageBackground">
                <div id="wrapper">
                    <Card id="dialog" bordered={false} >
                        <Form
                            style={{ width: 400, marginBottom: 8 }}
                            name="normal_login"
                            className="loginform"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item style={{ marginBottom: 3 }}>

                                <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">DaStore</Divider>
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 16 }}>
                                <p className="text">Đăng Kí Tài Khoản khách hàng</p>
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tài khoản!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="siteformitemicon" />} placeholder="Tài khoản" />
                            </Form.Item >

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="siteformitemicon" />}
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập e-mail!',
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined className="siteformitemicon" />} placeholder="e-mail!" />
                            </Form.Item >

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="phoneNo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <Input prefix={<PhoneOutlined className="siteformitemicon" />} placeholder="Số điện thoại" />
                            </Form.Item >

                            <Form.Item style={{ marginBottom: 18 }}>
                                <Button className="loginformbutton" type="primary" htmlType="submit"  >
                                    Đăng Kí
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default RegisterCustomer;
