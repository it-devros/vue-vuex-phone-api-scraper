import {
  API_KEY
} from '@/config'

import {
  API
} from '@/utils'

const initialState = {
  scrapedData: []
}

const getters = {
  getScrapedData: state => state.scrapedData
}

const actions = {
  getDataFromPhoneAPI: ({ commit }, obj) => {
    let data = {
      method: 'get',
      url: `/phone_intel?api_key=${API_KEY}&phone=${obj.phone}&phone.country_hint=${obj.country_code}`
    }
    return API(data).then(res => {
      commit('setScrapedData', res.data)
    }).catch(err => {
      throw err
    })
  }
}

const mutations = {
  setScrapedData: (state, obj) => {
    let temp = Object.assign([], state.scrapedData)
    temp.push(obj)
    state.scrapedData = temp
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
