import axios from "axios";
import { rootPath } from "./globalParam";
import router from "@/router/index.js";
import store from "@/store/index";
import { Notify, Toast } from "vant";

const Axios = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: rootPath,
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
    // 在发送请求之前做些什么，封装请求参数 
    if (store.state.token) {
      config.headers.common["token"] = store.state.token;
    }
    config.headers.common["lang"] = "zh_CN";
    
    let data = Object.assign(
      {},
      { companyid: store.state.employee.companyid },
      config.data
    );
    config.data = JSON.stringify(data);

    return config;
  },
  error => {
    // error 的回调信息
    // console.log("request：error", error);
    router.push("/login");
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    console.log("response：res", res);
    //对响应数据做些事 200 status 业务状态统一处理，其他返回业务
    //ErrorCode 为 9999 表示请求成功
    //1002 表示登录失效，需要重新登录
    // switch (res.data.ErrorCode) {
    //   case "9999":
    //     break;
    //   case "1002":
    //     window.location.reload();
    //     break;
    //   default:
    //     let msg = res.data.Message;
    //     msg ? Toast.fail(msg) : Toast.fail("服务器发生错误");
    // }
    return res.data;
  },
  error => {
    //服务器状态码不是200的情况
    console.log(error.response);
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
