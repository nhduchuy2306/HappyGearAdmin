import ProductPicture from './ProductPicture'

import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

function ProductItem({product}) {

    console.log(product)
    return (
        <Card
            style={{
                width: 300,
            }}
            cover={
                <ProductPicture id = {product.productId}/>
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                title= {product.productName}
                description={product.price +"đ"}
            />
        </Card>
    )
}
export default ProductItem;