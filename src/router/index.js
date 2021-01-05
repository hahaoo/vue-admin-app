import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { loginApi } from "@/api/login.js";

import login from "../views/login.vue";
import index from "../views/index.vue";
import startPinyou from "../views/startPinyou.vue"; //开始转运
import startTransport from "../views/startTransport.vue"; //开始拼邮
import pinyouDetail from "../views/pinyouDetail.vue"; //拼邮详情

import userCenter from "../views/userCenter.vue";
import orderManage from "../views/orderManage.vue";
import warehouse from "../views/warehouse.vue";
import addressManage from "../views/addressManage.vue";
import addressDetail from "../views/addressDetail.vue";
import confirmSend from "../views/confirmSend.vue";
import postLimit from "../views/postLimit.vue";

import orderDetail from "../views/orderDetail.vue";
import freightEstimation from "../views/freightEstimation.vue";
import production from "../views/production.vue"; //介绍
import logistics from "../views/logistics.vue"; //物流

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/login",
    name: "login",
    meta: {
      loginRequired: false,
    },
    component: login,
  },
  {
    path: "/index",
    name: "index",
    component: index,
  },
  {
    path: "/startPinyou",
    name: "startPinyou",
    component: startPinyou,
  },
  {
    path: "/startTransport",
    name: "startTransport",
    component: startTransport,
  },
  {
    path: "/pinyouDetail",
    name: "pinyouDetail",
    component: pinyouDetail,
  },
  {
    path: "/production",
    name: "production",
    meta: {
      loginRequired: false,
    },
    component: production,
  },
  {
    path: "/orderManage",
    name: "orderManage",
    component: orderManage,
  },

  {
    path: "/userCenter",
    name: "userCenter",
    component: userCenter,
  },

  {
    path: "/warehouse",
    name: "warehouse",
    component: warehouse,
  },
  {
    path: "/addressManage",
    name: "addressManage",
    component: addressManage,
  },
  {
    path: "/addressDetail",
    name: "addressDetail",
    component: addressDetail,
  },
  {
    path: "/confirmSend",
    name: "confirmSend",
    component: confirmSend,
  },
  {
    path: "/postLimit",
    name: "postLimit",
    component: postLimit,
  },
  {
    path: "/orderDetail",
    name: "orderDetail",
    component: orderDetail,
  },
  {
    path: "/freightEstimation",
    name: "freightEstimation",
    component: freightEstimation,
  },
  {
    path: "/logistics",
    name: "logistics",
    component: logistics,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//全局拦截 调试的时候关闭
router.beforeEach((to, from, next) => {
  var meta = to.meta;
  var loginRequired = false;
  if (!("loginRequired" in meta)) {
    loginRequired = true;
  } else {
    loginRequired = meta["loginRequired"];
  }
  /**
   * 必须登录,登录测试
   */
  if (loginRequired) {
    if (store.state.token) {
      next();
    } else {
      loginApi()
        .then((res) => {
          if (res.ack == "200") {
            store.commit("setAuthToken", res.data.token);
            store.commit("setEmployeeData", res.data.employee);
            next();
          }
        })
        .catch();
    }
  } else {
    //alert("next")
    next();
  }
});

export default router;
