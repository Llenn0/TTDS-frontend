import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      lightStatus: true
    }
  },
  mutations: {
    changeLightStatus (state) {
      state.lightStatus = !state.lightStatus
    }
  }
})

export default store