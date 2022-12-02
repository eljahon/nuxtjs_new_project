export const state = () => ({
  userList: [],
  userAuth: {}
});
export const mutations = {
  SET_USER: (state, payload) => {
    state.userList = payload;
  },
  SET_AUTH_LIST: (state, paylaod) => {
    state.userAuth = paylaod
  }
};
export const actions = {
  async nuxtServerInit({ commit }, app) {
    this.$auth.setUser(this.$cookies.get('user_info'));
    commit('SET_AUTH_LIST',this.$cookies.get('user_info'))
  },
  SOCKET_MESSAGE (ctx, message) {
    console.log('messeges recide', message)
  },
  set_user_list({ commit }, payload) {
    commit("SET_USER", payload);
  },
};
export const getters = {
  get_user_lit: (state) => state.userList,
};
