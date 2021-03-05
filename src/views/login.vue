<template>
  <div class="login">
    <van-loading type="spinner" vertical color="#1989fa" size="40">
      正在登录中 ...
    </van-loading>
  </div>
</template>
<script>
import { Loading } from "vant";
import { loginApi } from "@/api/login.js";
import { wxclientloginApi } from "@/api/index";

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
      let openid = this.$route.query.openid;
      let appid = this.$route.query.appid;
      if (openid != null && appid != null) {
        let param = {
          openid: openid,
          appid: appid,
        };
        wxclientloginApi(param)
          .then((res) => {
            if (res.ack == "200") {
              this.$store.commit("setAuthToken", res.data.token);
              this.$store.commit("setEmployeeData", res.data.employee);
              if (
                this.$route.query.redirect != "undefined" &&
                this.$route.query.redirect != null &&
                this.$route.query.redirect != ""
              ) {
                let uri = "/" + this.$route.query.redirect;
                this.$router.push({ path: uri });
              } else {
                this.$router.push({ path: "/index" });
              }
            } else {
              this.$router.push({
                path: "/errorPage",
                query: { msg: "没有权限", code: "901" },
              });
            }
          })
          .catch(() => {
            this.$router.push({
              path: "/errorPage",
              query: { msg: "内部错误", code: "500" },
            });
          });
      } else {
        loginApi()
          .then((res) => {
            if (res.ack == "200") {
              this.$store.commit("setAuthToken", res.data.token);
              this.$store.commit("setEmployeeData", res.data.employee);
              this.$router.push({ path: "/index" });
            } else {
              this.$router.push({
                path: "/errorPage",
                query: { msg: "没有权限", code: "901" },
              });
            }
          })
          .catch(() => {
            this.$router.push({
              path: "/errorPage",
              query: { msg: "内部错误", code: "500" },
            });
          });
      }
      // let res = await loginApi();
      // if (res.ack == "200") {
      //   this.$store.commit("setAuthToken", res.data.token);
      //   this.$store.commit("setEmployeeData", res.data.employee);
      // }
    },
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
