<template>
  <div class="container">
    <div class="row p-4">
      <div class="col-sm-6">
        <h5 class="m-4 pl-1">{{ $t('appSettings.header-1')}}</h5>
        <div class="color" v-for="(color, index) in colors" :key="index">
          <input type="radio" :id="color" :value="color" v-model="headerColor">
          <label :class="(color === '#FF8000') ? 'orange' : color" :for="color">{{ $t(`appSettings.${color}`)}}</label>
        </div>
      </div>

      <div class="col-sm-6">
        <h5 class="m-4 pl-1">{{ $t('appSettings.header-2')}}</h5>
        <div class="font" v-for="(font, index) in fontFamilies" :key="index">
          <input class="pt-3" type="radio" :id="font" :value="font" v-model="fontFamily">
          <label :class="font" :for="font">{{ $t(`appSettings.${font}`)}}</label>
        </div>
      </div>
    </div>
    <div class="row btn-container p-4 mx-2">
      <button class="btn btn-outline-secondary" @click="saveChanges">{{ $t('appSettings.save')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headerColor: null,
      fontFamily: null,
      colors: ['red', 'blue', '#FF8000', 'black'],
      fontFamilies: ['sans-serif', 'Times', 'monospace', 'Courier']
    }
  },

  methods: {
    changeHeaderColor() {
      this.$emit('changeHeaderColor', this.headerColor);
    },

    changeFontFamily() {
      this.$emit('changeFontFamily', this.fontFamily);
    },

    saveChanges() {
      if(this.headerColor) {
        this.changeHeaderColor();
      }
      if(this.fontFamily) {
        this.changeFontFamily();
      }
    }
  }
}
</script>

<style lang="scss" scoped>

input {
  margin-left: 30px;
}

.color label {
  width: 100px;
  border-radius: 10px;
  text-align: center;
  color: white;
}

.orange {
  background-color: #FF8000;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

.black {
  background-color: black;
}

.font {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  label {
    margin: 0 10px 0;
  }
}

.monospace {
  font-family: monospace;
}

.Times {
  font-family: Times;
}

.sans-serif {
  font-family: sans-serif;
}

.Courier {
  font-family: Courier;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid lightgray;
}

@media screen and (max-width: 500px) {
  .font, label {
    margin-bottom: 1rem;
  }
}

</style>