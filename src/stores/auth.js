
const initialState = {
  is_authed: false,
  currentUser: null
}

const getters = {
  getAuthStatus: state => state.is_authed,
  getCurrentUser: state => state.currentUser
}

const actions = {

  setAuthStatus: ({ commit }, data) => {
    commit('setAuthStatus', data)
  }
}

const mutations = {

  setAuthStatus: (state, data) => {
    state.is_authed = data.is_authed
  },
  setCurrentUser: (state, data) => {
    state.currentUser = Object.assign({}, data)
  },
  refreshCurrentUser: (state) => {
    state.currentUser = null
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
