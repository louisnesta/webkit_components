<template>
  <div class="section md:section-md" id="topics">
    <div class="section_title">
      {{ custom.title }}
    </div>
    <div
      class="wrapper px-6"
      :class="{ reverse: custom.text.position == 'left' }"
    >
      <div v-if="custom.text.content" class="w-full section_text">
        {{ custom.text.content }}
      </div>
    </div>

    <Slider
      v-if="topics_data && custom.view == 'featured'"
      :autoplay="5000"
      :custom="topics_data"
    />

    <Row v-if="topics_data && custom.view == 'cards'" :topics="topics_data" />
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";
import Row from "@/components/Row.vue";
import axios from "axios";

export default {
  props: ["custom"],
  data() {
    return {
      topics_data: null
    };
  },
  components: {
    Slider,
    Row
  },
  created() {
    this.getTopics(this.custom.tag);
  },
  methods: {
    getTopics(tag) {
      axios
        .get("https://edgeryders.eu/tags/" + tag + ".json")
        .then(({ data }) => {
          this.topics_data = data;
        })
        .catch();
    }
  }
};
</script>
