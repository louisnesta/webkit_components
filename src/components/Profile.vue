<template>
  <a class="profile_badge" :href="data.url">
    <img :src="data.avatar_url" />
    <p>@{{ data.username }}</p>
  </a>
</template>

<script>
export default {
  props: ["data"]
};
</script>
<style lang="scss" scoped>
.profile_badge {
  width: auto;
  display: inline-flex;
  align-items: center;
  height: 30px;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  padding-right: 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
  overflow: hidden;
  img {
    width: auto;
    height: 100%;
    margin-right: 7px;
  }
}
</style>
