import React, { useState, useContext, useEffect } from 'react';
import categoryApi from '../../api/categoryApi';
import brandApi from '../../api/brandApi';
import roleApi from '../../api/roleApi';
import { NotificationContext } from '../Context/NotificationProvider';
import { Modal } from 'antd';

const DeleteOtherModal = ({ list, setList, isModalOpen, setIsModalOpen, data }) => {

    const openNotificationWithIcon = useContext(NotificationContext)

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [listKey, setListKey] = useState();

    useEffect(() => {
        if (data) {
            setListKey(Object.keys(data));
        }
    }, [data])


    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {

            switch (listKey[0]) {
                case 'categoryId':
                    categoryApi.remove(data[listKey[0]]);
                    break
                case 'brandId':
                    brandApi.remove(data[listKey[0]]);
                    break
                case 'roleId':
                    roleApi.remove(data[listKey[0]]);
                    break
                default:
                    console.log("lỗi r nè!")
            }

            let index = list.findIndex((obj => obj[listKey[0]] === data[listKey[0]]));
            list[index].status = false;
            setList(list);

            setConfirmLoading(false);
            setIsModalOpen(false);
            openNotificationWithIcon('Delete Successfully!!!', ` ${data[listKey[1]]} have been deleted.`);
        }, 2000);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title="Comfirm Delete"

                open={isModalOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose
            >
                <p>{`Do you want to delete : ${data && listKey ? data[listKey[1]] : ''}`}</p>
            </Modal>
        </>
    );
};
export default DeleteOtherModal;