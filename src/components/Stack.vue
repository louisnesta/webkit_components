<template>
  <div class="card_stack">
    <Card
      v-for="(item, index) in cards"
      :key="item"
      :item="item"
      :is-current="index === 0"
      @cardAccepted="$emit('cardAccepted')"
      @cardRejected="$emit('cardRejected')"
      @cardSkipped="$emit('cardSkipped')"
      @hideCard="$emit('hideCard')"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  components: {
    Card
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.card_stack {
  position: relative;
  display: inline-block;
  margin: 20px auto 0;
  width: 80%;
  height: 370px;
}
</style>
