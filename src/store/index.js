import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    todoActiveId: null,
    maxId: 0,
  },
  getters: {},
  mutations: {
    pushTodo(state, todo) {
      if (Array.isArray(todo)) {
        state.todos = [...todo, state.todos];
      } else {
        state.todos.unshift(todo);
      }
      state.maxId = state.todos.reduce((acc, curr) =>
        acc.id > curr.id ? acc : curr
      ).id;
    },

    changeTodoActiveId(state, todoId) {
      state.todoActiveId = todoId;
    },

    todoDone(state, todoId) {
      state.todos[
        state.todos.findIndex((todo) => todo.id === todoId)
      ].completed = true;
    },

    todoNotDone(state, todoId) {
      state.todos[
        state.todos.findIndex((todo) => todo.id === todoId)
      ].completed = false;
    },

    todoDelete(state, todoId) {
      state.todos.splice(
        [state.todos.findIndex((todo) => todo.id === todoId)],
        1
      );
    },

    sortAsc(state) {
      state.todos = state.todos.sort((a, b) => a.id - b.id);
    },
  },
  actions: {
    getTodo(context, Object) {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => {
          context.commit("pushTodo", json);
        });
    },
  },
  modules: {},
});
