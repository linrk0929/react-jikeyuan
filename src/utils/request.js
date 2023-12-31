import axios from "axios";
import { clearToken, getToken } from "./token";
import router from "@/router";
//1.根域名配置
//2.超时时间
//3.请求拦截器/响应拦截器
const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout:3000
})

//添加请求拦截器
//在请求发送之前 做拦截 插入一些自定义的配置
http.interceptors.request.use((config) => { 
    // if not login a token
    const token = getToken()
    if (token) { 
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => { 
    return Promise.reject(error)
})
//添加响应拦截器
//在响应返回到客户端之前 做拦截 重点处理返回的数据
http.interceptors.response.use((response) => { 
    //2xx 范围内的状态码都会触发该函数
    //对响应数据做点什么
    return response.data
}, (error) => { 
    //超出2xx 范围内的状态码都会出发该函数
    //对响应错误做点什么
    if (error.response.status === 401) { 
        clearToken()
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})

export { http}