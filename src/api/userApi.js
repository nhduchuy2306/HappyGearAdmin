import axiosClient from "./axiosClient";

const userApi = {
    getAll(params) {
        const url = '/admin/users'
        return axiosClient.get(url, { params })
    },
    get(username) {
        const url = `/admin/users/${username}`
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/admin/users/create'
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/admin/users/update/${data.username}`
        return axiosClient.put(url, data);
    },
    remove(username) {
        const url = `/admin/users/delete/${username}`
        return axiosClient.delete(url);
    },
    getAllByPage(params) {
        const url = '/admin/users/'
        return axiosClient.get(url, { params })
    },
    getTotal() {
        const url = '/admin/users/total'
        return axiosClient.get(url)
    },
    getByPageAndName(params) {
        const url = '/admin/users/name'
        return axiosClient.get(url, { params })
    }
};

export default userApi;