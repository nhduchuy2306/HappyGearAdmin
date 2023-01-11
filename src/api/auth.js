import axiosClient from "./axiosClient";

const authApi = {
    login(params){
        const url = '/v1/auth/authenticate'
        return axiosClient.post(url, params)
    }

};

export default authApi;