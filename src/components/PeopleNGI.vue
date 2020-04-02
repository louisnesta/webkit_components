<template>
  <div class="section md:section-md" id="people">
    <div class="section_title">
      {{ custom.title }}
    </div>
    <div class="wrapper md:wrapper-md">
      <div class="user_grid md:user_grid-md">
        <div>
          <div
            class="user_avatar md:user_avatar-md"
            v-for="(item, index) in people"
            :key="index"
            @click="setActive(index)"
            :class="{ active: selected === index }"
            :style="{ backgroundImage: 'url(' + item.image_url + ')' }"
          > 
            <div class="avatar_info">
              <div class="title" v-html="processProfilePost(people[index].cooked)" />
              <div class="name">
                <p>
                  {{ people[index].title }}
                </p>
              </div>
            </div>
          </div>
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
      selected: "False"
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
  width: 10rem;
  height: 10rem;
  margin: 6px;
  &.active {
    background-color: rgba(0,0,0,.5); // Tint color
    background-blend-mode: multiply;
    .title { 
      visibility: visible;
    }
  }
  &:hover {
    background-color: rgba(0,0,0,.5); // Tint color
    background-blend-mode: multiply;
    .title { 
      visibility: visible;
    }
  }
}

.avatar_info {
  width: inherit;
  height: inherit;
  position: absolute;
}

.name {
  width: 100%;
  height: 1.5rem;
  background-color: black;
  position: absolute;
  padding-top: 0.2rem;
  bottom: 0;
  p {
    text-align: center;
    font-size: 0.75rem;
    color: white;
  }
}

.title {
  padding: 0rem 0.5rem 0.5rem 0.5rem;
  width: inherit;
  height: inherit;
  position: absolute;
  visibility: hidden;
  color: white;
  text-align: center;
  overflow: hidden;
  p {
    font-size: 0.75rem;
  }
}

.user_grid {
  align-content: flex-start;
}
</style>
