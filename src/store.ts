
import Vuex, { Store } from 'vuex'
import Vue from "vue";
Vue.use(Vuex);

export interface State {
    accessToken: string | null
}

export default new Store<State>({
    state() {
        return {
            accessToken: null
        }
    },

    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            state.accessToken = token;
        }
    }
})

