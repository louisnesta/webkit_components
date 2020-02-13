<template>
  <div class="section md:section-md" id="topics">
    <div class="section_title">
      {{ custom.title }}
    </div>
    <div
      class="wrapper px-6"
      v-if="custom.text"
      :class="{ reverse: custom.text.position == 'left' }"
    >
      <div v-if="custom.text.content" class="w-full section_text">
        {{ custom.text.content }}
      </div>
    </div>

    <Slider
      v-if="topics && custom.view == 'featured'"
      :autoplay="5000"
      :custom="topics"
    />

    <Row v-if="topics && custom.view == 'cards'" :topics="topics" />
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";
import Row from "@/components/Row.vue";
import axios from "axios";

export default {
  props: ["custom", "baseUrl"],
  data() {
    return {
      topics: null
    };
  },
  components: {
    Slider,
    Row
  },
  created() {
    if (this.custom.tag) {
      this.getTopics(this.custom.tag, 'tags');
    }
    if (this.custom.category) {
      this.getTopics(this.custom.category, 'category');
    }
  },
  methods: {
    async getTopics(value, filter) {
      let count = 0; let total = 1;
      let from = 0; let per = 25;
      var topicsArray = [];

      while (count < total) {
        count++;
        let response = await axios.get(
          `${this.baseUrl}/webkit_components/topics.json?${filter}=${value}&from=${from}&per=${per}`
        );
        if (response.data.length) {
          total++; from = per * count;
          topicsArray = topicsArray.concat(response.data);
        } else {
          break;
        }
      }
      if (total == count) {
        this.topics = topicsArray;
      }
    }
  }
};
</script>
