<template>
  <div class="hero">
    <div class="hero_logo">
      <img :src="getLogo()" />
    </div>
    <div class="hero_info">
      <h1 class="hero_title" v-if="isCustom('title')">{{ custom.title }}</h1>
      <h1 class="hero_title" v-else>{{ data.name }}</h1>
      <p class="hero_text" v-html="custom.text" v-if="isCustom('text')"></p>
      <p class="hero_text" v-html="data.description_text" v-else></p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getLogo() {
      if (this.data.uploaded_logo !== null) {
        return "https://edgeryders.eu/" + this.data["uploaded_logo"]["url"];
      }
    },
    isCustom(field) {
      var x = field;
      if (this.custom[x]) {
        return true;
      } else {
        return false;
      }
    }
  },
  props: ["data", "custom"]
};
</script>
