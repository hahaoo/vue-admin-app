import Vue from "vue";
import VueRouter from "vue-router";
// import store from "@/store";
// import { isLoginApi } from "@/api/login.js";

import login from "../views/login.vue";
import index from "../views/index.vue";
import userCenter from "../views/userCenter.vue";

import domesticOrder from "../views/domesticOrder.vue";
import overseasOrder from "../views/overseasOrder.vue";
import packageApply from "../views/packageApply.vue";
import warehouse from "../views/warehouse.vue";
import addressManage from "../views/addressManage.vue";
import addressDetail from "../views/addressDetail.vue";
import confirmSend from "../views/confirmSend.vue";
import postLimit from "../views/postLimit.vue";

import orderDetail from "../views/orderDetail.vue";
import freightEstimation from "../views/freightEstimation.vue";
import production from "../views/production.vue"; //介绍


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/login",
    name: "login",
    meta: {
      loginRequired: false
    },
    component: login
  },
  {
    path: "/index",
    name: "index",
    meta: {
      loginRequired: false
    },
    component: index
  },
  {
    path: "/production",
    name: "production",
    meta: {
      loginRequired: false
    },
    component: production
  },
  {
    path: "/overseasOrder",
    name: "overseasOrder",
    component: overseasOrder
  },
  {
    path: "/domesticOrder",
    name: "domesticOrder",
    component: domesticOrder
  },
  {
    path: "/userCenter",
    name: "userCenter",
    component: userCenter
  },
  {
    path: "/packageApply",
    name: "packageApply",
    component: packageApply
  },
  {
    path: "/warehouse",
    name: "warehouse",
    component: warehouse
  },
  {
    path: "/addressManage",
    name: "addressManage",
    component: addressManage
  },
  {
    path: "/addressDetail",
    name: "addressDetail",
    component: addressDetail
  },
  {
    path: "/confirmSend",
    name: "confirmSend",
    component: confirmSend
  },
  {
    path: "/postLimit",
    name: "postLimit",
    component: postLimit
  },
  {
    path: "/orderDetail",
    name: "orderDetail",
    component: orderDetail
  },
  {
    path: "/freightEstimation",
    name: "freightEstimation",
    component: freightEstimation
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//全局拦截 调试的时候关闭
// router.beforeEach((to, from, next) => {
//   var meta = to.meta;
//   var loginRequired = false;
//   console.log(to);

//   if (!("loginRequired" in meta)) {
//     loginRequired = true;
//   } else {
//     loginRequired = meta["loginRequired"];
//   }

//   console.log(to);
//   /**
//    * 必须登录
//    */
//   if (loginRequired) {
//     isLoginApi()
//       .then(res => {
//         if (res.flag) {
//           let data = {
//             apiUserToken: res.data.apiToken,
//             apiUserId: res.data.outerUserId,
//             nickName: res.data.nickName,
//             apiSubUserId: "0"
//           };
//           // alert(JSON.stringify(data));
//           store.commit("setAuthData", { data: data });
//           next();
//         } else {
//           let severname =
//             window.location.protocol +
//             "//" +
//             window.location.hostname +
//             (window.location.port ? ":" + window.location.port : "");
//             var successUrl = severname + to.fullPath;
//             localStorage.setItem("successUrl", successUrl);
//             let redirectUrl = severname + "/login"
//             window.location.href = `${severname}/wechat/oAuth2Api/auth?redirectUrl=${redirectUrl}`;
//         }
//       })
//       .catch(); //判断是否登录
//   } else {
//     //alert("next")
//     next();
//   }
// });

export default router;
