<template>
  <div
    class="carousel-view"
    @mouseover="clear_interval"
    @mouseleave="toggle_play"
    v-if="slides.length !== undefined"
  >
    <transition-group class="carousel" tag="div">
      <div
        v-for="item in slides"
        class="slide"
        :key="item"
        v-touch:swipe.left="next"
        v-touch:swipe.right="prev"
      >
        <div
          class="image"
          :style="{ background: 'url(' + item.image_url + ')' }"
        >
          <div class="item_data" v-if="item.posters[0].user_id">
            <Profile :data="getUser(item.posters[0].user_id)" />
          </div>
        </div>
        <div class="item_post">
          <a class="item_title" :href="getPermalink(item.slug)" target="_blank">
            <h4>{{ item.title }}</h4>
            <p class="date">
              <b>{{ item.created_at | formatDate }}</b>
            </p>
          </a>
          <p v-html="item.excerpt" class="excerpt"></p>
        </div>
      </div>
    </transition-group>
    <div class="carousel-controls">
      <button class="carousel-controls__button" @click="prev">
        prev
      </button>
      <button class="carousel-controls__button" @click="next">next</button>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/Profile.vue";
import moment from "moment";

export default {
  data() {
    return {
      play: false,
      users: null,
      slides: null
    };
  },
  components: {
    Profile
  },
  methods: {
    next() {
      const first = this.slides.shift();
      this.slides = this.slides.concat(first);
    },
    prev() {
      const last = this.slides.pop();
      this.slides = [last].concat(this.slides);
    },
    getUser(userId) {
      if (this.users.length) {
        return this.users.filter(user => user.id == userId)[0];
      }
    },
    clear_interval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = false;
      }
    },
    getPermalink(slug) {
      return "https://edgeryders.eu/t/" + slug;
    },
    toggle_play() {
      if (this.autoplay && this.interval) {
        this.play = false;
        this.clear_interval();
      }
      if (this.autoplay && !this.interval) {
        var self = this;
        this.interval = setInterval(function() {
          self.next();
        }, this.autoplay);
        this.play = true;
      }
    }
  },
  created() {
    this.slides = this.custom.topic_list.topics.slice(0);
    this.users = this.custom.users.slice(0);
    if (this.autoplay != undefined) {
      this.toggle_play(this.autoplay);
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("dddd, MMMM DD YYYY");
    }
  },
  props: ["autoplay", "custom"]
};
</script>

<style lang="scss" scoped>
.carousel-view {
  @apply px-6;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 100%;
  min-height: 25em;
}
.slide {
  flex: 0 0 90%;
  height: 20em;
  margin: 1em;
  overflow: scroll;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: between;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease-in-out;
  .image {
    background: black;
    flex: 0 0 300px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-position: center center !important;
    background-size: cover !important;
    .item_data {
      color: white;
      position: relative;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 10px 15px 15px;
      bottom: 0;
      width: 100%;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      &:before {
        content: "";
        width: 90%;
        position: absolute;
        left: 5%;
        top: -5px;
        background: rgba(255, 255, 255, 0.3);
        height: 1px;
      }
      p {
        margin-right: 10px;
        font-size: 14px;
        font-weight: 100;
      }
    }
  }
  .item_post {
    display: flex;
    padding: 20px;
    height: 100%;
    background: #fff;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    .item_title {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    h4 {
      font-weight: bold;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      padding-bottom: 7px;
      margin-bottom: 4px;
    }
    p.date {
      margin: 3px 0 0 0 !important;
      padding: 0;
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
    }
    p.excerpt {
      font-size: 14px;
    }
  }
}
.slide:first-of-type {
  opacity: 0;
}
.slide:last-of-type {
  opacity: 0;
}
</style>
