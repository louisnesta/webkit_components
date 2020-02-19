<template>
    <div class="content_wrapper md:content_wrapper-md">
      <div class="hero_image md:hero_image-md" v-if="data.image.url" :style="{flexBasis: data.image.width + 'px'}">
        <img :src="data.image.url" />
      </div>
      <div class="hero_info md:hero_info-md">
        <h1 class="hero_title">{{ data.title }}</h1>
        <div class="hero_text" v-html="data.text.content"></div>
      </div>

      <div class="hero_video" v-if="data.background.video">
        <video autoplay loop muted>
          <source :src="data.background.video" type="video/mp4">
        </video>
      </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  methods: {
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  props: ["data"]
};
</script>
