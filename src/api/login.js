import http from "@/config/httpLogin";

export const loginApi = (data) => http.Axios.post("/extra/loginTest", data); // 执行登录操作测试
