import ProductPicture from './ProductPicture'
import React, { useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Badge } from 'antd';
const { Meta } = Card;

function ProductItem({ product, setIsModalEditOpen, setIsModalDeleteOpen, setProductData }) {


    useEffect(()=>{

    },[product])

    function handleEdit() {
        setIsModalEditOpen(true)
        setProductData(product)
    }

    function handleDelete() {
        setIsModalDeleteOpen(true)
        setProductData(product)
    }


    return (
        <Badge.Ribbon placement="start" text={product.status ? 'Available' : 'Expire'} color={product.status ? 'blue' : 'red'}>
            <Card
                style={{
                    width: 300,
                }}
                cover={
                    <ProductPicture id={product.productId} />
                }
                actions={[
                    <EditOutlined key="edit" onClick={handleEdit} />,
                    product.status ? <DeleteOutlined key="delete" onClick={handleDelete} /> : '...'
                ]}
            >
                <Meta
                    title={product.productName}
                    description={product.price + "đ"}
                />

            </Card>
        </Badge.Ribbon>
    )
}
export default ProductItem;