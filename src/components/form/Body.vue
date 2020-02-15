<template>
  <p class="body" v-if="body" v-html="body" />
</template>

<script>
export default {
  props: { body: String }
};
</script>

<style scoped>
.body {
  margin: 0 0 1rem 0;
}
</style>
