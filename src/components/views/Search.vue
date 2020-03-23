<template>
  <div>
    <input v-model="search" placeholder="search events" />
  </div>
</template>

<script>
import { bus } from '@/main'

export default {
  name: 'Search',
  data() {
    return {
      search: ""
    };
  },
  watch: {
    search() {
      bus.$emit('clearDate', null);
      bus.$emit('clearType', null);
      bus.$emit('filterSearch', this.search);
    }
  }
};
</script>

<style lang="scss" scoped>

input {
  @apply w-full p-2 mb-4 border;
}
</style>
