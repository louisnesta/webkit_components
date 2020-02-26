<template>
  <div class="section md:section-md" id="people">
    <div class="section_title">
      {{ custom.title }}
    </div>
    <div class="wrapper md:wrapper-md">
      <div class="user_grid md:user_grid-md">
        <div
          class="user_avatar md:user_avatar-md"
          v-for="(item, index) in headliners"
          :key="index"
          @click="setActive(index)"
          :class="{ active: selected === index }"
          :style="{ backgroundImage: 'url(' + item.image_url + ')' }"
        ></div>
        <div
          class="user_avatar md:user_avatar-md other_speakers"
          v-for="(item, index) in others"
          :key="index"
          @click="setActive(index)"
          :class="{ active: selected === index }"
          :style="{ backgroundImage: 'url(' + item.image_url + ')' }"
        ></div>
      </div>
      <div class="w-full px-6 md:px-6 md:pt-2" v-if="headliners[selected]">
        <a
          class="user_name border-b mb-2 pb-2"
          :href="headliners[selected].url"
          target="_blank"
        >
          {{ headliners[selected].title }} <span>{{ getUser(headliners[selected].excerpt) }}</span>
        </a>

        <div class="bio" v-if="getExcerpt(headliners[selected].excerpt).length > 1">
          <h2 class="font-bold mb-4">
            {{ getExcerpt(headliners[selected].excerpt)[0] }}
          </h2>
          <p>
            {{ getExcerpt(headliners[selected].excerpt)[1] }}
          </p>
          <p>
            {{ getExcerpt(headliners[selected].excerpt)[2] }}
          </p>
        </div>
        <div class="user_bio" v-else>
          {{ getExcerpt(headliners[selected].excerpt)[0] }}
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
      headliners: [],
      others: [],
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
    getPeople(headliners, others) {
      axios.get(
        `${this.baseUrl}/webkit_components/topics.json?tags=${headliners}&per=500`
      ).then(({ data }) => {
        this.headliners = data
        axios.get(
          `${this.baseUrl}/webkit_components/topics.json?tags=${others}&per=500`
        ).then(({ data }) => {
          this.others = data
        })
      })
    }
  },
  mounted: function() {
    this.getPeople(this.custom.tagHeadliners, this.custom.tagOthers);
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
  border: 4px solid white;
  &.active {
    border: 4px solid black;
  }
}
</style>
