<template>
  <div class="hero md:hero-md" :style="styleObject">
    
    <CategoryView v-if="category" :data="category" :baseUrl="baseUrl"></CategoryView>
    <CustomView v-else :data="custom"></CustomView>

  </div>
</template>

<script>
import moment from "moment";
import CustomView from "@/components/views/Hero_Custom.vue";
import CategoryView from "@/components/views/Hero_Category.vue";

export default {
  methods: {
  },
  components: {
    CustomView,
    CategoryView
  },
  computed: {
    styleObject() {
      if (this.custom.background.url) {
        return {
          background: `url('${this.custom.background.url}')`,
          backgroundPosition: "cover"
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
