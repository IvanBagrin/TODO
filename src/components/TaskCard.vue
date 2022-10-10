<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      value: this.todo.title,
    };
  },

  methods: {
    changeTodo(todo) {
      if (window.screen.width >= 1024) {
        this.$store.commit("changeTodoActiveId", todo.id);
      }
    },

    changeTodoMobile(todo) {
      if (window.screen.width < 1024) {
        this.$store.commit("changeTodoActiveId", todo.id);
      }
    },

    doneTodo(todo) {
      this.$store.commit("changeTodoActiveId", null);
      this.$store.commit("todoDone", todo.id);
    },
    notDoneTodo(todo) {
      this.$store.commit("changeTodoActiveId", null);
      this.$store.commit("todoNotDone", todo.id);
    },
    deleteTodo(todo) {
      this.$store.commit("changeTodoActiveId", null);
      this.$store.commit("todoDelete", todo.id);
    },
  },
};
</script>

<template>
  <div
    class="card"
    :class="{ active: $store.state.todoActiveId === todo.id }"
    @click="changeTodoMobile(todo)"
    @dblclick="changeTodo(todo)"
  >
    <div>
      <div class="card__title" v-if="$store.state.todoActiveId !== todo.id">
        {{ value }}
      </div>
      <textarea
        v-model="value"
        ref="input"
        v-if="$store.state.todoActiveId === todo.id"
        class="card__input"
      ></textarea>
    </div>

    <div class="card__count">
      Created by <span>{{ todo.id }}</span>
    </div>
    <div class="card__btn-wrap">
      <div class="card__todo" @click="notDoneTodo(todo)">TODO</div>
      <div class="card__done" @click="doneTodo(todo)">DONE</div>
      <div class="card__delete" @click="deleteTodo(todo)">DELETE</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 20px;
  border-radius: 8px;
  background: #fcfcfd;
  box-shadow: 0px 0.5px 2px rgba(16, 24, 40, 0.3);
  cursor: pointer;
  &__title {
    display: block;
    min-height: 24px;
    overflow: hidden;
  }
  &__input {
    width: 100%;
    padding: 0 2px;
  }
  &__btn {
    &-wrap {
      display: flex;
      justify-content: space-between;
      & > div:hover {
        color: blue;
      }
    }
  }
}
.card.active {
  border: 1px solid $color-gray-lite;
}
</style>
