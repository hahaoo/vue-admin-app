import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "", //测试token
    employee: {}, //所属公司信息
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
