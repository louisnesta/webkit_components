<template>
  <div class="flex flex-col w-full">
    <Nav style="margin-bottom: 60px" :data="selectedComponents" />

    <Hero :baseUrl="data.baseUrl" :custom="getSectionData('hero')" :category="getCategoryMetadata()"/>

    <div v-for="section in data.sections" :key="section.title">
      <Custom v-if="section.type == 'custom'" :custom="section" html=true />
      <Topics v-if="section.type == 'topics'" :baseUrl="data.baseUrl" :custom="section" />
      <Events v-if="section.type == 'events'" :baseUrl="data.baseUrl" :custom="section" />
      <Users v-if="section.type == 'users'" :baseUrl="data.baseUrl" :custom="section" />
      <People v-if="section.type == 'people'" :baseUrl="data.baseUrl" :custom="section" />
      <Edgeryders v-if="section.type == 'edgeryders'" :custom="section"
      />
      <Form v-if="section.type == 'form'" :baseUrl="data.baseUrl" :custom="section" />
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
import Users from "@/components/Users.vue";
import Edgeryders from "@/components/Edgeryders.vue";
import Form from "@/components/Form.vue";
import Terms from "@/components/Terms.vue";

import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      data,
      category: { users: [] },
      categories: []
    };
  },
  components: {
    People,
    Users,
    Topics,
    Events,
    Hero,
    Nav,
    Custom,
    Edgeryders,
    Form,
    Terms
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(`${this.data.baseUrl}/webkit_components/categories.json`)
        .then(this.applyCategory);
    },
    applyCategory({ data }) {
      this.categories = data;
    },
    getCategoryMetadata() {
      var hero_data = this.getSectionData('hero');
      if (hero_data.category) {
         return this.categories.find(category => category.id === hero_data.category) || {};
      } else {
        return null
      }
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
