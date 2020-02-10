<template>
  <div class="flex flex-col w-full">
    <Nav style="margin-bottom: 60px" :data="selectedComponents" />

    <Hero
      :data="getCategoryMetadata(data.category)"
      :custom="getSectionData('hero')"
    />

    <div v-for="section in data.sections" :key="section.title">
      <Custom
        v-if="section.type == 'custom'"
        :custom="getSectionData('custom')"
      />
      <Topics v-if="section.type == 'topics'" :custom="section" />
      <Events
        v-if="section.type == 'events'"
        :custom="getSectionData('events')"
      />
      <Users
        v-if="section.type == 'users'"
        :users="category.users"
        :custom="section"
      />
      <People v-if="section.type == 'people'" :custom="section" />
      <Edgeryders
        v-if="section.type == 'edgeryders'"
        :custom="getSectionData('edgeryders')"
      />
    </div>

    <Terms />
  </div>
</template>

<script>
import config from "@/data/config.json";

import Nav from "@/components/Navigation.vue";
import Hero from "@/components/Hero.vue";
import Custom from "@/components/Custom.vue";
import Events from "@/components/Events.vue";
import Topics from "@/components/Stories.vue";
import People from "@/components/People.vue";
import Users from "@/components/Users.vue";
import Edgeryders from "@/components/Edgeryders.vue";
import Terms from "@/components/Terms.vue";

import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      data: config,
      category: null,
      categories: null
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
    Terms
  },
  created() {
    this.getCategories();
    this.getCategory(this.data.category);
  },
  methods: {
    getCategories() {
      axios
        .get("https://edgeryders.eu/categories.json")
        .then(({ data }) => {
          this.categories = data.category_list.categories;
        })
        .catch();
    },
    getCategory(id) {
      axios
        .get("https://edgeryders.eu/c/" + id + ".json")
        .then(({ data }) => {
          this.category = data;
        })
        .catch();
    },
    getCategoryMetadata(id) {
      return this.categories.filter(category => category.id == id)[0];
    },
    getSectionData(type) {
      return this.data.sections.filter(section => section.type == type)[0];
    },
    getLogo(obj) {
      if (obj.uploaded_logo !== null) {
        return "https://edgeryders.eu/" + obj["uploaded_logo"]["url"];
      }
    }
  },
  computed: {
    selectedComponents() {
      return this.data.sections.map(section => section.type);
    }
  }
};
</script>
