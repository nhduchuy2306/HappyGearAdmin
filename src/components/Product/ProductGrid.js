import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import productApi from '../../api/productApi';
import ProductItem from './ProductItem'


const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

function ProductGrid() {

  const [list, setList] = useState([])

  useEffect(() => {
    productApi.getAll()
      .then(response => setList(response.data))
  }, [])

  console.log(list)

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <ProductItem product = {item} />
        </List.Item>
      )}
    />
  )

}
export default ProductGrid;