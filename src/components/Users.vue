<template>
  <div class="section md:section-md" id="users">
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

      <Row v-else :users="allusers" />
    </div>

    <div
      class="wrapper md:wrapper-md"
      v-if="allusers && (view == 'list') | (view == 'grid')"
    >
      <div class="user_grid md:user_grid-md" v-if="view == 'grid'">
        <div
          class="user_avatar md:user_avatar-md"
          v-for="(item, index) in allusers"
          :key="index"
          @click="setActive(index)"
          :class="{ active: selected === index }"
          :style="{ backgroundImage: 'url(' + item.avatar_url + ')' }"
        ></div>
      </div>

      <div class="user_list md:user_list-md" v-if="view == 'list'">
        <ul>
          <li
            v-for="(item, index) in allusers"
            :key="index"
            @click="setActive(index)"
            :class="{ active: selected === index }"
          >
            <div
              class="user_avatar"
              :style="{ backgroundImage: 'url(' + item.avatar_url + ')' }"
            ></div>
            <p v-if="item.name">{{ item.name }}</p>
            <p v-else>{{ item.username }}</p>
          </li>
        </ul>
      </div>

      <div class="w-full px-6" v-if="allusers[selected]">
        <a
          class="user_name"
          :href="'https://edgeryders.eu/u/' + allusers[selected].username"
        >
          <span class="mr-1">
            {{ allusers[selected].name }}
          </span>
          <span v-if="allusers[selected].name" class="font-normal text-lg"
            >@{{ allusers[selected].username }}</span
          >
          <span v-else> @{{ allusers[selected].username }} </span>
        </a>
        <div class="user_bio md:user_bio-md" v-html="allusers[selected].bio_raw"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Stack from "@/components/Stack.vue";
import Row from "@/components/Row.vue";
export default {
  props: ["custom", "baseUrl"],
  data() {
    return {
      selected: 0,
      view: "cards",
      visibleCards: [],
      allcards: [],
      componentKey: 0,
      bio: null,
      allusers: null,
      filtered_users: false
    };
  },
  components: { Stack, Row },
  methods: {
    toggleView(view) {
      this.view = view;
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
      }
    },
    getUsers() {
      axios.get(
        `${this.baseUrl}/webkit_components/users.json?per=500`
      ).then(({ data }) => {
        this.allusers = data.filter(({ bio_raw }) => bio_raw);
        this.visibleCards = this.users;
      });
    },
    setActive(index) {
      this.selected = index;
    }
  },
  mounted: function() {
    this.getUsers(this.custom.category);
  }
};
</script>
<style lang="scss">
@import "../assets/index.scss";
</style>
