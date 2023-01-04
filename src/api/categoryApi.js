import axiosClient from "./axiosClient";

const categoryApi = {
    getAll(params){
        const url = '/categories'
        return axiosClient.get(url, {params})
    },
    get(id){
        const url = `/categories/${id}`
        return axiosClient.get(url);
    },
    add(data){
        const url = '/categories/create'
        return axiosClient.post(url, data);
    },
    update(data){
        const url = `/categories/update/${data.categoryId}`
        return axiosClient.put(url, data);
    },
    remove(id){
        const url = `/categories/delete/${id}`
        return axiosClient.delete(url);
    }
};

export default categoryApi;