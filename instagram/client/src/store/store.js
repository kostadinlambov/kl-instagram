import Vue from 'vue';
import Vuex from 'vuex';
// import {time} from '@/store/time';
import { userService } from "@/infrastructure/userService";
import { CHANGE_IS_AUTHENTICATED } from "@/store/mutationTypes";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isAuth: userService.isAuth(),
    },
    getters: {
        isAuth: (state) => state.isAuth,
    },
    mutations: {
        [CHANGE_IS_AUTHENTICATED]: (state, payload) => {
            state.isAuth = payload.value;
        }
    },
    actions: {
        changeIsAuth: (context, payload) => context.commit({
            type:CHANGE_IS_AUTHENTICATED,
            value: payload.value
        })
    }

    // actions: {
    //     getPosts: context => {

    //     }
    // },

    // modules: {
    //     time: {
    //         namespaced: true,
    //         state: time.state,
    //         ...time,
    //     }
    // }
})