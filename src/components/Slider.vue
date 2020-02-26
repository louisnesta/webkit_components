<template>
  <div
    class="slider_container"
    @mouseover="clear_interval"
    @mouseleave="toggle_play"
  >
    <div class="toggle_menu md:flex">
      <div
        class="toggle previous"
        @click="changeSlide('previous')"
      ></div>
      <div
        class="toggle next"
        @click="changeSlide('next')"
      ></div>
    </div>

    <transition-group tag="div" class="slider" :name="currentTransition" mode="out-in">
      <div v-for="number in [currentIndex]" :key="number" class="slide md:slide-md" v-touch:swipe.left="next" v-touch:swipe.right="prev">
        <div class="item_post md:item_post-md" :style="{ background: 'url(' + currentSlide.image_url + ')' }">
          <div class="item_title md:item_title-md">
            <div v-if="show('title')">
              <a :href="currentSlide.url" target="_blank">
                <h4>{{ currentSlide.title }}</h4>
              </a>
            </div>
              <p class="date" v-if="show('date')">
                <b>{{ currentSlide.created_at | formatDate }}</b>
              </p>
          </div>
          <Profile class="ml-3" v-if="show('author')" :data="currentSlide.author" />
        </div>
        <div v-html="cooked || currentSlide.excerpt" class="excerpt md:excerpt-md"></div>
      </div>
    </transition-group>

  </div>
</template>

<script>
import moment from "moment";
import Profile from "@/components/Profile.vue";

export default {
  data() {
    return {
      play: false,
      users: [],
      slides: [],
      currentIndex: 0,
      currentTransition: 'next'
    };
  },
  components: {
   Profile
  },
  methods: {
    show(value) {
      return this.display.includes(value);
    },
    next() {
      this.changeSlide('next');
    },
    prev() {
      this.changeSlide('previous');
    },
    changeSlide(dir) {
      this.currentIndex = dir === 'next' ? this.currentIndex + 1 : this.currentIndex - 1;
      this.currentTransition = dir;
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
          self.changeSlide('next');
        }, this.autoplay);
        this.play = true;
      }
    }
  },
  computed: {
    currentSlide: function() {
      return this.slides[Math.abs(this.currentIndex) % this.slides.length];
    },
    cooked: function() {
      if (!this.currentSlide) { return ""; }

      return this.currentSlide.cooked.replace(
        'class="lightbox-wrapper"',
        'class="lightbox-wrapper hidden"'
      )
    }
  },
  created() {
    if (this.custom.length) {
      this.slides = this.custom.slice(0);
    }
    else if (this.custom.users && this.custom.users.length) {
      this.users = this.custom.users.slice(0);
    }
    if (this.autoplay != undefined) {
      this.toggle_play(this.autoplay);
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("dddd, MMMM DD YYYY");
    }
  },
  props: ["autoplay", "custom", "display"]
};
</script>

<style lang="scss" scoped>

.slider{
  overflow: hidden;
  position: relative;
  height: 20em;
  margin: 10px auto 0;
  border-radius: 10px;
  width: 95%;
}

.slider .slide {
  position: absolute;
  width: 100%;
  border-radius: 10px;
  top: 0;
  left: 0;
  bottom: 0;
  right:0;
}

.slider .excerpt {
  overflow: auto;
}

.slider .slide .item_title {
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

.next-leave-active,
.next-enter-active,
.previous-leave-active,
.previous-enter-active {
  transition: 1s;
}
.next-enter {
  transform: translate(100%, 0);
}
.next-leave-to {
  transform: translate(-100%, 0);
}
.previous-enter {
  transform: translate(-100%, 0);
}
.previous-leave-to {
  transform: translate(100%, 0);
}


</style>
