import axiosClient from "./axiosClient";

const userApi = {
    getAll(params) {
        const url = '/users'
        return axiosClient.get(url, { params })
    },
    get(userName) {
        const url = `/users/${userName}`
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/users/create'
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/users/update/${data.userName}`
        return axiosClient.put(url, data);
    },
    remove(userName) {
        const url = `/users/delete/${userName}`
        return axiosClient.delete(url);
    },
    getAllByPage(params) {
        const url = '/users/'
        return axiosClient.get(url, { params })
    },
    getTotal() {
        const url = '/users/total'
        return axiosClient.get(url)
    },
    getByPageAndName(params) {
        const url = '/users/name'
        return axiosClient.get(url, { params })
    }
};

export default userApi;