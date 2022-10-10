<script>
import SvgTasks from "@/components/svg/Tasks";
import SvgGear from "@/components/svg/Gear";

export default {
  components: {
    SvgTasks,
    SvgGear,
  },
  data: () => ({
    items: [{ id: 0, text: "Tasks" }],
  }),

  computed: {
    defaultTodo() {
      return {
        id: this.$store.state.maxId + 1,
        title: "",
        completed: false,
      };
    },
  },

  methods: {
    newTask() {
      const todo = this.defaultTodo;
      this.$store.commit("pushTodo", todo);
      this.$store.commit("changeTodoActiveId", todo.id);
    },
    sortAsc() {
      this.$store.commit("changeTodoActiveId", null);
      this.$store.commit("sortAsc");
    },
  },
};
</script>

<template>
  <v-card class="menu-bar" tile>
    <v-list flat>
      <v-subheader>
        <span class="marker"></span>
        Company
      </v-subheader>
      <div>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <svg-tasks />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
          <span class="count">{{ $store.state.todos.length }}</span>
        </v-list-item>
        <div class="asc" @click="sortAsc()">По возрастанию</div>
      </div>

      <div class="settings" @click="newTask()">
        <svg-gear class="settings__icon" />
        <div>New task</div>
      </div>
    </v-list>
  </v-card>
</template>

<style lang="scss" scoped>
.menu-bar {
  position: fixed;
  max-width: 320px;
  width: 320px;
  padding: 36px 24px 0;
  height: 100vh;

  @media (max-width: 1024px) {
    height: auto;
    max-width: 100vw;
    width: 100vw;
    padding: 0;
    top: 0;
  }

  .v-list {
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: 1024px) {
      max-height: 100px;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      width: 100vw;
    }
  }
  .v-subheader {
    font-size: 16px;
    font-weight: 700;
  }
  .v-list-item {
    margin-top: 44px;
    border-radius: 8px;
    background: $color-gray;

    @media (max-width: 1024px) {
      margin-top: 0;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      margin-right: 20px;
    }

    &__icon {
      margin-right: 12px;
      width: 16px;
      height: 16px;
      min-width: inherit;
    }
    .count {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      width: 20px;
      height: 20px;
      color: #fff;
      background-color: $color-theme;
      border-radius: 4px;
    }
  }
  .settings {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: $color-gray-lite;
    margin-top: auto;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    @media (max-width: 1024px) {
      margin-top: 0;
    }

    &:hover {
      color: $color-theme;
    }
    &__icon {
      width: 18px;
      height: 18px;
      margin-right: 12px;
    }
  }
  .asc {
    margin-top: 15px;
    cursor: pointer;
  }
  .v-subheader {
    justify-content: center;
  }
  .marker {
    width: 24px;
    height: 24px;
    background-color: $color-theme;
    border-radius: 4px;
    margin-right: 8px;
  }
}
</style>
