import React, { useState, useContext } from 'react';
import userApi from '../../api/userApi';
import { NotificationContext } from '../Context/NotificationProvider';
import { Modal } from 'antd';

const DeleteUserModal = ({ list, setList, isModalOpen, setIsModalOpen, userName }) => {

    const openNotificationWithIcon = useContext(NotificationContext)

    const [confirmLoading, setConfirmLoading] = useState(false);


    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            userApi.remove(userName);

            let index = list.findIndex((obj => obj.userName === userName));
            list[index].status = false;
            setList(list);

            setConfirmLoading(false);
            setIsModalOpen(false);
            openNotificationWithIcon('Delete Successfully!!!', ` ${userName} have been deleted.`);
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
                <p>{`Do you want to delete User : ${userName ? userName : ''}`}</p>
            </Modal>
        </>
    );
};
export default DeleteUserModal;