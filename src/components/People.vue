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
          :key="item.title"
          @click="setActive(index)"
          :class="{ active: selected === index }"
          :style="{ backgroundImage: 'url(' + item.image + ')' }"
        ></div>
      </div>
      <div class="w-full px-2 pt-4" v-if="people[selected]">
        <a
          class="user_name border-b mb-2 pb-2"
          :href="people[selected].url"
          target="_blank"
        >
          {{ people[selected].title }}
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
  props: ["custom"],
  data() {
    return {
      people: null,
      selected: 0
    };
  },
  methods: {
    setActive(index) {
      this.selected = index;
    },
    getExcerpt(excerpt) {
      var array = excerpt
        .replace(/(@[^\s]*(?=<\/a>))/g, "")
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/\s*\[.*?\]\s*/g, "")
        .replace("&hellip;", "...")
        .replace("&amp", "&")
        .split(/\n/g)
        .filter(v => v != " ");

      var array_cleaned = array.filter(function(element) {
        return element.length > 3;
      });
      return array_cleaned;
    },
    getUser(excerpt) {
      var username = excerpt.match(/(@[^\s]*(?=<\/a>))/g);
      if (username == null) {
        return null;
      } else {
        return username[0];
      }
    },
    getUsers(tag) {
      axios
        .get("https://edgeryders.eu/tags/" + tag + ".json")
        .then(({ data }) => {
          var people = data.topic_list.topics.map(obj => ({
            title: obj.title,
            excerpt: obj.excerpt,
            url: "https://edgeryders.eu/t/" + obj.slug,
            image: obj.image_url,
            created_at: obj.created_at
          }));

          var sorted = people.sort((a, b) =>
            b.created_at.localeCompare(a.created_at)
          );

          this.people = sorted;
        })
        .catch();
    }
  },
  mounted: function() {
    this.getUsers(this.custom.tag);
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
  height: 85px !important;
  border: 4px solid white;
  &.active {
    border: 4px solid black;
  }
}
</style>
