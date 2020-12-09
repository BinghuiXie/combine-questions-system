import Vue from 'vue'
import Vuex from 'vuex'
import signin from './signin';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        signin
    }
})
