<template>
  <div class="flex flex-col w-full">
    <Nav style="margin-bottom: 60px" :data="selectedComponents" />

    <Hero
      :data="getCategoryMetadata(data.category)"
      :custom="getSectionData('hero')"
    />

    <div v-for="section in data.sections" :key="section.type">
      <Custom
        v-if="section.type == 'custom'"
        :custom="getSectionData('custom')"
      />
      <Events
        v-if="section.type == 'events'"
        :custom="getSectionData('events')"
        :baseUrl="baseUrl"
      />
      <People
        v-if="section.type == 'people'"
        :users="category.users"
        :custom="getSectionData('people')"
      />
      <Topics
        v-if="section.type == 'topics'"
        :topics="topics"
        :custom="getSectionData('topics')"
      />
      <Edgeryders
        v-if="section.type == 'edgeryders'"
        :custom="getSectionData('edgeryders')"
      />
    </div>

    <Terms />
  </div>
</template>

<script>
import data from "@/data/config.json";

import Nav from "@/components/Navigation.vue";
import Hero from "@/components/Hero.vue";
import Custom from "@/components/Custom.vue";
import Events from "@/components/Events.vue";
import Topics from "@/components/Topics.vue";
import People from "@/components/People.vue";
import Edgeryders from "@/components/Edgeryders.vue";
import Terms from "@/components/Terms.vue";

import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      baseUrl: "http://localhost:3000",
      data,
      category: { users: [] },
      categories: [],
      topics: []
    };
  },
  components: {
    People,
    Topics,
    Events,
    Hero,
    Nav,
    Custom,
    Edgeryders,
    Terms
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(`${this.baseUrl}/webkit_components/categories.json`)
        .then(this.applyCategory);
    },
    applyCategory({ data }) {
      this.categories = data;
      this.category = data.find(({ id }) => id === parseInt(this.data.category));
      axios.get(`${this.baseUrl}/webkit_components/topics.json?categories=${this.category.slug}`)
        .then(({ data }) => (this.topics = data))
    },
    getCategoryMetadata(id) {
      return this.categories.find(category => category.id === id) || {};
    },
    getSectionData(type) {
      return this.data.sections.find(section => section.type === type) || {};
    }
  },
  computed: {
    selectedComponents() {
      return this.data.sections.map(section => section.type);
    }
  }
};
</script>
