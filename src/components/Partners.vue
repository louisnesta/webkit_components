<template>
  <div class="section md:section-md" id="partners">
   
   <Carousel :custom="custom" :display="display" autoplay='6000' />

  </div>
</template>

<script>
import Carousel from "@/components/views/Carousel.vue";

export default {
  components: {
   Carousel
  },
  props: ["custom", "display"]
};
</script>

<style lang="scss" scoped>


</style>
