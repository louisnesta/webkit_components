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
        :cards="users"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @cardSkipped="handleCardSkipped"
        @hideCard="removeCardFromDeck"
        :key="componentKey"
      />

      <Row v-else :cards="users" />
    </div>

    <div
      class="wrapper md:wrapper-md"
      v-if="users && (view == 'list') | (view == 'grid')"
    >
      <div class="user_grid md:user_grid-md" v-if="view == 'grid'">
        <div
          class="user_avatar md:user_avatar-md"
          v-for="(item, index) in users"
          :key="item.id"
          @click="setActive(index)"
          :class="{ active: selected === index }"
        >
          <img :src="item.avatar_url" />
        </div>
      </div>

      <div class="user_list md:user_list-md" v-if="view == 'list'">
        <ul>
          <li
            v-for="(item, index) in users"
            :key="index"
            @click="setActive(index)"
            :class="{ active: selected === index }"
          >
            <div
              class="user_avatar"
              :style="{ backgroundImage: `url('${item.avatar_url}')` }"
            ></div>
            <p v-if="item.name">{{ item.name }}</p>
            <p v-else>{{ item.username }}</p>
          </li>
        </ul>
      </div>

      <div class="w-full px-6" v-if="users[selected]">
        <a
          class="user_name"
          :href="'https://edgeryders.eu/u/' + users[selected].username"
        >
          <span class="mr-1">
            {{ users[selected].name }}
          </span>
          <span v-if="users[selected].name" class="font-normal text-lg"
            >@{{ users[selected].username }}</span
          >
          <span v-else> @{{ users[selected].username }} </span>
        </a>
        <p class="user_bio">{{ users[selected].bio_raw }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Stack from "@/components/Stack.vue";
import Row from "@/components/Row.vue";
export default {
  props: ["baseUrl", "custom"],
  data() {
    return {
      selected: 0,
      view: "cards",
      componentKey: 0,
      users: []
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
      this.users.shift();
      if (this.users.length == 0) {
        const newCards = this.users.slice();

        this.users = newCards;
        this.forceRerender();
        window.console.log("reset");
      }
    },
    async getActiveUsers() {
      axios.get(`${this.baseUrl}/webkit_components/users.json`)
        .then(({ data }) => (this.users = data))
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
