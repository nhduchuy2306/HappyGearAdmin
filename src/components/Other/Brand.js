import React, { useState, useRef, useEffect, useContext } from 'react';
import brandApi from '../../api/brandApi';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import { NotificationContext } from '../Context/NotificationProvider';
import EditOtherModal from './EditOtherModal';
import DeleteOtherModal from './DeleteOtherModal';



const Brand = () => {

    const openNotificationWithIcon = useContext(NotificationContext);

    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const [list, setList] = useState([]);
    const [dis, setDis] = useState({ disabled: true });
    const [brand, setBrand] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    

    useEffect(() => {
        brandApi.getAll()
            .then(res => res.data)
            .then(data => setList(data));
    }, []);

    const onNameChange = (event) => {
        setName(event.target.value.toUpperCase());
        if (event.nativeEvent.data === null) {
            if (name.length < 3) {
                setDis({ disabled: true });
            }
        } else {
            if (name.length > 0) {
                setDis({});
            }
        }
    };

    const addItem = (e) => {
        e.preventDefault();

        brandApi.add({ brandName: name, status: true })
            .then(res => res.data)
            .then(data => setList([...list, data]));
        openNotificationWithIcon('Add Brand Successfully!', `Brand ${name} added!!!`);
        setName('');
        setDis({ disabled: true });
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);

    };

    const handleOnChange = (item) => {
        setBrand(list.find(onj => onj.brandId===item));
    }

    const handleEdit = () => {
        setIsModalOpen(true)
    }
    
    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    }

    return (
        <>
            <DeleteOtherModal data={brand} list={list} setList = {setList} isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen}  />
            <EditOtherModal list={list} setList={setList} data={brand} setData={setBrand} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Select
                style={{
                    width: 300,
                }}
                placeholder="Brand List"
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider
                            style={{
                                margin: '8px 0',
                            }}
                        />
                        <Space
                            style={{
                                padding: '0 8px 4px',
                            }}
                        >
                            <Input
                                placeholder="Please enter item"
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                            />
                            <Button {...dis} type="text" icon={<PlusOutlined />} onClick={addItem}>
                                Add item
                            </Button>
                        </Space>
                    </>
                )}
                showSearch
                filterOption={(input, option) =>
                    (option?.label ?? '').toUpperCase().includes(input.toUpperCase())
                  }
                options={list.map((item) => ({
                    label: item.brandName + [item.status ? '' : ' (Expire)'],
                    value: item.brandId,
                }))}
                onChange={handleOnChange}
                value={brand?.brandId}
            />
            <Button style={{margin: 5 }} onClick={handleEdit}><EditOutlined  /></Button>
            <Button danger onClick={handleDelete} ><DeleteOutlined /></Button>
        </>
    );
};
export default Brand;