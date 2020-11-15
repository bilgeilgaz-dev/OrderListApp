<template>
  <div>
    <div class="user-detail-header">
      <i v-if="isMobile" class="material-icons" @click="backToUserList">{{ $t('chevronLeft') }}</i>
      <h4>UserDetails</h4>
    </div>
    <div class="todo-row" @click="getSelectedUserTodos">
      <p>{{ selectedUser.name }}</p>
      <i v-if="!isUserTodosExpanded || isMobile" class="material-icons">{{ $t('chevronRight') }}</i>
      <i v-if="isUserTodosExpanded && !isMobile" class="material-icons">{{ $t('chevronLeft') }}</i>
    </div>
    <div>
      <p>{{ selectedUser.name }}</p>
      <p>{{ selectedUser.email }}</p>
      <p class="mb-0">{{ selectedUser.address.street }}</p>
      <p class="mb-0">{{ selectedUser.address.suite }}</p>
      <p class="mb-0"><span>City: </span>{{ selectedUser.address.city }}</p>
      <p>{{ selectedUser.address.zipcode }}</p>
      <p>{{ selectedUser.phone }}</p>
      <p>{{ selectedUser.website }}</p>
      <p>{{ selectedUser.company.name }}</p>
      <p>{{ selectedUser.company.catchPhrase }}</p>
      <p> {{ selectedUser.company.bs }}</p>
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

    isUserTodosExpanded: {
      type: Boolean,
      required: true
    },
  },

  data() {
    return {
      allTodos: []
    }
  },

  computed: {
    isMobile() {
      return screen.width < 500;
    },
  },

  methods: {
    getSelectedUserTodos() {
      const userTodosArray= []
      if(this.isUserTodosExpanded) {
        this.$emit('setIsUserTodosExpanded', false);
      } else {
        this.$emit('setIsUserTodosExpanded', true);
        this.$emit('setSelectedUserTodos', []);
        this.allTodos.forEach( todo => {
          if( todo.userId === this.selectedUser.id ){
            userTodosArray.push(todo);
          }
        });
        this.$emit('setSelectedUserTodos', userTodosArray);
      }
    },

    backToUserList() {
      this.$emit('backToUserList', [null, false])
    },
  },

  created() {
    this.$http
      .get(`https://jsonplaceholder.typicode.com/todos`)
      .then( response => {
        return response.json();
      })
      .then( data => {
        const clonedData = JSON.parse(JSON.stringify(data));
        this.allTodos = clonedData
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style lang="scss" scoped>

label {
  font-size: 0.8rem;
  color: gray;
  margin-bottom: 0;
}

.todo-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: 1px solid lightgray;
  align-items: center;
  height: 50px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 10px;

  p {
    margin-bottom: 0;
  }
}

@media screen and (max-width: 500px) {
  .user-detail-header {
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