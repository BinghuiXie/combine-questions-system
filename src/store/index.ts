import Vue from 'vue'
import Vuex from 'vuex'
import signin from './signin';
import composeViewer from './composeViewer';
import personalCenter from './personalCenter'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        signin,
        composeViewer,
        personalCenter,
        
    }
})
