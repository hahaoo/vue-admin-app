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
    [Loading.name]: Loading
  },
  data() {
    return {
      isWxClientEvn: true
    };
  },
  created() {
    //调试代码
    // this.executeLogin();
    var iswx = this.isWxClient();
    if (iswx) {
      this.executeLogin();
    } else {
      this.redirectLogin();
    }
  },
  methods: {
    getParameters() {
      var url = window.location.href;
      // console.log("obj------", obj);
      // alert(JSON.stringify(url));
      if (url == "") {
        return null;
      }
      url = decodeURIComponent(url);
      url = url.substring(1);
      var str = url.replace(/&/g, "','");
      str = str.replace(/=/g, "':'");
      str = "({'" + str + "'})";
      var obj = eval(str);
      console.log("obj------", obj);
      return obj;
    },
    async executeLogin() {
      //alert("executeLogin.....");
      var openid = this.getParameters()["openid"];
      if (openid) {
        let data = { openId: this.getParameters()["openid"] };
        let res2 = await loginApi(data);
        if (res2.flag) {
          // alert("----------:"+res2.flag);
          var successUrl = "/";
          if (localStorage.getItem("successUrl")) {
            successUrl = localStorage.getItem("successUrl");
            localStorage.removeItem("successUrl");
          }
          // alert("successUrl:"+successUrl);
          window.history.replaceState({}, "", successUrl);
          window.location.href = successUrl;
        }
      } else {
        this.redirectLogin();
      }
    },
    redirectLogin() {
            let severname =
            window.location.protocol +
            "//" +
            window.location.hostname +
            (window.location.port ? ":" + window.location.port : "");
            let redirectUrl = severname + "/login"
            window.location.href = `${severname}/wechat/oAuth2Api/auth?redirectUrl=${redirectUrl}`;
    },
    isWxClient() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      }
      return false;
    }
  }
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
