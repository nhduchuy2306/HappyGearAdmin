
import ProductGrid from '../Product/ProductGrid'
import React, { useContext, useState } from "react";
import { Breadcrumb, Input, theme } from "antd";
import { SearchContext } from '../Context/SearchProvider';

const { Search } = Input;
const ProductPage = () => {

    const searchContext = useContext(SearchContext);

    const [tempId, setTempId] = useState('');
    const [tempName, setTempName] = useState('');

    const {
        token: { colorBgContainer },
      } = theme.useToken();

    const onSearchId = (value) => {
        if (value) {
            searchContext.setSearchName('');
            setTempName('');
            setTempId('');
            searchContext.setSearchId(value);
        } else {
            searchContext.setSearchId('');
        }

    };

    const onSearchName = (value) => {
        if (value) {
            searchContext.setSearchId('');
            setTempId('');
            setTempName('');
            searchContext.setSearchName(value);
        } else {
            searchContext.setSearchName('');
        }
    };

    const handleOnChangeId = (value) => {
        setTempId(value.target.value)
    };

    const handleOnChangeName = (value) => {
        setTempName(value.target.value)
    };

    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Product</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Search
                name='searchId'
                addonBefore='ID:'
                placeholder="Input Product ID"
                onSearch={onSearchId}
                style={{
                    width: 150,
                    marginBottom: 10,
                    marginRight: 10,
                }}
                value={tempId}
                onChange={handleOnChangeId}
            />
            <Search
                name='searchName'
                addonBefore='Name:'
                placeholder="Input Product Name"
                onSearch={onSearchName}
                style={{
                    width: 300,
                }}
                allowClear
                value={tempName}
                onChange={handleOnChangeName}
            />

            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                }}
            >
                <ProductGrid />
            </div>
        </>
    );
}

export default ProductPage;