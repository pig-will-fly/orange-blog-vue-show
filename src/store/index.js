import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showNav: false,
        sides: {
            owner: false,
            newest: false,
            hottest: false,
            cloud: false
        },
        accessTypes: [{
            code: null,
            type: "home",
            text: "主页"
        }, {
            code: 1,
            type: "poetry",
            text: "诗语"
        }, {
            code: 2,
            type: "poem",
            text: "词话"
        }, {
            code: 3,
            type: "essay",
            text: "随笔"
        }, {
            code: 4,
            type: "java",
            text: "Java"
        }, {
            code: 5,
            type: "mysql",
            text: "MySQL"
        }, {
            code: 6,
            type: "linux",
            text: "Linux"
        }]
    },
    mutations: {
        SET_SIDES(state, data) {
            state.sides = data;
        },
        SET_SHOW_NAV(state, status) {
            state.showNav = status;
        }
    },
    actions: {},
    modules: {}
})
