<template>
  <div class="section md:section-md" id="about">
    <h1 class="section_title" v-if="custom.title">{{ custom.title }}</h1>
    <div
      class="wrapper md:wrapper-md"
      :class="{ reverse: custom.text.position == 'left' }"
    >
      <div v-if="custom.image.url" class="section_image md:section_image-md" :style="{flexBasis: custom.image.width + 'px'}">
        <img class="w-full" :src="custom.image.url" />
      </div>

      <div v-if="custom.video.src" class="section_video">
        <video controls class="rounded-lg overflow-hidden">
          <source :src="custom.video.src" type="video/mp4" />

          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      
      <div>

        <div v-if="html" v-html="custom.text.content" class="w-full section_text md:pt-4"></div>
        <div v-else class="w-full section_text md:pt-4">{{ custom.text.content }}</div>
               
        <div v-if="custom.text.buttons" class="action_container">
          <a class="action" v-for="item in custom.text.buttons" :href="item.url" :style="styleObj(item)" :key="item.url" target="_blank">
            {{item.text}}
          </a>
        </div>

      </div>

  </div>
</div>
</template>

<script>
export default {
  props: ["custom", "html"],
  methods: {
    styleObj(item) {
      var styleObj = {
        background: '#000',
        color: '#fff'
      };
      if (item.background) {
        styleObj["background"] = item.background;
      };
      if (item.color) {
        styleObj["color"] = item.color;
      };
      return styleObj;
    }
  }
};
</script>
