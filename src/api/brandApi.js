import axiosClient from "./axiosClient";

const brandApi = {
    getAll(params){
        const url = '/admin/brands'
        return axiosClient.get(url, {params})
    },
    get(id){
        const url = `/admin/brands/${id}`
        return axiosClient.get(url);
    },
    add(data){
        const url = '/admin/brands/create'
        return axiosClient.post(url, data);
    },
    update(data){
        const url = `/admin/brands/update/${data.brandId}`
        return axiosClient.put(url, data);
    },
    remove(id){
        const url = `/admin/brands/delete/${id}`
        return axiosClient.delete(url);
    }
};

export default brandApi;