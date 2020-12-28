import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //全局公用的权限数据 ,pc 测试的时候打开
    authenticationData: {
      apiUserToken: "e236ff0c44c59263ffc4f73010431d6f",
      apiUserId: "19494",
      nickName: "风轻云淡@1111#~",
      apiSubUserId: "0",
    },
    //客户海外地址选择
    customerCurrentAddress: {},
    isLoading: false,
  },
  mutations: {
    setAuthData(state, payload) {
      state.authenticationData = payload.data;
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
