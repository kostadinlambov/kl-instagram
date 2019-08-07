import {INCREMENT_COUNTER} from '@/store/mutationTypes';


export const time = {
    state: {
        counter: 255,
    },
    getters: {
        doubleCounter: state => state.counter * 2,
        multyCounter: (state) => (number) => state.counter * number,
    },
    mutations: {
        [INCREMENT_COUNTER]: (state, payload ) => state.counter += payload.amount
    },
    actions:{
        incrementCounter: (context, payload) => context.commit({
              type: INCREMENT_COUNTER, 
              amount: payload.amount
            })
    }
}