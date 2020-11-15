<template>
<div>
  <div class="todo-detail-header">
    <i v-if="isMobile" class="material-icons" @click="backToSelectedUser">{{ $t('chevronLeft') }}</i>
    <h4>{{ $t('todoDetails.header', {name:selectedUser.name}) }}</h4>
  </div>
  <div v-for="(todo, index) in selectedUserTodos" :key="index">
    <TodoListItem
      :todo="todo"
    />
  </div>
</div>
</template>
  
<script>
import TodoListItem from './TodoListItem';

export default {
  components: {
    TodoListItem
  },

  props: {
    selectedUser: {
      type: Object,
      required: true
    },

    selectedUserTodos: {
      type: Array,
      required: true
    }
  },

  computed: {
    isMobile() {
      return screen.width < 500;
    }
  },

  methods: {
    backToSelectedUser() {
      this.$emit('setSelectedUserTodos', []);
      this.$emit('setIsUserTodosExpanded', false);
    },
  }
}
</script>

<style lang="scss" scoped>

@media screen and (max-width: 500px) {
  .todo-detail-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    h4{
      margin-bottom: 0;
      margin-left: 10px;
    }
  }
}
</style>