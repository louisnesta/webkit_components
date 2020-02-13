<template>
  <div class="row">
    <div class="card_row" ref="content" v-dragscroll.x="true" v-if="users">
      <Card
        v-for="(item, index) in users"
        :key="index"
        class="card"
        :url="getUserUrl(item.username)"
      >
        <template slot="front">
          <div
            class="avatar mt-4"
            @click="scroll"
            :style="{ backgroundImage: 'url(' + item.avatar_url + ')' }"
          ></div>
          <div class="card_name">
            <h3>
              <span v-if="item.name">{{ item.name }}</span
              ><span v-else>{{ item.username }}</span>
            </h3>
            <p>Active since {{ item.created_at | formatDate }}</p>
          </div>
        </template>
        <template slot="back">
          <h3>
            About
          </h3>
          <div class="card_excerpt" v-html="item.bio_raw"></div>
          <div class="card_footer">Connect with @{{ item.username }}</div>
        </template>
      </Card>
    </div>
    <div class="card_row" ref="content" v-dragscroll.x="true" v-if="topics">
      <Card
        v-for="item in topics.topic_list.topics"
        :key="item"
        :url="getPermalink(item.slug)"
        class="card topic"
      >
        <template slot="image">
          <div
            class="image"
            :style="{ backgroundImage: 'url(' + item.image_url + ')' }"
          ></div>
        </template>
        <template slot="front">
          <div class="topic_data">
            <div class="topic_title">
              <h2>{{ item.title }}</h2>
            </div>
            <Profile :data="getUser(item.posters[0].user_id)" />
          </div>
        </template>
        <template slot="back">
          <div class="card_excerpt" v-html="item.excerpt"></div>
          <div class="card_footer">Read more on this topic</div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Card from "@/components/FlipCard.vue";
import Profile from "@/components/Profile.vue";
export default {
  props: ["users", "topics"],
  components: {
    Card,
    Profile
  },
  computed: {
    selector() {
      return document.querySelector("#content");
    }
  },
  methods: {
    scroll() {
      this.$nextTick(() => {
        this.$refs.content.scrollLeft += 1000;
      });
    },
    getPermalink(slug) {
      return "https://edgeryders.eu/t/" + slug;
    },
    getUserUrl(username) {
      return "https://edgeryders.eu/u/" + username;
    },
    getUser(userId) {
      return this.topics.users.filter(user => user.id == userId)[0];
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MM/DD/YY");
    }
  }
};
</script>

<style lang="scss">
.row {
  @apply w-full;
  height: 430px;
  width: 98%;
  margin: 0 auto;
}
.jump {
  display: inline-block;
}
.button.next {
  width: 100px;
  height: 40px;
  display: inline-block;
  background: black;
}
</style>
