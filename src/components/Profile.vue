<template>
  <a class="profile_badge" :href="'https://edgeryders.eu/u/' + data.username">
    <img :src="getAvatar(data.avatar_template)" />
    <p>@{{ data.username }}</p>
  </a>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    getAvatar(url) {
      var avatar = "https://edgeryders.eu" + url.replace("{size}", 100);
      return avatar;
    }
  }
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
