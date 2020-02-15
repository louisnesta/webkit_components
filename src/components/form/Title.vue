<template>
  <div class="title">
    <h1 v-if="title">{{ displayTitle }}</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    title: String,
    subtitle: String
  },
  computed: {
    displayTitle() {
      return this.title.replace(/{{index}}/, this.index);
    }
  }
};
</script>
<style scoped lang="scss">
.title {
  @apply mb-5 pb-4 border-b;
  h1 {
    @apply font-bold pr-16 text-2xl leading-tight;
  }
}
</style>