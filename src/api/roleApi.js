import axiosClient from "./axiosClient";



const roleApi = {
    getAll(params){
        const url = '/admin/roles'
        return axiosClient.get(url, {params})
    },
    get(id){
        const url = `/admin/roles/${id}`
        return axiosClient.get(url);
    },
    add(data){
        const url = '/admin/roles/create'
        return axiosClient.post(url, data);
    },
    update(data){
        const url = `/admin/roles/update/${data.roleId}`
        return axiosClient.put(url, data);
    },
    remove(id){
        const url = `/admin/roles/delete/${id}`
        return axiosClient.delete(url);
    }
};

export default roleApi;