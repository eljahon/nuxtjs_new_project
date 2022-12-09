
export const state = () => ({
  byIdchatList: [],
  userAuth: {},
  activeRooms: [],
  notActiveRooms: [],
  message: [],
  activeUser: null,
  isRender: false,
});
export const mutations = {
  SET_BY_ID_CHATS: (state, payload) => {
    state.byIdchatList = payload;
  },
  SET_ACTIVE_ROOM: (state, payload) => {
    state.activeRooms = payload
  },
  SET_ITEM_ROOM: (state, paylaod) => {
    state.activeRooms.push(paylaod)
  },
  SET_NOT_ACTIVE_ROOM: (state, payload) => {
    state.notActiveRooms = payload
  },
  SET_MESSAGE: (state, payload) => {
    state.message = payload
  },
  SET_NEW_MESSAGE: (state, payload) => {
    const oldMessage = [...state.message];
    state.message = [...oldMessage, ...[payload]]
  },
  SET_ATIVE_USER: (state, payload) => {
    state.activeUser = payload;
  },
  DEL_MESSAGE: (state, payload) => {
    const data = [...state.message]
    state.message = data.filter((el) => el.id !== payload.id)
  },
  UP_MESSAGE: (state, payload) => {
    const data = [...state.message]
    state.message = data.map((el) => {
      if (el.id === payload.id) {
        el = {...payload};
        return el
      }
      return el
    })
  },
  UP_ROOMS_ACTIVE: (state, payload) => {
    state.activeRooms = state.activeRooms.map((el) => {
      if (el.id === payload.id) {
        el = payload
      }
      return el;
    })
  },
  SET_IS_RENDER: (state, payload) => {
    state.isRender = payload
  },
  UP_NOT_ACTIVE_ROOMS: (state, paylaod) => {
    state.notActiveRooms = state.notActiveRooms.map((el) => {
      if (el.id === paylaod.id) {
        el = paylaod;
        return el;
      }
      return el;
    })
  }
};
export const actions = {
  async getRooms({commit}, payload) {
    try {
      const data = await this.$axios.get(`chatrooms`, {
        params: {...payload}
      })
      const {results, pagination} = data;
      if (!payload.filters.is_completed) {
        commit('SET_ACTIVE_ROOM', results)
      } else {
        commit('SET_NOT_ACTIVE_ROOM', results)
      }
      return {results, pagination};
    } catch (err) {
      console.log(err)
    }
  },
  async chat_By_Id({commit}, payload) {
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
  async setMessage({commit}, payload) {
    commit('SET_NEW_MESSAGE', payload)
  },
  clearMessage({commit}) {
    commit('SET_MESSAGE', [])
  },
  async chatmessages({commit, state}, payload) {
    commit('SET_IS_RENDER', false)
    try {
      const {results, pagination} = await this.$axios.get(`chatmessages`, {
        params: {...payload}
      });
      commit('SET_MESSAGE', results)
      commit('SET_IS_RENDER' ,true)
      return data;
    } catch (err) {
      console.log(err)
    }
  },
  async getByIdChatrooms({commit}, payload) {
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
  async setAvtiveUser({commit}, payload) {
    commit('SET_ATIVE_USER', payload)
  },
  setActivRoom({commit, state}, payload) {
    const {ctx, data} = payload
    if (ctx.$route.query.room_id === 'new') {
      ctx.$router.push({
        path: ctx.localePath(ctx.$route.path),
        query: {...ctx.$route.query, room_id: data.id}
      })
    }
    console.log('create room ===>>', payload)
    commit('SET_ITEM_ROOM', data)
  },
  setNewMessage({commit, state}, payload) {

  },
  deletMessage({commit}, payload) {
    commit('DEL_MESSAGE', payload)
  },
  updateMessage({commit}, payload) {
    commit('UP_MESSAGE', payload);
  },
  updateRoomsActive: ({commit}, payload) => {
    commit('UP_ROOMS_ACTIVE', payload)
  },
  updateActiveNotRooms: ({commit}, payload) => {
    commit('UP_NOT_ACTIVE_ROOMS', payload)
  }
};
export const getters = {
  getMessage: (state) => state.message,
  getActiveUser: (state) => state.activeUser,
  getActiveRoom: (state) => state.activeRooms
};
