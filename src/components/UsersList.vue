<template>
  <div class="container my-4 mx-0">
    <div class="row">
      <div v-if="users" :class="{'col-4': !isMobile, 'col-12': isMobile, 'mobile-selected-user': isMobile && selectedUser}">
        <h4>Users</h4>
        <div class="row px-3" v-for="(user, index) in users" :key="index">
          <div 
            :class="{'user-list-row': true, 'selected-bg': (selectedUser && user.id === selectedUser.id)}"
            @click="selectUser(user)"
          >
            <p>{{ user.name }}</p>
            <i v-if="!user.isSelectedUser" class="material-icons">{{ $t('chevronRight') }}</i>
            <i v-if="user.isSelectedUser" class="material-icons">{{ $t('chevronLeft') }}</i>
          </div>
        </div>
      </div>
      <div 
        :class="{'col-4 user-details': true, 'col-12': isMobile, 'mobile-selected-user': isMobile && isSelectedUserTodos}" 
        v-if="selectedUser">
        <UserDetails
          :selectedUser="selectedUser"
          :isUserTodosExpanded="isUserTodosExpanded"
          @setIsUserTodosExpanded="setIsUserTodosExpanded"
          @setSelectedUserTodos="setSelectedUserTodos"
          @backToUserList="backToUserList"
        />
      </div>
      <div :class="{'col-4': true, 'col-12': isMobile}" v-if="selectedUser && selectedUserTodos && selectedUserTodos.length > 0 && isUserTodosExpanded">
        <TodoDetails
          :selectedUser="selectedUser"
          :selectedUserTodos="selectedUserTodos"
          @setSelectedUserTodos="setSelectedUserTodos"
          @setIsUserTodosExpanded="setIsUserTodosExpanded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserDetails from './UserDetails';
import TodoDetails from './TodoDetails';

export default {

  components: {
    UserDetails,
    TodoDetails
  },

  data() {
    return {
      users: [],
      selectedUser: null,
      isUserTodosExpanded: false,
      selectedUserTodos: []
    }
  },

  computed: {
    isMobile() {
      return screen.width < 500;
    },

    isSelectedUserTodos() {
      if(this.selectedUserTodos && this.selectedUserTodos.length > 0) {
        return true;
      }
    }
  },
  
  methods: {

    setIsUserTodosExpanded(value) {
      this.isUserTodosExpanded = value;
    },

    setSelectedUserTodos(value) {
      this.selectedUserTodos = value;
    },

    backToUserList(value) {
      this.selectedUser.isSelectedUser = value[1];
      this.selectedUser = value[0];
    },

    selectUser(user) {
      if(this.selectedUser && this.selectedUser.id === user.id) {
        user.isSelectedUser = false;
        this.selectedUser = null;
      } else if(this.selectedUser && this.selectedUser.id !== user.id){
        this.isUserTodosExpanded = false;
        this.selectedUser.isSelectedUser = false;
        this.selectedUser = user;
        user.isSelectedUser = true;
      } else {
        this.selectedUser = user;
        this.selectedUser.isSelectedUser = true;
      }
    },
  },

  created() {
    this.$http
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then( response => {
        return response.json();
      })
      .then( data => {
        const clonedData = JSON.parse(JSON.stringify(data));
        this.users = clonedData
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-width: 100%;

  .user-list-row p {
    margin-bottom: 0;
  }

  .user-list-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border: 1px solid lightgray;
    align-items: center;
    height: 50px;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 10px
  }

  .selected-bg {
    background: lightgrey;
  }
  .mobile-selected-user {
    display: none;
  }
}
</style>