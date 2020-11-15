<template>
  <div id="container" :style="cssProps">
    <div class="logo-container px-4" :style="cssProps">
      <img src="./assets/logo.png" alt="logo" class="logo py-2" @click="showMainPage">
      <img id="settings" src="./assets/settings.svg" alt="settings-icon" @click="goToSettings">
    </div>
    <AppSettings 
      v-if="isSettings"
      @changeHeaderColor="changeHeaderColor"
      @changeFontFamily="changeFontFamily"
    />
    <UsersList v-else/>
  </div>
</template>

<script>
import UsersList from './components/UsersList';
import AppSettings from './components/AppSettings';

export default {

  components: {
    UsersList,
    AppSettings
  },

  computed: {
    cssProps() {
        return {
          '--color': this.headerColor,
          '--fontFamily': this.fontFamily
        }
    },
  },

  data() {
    return {
      isSettings: false,
      headerColor: '#FF8000',
      fontFamily: ''
    }
  },

  methods: {
    goToSettings() {
      this.isSettings = !this.isSettings;
    },

    showMainPage() {
      this.isSettings = false;
    },

    changeHeaderColor(value) {
      this.headerColor = value;
    },

    changeFontFamily(value) {
      this.fontFamily = value;
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  font-family: var(--fontFamily);

  .logo-container {
    background-color: var(--color);
    display: flex;
    justify-content: space-between;

    .logo {
      height: 70px;
    }
  }
}
</style>
