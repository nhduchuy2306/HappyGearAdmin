import React from "react";
import { Input, Space } from "antd";
const { Search } = Input;

const SearchBar = () => {
  const onSearch = (value) => console.log(value);

  return (
    <div style={{marginTop: '40px'}} >
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </Space>
    </div>
  );
};

export default SearchBar;
