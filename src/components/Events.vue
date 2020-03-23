<template>
  <div class="section md:section-md events" id="events">
    <div class="section_title">
      <h3>{{custom.title}}</h3>
      <div class="flex options md:hidden">
        <div class="icon calendar" @click="selectView('calendar')" :class="{active: view == 'calendar'}"></div>
        <div class="icon filter" @click="selectView('filter')" :class="{active: view == 'filter'}"></div>
        <div class="icon search" @click="selectView('search')" :class="{active: view == 'search'}"></div>
      </div>
    </div>
    <div class="wrapper md:wrapper-md events_wrapper md:events_wrapper-md">
<Timeline :config="getEventFilters()" :items="data" :data="data" />
      <div class="sidebar md:sidebar-md">
        <Search  v-if="isView('search')  && data.length" />
        <Calendar v-if="isView('calendar')  && data.length" :dates="dataReverse" :items="data" :config="getEventFilters()" />
        <Filters v-if="isView('filter') && data.length" :items="data" :config="getEventFilters()" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Timeline from "@/components/views/Timeline.vue";
import Calendar from "@/components/views/Calendar.vue";
import Search from "@/components/views/Search.vue";
import Filters from "@/components/views/Filters.vue";
import { bus } from '@/main';

export default {
  props: ["custom", "baseUrl"],
  data() {
    return {
      view: null,
      data: [],
    };
  },
   components: {
    Timeline,
    Calendar,
    Search,
    Filters
  },
  methods: {
    isView(type) {
      if (this.$mq == "md") {
        return true
      } else {
        if (this.view == type) {
          return true
        } else {
          return false
        }
      }
    },
    selectView(type) {
      if (this.view == type) {
        if (this.view == 'calendar') {
          bus.$emit('clearDate', null);
        }
        this.view = null;
      } else {
        this.view = type;
        if (type == 'calendar') {
          bus.$emit('clearType', null);
          bus.$emit('clearSearch', null);
          bus.$emit('clearDate', null);
        }
        if (type == 'filter') {
          bus.$emit('clearSearch', null);
          bus.$emit('clearType', null);
          bus.$emit('clearDate', null);
        }
        if (type == 'search') {
          bus.$emit('clearType', null);
          bus.$emit('clearDate', null);
        }
      }
    },
    getEventFilters() {
      if (this.custom.filters) {
        return this.custom.filters;
      } else {
        return false
      }
    },
    getEvents(tag) {
      axios.get(
        `${this.baseUrl}/webkit_components/topics.json?serializer=event&tags=${tag}&per=500`
      ).then(({ data }) => {
        this.data = data.filter(({ event }) => event)
          .map(event => ({
            ...event,
            date: this.formatDate(event.event.start),
            json: this.getJson(event.cooked)
          }))
          .sort((a, b) => a.event.start.localeCompare(b.event.start));
      });
    },
    formatDate(value) {
      return moment(value).format("D-M-YYYY");
    }
  },
  created() {
    this.getEvents(this.custom.tag);
  }
};
</script>
<style lang="scss" scoped>

</style>