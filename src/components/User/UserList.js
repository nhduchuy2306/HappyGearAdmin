import userApi from "../../api/userApi";
import EditUserModal from "./EditUserModal"
import DeleteUserModal from "./DeleteUserModal"
import { SearchContext } from "../Context/SearchProvider";
import React, { useEffect, useState, useContext } from 'react';
import { Avatar, Divider, List, Skeleton, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";




const UserList = () => {

    const searchContext = useContext(SearchContext);

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [page, setPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userData, setUserData] = useState();
    const [username, setUsername] = useState();

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        setPage(page + 1);

        if (searchContext.searchUsername !== '') {
            userApi.get(searchContext.searchUsername)
                .then(res => res.data)
                .then(data => {
                    setList([data]);
                    setTotalUser(1);
                    setPage(0);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                })
        }
        else {
            userApi.getAllByPage({ p: page })
                .then(res => res.data)
                .then(data => {
                    setList([...list, ...data[0]]);
                    setTotalUser(data[1]);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }

    };

    useEffect(() => {
        setList([]);
        loadMoreData();
    }, [searchContext.searchUsername]);

    const handleEdit = (item) => {
        setUserData(item);
        setIsModalOpen(true);
    }

    const handleDelete = (username) => {
        setUsername(username);
        setIsDeleteModalOpen(true);
    }


    return (
        <>
            <DeleteUserModal list={list} setList={setList} username={username} isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} />
            <EditUserModal list={list} setList={setList} user={userData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div
                id="scrollableDiv"
                style={{
                    height: 600,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <InfiniteScroll
                    dataLength={list.length}
                    next={() => {

                        loadMoreData();
                    }}
                    hasMore={list.length < totalUser}
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={list}
                        renderItem={(item) => (
                            <List.Item
                                key={item.username}
                                actions={[
                                    <Button type="link" onClick={() => {
                                        handleEdit(item);
                                    }}>Edit</Button>,
                                    <Button type="link" style={{ color: 'red' }} onClick={() => { handleDelete(item.username) }}>Delete</Button>
                                ]}
                            >
                                {item.status ? <SmileOutlined style={{ color: 'green' }} /> : <FrownOutlined style={{ color: 'red' }} />}
                                <List.Item.Meta
                                    avatar={<Avatar size={60} src={`https://avatars.dicebear.com/api/avataaars/${Math.random()}.svg`} />}
                                    title={item.username}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </>
    );
};
export default UserList;