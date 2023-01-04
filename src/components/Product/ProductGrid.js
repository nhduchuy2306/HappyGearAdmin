import React, { useEffect, useState, createContext, useContext } from 'react';
import { List, Space, Pagination, FloatButton } from 'antd';
import productApi from '../../api/productApi';
import ProductItem from './ProductItem'
import EditFrom from "./EditFrom"
import DeleteModal from './DeleteModal';
import { PlusOutlined } from '@ant-design/icons';
import { SearchContext } from '../Context/SearchProvider';

const ModalContext = createContext();

function ProductGrid() {

  const searchContext = useContext(SearchContext);

  const [list, setList] = useState();
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [productData, setProductData] = useState();
  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (searchContext.searchId === '' & searchContext.searchName === '' ) {
      productApi.getAllByPage({ p: page - 1 })
        .then(response => {
          setList(response.data[0])
        })
      productApi.getTotal()
        .then(response => setTotalProduct(response.data))
    }else if(searchContext.searchName !== ''){
      productApi.getByPageAndName({p: page - 1, name: searchContext.searchName})
        .then(response => {
          setList(response.data[0])
          setTotalProduct(response.data[1])
        })
    }
    else{
      productApi.get(searchContext.searchId)
        .then(res => res.data)
        .then(res => setList([res]));
      setTotalProduct(1);
    }

  }, [page, loading, searchContext.searchId, searchContext.searchName]);


  const handlePageClick = (current) => {
    setPage(current);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCreate = () => {
    setProductData(undefined);
    setIsModalEditOpen(true)
  }

  return (
    <>

      <EditFrom product={productData} isModalOpen={isModalEditOpen} setIsModalOpen={setIsModalEditOpen} setLoading={setLoading} loading={loading} />
      <DeleteModal isModalOpen={isModalDeleteOpen} setIsModalOpen={setIsModalDeleteOpen} productId={productData?.productId} setLoading={setLoading} loading={loading} />
      <Space
        direction="horizontal"
        size="middle"
        style={{
          width: '100%',
        }}
      >
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
              <ProductItem setIsModalEditOpen={setIsModalEditOpen} setIsModalDeleteOpen={setIsModalDeleteOpen}
                setProductData={setProductData} product={item}
              />
            </List.Item>
          )}
        />


      </Space>

      <Pagination defaultCurrent={1} total={totalProduct} pageSize={9} onChange={handlePageClick} />

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{
          right: 20,
          // bottom: 720,
          top: 100,
          width: 60,
          height: 60,
        }}
        description='Create'
        shape='square'
        onClick={handleCreate}
      />
    </>
  )

}
export default ProductGrid;
export { ModalContext };