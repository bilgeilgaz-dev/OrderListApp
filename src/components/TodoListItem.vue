<template>
  <div class="todos-list-row-container">
    <div :class="{'todos-list-row': true, 'completed': todo.completed}" @click="bringTodoDetails(todo)">
      <p class="mb-0">{{ todo.title }}</p>
      <i v-if="!selectedTodo || todo.id !== selectedTodo.id" class="material-icons">{{ $t('expandMore') }}</i>
      <i v-if="selectedTodo && todo.id === selectedTodo.id" class="material-icons">{{ $t('expandLess') }}</i>
    </div>
    <div v-if="selectedTodo && todo.id === selectedTodo.id">
      <p class="mb-0 mx-2 completed status" v-if="todo.completed">{{ $t('todoDetails.statusCompleted') }}</p>
      <p class="mb-0 mx-2 status" v-if="!todo.completed">{{ $t('todoDetails.statusNotCompleted') }}</p>
      <p :class="{'mb-0 mx-2': true, 'completed': todo.completed}">{{ $t('todoDetails.id', {id: todo.id}) }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedTodo: null
    }
  },

  methods: {
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
</style>