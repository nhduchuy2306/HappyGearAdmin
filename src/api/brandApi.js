import axiosClient from "./axiosClient";

const brandApi = {
    getAll(params){
        const url = '/brands'
        return axiosClient.get(url, {params})
    },
    get(id){
        const url = `/brands/${id}`
        return axiosClient.get(url);
    },
    add(data){
        const url = '/brands/create'
        return axiosClient.post(url, data);
    },
    update(data){
        const url = `/brands/update/${data.brandId}`
        return axiosClient.put(url, data);
    },
    remove(id){
        const url = `/brands/delete/${id}`
        return axiosClient.delete(url);
    }
};

export default brandApi;