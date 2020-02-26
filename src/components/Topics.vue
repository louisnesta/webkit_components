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
      :display="custom.display"
    />

    <Row v-if="topics && custom.view == 'cards'" :topics="topics" :display="custom.display" />
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
    getTopics(value, filter) {
      axios.get(
        `${this.baseUrl}/webkit_components/topics.json?${filter}=${value}&per=500&serializer=organizer`
      ).then(({ data }) => {
        this.topics = data;
        if (this.custom.sort) {
          this.sortBy(data, this.custom.sort_by.property, this.custom.sort_by.order)
        }
      });
    },
    sortBy(data, value, order) {
      var ord_val = -1;
      if (order == 'ascending') {
        ord_val = 1;
      };
      var sorted = data.sort((a,b) => (a[value] > b[value]) ? ord_val : ((b[value] > a[value]) ? -ord_val : 0));
      this.data = sorted;
    }
  }
};
</script>
