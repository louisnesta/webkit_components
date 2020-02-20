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
      <div
        v-if="custom.text.content"
        v-html="custom.text.content"
        class="w-full section_text"
      />
    </div>

    <SummitSlider
      v-if="topics && custom.view == 'themes'"
      :autoplay="5000"
      :custom="topics"
    />

    <Slider
      v-if="topics && custom.view == 'featured'"
      :autoplay="5000"
      :custom="topics"
    />

    <Row v-if="topics && custom.view == 'cards'" :topics="sortedTopics" />
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";
import SummitSlider from "@/components/SummitSlider.vue";
import Row from "@/components/Row.vue";
import axios from "axios";

export default {
  props: ["custom", "baseUrl"],
  data() {
    return {
      topics: null
    };
  },
  computed: {
    sortedTopics() {
      let sorted = this.topics.slice().sort((a, b) => (a.title > b.title ? 1 : -1));
      return sorted;
    }
  },
  components: {
    Slider,
    SummitSlider,
    Row
  },
  created() {
    if (this.custom.tag) {
      this.getTopics(this.custom.tag, "tags");
    }
    if (this.custom.category) {
      this.getTopics(this.custom.category, "category");
    }
  },
  methods: {
    getTopics(value, filter) {
      axios
        .get(
          `${this.baseUrl}/webkit_components/topics.json?${filter}=${value}&per=500`
        )
        .then(({ data }) => (this.topics = data));
    }
  }
};
</script>
