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
          v-for="item in data_reverse"
          :key="item.timestamp"
          :class="{ active: item.timestamp == selected.timestamp }"
          class="list_item"
          @click="filterEvent(item.date)"
        >
          <p class="font-bold">{{ item.timestamp | formatDate }}</p>
          <h4>{{ item.title }}</h4>
        </div>
      </div>
      <div
        class="calendar_container md:calendar_container-md"
        :class="{ active: minimize == true }"
        v-if="view == 'calendar'"
      >
        <div class="calendar_nav md:calendar_nav-md" v-if="selected">
          <button class="arrow left" @click="previous"></button>
          <h3 @click="toggle">
            <span class="triangle md:hidden"></span>
            <span v-if="$mq == 'sm'">{{
              selected.timestamp | formatDate
            }}</span>
            <span v-else>{{ month | formatMonth }}</span>
          </h3>
          <button class="arrow right" @click="next"></button>
        </div>
        <FunctionalCalendar
          v-if="data"
          ref="Calendar"
          @choseDay="selectEvent"
          :dayNames="dayNames"
          :date-format="'dd-mm-yyyy'"
          :change-month-function="true"
          :change-year-function="true"
          :marked-dates="data"
          :isDatePicker="true"
        >
        </FunctionalCalendar>
      </div>
      <div v-if="selected" class="selected_event md:selected_event-md">
        <a class="event_title" :href="selected.url" target="_blank">
          <h3>{{ selected.title }}</h3>
          <div class="event_info" v-if="selected.time !== '00:00'">
            <span class="time">{{ selected.time }}</span>
            <span class="timezone">{{ selected.timezone }}</span>
          </div>
        </a>
        <div class="event_excerpt">
          <img :src="selected.image" v-if="selected.image" />

          <div v-html="selected.excerpt"></div>
        </div>
        <div class="event_footer">
          Added on {{ selected.created_at | formatDate }} by
          {{ selected.posted_by }}
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
  props: ["custom"],
  data() {
    return {
      calendar: null,
      data: null,
      months_data: null,
      view: "calendar",
      raw_data: null,
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
        var date = this.formatDate(this.selected.timestamp);

        this.$nextTick(() => {
          this.selectDate(date);
          this.month =
            "01-" +
            this.selected.timestamp.substring(5, 7) +
            "-" +
            this.selected.timestamp.substring(0, 4);
        });
      }
    },
    selectEvent(day) {
      this.filterEvent(day.date);
      this.toggle();
    },
    filterEvent(date) {
      var event = this.data.filter(function(obj) {
        return obj.date == date;
      });
      if (event[0] != undefined) {
        this.toggle;
        this.selected = event[0];
        this.month =
          "01-" +
          this.selected.timestamp.substring(5, 7) +
          "-" +
          this.selected.timestamp.substring(0, 4);
      }
    },
    getEventIndex(day) {
      var index = this.data.findIndex(obj => obj.date === day);

      return index;
    },
    toggle() {
      if (this.$mq == "sm") {
        this.minimize = !this.minimize;
      }
    },
    selectDate(date) {
      this.$refs.Calendar.ChooseDate(date);
    },
    next() {
      if (this.$mq === "md") {
        this.next_month();
      } else {
        this.next_date();
      }
    },
    previous() {
      if (this.$mq === "md") {
        this.previous_month();
      } else {
        this.previous_date();
      }
    },
    previous_month() {
      var select;
      var index = this.months_data.findIndex(obj => obj === this.month);

      if (this.months_data[index - 1]) {
        select = this.months_data[index - 1];
      } else {
        select = this.months_data[this.months_data.length - 1];
      }

      this.selectDate(select);
      this.month = select;
    },
    next_month() {
      var select;
      var index = this.months_data.findIndex(obj => obj === this.month);

      if (this.months_data[index + 1]) {
        select = this.months_data[index + 1];
      } else {
        select = this.months_data[0];
      }

      this.selectDate(select);
      this.month = select;
    },
    previous_date() {
      var index = this.getEventIndex(this.selected.date);
      var prev_date;
      if (this.data[index - 1]) {
        this.selected = this.data[index - 1];
        prev_date = this.formatDate(this.data[index - 1].timestamp);
        this.selectDate(prev_date);
      } else {
        this.selected = this.data[this.data.length - 1];
        prev_date = this.formatDate(this.data[this.data.length - 1].timestamp);
        this.selectDate(prev_date);
      }
    },
    next_date() {
      var index = this.getEventIndex(this.selected.date);
      var next_date;
      if (this.data[index + 1]) {
        this.selected = this.data[index + 1];
        next_date = this.formatDate(this.data[index + 1].timestamp);
        this.selectDate(next_date);
      } else {
        this.selected = this.data[0];
        next_date = this.formatDate(this.data[0].timestamp);
        this.selectDate(next_date);
      }
    },
    formatDate(value, parse) {
      function parseNumber(number) {
        return parseInt(number);
      }

      var year;
      var day;
      var month;

      if (parse == true) {
        year = parseNumber(value.substring(0, 4));
        month = parseNumber(value.substring(5, 7));
        day = parseNumber(value.substring(8, 10));
      } else {
        year = value.substring(0, 4);
        month = value.substring(5, 7);
        day = value.substring(8, 10);
      }

      var date = day + "-" + month + "-" + year;
      return date;
    },
    formatTime(value) {
      var time = value.substring(11, 16);
      return time;
    },
    getEvents() {
      axios
        .get("https://edgeryders.eu/tags/event.json?page=1")
        .then(({ data }) => {
          var array = data.topic_list.topics.filter(function(el) {
            return el.event;
          });
          this.raw_data = array;

          var events = array.map(obj => ({
            date: this.formatDate(obj.event.start, true),
            time: this.formatTime(obj.event.start),
            timestamp: obj.event.start,
            timezone: obj.event.timezone,
            class: "class2",
            title: obj.title,
            excerpt: obj.excerpt,
            url: "https://edgeryders.eu/t/" + obj.slug,
            replies: obj.posts_count,
            image: obj.image_url,
            created_at: obj.created_at,
            posted_by: obj.posters[0].user_id,
            category: obj.category_id
          }));

          var sorted_events = events.sort((a, b) =>
            a.timestamp.localeCompare(b.timestamp)
          );

          this.data = sorted_events;

          function get_month(val) {
            var date = "01-" + val.substring(5, 7) + "-" + val.substring(0, 4);
            return date;
          }

          var months = sorted_events.map(obj => get_month(obj.timestamp));
          var months_array = new Set(months);
          this.months_data = [...months_array];

          this.selected = this.data[this.data.length - 1];

          this.$nextTick(() => {
            var date = this.formatDate(this.selected.timestamp);
            this.selectDate(date);
          });

          this.month =
            "01-" +
            this.selected.timestamp.substring(5, 7) +
            "-" +
            this.selected.timestamp.substring(0, 4);
        })
        .catch();
    }
  },
  created() {
    this.getEvents();
  },
  computed: {
    data_reverse: function() {
      return this.data.slice().reverse();
    }
  },
  mounted() {
    if (this.$mq == "md") {
      this.minimize = false;
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    },
    formatMonth: function(value) {
      var day = value.substring(0, 2);
      var month = value.substring(3, 5);
      var year = value.substring(6, 10);
      var date = month + "/" + day + "/" + year;
      return moment(String(date)).format("MMMM YYYY");
    }
  }
};
</script>
