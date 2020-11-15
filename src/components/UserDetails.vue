<template>
  <div>
    <div class="user-detail-header">
      <i v-if="isMobile" class="material-icons" @click="backToUserList">{{ $t('chevronLeft') }}</i>
      <h4>{{ $t('userDetails.header', {name:selectedUser.name}) }}</h4>
    </div>
    <div class="todo-row" @click="getSelectedUserTodos">
      <p>{{ $t('userDetails.todos', {name:selectedUser.name}) }}</p>
      <i v-if="!isUserTodosExpanded || isMobile" class="material-icons">{{ $t('chevronRight') }}</i>
      <i v-if="isUserTodosExpanded && !isMobile" class="material-icons">{{ $t('chevronLeft') }}</i>
    </div>
    <div>
      <label class="name">{{ $t('userDetails.name') }}</label>
      <p>{{ selectedUser.name }}</p>
      <label>{{ $t('userDetails.email') }}</label>
      <p>{{ selectedUser.email }}</p>
      <label>{{ $t('userDetails.address') }}</label>
      <p class="mb-0">{{ selectedUser.address.street }}</p>
      <p class="mb-0">{{ selectedUser.address.suite }}</p>
      <p class="mb-0"><span>City: </span>{{ selectedUser.address.city }}</p>
      <p><span>{{ $t('userDetails.zipcode') }}</span>{{ selectedUser.address.zipcode }}</p>
      <label>{{ $t('userDetails.phone') }}</label>
      <p>{{ selectedUser.phone }}</p>
      <label>{{ $t('userDetails.website') }}</label>
      <p>{{ selectedUser.website }}</p>
      <label>{{ $t('userDetails.companyName') }}</label>
      <p>{{ selectedUser.company.name }}</p>
      <label>{{ $t('userDetails.companyTags') }}</label>
      <p>{{ selectedUser.company.catchPhrase }}</p>
      <label>{{ $t('userDetails.companyBusiness') }}</label>
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