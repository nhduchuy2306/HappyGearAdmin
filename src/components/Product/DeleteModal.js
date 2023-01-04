import React, { useState, useContext } from 'react';
import productApi from '../../api/productApi';
import { NotificationContext } from '../Context/NotificationProvider';
import { Modal } from 'antd';

const DeleteModal = ({ isModalOpen, setIsModalOpen, productId, setLoading, loading }) => {

    const openNotificationWithIcon = useContext(NotificationContext)

    const [confirmLoading, setConfirmLoading] = useState(false);


    const handleOk = () => {
        setConfirmLoading(true);      
        setTimeout(() => {
            setIsModalOpen(false);
            setConfirmLoading(false);
            setLoading(!loading);
            productApi.remove(productId);
            openNotificationWithIcon('Delete Successfully!!!',`Your product ID: ${productId} have been deleted.`);
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
                <p>{`Do you want to delete Product ID : ${productId ? productId : ''}`}</p>
            </Modal>
        </>
    );
};
export default DeleteModal;