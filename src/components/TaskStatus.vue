<script>
import TaskCard from "@/components/TaskCard";

export default {
  components: {
    TaskCard,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tabActive: {
      type: String,
      default: 'TODO',
    },
  },
};
</script>

<template>
  <div class="tasks__status">
    <div class="tasks__status-name" @click="$emit('click')">{{ name }}</div>
    <div class="tasks__status-items">
      <div
        v-for="todo in $store.state.todos"
        :key="todo.id"
        class="tasks__item"
      >
        <task-card
          v-if="todo.completed === completed"
          :todo="todo"
          class="tasks__card"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tasks {
  display: grid;
  grid-template-columns: auto auto;
  gap: 36px;
  width: 100%;
  justify-content: center;
  padding: 80px 20px;

  &__status {
    &-name {
      margin-bottom: 32px;
    }
  }
  &__item {
    width: 320px;

    @media (max-width: 1024px) {
      width: 100%;
    }
  }
  &__card {
    margin-bottom: 24px;
  }
}
</style>
