import axios from "axios";
import { loginPath } from "./globalParam";

import { Notify } from "vant";

const Axios = axios.create({
  baseURL: loginPath,
  timeout: 12000,
  responseType: "json",
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json"
  }
});

//添加请求拦截器
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // error 的回调信息
    // console.log("request：error", error);
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    console.log(res.data);
    return res.data;
  },
  error => {
    // console.log(error);
    //服务器状态码不是200的情况
    // Notify({
    //   type: "danger",
    //   message: "请求异常:" + error.response.status + ",消息:" + error.response.data + "," + error.response.statusText
    // });
    return Promise.reject(error);
  }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
/* eslint-disable */
export default {
  Axios,
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};
