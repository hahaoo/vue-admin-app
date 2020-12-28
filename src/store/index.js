import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
<<<<<<< HEAD
    //全局公用的权限数据 ,pc 测试的时候打开
    authenticationData: {
      apiUserToken: "e236ff0c44c59263ffc4f73010431d6f",
      apiUserId: "19494",
      nickName: "风轻云淡@1111#~",
      apiSubUserId: "0",
    },
=======
    token: "", //测试token
    employee: {}, //所属公司信息

>>>>>>> 2013f209d85883c1b45b6059b28b23650d841224
    //客户海外地址选择
    customerCurrentAddress: {},
    isLoading: false,
  },
  mutations: {
    setAuthToken(state, payload) {
      state.token = payload;
    },
    setEmployeeData(state, payload) {
      console.log(payload);
      state.employee = payload;
    },

    //全局loading
    updateLoadingStatus(state, isLoading) {
      state.isLoading = isLoading;
    },
    setCustomerCurrentAddress(state, payload) {
      state.customerCurrentAddress = payload.data;
    },
  },
  actions: {},
  modules: {},
});
