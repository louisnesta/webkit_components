<template>
  <div class="section md:section-md" id="topics">
    <h1 class="section_title">{{ custom.title }}</h1>

    <swiper :options="sliderOptions" ref="mySwiper" class="section_slider">
      <!-- slides -->
      <swiper-slide v-for="item in data" :key="item.created_at">
        <div class="slide">
          <div
            v-if="item.image_url"
            class="slide_title bg_image"
            :style="{ backgroundImage: 'url(' + item.image_url + ')' }"
          >
            <h1>{{ item.title }}</h1>
          </div>
          <div v-else class="slide_title">
            <h1>{{ item.title }}</h1>
          </div>
          <div class="slide_excerpt">
            <p v-html="item.excerpt"></p>
          </div>
          <div class="slide_footer">
            {{ item.created_at | formatDate }}
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="slider_arrow left hidden md:block" @click="back()"></div>
    <div class="slider_arrow right hidden md:block" @click="forward()"></div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import moment from "moment";
import "swiper/dist/css/swiper.css";

export default {
  props: ["data", "custom"],
  data() {
    return {
      selected: 0,
      bio: null,
      users: null,
      index: this.userdata,
      filtered_users: false,
      sliderOptions: {
        autoplay: true,
        speed: 1200,
        delay: 500,
        slidesPerView: 2,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        slidesPerColumnFill: "row",
        breakpoints: {
          640: {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            centeredSlides: true,
            spaceBetween: 20,
            slidesPerColumnFill: "row"
          }
        }
      }
    };
  },
  methods: {
    back() {
      this.$refs.mySwiper.swiper.slidePrev();
    },
    forward() {
      this.$refs.mySwiper.swiper.slideNext();
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("dddd MMMM Do YYYY");
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
