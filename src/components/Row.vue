<template>
  <div class="card_row" ref="content" v-dragscroll.x="true">
    <div class="card" v-for="item in cards" :key="item.id">
      <div class="card_title">
        <div
          class="avatar"
          :style="{ backgroundImage: `url('${item.avatar_url}')` }"
        ></div>
        <div class="card_name">
          <h3>
            <span v-if="item.name">{{ item.name }}</span
            ><span v-else>{{ item.username }}</span>
          </h3>
          <p>Active since {{ item.created_at | formatDate }}</p>
        </div>
      </div>
      <div class="card_excerpt" v-html="item.bio_raw"></div>
      <div class="card_footer">Connect with @{{ item.username }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  computed: {
    selector() {
      return document.querySelector("#content");
    }
  },
  methods: {
    scroll() {
      this.$nextTick(() => {
        this.$refs.content.scrollLeft += 300;
      });
    }
  },
  filters: {
    formatDate: function(date) {
      return moment(date).format("MM/DD/YY");
    }
  }
};
</script>

<style lang="scss" scoped>
.jump {
  display: inline-block;
}
</style>
