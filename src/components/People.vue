<template>
  <div class="section md:section-md" id="people">
    <div class="section_title">
      {{ custom.title }}
      <div class="toggle_menu flex md:toggle_menu-md">
        <div
          class="toggle list"
          v-if="$mq == 'md'"
          :class="{ active: view == 'list' }"
          @click="toggleView('list')"
        ></div>
        <div
          class="toggle grid"
          :class="{ active: view == 'grid' }"
          @click="toggleView('grid')"
        ></div>
        <div
          class="toggle cards"
          :class="{ active: view == 'cards' }"
          @click="toggleView('cards')"
        ></div>
      </div>
    </div>
    <div class="wrapper md:wrapper-md" v-if="view == 'cards'">
      <Stack
        v-if="$mq == 'sm'"
        :cards="visibleCards"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @cardSkipped="handleCardSkipped"
        @hideCard="removeCardFromDeck"
        :key="componentKey"
      />

      <Row v-else :cards="filtered_users" />
    </div>

    <div
      class="wrapper md:wrapper-md"
      v-if="filtered_users && (view == 'list') | (view == 'grid')"
    >
      <div class="user_grid md:user_grid-md" v-if="view == 'grid'">
        <div
          class="user_avatar md:user_avatar-md"
          v-for="(item, index) in filtered_users"
          :key="item.name"
          @click="setActive(index)"
          :class="{ active: selected === index }"
        >
          <img :src="item.avatar" />
        </div>
      </div>

      <div class="user_list md:user_list-md" v-if="view == 'list'">
        <ul>
          <li
            v-for="(item, index) in filtered_users"
            :key="index"
            @click="setActive(index)"
            :class="{ active: selected === index }"
          >
            <div
              class="user_avatar"
              :style="{ backgroundImage: 'url(' + item.avatar + ')' }"
            ></div>
            <p v-if="item.name">{{ item.name }}</p>
            <p v-else>{{ item.username }}</p>
          </li>
        </ul>
      </div>

      <div class="w-full px-6" v-if="filtered_users[selected]">
        <a
          class="user_name"
          :href="'https://edgeryders.eu/u/' + filtered_users[selected].username"
        >
          <span class="mr-1">
            {{ filtered_users[selected].name }}
          </span>
          <span v-if="filtered_users[selected].name" class="font-normal text-lg"
            >@{{ filtered_users[selected].username }}</span
          >
          <span v-else> @{{ filtered_users[selected].username }} </span>
        </a>
        <p class="user_bio">{{ filtered_users[selected].bio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Stack from "@/components/Stack.vue";
import Row from "@/components/Row.vue";
export default {
  props: ["users", "custom"],
  data() {
    return {
      selected: 0,
      view: "cards",
      visibleCards: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      allcards: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      componentKey: 0,
      bio: null,
      allusers: null,
      index: this.users,
      filtered_users: []
    };
  },
  components: { Stack, Row },
  methods: {
    toggleView(view) {
      this.view = view;
      if (view == "calendar") {
        var date = this.formatDate(this.selected.timestamp);

        this.$nextTick(() => {
          this.selectDate(date);
          this.month =
            "01-" +
            this.selected.timestamp.substring(5, 7) +
            "-" +
            this.selected.timestamp.substring(0, 4);
        });
      }
    },
    forceRerender() {
      this.componentKey += 1;
    },
    handleCardAccepted() {
      window.console.log("handleCardAccepted");
    },
    handleCardRejected() {
      window.console.log("handleCardRejected");
    },
    handleCardSkipped() {
      window.console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      this.visibleCards.shift();
      if (this.visibleCards.length == 0) {
        const newCards = this.filtered_users.slice();

        this.visibleCards = newCards;
        this.forceRerender();
        window.console.log("reset");
      }
    },
    async getActiveUsers() {
      const array = this.users.map(user => user["username"]);

      const calls = array.map(x =>
        axios.get(`https://edgeryders.eu/u/${x}.json`).then(resp => {
          var obj = {
            username: resp.data.user.username,
            since: resp.data.user.created_at,
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
      this.visibleCards = this.filtered_users.slice();
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
<style lang="scss">
@import "../assets/index.scss";
</style>
