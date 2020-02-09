<template>
  <div class="hero md:hero-md">
    <div class="content_wrapper md:content_wrapper-md">
      <div class="hero_logo hidden sm-block">
        <img :src="getLogo()" />
      </div>
      <div class="hero_info">
        <div class="title_logo sm-hidden">
          <img :src="getLogo()" />
        </div>
        <h1 class="hero_title" v-if="isCustom('title')">{{ custom.title }}</h1>
        <h1 class="hero_title" v-else>{{ data.name }}</h1>
        <p class="hero_text" v-html="custom.text" v-if="isCustom('text')"></p>
        <p class="hero_text" v-html="data.description_text" v-else></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getLogo() {
      if (this.data.uploaded_logo && this.data.uploaded_logo.url) {
        return `https://edgeryders.eu/${this.data.uploaded_logo.url}`;
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
