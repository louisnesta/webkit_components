<template>
  <div class="section md:section-md" id="people">
    <div class="section_title">
      {{ custom.title }}
    </div>
    <div class="wrapper md:wrapper-md">
      <div class="user_grid md:user_grid-md">
        <div
          class="user_avatar md:user_avatar-md"
          v-for="(item, index) in people"
          :key="index"
          @click="setActive(index)"
          :class="{ active: selected === index }"
          :style="{ backgroundImage: 'url(' + item.image_url + ')' }"
        ></div>
      </div>
      <div class="w-full px-6 md:px-2 md:pt-4" v-if="people[selected]">
        <a
          class="user_name border-b mb-2 pb-2"
          :href="people[selected].url"
          target="_blank"
        >
          {{ people[selected].title }} <span>{{ getUser(people[selected].excerpt) }}</span>
        </a>

        <div class="bio" v-if="getExcerpt(people[selected].excerpt).length > 1">
          <h2 class="font-bold mb-4">
            {{ getExcerpt(people[selected].excerpt)[0] }}
          </h2>
          <p>
            {{ getExcerpt(people[selected].excerpt)[1] }}
          </p>
          <p>
            {{ getExcerpt(people[selected].excerpt)[2] }}
          </p>
        </div>
        <div class="user_bio" v-else>
          {{ getExcerpt(people[selected].excerpt)[0] }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["custom", "baseUrl"],
  data() {
    return {
      people: [],
      selected: 0
    };
  },
  methods: {
    setActive(index) {
      this.selected = index;
    },
    getExcerpt(excerpt) {
      return excerpt
        .toString()
        .replace(/(@[^\s]*(?=<\/a>))/g, "")
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/\s*\[.*?\]\s*/g, "")
        .replace("&hellip;", "...")
        .replace("&amp", "&")
        .split(/\n/g)
        .filter(v => v.length > 3);
    },
    getUser(excerpt) {
      var username = excerpt.match(/(@[^\s]*(?=<\/a>))/g);
      if (username == null) {
        return null;
      } else {
        return username[0];
      }
    },
    async getPeople(tag) {
      let count = 0; let total = 1;
      let from = 0; let per = 25;
      var peopleArray = [];

      while (count < total) {
        count++;
        let response = await axios.get(
          `${this.baseUrl}/webkit_components/topics.json?tags=${tag}&from=${from}&per=${per}`
        );
        if (response.data.length) {
          total++; from = per * count;
          peopleArray = peopleArray.concat(response.data);
        } else {
          break;
        }
      }
      if (total == count) {
        this.people = peopleArray;
      }
    }
  },
  mounted: function() {
    this.getPeople(this.custom.tag);
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/index.scss";
.section#people {
  @apply px-0;
  .section_title {
    @apply mx-6;
  }
}
#people .user_avatar {
  height: 80px !important;
  border: 4px solid white;
  &.active {
    border: 4px solid black;
  }
}
</style>
