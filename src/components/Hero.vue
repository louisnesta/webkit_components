<template>
  <div class="hero md:hero-md" :style="styleObject">
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
    <div class="hero_stats md:hero_stats-md">

        <div class="flex mb-3">
        <p class="topics"><span>Topics</span><span class="key">{{data.topic_count}}</span></p>
        <p class="posts"><span>Posts</span><span class="key">{{data.post_count}}</span></p>
        </div>

      </div>
    </div>

    <div class="video" v-if="custom.background.video">
    <video autoplay loop muted>
      <source :src="custom.background.video" type="video/mp4">
    </video>
  </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  methods: {
    getLogo() {
      if (this.data.uploaded_logo) {
        return `${this.baseUrl}/${this.data.uploaded_logo.url}`
      }
    },
    isCustom(field) {
      return this.custom[field];
    }
  },
  computed: {
    styleObject() {
      if (!this.custom.background) {
        return;
      }

      if (this.custom.background.url) {
        return {
          background: `url('${this.custom.background.url}')`,
          backgroundPosition: "cover"
        }
      } else if (this.custom.background.color) {
        return { background: this.custom.background.color }
      } else {
        return { background: "#efefef" }
      }
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  props: ["data", "custom", "baseUrl"]
};
</script>
