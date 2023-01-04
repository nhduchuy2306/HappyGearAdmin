import axiosClient from "./axiosClient";

const roleApi = {
    getAll(params){
        const url = '/roles'
        return axiosClient.get(url, {params})
    },
    get(id){
        const url = `/roles/${id}`
        return axiosClient.get(url);
    },
    add(data){
        const url = '/roles/create'
        return axiosClient.post(url, data);
    },
    update(data){
        const url = `/roles/update/${data.roleId}`
        return axiosClient.put(url, data);
    },
    remove(id){
        const url = `/roles/delete/${id}`
        return axiosClient.delete(url);
    }
};

export default roleApi;