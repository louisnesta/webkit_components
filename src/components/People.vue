<template>
  <div class="section md:section-md" id="people">
    <h1 class="section_title">{{ custom.title }}</h1>

    <div class="wrapper md:wrapper-md" v-if="filtered_users">
      <div class="section_users md:section_users-md">
        <div
          class="user_avatar md:user_avatar-md"
          v-for="(item, index) in filtered_users"
          :key="item.name"
          :style="{ backgroundImage: 'url(' + item.avatar + ')' }"
          @click="setActive(index)"
          :class="{ active: selected === index }"
        ></div>
      </div>

      <div class="w-full px-6" v-if="filtered_users[selected]">
        <a
          class="user_name"
          :href="'https://edgeryders.eu/u/' + filtered_users[selected].username"
        >
          <span class="mr-1">
            {{ filtered_users[selected].name }}
          </span>
          <span class="font-normal text-lg"
            >@{{ filtered_users[selected].username }}</span
          ></a
        >
        <p class="user_bio">{{ filtered_users[selected].bio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["users", "custom"],
  data() {
    return {
      selected: 0,
      bio: null,
      allusers: null,
      index: this.users,
      filtered_users: false
    };
  },
  methods: {
    async getActiveUsers() {
      const array = this.users.map(user => user["username"]);

      const calls = array.map(x =>
        axios.get(`https://edgeryders.eu/u/${x}.json`).then(resp => {
          var obj = {
            username: resp.data.user.username,
            name: resp.data.user.name,
            id: resp.data.user.id,
            avatar: this.getAvatar(resp.data.user.avatar_template, 200),
            bio: resp.data.user.bio_raw
          };
          return obj;
        })
      );

      var result = await Promise.all(calls);

      this.allusers = result;
      this.filtered_users = result.filter(user => user.bio && user.id !== 4922);
    },
    getAvatar(string, size) {
      return "https://edgeryders.eu" + string.replace("{size}", size);
    },
    setActive(index) {
      this.selected = index;
    }
  },
  mounted: function() {
    this.getActiveUsers();
  }
};
</script>
