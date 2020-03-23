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
<Timeline :config="getEventTypes()" :items="data" :data="data" :eventsdata="eventsdata" />
      <div class="sidebar md:sidebar-md">
        <Search  v-if="selectedView('search')  && data.length" />
        <CalComp v-if="selectedView('calendar')  && data.length" :dates="dataReverse" :items="data" :config="getEventTypes()" />
        <Filters v-if="selectedView('filter') && data.length" :data="eventsdata" :items="data" :config="getEventTypes()" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Timeline from "@/components/views/Timeline.vue";
import CalComp from "@/components/views/Calendar.vue";
import Search from "@/components/views/Search.vue";
import Filters from "@/components/views/Filters.vue";
import { bus } from '@/main';

export default {
  props: ["custom", "baseUrl"],
  data() {
    return {
      view: null,
      data: [],
      content: [],
      selected: null,
      eventscontent: null,
      minimize: true,
      eventsdata: [],
    };
  },
   components: {
    Timeline,
    CalComp,
    Search,
    Filters
  },
  methods: {
    selectedView(type) {
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
    getEventTypes() {
      if (this.custom.types) {
        return this.custom.types;
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

        var i = 0;
        for (i = 0; i < this.data.length; i++) { 
          var eventId = this.data[i]['id'].toString();
           axios.get(
          `${this.baseUrl}/raw/${eventId}`
          ).then(({ data }) => {
   this.eventsdata.push(data);

          });
        }
      });
    },
    eventObject(value){

      const doc = new DOMParser().parseFromString(value, "text/html");

      var json = [...doc.querySelectorAll('code')].map(code => code.textContent);

      var final = String(json).replace(/\n/g, " ");
      if (final !== '') {
       var obj = JSON.parse(final);
          return obj;
      } else {
        return null
      }
   
    },
    formatDate(value) {
      return moment(value).format("D-M-YYYY");
    },
    formatTime(value) {
      return moment(value).format("HH:mm");
    }
  },
  created() {
    this.getEvents(this.custom.tag);
  },
  computed: {
    dataReverse: function() {
      return this.eventsdata.slice().reverse();
    }
  },
  mounted() {
    if (this.$mq == "md") {
      this.minimize = false;
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(value).format("MMMM Do YYYY");
    },
    formatMonth: function(value) {
      return moment(value).format("MMMM YYYY");
    }
  }
};
</script>
<style lang="scss" scoped>

</style>