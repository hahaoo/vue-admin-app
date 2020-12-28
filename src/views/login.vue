<template>
  <div class="login">
    <van-loading type="spinner" vertical color="#1989fa" size="40">
      正在登录中 ...</van-loading
    >
  </div>
</template>
<script>
import { Loading } from "vant";
// import store from "@/store/index";
import { loginApi } from "@/api/login.js";
export default {
  components: {
    [Loading.name]: Loading,
  },
  data() {
    return {
      isWxClientEvn: true,
    };
  },
  created() {
    //调试代码
    this.executeLogin();
  },
  methods: {
    async executeLogin() {
      let res = await loginApi();
      if (res.ack == "200") {
        store.commit("setAuthToken", res.data.token);
        store.commit("setEmployeeData", res.data.employee);
      }
    },
<<<<<<< HEAD
    redirectLogin() {
      let severname =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
      let redirectUrl = severname + "/login";
      window.location.href = `${severname}/wechat/oAuth2Api/auth?redirectUrl=${redirectUrl}`;
    },
    isWxClient() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      }
      return false;
    },
=======
>>>>>>> 2013f209d85883c1b45b6059b28b23650d841224
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background-color: #fff;
  padding-top: 50%;
  .login-title {
    text-align: center;
    margin: 20px;
    font-size: 20px;
  }
}
</style>
