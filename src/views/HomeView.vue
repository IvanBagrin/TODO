<script>
import BarMenu from "@/components/MenuBar";
import TaskCard from "@/components/TaskCard";
import TaskStatus from "@/components/TaskStatus";

export default {
  name: "MenuBar",

  components: {
    BarMenu,
    TaskCard,
    TaskStatus,
  },

  data() {
    return {
      tabActive: "TODO",
    };
  },

  computed: {
    screenMobile() {
      return window.screen.width < 768;
    },
  },

  methods: {
    changeTab(tab) {
      if (window.screen.width < 768) {
        this.tabActive = tab;
      }
    },
  },

  mounted() {
    this.$store.dispatch("getTodo", 1);
  },
};
</script>

<template>
  <div class="wrapper">
    <div>
      <bar-menu />
    </div>
    <div></div>
    <div class="tasks">
      <task-status
        name="TODO"
        :tabActive="tabActive"
        @click="changeTab('TODO')"
      />
      <task-status
        name="DONE"
        :tabActive="tabActive"
        completed
        @click="changeTab('DONE')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  background: $color-gray;
  height: 100%;

  @media (max-width: 1024px) {
    display: block;
  }
  .tasks {
    display: grid;
    grid-template-columns: auto auto;
    gap: 36px;
    width: 100%;
    justify-content: center;
    padding: 80px 20px;
    margin-left: 320px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      margin-left: 0;
      margin-top: 80px;
    }
  }
}
</style>
