import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:7001/admin/", //外网
    timeout: 10 * 1000,
});

// 响应拦截器
instance.interceptors.response.use(response => {   
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.status === 200 &&response.data.code === -1) {  
        window.location.href = '/login'; 
    }  
})

export default instance