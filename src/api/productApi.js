import axiosClient from "./axiosClient";

const productApi = {
    getAll(params) {
        const url = '/products'
        return axiosClient.get(url, { params })
    },
    get(id) {
        const url = `/products/${id}`
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/products/create'
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/products/update/${data.productId}`
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `/products/delete/${id}`
        return axiosClient.delete(url);
    },
    getAllByPage(params) {
        const url = '/products/'
        return axiosClient.get(url, { params })
    },
    getTotal() {
        const url = '/products/total'
        return axiosClient.get(url)
    },
    getByPageAndName(params) {
        const url = '/products/name'
        return axiosClient.get(url, { params })
    }
};

export default productApi;