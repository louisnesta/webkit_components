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
      <div class="w-8/12 px-2 md:px-2 md:pt-2" v-if="people[selected]">
        <p
          class="user_name border-b mb-2 pb-2"
          :href="people[selected].url"
          target="_blank"
        >
          {{ people[selected].title }} <span>{{ getUser(people[selected].excerpt) }}</span>
        </p>
        <div class="bio" v-html="processProfilePost(people[selected].cooked)" />
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
    processProfilePost(post) {
      var div = document.createElement('div');
      div.innerHTML = post;
      var lightboxes = div.getElementsByClassName('lightbox-wrapper');
      while (lightboxes[0])
         lightboxes[0].parentNode.removeChild(lightboxes[0])
      var images = div.getElementsByTagName('img');
      while (images[0])
         images[0].parentNode.removeChild(images[0])
      var repl = div.innerHTML;

      return repl
    },
    setActive(index) {
      this.selected = index;
    },
    getUser(excerpt) {
      var username = excerpt.match(/(@[^\s]*(?=<\/a>))/g);
      if (username == null) {
        return null;
      } else {
        return username[0];
      }
    },
    getPeople(tag) {
      axios.get(
        `${this.baseUrl}/webkit_components/topics.json?serializer=organizer&tags=${tag}&per=500`
      ).then(({ data }) => this.people = data);
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
  border: 4px solid white;
  &.active {
    border: 4px solid black;
  }
}

.user_grid {
  align-content: flex-start;
}
</style>
