
import { NotificationContext } from '../Context/NotificationProvider';
import categoryApi from '../../api/categoryApi';
import brandApi from '../../api/brandApi';
import roleApi from '../../api/roleApi';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Switch, Modal } from 'antd';



const EditOtherModal = ({ list, setList, data, setData, isModalOpen, setIsModalOpen }) => {

    const openNotificationWithIcon = useContext(NotificationContext);

    const [listKey, setListKey] = useState();

    
    useEffect(() => {
        if (data) {
            setListKey(Object.keys(data));
        }
    }, [data])

    const [form] = Form.useForm();

    const handleOk = (values) => {

        const temp = {
            [listKey[0]]: values.id,
            [listKey[1]]: values.name,
            [listKey[2]]: values.status,
        }

        let name;

        switch (listKey[0]) {
            case 'categoryId':
                categoryApi.update(temp);
                name = 'Category';
                break
            case 'brandId':
                brandApi.update(temp);
                name = 'Brand';
                break
            case 'roleId':
                roleApi.update(temp);
                name = 'Role';
                break
            default:
                console.log("lỗi r nè!")
        }

        let index = list.findIndex((obj => obj[listKey[0]] === temp[listKey[0]]));
        list[index] = temp;
        setList(list);
        setData(temp);
        setIsModalOpen(false);

        openNotificationWithIcon('Update Successfully!!!', `${name} ${temp[listKey[1]]}  have been updated.`);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    // console.log(listKey)

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
                    id: data && listKey ? data[listKey[0]] : '',
                    name: data && listKey ? data[listKey[1]] : '',
                    status: data && listKey ? data[listKey[2]] : '',
                }}
                preserve={false}
                autoComplete="off"
            >
                <Form.Item
                    label="ID: "
                    name="id"
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
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name='status' label="Status" valuePropName="checked">
                    <Switch checked />
                </Form.Item>
            </Form>
        </Modal>

    );
}

export default EditOtherModal;