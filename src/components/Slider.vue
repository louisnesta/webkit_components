<template>
  <div
    class="carousel-view"
    @mouseover="clear_interval"
    @mouseleave="toggle_play"
    v-if="slides.length !== undefined"
  >
      <div class="toggle_menu md:flex">
        <div
          class="toggle previous"
          @click="prev"
        ></div>
        <div
          class="toggle next"
          @click="next"
        ></div>
      </div>

    <transition-group class="carousel" tag="div">
      <div
        v-for="item in slides"
        class="slide md:slide-md"
        :key="item.created_at"
        v-touch:swipe.left="next"
        v-touch:swipe.right="prev"
      >
    
        <div class="item_post md:item_post-md" :style="{ background: 'url(' + item.image_url + ')' }">
          <div class="item_title md:item_title-md">
            <div>
            <a :href="getPermalink(item.slug)" target="_blank">
              <h4>{{ item.title }}</h4>
              </a>
            </div>
              <p class="date">
                <b>{{ item.created_at | formatDate }}</b>
              </p>
          </div>
          <Profile class="ml-2" :data="getUser(item.posters[0].user_id)" />
        </div>
        <div v-html="item.excerpt" class="excerpt md:excerpt-md"></div>

      </div>
    </transition-group>
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
  @apply px-6 mt-6;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.carousel {
  @apply mt-4;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: hidden;
  width: 100%;   
}



.slide .item_title {
    p.date {
      margin: 20px 10px !important;
      background: black;
      display: inline-block;
      width: auto;
      color: white;
      padding: 10px;
      font-size: 14px;
    }
    p.excerpt {
      font-size: 14px;
    }
  h4 {
      font-weight: bold;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      background: white;
      display: inline;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      padding: 15px 10px;
      line-height: 35px !important;
      margin: 10px;
    }
}
.slide-md {
 
 
  .image {
   

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
  .item_post-md {
    display: flex;
    padding: 20px;
    height: 100%;
    background: #fff;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;

  }
}
.slide:first-of-type {
  opacity: 0;
}
.slide:last-of-type {
  opacity: 0;
}
</style>
