<template>
  <div class="hero md:hero-md" :style="styleObject">
    
    <CategoryView v-if="category" :data="category" :baseUrl="baseUrl"></CategoryView>
    <SummitView v-else :data="custom"></SummitView>

  </div>
</template>

<script>
import moment from "moment";
import CategoryView from "@/components/views/Hero_Category.vue";
import SummitView from "@/components/views/Hero_Simple.vue";

export default {
  methods: {
  },
  components: {
    CategoryView,
    SummitView
  },
  computed: {
    styleObject() {
      if (this.custom.background.url) {
        return {
          background: `url('${this.custom.background.url}')`,
          backgroundPosition: "0% 50%"
        }
      } else if (this.custom.background.color) {
        return { 
          background: this.custom.background.color 
        }
      } 
      else {
        return { background: "#efefef" }
      }
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  props: ["category", "custom", "baseUrl"]
};
</script>
