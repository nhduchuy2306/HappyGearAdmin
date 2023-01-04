import categoryApi from '../../api/categoryApi';
import brandApi from '../../api/brandApi';
import productApi from '../../api/productApi';
import { NotificationContext } from '../Context/NotificationProvider';
import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, InputNumber, Switch, Select, Modal } from 'antd';
const { Option } = Select;


function EditFrom({ product, isModalOpen, setIsModalOpen, setLoading, loading }) {

    const openNotificationWithIcon = useContext(NotificationContext)

    const [listCategory, setListCategory] = useState([])
    const [listBrand, setListBrand] = useState([])

    useEffect(() => {
        categoryApi.getAll()
            .then(res => setListCategory(res.data));
        brandApi.getAll()
            .then(res => setListBrand(res.data));
    }, [])

    const handleOk = (values) => {
        console.log('Success:', values);
        if (product === undefined) {
            productApi.add(values);
            setIsModalOpen(false);
            openNotificationWithIcon('Create Successfully!!!', `Your Product: ${values.productName} have been created.`);
        } else {
            productApi.update(values);
            setIsModalOpen(false);
            openNotificationWithIcon('Update Successfully!!!', `Your Product ID: ${product.productId} have been updated.`);
        }
        setLoading(!loading);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const [form] = Form.useForm();
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
            okText={product ? 'Update' : 'Create'}
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
                    productId: product?.productId,
                    productName: product?.productName,
                    price: product?.price,
                    insuranceInfo: product?.insuranceInfo,
                    quantity: product?.quantity,
                    categoryId: product?.categoryId,
                    brandId: product?.brandId,
                    status: product?.status
                }}
                preserve={false}
                autoComplete="off"
            >
                <Form.Item
                    label="ID"
                    name="productId"
                >
                    <Input
                        disabled
                        style={{
                            width: '20%',
                            textAlign: 'center'
                        }}

                    />
                </Form.Item>

                <Form.Item
                    label="Product Name"
                    name="productName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your product name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price (VNĐ)"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your price!',
                        },
                    ]}

                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        step={1000}
                        min={0}
                    /> 
                </Form.Item>

                <Form.Item
                    label="Insurance Info"
                    name="insuranceInfo"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Insurance Info!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Quantity!',
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item
                    label='Category'
                    name='categoryId'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose Category ID',
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: '50%',
                            textAlign: 'center'
                        }}
                        placeholder="CID"
                    >
                        {listCategory.map((category) =>
                        (<Option
                            key={category.categoryId}
                            value={category.categoryId}
                            disabled={!category.status}
                        >
                            {category.categoryId} - {category.categoryName}
                        </Option>)
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Brand"
                    name='brandId'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose Brand ID',
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
                        {listBrand.map((brand) => (
                            <Option key={brand.brandId} value={brand.brandId} disabled={!brand.status} >
                                {brand.brandId} - {brand.brandName}
                            </Option>
                        )
                        )}
                    </Select>
                </Form.Item>

                <Form.Item name='status' label="Status" valuePropName="checked">
                    <Switch checked />
                </Form.Item>
            </Form>
        </Modal>

    );
}
export default EditFrom;