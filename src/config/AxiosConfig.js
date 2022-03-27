import axios from "axios";
import {getJwt, getRefresh, refresh} from "../services/AuthService"

axios.interceptors.request.use(function(config){
    if(config.url.endsWith("refresh") || config.url.endsWith("login") || config.url.endsWith("signup")) return config
    if(getRefresh() != null) config.headers['Authorization'] = 'Bearer ' + getJwt();
    return config
}, function(error){
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    if(error.response.status == 401){
        if(!getRefresh()) return Promise.reject(error)
        await refresh()
        error.config.headers['Authorization'] = 'Bearer ' + getJwt();
        return axios.request(error.config)
    }
    return Promise.reject(error)
});