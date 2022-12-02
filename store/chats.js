export const state = () => ({
  byIdchatList: [],
  userAuth: {},
  activeRooms: [],
  notActiveRooms:[],
  message: [],
  activeUser: null
});
export const mutations = {
  SET_BY_ID_CHATS: (state, payload) => {
    state.byIdchatList = payload;
  },
  SET_ACTIVE_ROOM: (state, payload) => {
    state.activeRooms = payload
  },
  SET_ITEM_ROOM: (state, paylaod) => {
    const oldRooms  = [...state.activeRooms]
    oldRooms.unshift(payload)
    state.activeRooms = oldRooms;
  },
  SET_NOT_ACTIVE_ROOM: (state, payload) => {
    state.notActiveRooms = payload
  },
  SET_MESSAGE:(state, payload) => {
    state.message = payload
  },
  SET_NEW_MESSAGE: (state, payload) => {
    const oldMessage = [...state.message];
    state.message = [...oldMessage, ...[payload]]
  },
  SET_ATIVE_USER: (state, payload) => {
    state.activeUser = payload;
  }


};
export const actions = {
  async getRooms({ commit },payload) {
    try {
      const data = await this.$axios.get(`chatrooms`, {
        params: {...payload}
      })
      const {results, pagination} = data;
      if(!payload.filters.is_completed) {
        commit('SET_ACTIVE_ROOM', results)
      } else {
        commit('SET_NOT_ACTIVE_ROOM', results)
      }
      return {results, pagination};
    } catch (err) {
      console.log(err)
    }
  },
 async chat_By_Id({ commit }, payload) {
   const {id, params} = payload;
  try {
    const data = await this.$axios.get(`chatrooms/${id}`, {
      params: {...params}
    })
    return data;
  } catch (err) {
    console.log(err)
  }
  },
  async setMessage ({commit}, payload) {
    commit('SET_NEW_MESSAGE', payload)
  },
  clearMessage ({commit}) {
    commit('SET_MESSAGE', [])
  },
 async chatmessages({ commit,state }, payload) {
   console.log('state ===>>', state)
  try {
    const {results, pagination} = await this.$axios.get(`chatmessages`, {
      params: {...payload}
    });
    commit('SET_MESSAGE', results)
    return data;
  } catch (err) {
    console.log(err)
  }
  },
 async getByIdChatrooms({ commit }, payload) {
const {id, params} = payload
  try {
    const {results, pagination} = await this.$axios.get(`chatmessages/${id}`, {
      params: {...params}
    });
    console.log(data)
    // commit('SET_MESSAGE', results)
    // return data;
  } catch (err) {
    console.log(err)
  }
  },
  async setAvtiveUser ({commit }, payload) {
    commit('SET_ATIVE_USER', payload)
  },
  setActivRoom  ({commit, state}, payload) {
    console.log(payload, ctx)
    commit('SET_ITEM_ROOM', payload)
  },
  setNewMessage ({commit, state}, payload) {

  }
};
export const getters = {
  getMessage: (state) => state.message,
  getActiveUser: (state) => state.activeUser,
  getActiveRoom: (state) => state.activeRooms
};
