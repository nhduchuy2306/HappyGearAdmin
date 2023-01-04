import React, { useState, useRef, useEffect, useContext } from 'react';
import roleApi from '../../api/roleApi';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import { NotificationContext } from '../Context/NotificationProvider';
import EditOtherModal from './EditOtherModal';
import DeleteOtherModal from './DeleteOtherModal';



const Role = () => {

    const openNotificationWithIcon = useContext(NotificationContext);

    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const [list, setList] = useState([]);
    const [dis, setDis] = useState({ disabled: true });
    const [role, setRole] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    

    useEffect(() => {
        roleApi.getAll()
            .then(res => res.data)
            .then(data => setList(data));
    }, []);

    const onNameChange = (event) => {
        setName(event.target.value.toLowerCase());
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

        roleApi.add({ roleName: name, status: true })
            .then(res => res.data)
            .then(data => setList([...list, data]));
        openNotificationWithIcon('Add Role Successfully!', `Role ${name} added!!!`);
        setName('');
        setDis({ disabled: true });
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);

    };

    const handleOnChange = (item) => {
        setRole(list.find(onj => onj.roleId===item));
    }

    const handleEdit = () => {
        setIsModalOpen(true)
    }
    
    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    }

    return (
        <>
            <DeleteOtherModal data={role} list={list} setList = {setList} isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen}  />
            <EditOtherModal list={list} setList={setList} data={role} setData={setRole} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Select
                style={{
                    width: 300,
                }}
                placeholder="Role List"
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
                    label: item.roleName + [item.status ? '' : ' (Expire)'],
                    value: item.roleId,
                }))}
                onChange={handleOnChange}
                value={role?.roleId}
            />
            <Button style={{margin: 5 }} onClick={handleEdit}><EditOutlined  /></Button>
            <Button danger onClick={handleDelete} ><DeleteOutlined /></Button>
        </>
    );
};
export default Role;