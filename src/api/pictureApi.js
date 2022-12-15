import axiosClient from "./axiosClient";

const pictureApi = {
    getAll(params){
        const url = '/pictures'
        return axiosClient.get(url, {params})
    },
    getByProductId(id){
        const url = `/pictures/product-main/${id}`
        return axiosClient.get(url);
    },
    add(data){
        const url = '/pictures'
        return axiosClient.post(url, data);
    },
    update(data){
        const url = `/pictures/${data.id}`
        return axiosClient.patch(url, data);
    },
    remove(id){
        const url = `/pictures/${id}`
        return axiosClient.delete(url);
    }
};

export default pictureApi;