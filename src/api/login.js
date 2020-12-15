
import http from "@/config/httpLogin";

export const isLoginApi = data => http.Axios.post("/subject/isLogin", data); //判断是否登录


export const loginApi = data => http.Axios.post("/login", data); // 执行登录操作
