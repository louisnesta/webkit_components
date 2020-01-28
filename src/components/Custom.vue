<template>
  <div class="section md:section-md" id="about">
    <h1 class="section_title" v-if="custom.title">{{ custom.title }}</h1>
    <div
      class="wrapper md:wrapper-md"
      :class="{ reverse: custom.text.position == 'left' }"
    >
      <div v-if="custom.image.url" class="section_image md:section_image-md">
        <img class="w-full" :src="custom.image.url" />
      </div>

      <div v-if="custom.video.src" class="section_video">
        <video controls class="rounded-lg overflow-hidden">
          <source :src="custom.video.src" type="video/mp4" />

          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>

      <div class="w-full section_text md:pt-4">
        {{ custom.text.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["custom"]
};
</script>
