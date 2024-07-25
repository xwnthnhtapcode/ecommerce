import React, { useState, useEffect } from "react";
import styles from "./cartHistory.css";
import axiosClient from "../../../apis/axiosClient";
import { useParams } from "react-router-dom";
import eventApi from "../../../apis/eventApi";
import productApi from "../../../apis/productApi";
import { useHistory } from 'react-router-dom';
import { Col, Row, Tag, Spin, Card } from "antd";
import { DateTime } from "../../../utils/dateTime";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Typography, Button, Badge, Breadcrumb, Popconfirm, notification, Form, Input, Select, Rate, Table } from 'antd';
import { HistoryOutlined, AuditOutlined, AppstoreAddOutlined, CloseOutlined, UserOutlined, MehOutlined, TeamOutlined, HomeOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';

import Slider from "react-slick";

const { Meta } = Card;
const { Option } = Select;

const { Title } = Typography;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
const { TextArea } = Input;

const CartHistory = () => {

    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [suggest, setSuggest] = useState([]);
    const [visible, setVisible] = useState(false);
    const [dataForm, setDataForm] = useState([]);
    const [lengthForm, setLengthForm] = useState();
    const [form] = Form.useForm();
    const [template_feedback, setTemplateFeedback] = useState();
    let { id } = useParams();
    const history = useHistory();

    const hideModal = () => {
        setVisible(false);
    };

    const handleJointEvent = async (id) => {
        try {
            await eventApi.joinEvent(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Joint Event Failed',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Successfully Joint Event',
                    });
                    listEvent();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleCancelJointEvent = async (id) => {
        try {
            await eventApi.cancelJoinEvent(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Cancel Join Event Failed',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Successfully Cancel Joint Event',
                    });
                    listEvent();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const listEvent = () => {
        setLoading(true);
        (async () => {
            try {
                const response = await eventApi.getDetailEvent(id);
                console.log(response);
                setOrderList(response);
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }

    const handleDetailEvent = (id) => {
        history.replace("/event-detail/" + id);
        window.location.reload();
        window.scrollTo(0, 0);
    }

    const getDataForm = async (uid) => {
        try {
            await axiosClient.get("/event/" + id + "/template_feedback/" + uid + "/question")
                .then(response => {
                    console.log(response);
                    setDataForm(response);
                    let tabs = [];
                    for (let i = 0; i < response.length; i++) {
                        tabs.push({
                            content: response[i]?.content,
                            uid: response[i]?.uid,
                            is_rating: response[i]?.is_rating
                        })
                    }
                    form.setFieldsValue({
                        users: tabs
                    })
                    setLengthForm(tabs.length)
                }
                );

        } catch (error) {
            throw error;
        }
    }

    const handleDirector = () => {
        history.push("/evaluation/" + id)
    }

    const onFinish = async (values) => {
        console.log(values.users);
        let tabs = [];
        for (let i = 0; i < values.users.length; i++) {
            tabs.push({
                scope: values.users[i]?.scope == undefined ? null : values.users[i]?.scope,
                comment: values.users[i]?.comment == undefined ? null : values.users[i]?.comment,
                question_uid: values.users[i]?.uid,

            })
        }
        console.log(tabs);
        setLoading(true);
        try {
            const dataForm = {
                "answers": tabs
            }
            await axiosClient.post("/event/" + id + "/answer", dataForm)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: `Notification`,
                            description:
                                'Answer event question failed',

                        });
                        setLoading(false);
                    }
                    else {
                        notification["success"]({
                            message: `Notification`,
                            description:
                                'Successfully answer event question',

                        });
                        setLoading(false);
                        form.resetFields();
                    }
                }
                );

        } catch (error) {
            throw error;
        }
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            render: (products) => (
                <ul>
                    {products.map((item, index) => (
                        <li key={index}>
                            {item.product}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'billing',
            key: 'billing',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span>{moment(createdAt).format('DD/MM/YYYY HH:mm')}</span>
              ),
        },
    ];

    useEffect(() => {
        (async () => {
            try {
                await productApi.getOrderByUser().then((item) => {
                    console.log(item);
                    setOrderList(item);
                });
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Spin spinning={false}>
                <div className="container" >
                    <h1 style={{fontSize: 25}}>Quản lý đơn hàng</h1>
                    <Card >
                        <Table columns={columns} dataSource={orderList.data} rowKey='_id' pagination={{ position: ['bottomCenter'] }} />
                    </Card>
                </div>
            </Spin>
        </div >
    );
};

export default CartHistory;
