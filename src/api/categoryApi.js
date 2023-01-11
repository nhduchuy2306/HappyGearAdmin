import axiosClient from "./axiosClient";

const categoryApi = {
    getAll(params){
        const url = '/admin/categories'
        return axiosClient.get(url, {params})
    },
    get(id){
        const url = `/admin/categories/${id}`
        return axiosClient.get(url);
    },
    add(data){
        const url = '/admin/categories/create'
        return axiosClient.post(url, data);
    },
    update(data){
        const url = `/admin/categories/update/${data.categoryId}`
        return axiosClient.put(url, data);
    },
    remove(id){
        const url = `/admin/categories/delete/${id}`
        return axiosClient.delete(url);
    }
};

export default categoryApi;