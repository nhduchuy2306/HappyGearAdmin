
import { NotificationContext } from '../Context/NotificationProvider';
import userApi from "../../api/userApi"
import React, { useContext } from 'react';
import { Form, Input, InputNumber, Switch, Select, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const { Option } = Select;

const EditUserModal = ({ list, setList, user, isModalOpen, setIsModalOpen }) => {

    const openNotificationWithIcon = useContext(NotificationContext);

    const [form] = Form.useForm();

    const handleOk = (values) => {
        userApi.update(values);

        let index = list.findIndex((obj => obj.userName === values.userName));
        list[index] = values;
        setList(list);

        setIsModalOpen(false);
        openNotificationWithIcon('Update Successfully!!!', `UserName: ${user.userName} have been updated.`);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return (
        <Modal
            title="Edit Form"
            open={isModalOpen}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        handleOk(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            onCancel={handleCancel}

            destroyOnClose
        >
            <Form
                form={form}
                name="edit"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                    userName: user?.userName,
                    fullName: user?.fullName,
                    address: user?.address,
                    password: user?.password,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                    gender: user?.gender,
                    roleId: user?.roleId,
                    status: user?.status,
                }}
                preserve={false}
                autoComplete="off"
            >
                <Form.Item
                    label="User Name"
                    name="userName"
                >
                    <Input
                        disabled
                        style={{
                            width: '40%',
                            textAlign: 'center'
                        }}

                    />
                </Form.Item>

                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Full name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input address!',
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
                            message: 'Please input password!',
                        },
                    ]}
                >
                    <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input email!',
                        },
                    ]}
                >
                    <InputNumber style={{
                        width: '100%'
                    }} />
                </Form.Item>

                <Form.Item
                    label='Gender'
                    name='gender'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose gender',
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: '50%',
                            textAlign: 'center'
                        }}
                        placeholder="gender"

                    >

                        <Option key={1} value={true} > Nam </Option>
                        <Option key={2} value={false} > Nữ </Option>

                    </Select>
                </Form.Item>

                <Form.Item
                    label="Role"
                    name='roleId'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose role',
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: '50%',
                            textAlign: 'center'
                        }}
                        placeholder="BID"
                    >
                        <Option key={1} value={1} > Admin </Option>
                        <Option key={2} value={2} > User </Option>

                    </Select>
                </Form.Item>

                <Form.Item name='status' label="Status" valuePropName="checked">
                    <Switch checked />
                </Form.Item>
            </Form>
        </Modal>

    );
}

export default EditUserModal;