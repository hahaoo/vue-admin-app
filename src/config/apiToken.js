
// import axios from "axios";
// // import store from "@/store/index";
// import { loginPath } from "./globalParam";

// function getParameters() {

//   var url = window.location.href;
//   console.log("obj------", obj);
//   if (url == "") {
//     return null;
//   }
//   url = decodeURIComponent(url);
//   url = url.substring(1);
//   var str = url.replace(/&/g, "','");
//   str = str.replace(/=/g, "':'");
//   str = "({'" + str + "'})";
//   var obj = eval(str);
//   console.log("obj------", obj);
//   return obj;
// }
// //获取权限
// (function () {
//   axios({
//     baseURL: loginPath,
//     method: 'post',
//     url: '/subject/isLogin'
//   }).then(res => {
//     /**
//    * 执行登录操作
//    */
//     console.log("data------", res);
//     //没有登录
//     if (!res.data.flag) {
//       axios({
//         headers: {
//           "Content-Type": "application/json"
//         },
//         baseURL: loginPath,
//         method: "post",
//         url: "/login",
//         responseType: "json",
//         data: JSON.stringify({
//           "openId": getParameters()["openid"]
//         })
//       }).then(res => {

//       }).catch(
//         error => {
//           return Promise.reject(error);
//         }
//       )
//     }



//   }).catch(error => {
//     return Promise.reject(error);
//   });
// })();
