<template>
<div>
  <div class="todo-detail-header">
    <i v-if="isMobile" class="material-icons" @click="backToSelectedUser">chevron_left</i>
    <h4>Todo details</h4>
  </div>
  <div v-for="(todo, index) in selectedUserTodos" :key="index">
    <div class="todos-list-row-container">
      <div :class="{'todos-list-row': true, 'completed': todo.completed}" @click="bringTodoDetails(todo)">
        <p class="mb-0">{{ todo.title }}</p>
        <i v-if="!selectedTodo || todo.id !== selectedTodo.id" class="material-icons">expand_more</i>
        <i v-if="selectedTodo && todo.id === selectedTodo.id" class="material-icons">expand_less</i>
      </div>
      <div v-if="selectedTodo && todo.id === selectedTodo.id">
        <p class="mb-0 mx-2 completed status" v-if="todo.completed">Completed</p>
        <p class="mb-0 mx-2 status" v-if="!todo.completed">Not completed</p>
        <p :class="{'mb-0 mx-2': true, 'completed': todo.completed}">Id: {{todo.id}}</p>
      </div>
    </div>
  </div>
</div>
</template>
  
<script>
export default {
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

  data() {
    return {
      selectedTodo: null
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

    bringTodoDetails(todo) {
      if(this.selectedTodo && this.selectedTodo.id === todo.id) {
        this.selectedTodo = null;
      } else {
        this.selectedTodo = todo;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.todos-list-row-container {
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-bottom: 5px;
}

.todos-list-row {
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
}

.completed {
  opacity: 0.5;
}

.status {
  border-top:1px solid lightgray;
}

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