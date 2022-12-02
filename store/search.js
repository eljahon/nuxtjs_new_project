export const state = () => ({
  searchList: [],
});
export const mutations = {
  SET_SEARCH: (state, payload) => {
    state.userList = payload;
  },
};
export const actions = {
  async set_search_list({commit}, payload) {
    const {filter, type} = payload;
    try {
      const data = await this.$axios.get('search', {
        params: {
          filter: filter,
        }
      });
      commit('SET_SEARCH', data);
      return {...data}
    } catch (err) {
      console.log(err
      )
    }
    // commit("SET_USER", payload);
  },
};
export const getters = {
  get_user_lit: (state) => state.userList,
};
