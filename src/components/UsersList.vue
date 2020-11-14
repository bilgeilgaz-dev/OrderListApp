<template>
<div class="container my-4 mx-0">
  <div class="row">
    <div v-if="users">
      <h4>Users</h4>
      <div class="row px-3" v-for="(user, index) in users" :key="index">
        <div @click="selectUser(user)">
          <p>{{ user.name }}</p>
          <i v-if="!user.isSelectedUser" class="material-icons">chevron_right</i>
          <i v-if="user.isSelectedUser" class="material-icons">chevron_left</i>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {

  data() {
    return {
      users: [],
    }
  },

  computed: {
  },
  
  methods: {

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
}
</style>