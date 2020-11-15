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
    getUsers({commit}) {
      Vue.http
        .get(`https://jsonplaceholder.typicode.com/users`)
        .then( response => {
          return response.json();
        })
        .then( data => {
          /* to clone the original data */
          const clonedData = JSON.parse(JSON.stringify(data));
          commit('setUsers', clonedData);
        })
        .catch(error => {
          /* error handling can be improved */
          console.log(error);
        });
    },

    getAllTodos({commit}) {
      Vue.http
        .get(`https://jsonplaceholder.typicode.com/todos`)
        .then( response => {
          return response.json();
        })
        .then( data => {
          /* to clone the original data */
          const clonedData = JSON.parse(JSON.stringify(data));
          commit('setAllTodos', clonedData);
        })
        .catch(error => {
          /* error handling can be improved */
          console.log(error);
        });
    },
  }
});