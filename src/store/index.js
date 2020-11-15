import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: null,
    allTodos: null
  },

  getters: {
    getUsers(state) {
      return state.users;
    },

    getAllTodos(state) {
      return state.allTodos;
    }
  },

  mutations: {
    setUsers(state, users) {
      state.users = users;
    },

    setAllTodos(state, todos) {
      state.allTodos = todos;
    }
  },

  actions: {
    getData({commit}, param) {
      Vue.http
        .get(`https://jsonplaceholder.typicode.com/${param}`)
        .then( response => {
          return response.json();
        })
        .then( data => {
          const clonedData = JSON.parse(JSON.stringify(data));
          if(param === 'todos'){
            commit('setAllTodos', clonedData);
          } else if (param === 'users') {
            commit('setUsers', clonedData);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
});