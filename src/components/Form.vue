<template>
  <div class="section section-md" id="form">
    <div class="section_title">
      {{ custom.title }}
    </div>
    <div class="wrapper md:wrapper-md">
      <div class="content section_text" v-html="custom.content">
      </div>
      <div class="form">
        <div class="even">
          <Title class="even" v-bind="slide" />
          <Body v-bind="slide" :response="response" :next="next" />
          <Fields v-bind="slide" :response="response" :next="next" />
          <Error v-for="error in errors" :key="error" :error="error" />
        </div>
        <Progress :index="slide.index" :maxIndex="maxIndex" mobile />
        <Navigation :back="back" :next="next" :maxIndex="maxIndex" v-bind="slide" />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./form/Title.vue";
import Body from "./form/Body.vue";
import Fields from "./form/Fields.vue";
import Error from "./form/Error.vue";
import Progress from "./form/Progress.vue";
import Navigation from "./form/Navigation.vue";
import submit from "../helpers/discourse";

export default {
  props: ["custom", "baseUrl"],
  data() {
    return { form: {}, currentIndex: 0, errors: [] };
  },
  created() {
    this.$set(this.form, 'settings', { createTopic: this.custom.settings });
    this.slides
      .filter(s => s.index)
      .forEach(({ index, body, settings, fields }) => {
        this.$set(this.form, index, { body, settings });
        fields.forEach(({ name, settings = {} }) => {
          this.$set(this.form[index], name, { settings });
          this.$set(this.form[index][name], "value", "");
          this.$set(this.form[index][name], "error", "");
        });
      });

    document.addEventListener("keyup", ({ target: { tagName }, keyCode }) => {
      if (["INPUT", "TEXTAREA"].includes(tagName)) {
        return;
      }

      switch (keyCode) {
        case 37:
          return this.back ? this.back() : null;
        case 39:
          return this.next ? this.next() : null;
      }
    });
  },
  computed: {
    slides() {
      return this.custom.slides.map(slide => Object.assign({}, this.custom.slideDefaults, slide))
    },
    slide() {
      return this.slides[this.currentIndex];
    },
    response() {
      return this.form[this.slide.index] || {};
    },
    maxIndex() {
      return Math.max(...this.slides.map(slide => slide.index || 0));
    },
    back() {
      return this.currentIndex > 0 ? this.retreat : null;
    },
    next() {
      return () =>
        this.slide.submit
          ? this.validate() && submit(this.form).then(this.proceed, this.fail)
          : this.validate() && this.proceed();
    }
  },
  methods: {
    retreat() {
      this.currentIndex -= 1;
    },
    proceed() {
      this.currentIndex += 1;
    },
    fail(errors) {
      this.errors = errors;
    },
    validate() {
      this.errors = [];
      const { index, fields } = this.slide;
      if (!index || !fields) {
        return true;
      }

      fields.forEach(
        ({ name, required, error }) =>
          (this.response[name].error =
            required && !this.response[name].value ? error : null)
      );

      return Object.values(this.response).every(({ error }) => !error);
    }
  },
  components: {
    Title,
    Body,
    Fields,
    Error,
    Progress,
    Navigation
  }
};
</script>

<style scoped lang="scss">
.content {
  @apply flex flex-col pt-2;
  flex-basis: 50%;
}

.form {
  @apply bg-gray-100 p-6 mt-2;
  flex-basis: 45%;
  flex-grow: 0;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
}
</style>
