
import UserList from "../User/UserList"
import React, { useContext, useState } from "react";
import { Breadcrumb, Input, theme } from "antd";
import { SearchContext } from '../Context/SearchProvider';

const { Search } = Input;
const UserPage = () => {

    const searchContext = useContext(SearchContext);

    const [tempUserName, setTempUserName] = useState('');
    // const [tempFullName, setTempFullName] = useState('');

    const {
        token: { colorBgContainer },
      } = theme.useToken();

    const onSearchUserName = (value) => {
        if (value) {
            searchContext.setSearchFullName('');
            // setTempFullName('');
            setTempUserName('');
            searchContext.setSearchUserName(value);
        } else {
            searchContext.setSearchUserName('');
        }

    };

    // const onSearchFullName = (value) => {
    //     if (value) {
    //         searchContext.setSearchUserName('');
    //         setTempUserName('');
    //         setTempFullName('');
    //         searchContext.setSearchFullName(value);
    //     } else {
    //         searchContext.setSearchFullName('');
    //     }
    // };

    const handleOnChangeUserName = (value) => {
        setTempUserName(value.target.value)
    };

    // const handleOnChangeName = (value) => {
    //     setTempFullName(value.target.value)
    // };

    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Search
                name='searchUserName'
                addonBefore='User Name:'
                placeholder="Input User Name"
                onSearch={onSearchUserName}
                style={{
                    width: 250,
                    marginBottom: 10,
                    marginRight: 10,
                }}
                value={tempUserName}
                onChange={handleOnChangeUserName}
            />
            {/* <Search
                name='searchFullName'
                addonBefore='Full Name:'
                placeholder="Input Full Name"
                onSearch={onSearchFullName}
                style={{
                    width: 300,
                }}
                allowClear
                value={tempFullName}
                onChange={handleOnChangeName}
            /> */}

            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                }}
            >
                <UserList />
            </div>
        </>
    );
}

export default UserPage;