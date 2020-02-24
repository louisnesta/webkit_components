<template>
  <div class='carousel-view' @mouseover="clear_interval" @mouseleave="toggle_play">
    <div class="section_title w-full md:w-auto border-none mb-0">
      <div>{{ custom.title }}</div>
        <div class='toggle_menu md:flex'>
          <div
          class="toggle previous"
          @click="previous"
          ></div>
          <div
            class="toggle next"
            @click="next"
          ></div>
          </div>
    </div>

    <div
      class='carousel_container'
      tag="div">
      <a :href="slide.url" target="_blank" 
        v-for="slide in slides.slice(slideIndex, slideIndex + slideCount)" 
        class='slide md:slide-md'
        :key="slide">
        <div class="logo" :style="{background: 'url(' + getImg(slide.logo) + ')'}"></div>
        <div class="info">
          <h4> {{ slide.title }} </h4>
          <div><p class="date">{{ slide.date }}</p></div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slideIndex: 0,
      slideCount: 3,
      slides: [],
      play: false
    }
  },
  methods: {
    next () {
      var slideCount = this.slideCount;
      if (this.$mq == "sm") {
       slideCount = 1;
      };
      if (this.slideIndex + slideCount > this.slides.length) {
        this.slideIndex = 0
      } else {
        this.slideIndex = this.slideIndex + slideCount;
      };
    },
    previous () {
      var slideCount = this.slideCount;
      if (this.$mq == "sm") {
       slideCount = 1;
      };
      if (this.slideIndex - slideCount < 0) {
        this.slideIndex = 0
      } else {
        this.slideIndex = this.slideIndex - slideCount;
      };
    },
    getImg(value) {
      return require('../../' + value);
    },
    clear_interval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = false;
      }
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
      this.slides = this.custom.content.slice(0);
      if (this.$mq == "sm") {
       this.slideCount = 3;
      } else {
        this.slideCount = 1;
      };
      if (this.autoplay != undefined) {
        this.toggle_play(this.autoplay);
      };
  },
  props: ["custom", "display", "autoplay"]
}
</script>

<style lang="scss" scoped>
.carousel-view .toggle_menu {
  position: absolute;
  right: 5%;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1
  }
}
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel_container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  width: 100% !important;
  height: 22em;
}
.slide {
    flex-basis: 30%;
    height: 20em;
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background: #fff;
    justify-content: space-between;
    animation: fade 1s ease forwards;
    animation-delay: .1s;
  .logo {
    width: 100%;
    flex-basis: 120px;
    margin: 0px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: 120px !important;
    padding-bottom: 20px;
    border-bottom: 1px solid #efefef;
  }
  .info {
    display: inline-block;
    flex-grow: 1;
    padding: 10px 10px;
    align-items: start;
    h4 {
      background: #fafafa;
      color: black;
      padding: 10px 10px;
      line-height: 30px;
      font-weight: bold;
      box-decoration-break: clone;
      display: inline;
    }
    p.date {
      @apply p-2 py-1 m-2 mt-4 mx-1;
      font-size: 14px;
      background: black;
      color: white;
      width: auto;
      display: inline-block;
    }
  }
  &:nth-child(2) {
    animation-delay: .2s;
  }
  &:nth-child(3) {
    animation-delay: .3s;
  }
}

@media only screen and (max-width: 600px) {
  .slide {
    flex-basis: 100%;
    .info {
      padding: 30px 20px;
    }
  }
}

</style>