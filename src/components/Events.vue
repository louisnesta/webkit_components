<template>
  <div class="section md:section-md" id="events">
    <div class="section_title">
      {{ custom.title }}
      <div class="toggle_menu md:flex">
        <div
          class="toggle calendar"
          :class="{ active: view == 'calendar' }"
          @click="toggleView('calendar')"
        ></div>
        <div
          class="toggle list"
          :class="{ active: view == 'list' }"
          @click="toggleView('list')"
        ></div>
      </div>
    </div>
    <div class="wrapper md:wrapper-md" :class="view">
      <div class="list md:list-md" v-if="view == 'list'">
        <div
          v-for="item in data"
          :key="item.id"
          :class="{ active: item.id === selected.id }"
          class="list_item"
          @click="filterEvent(item)"
        >
          <p class="font-bold">{{ item.event.start | formatDate }}</p>
          <h4>{{ item.title }}</h4>
        </div>
      </div>
      <div
        class="calendar_container md:calendar_container-md"
        :class="{ active: minimize }"
        v-if="view == 'calendar'"
      >
        <div class="calendar_nav md:calendar_nav-md" v-if="selected">
          <button class="arrow left" @click="previous"></button>
          <h3 @click="toggle">
            <span class="triangle md:hidden"></span>
            <span v-if="$mq == 'sm'">{{
              selected.event.start | formatDate
            }}</span>
            <span v-else>{{ selected.event.start | formatMonth }}</span>
          </h3>
          <button class="arrow right" @click="next"></button>
        </div>
        <FunctionalCalendar
          v-if="data"
          ref="Calendar"
          date-format="dd-mm-yyyy"
          @chose-day="selectEvent"
          :day-names="dayNames"
          :marked-dates="dates"
          :is-date-picker="true"
        />
      </div>
      <div v-if="selected" class="selected_event md:selected_event-md">
        <a class="event_title" :href="selected.url" target="_blank">
          <h3>{{ selected.title }}</h3>
          <div class="event_info" v-if="selected.time !== '00:00'">
            <span class="time">{{ selected.time }}</span>
            <span class="timezone">{{ selected.event.timezone }}</span>
          </div>
        </a>
        <div class="event_excerpt">
          <img :src="selected.image" v-if="selected.image" />

          <div v-html="selected.excerpt"></div>
        </div>
        <div class="event_footer">
          Added on {{ selected.created_at | formatDate }} by
          {{ selected.author.name || selected.author.username }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { FunctionalCalendar } from "vue-functional-calendar";
import moment from "moment";

export default {
  props: ["custom", "baseUrl"],
  data() {
    return {
      calendar: null,
      data: null,
      months: null,
      view: "calendar",
      selected: null,
      month: null,
      minimize: true,
      dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };
  },
  components: {
    FunctionalCalendar
  },
  methods: {
    toggleView(view) {
      this.view = view;
      if (view == "calendar") {
        this.selectDate();
      }
    },
    selectEvent(day) {
      this.filterEvent(day);
      this.toggle();
    },
    filterEvent(item) {
      const event = this.data.find(obj => obj.id === item.id);
      if (!event) {
        return;
      }

      this.toggle();
      this.selected = event;
    },
    getEventIndex(date) {
      return this.data.findIndex(obj => obj.date === date);
    },
    toggle() {
      if (this.$mq == "sm") {
        this.minimize = !this.minimize;
      }
    },
    next() {
      if (this.$mq === "md") {
        this.selected =
          this.data.find(
            ({ event: { start } }) =>
              moment(start) >
              moment(this.selected.event.start)
                .add(1, "month")
                .startOf("month")
          ) || this.selected;
      } else {
        this.selected =
          this.data.find(
            ({ event: { start } }) =>
              moment(start) > moment(this.selected.event.start)
          ) || this.selected;
      }
      this.selectDate();
    },
    previous() {
      if (this.$mq === "md") {
        this.selected =
          this.dataReverse.find(
            ({ event: { start } }) =>
              moment(start) <
              moment(this.selected.event.start)
                .add(-1, "month")
                .endOf("month")
          ) || this.selected;

        this.$refs.Calendar.ChooseDate(
          this.formatDate(this.selected.event.start)
        );
      } else {
        this.selected =
          this.dataReverse.find(
            ({ event: { start } }) =>
              moment(start) < moment(this.selected.event.start)
          ) || this.selected;
      }
      this.selectDate();
    },
    selectDate() {
      if (!this.selected) {
        return;
      }

      this.$nextTick(() =>
        this.$refs.Calendar.ChooseDate(
          this.formatDate(this.selected.event.start)
        )
      );
    },
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    formatTime(value) {
      return moment(value).format("HH:mm");
    },
    getEvents() {
      axios
        .get(
          `${this.baseUrl}/webkit_components/topics.json?serializer=event&tags=event`
        )
        .then(({ data }) => {
          this.data = data.sort((a, b) =>
            a.event.start.localeCompare(b.event.start)
          );
          this.selected = this.data[0];
          this.selectDate();
        });
    }
  },
  created() {
    this.getEvents();
  },
  computed: {
    dataReverse() {
      return this.data.slice().reverse();
    },
    dates() {
      return this.data.map(({ event: { start } }) =>
        moment(start).format("M-d-YYYY")
      );
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
