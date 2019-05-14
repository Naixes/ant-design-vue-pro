import request from "../../utils/request";
import router from "../../router";

const state = {
  info: {
    payAccount: "123456",
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const actions = {
  // 如果传递的参数是一个对象，第一个参数是store包含commit，第二个参数是dispatch的参数对象
  //   async submitStepForm(o, i) {
  //     console.log(o);
  //     console.log(i);
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: "/api/form",
      method: "POST",
      data: payload
    });
    commit("saveStepFormData", payload);
    router.push("/form/step-form/result");
  }
};

const mutations = {
  // 保存每一步的数据到info中
  // 如果传递的参数是一个对象，接收时的第一个参数是state，第二个参数是commit的参数对象
  saveStepFormData(state, { payload }) {
    state.info = {
      ...state.info,
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
