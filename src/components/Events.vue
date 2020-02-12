<template>
  <div class="section md:section-md" id="events">
    <div class="section_title">
      {{ custom.title }}
      <div class="toggle_menu mt-0 mb-0 md:flex">
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
          @click="filterEventTimestamp(item.timestamp)"
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
              selected[0].timestamp | formatDate
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
      <div class="selected_event md:selected_event-md">
        <h2
          class="text-2xl font-bold pb-2 border-b mb-2 pl-2"
          v-if="selected.length > 1 && $mq !== 'sm'"
        >
          {{ selected[0].timestamp | formatDate }}
        </h2>
        <Event
          v-for="(event, index) in selected"
          :data="event"
          :multiple="selected.length > 1"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { FunctionalCalendar } from "vue-functional-calendar";
import Event from "@/components/Event.vue";
import moment from "moment";

export default {
  props: ["custom"],
  data() {
    return {
      calendar: null,
      counting: 1,
      data: null,
      months_data: null,
      dates_data: null,
      view: "calendar",
      raw_data: null,
      selected: null,
      month: null,
      minimize: true,
      dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };
  },
  components: {
    FunctionalCalendar,
    Event
  },
  methods: {
    toggleView(view) {
      this.view = view;
      if (view == "calendar") {
        var date = this.formatDate(this.selected[0].timestamp);

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
    filterEventTimestamp(timestamp) {
      var event = this.data.filter(function(obj) {
        return obj.timestamp == timestamp;
      });

        this.selected = event;
    
    },
    filterEvent(date) {
      var event = this.data.filter(function(obj) {
        return obj.date == date;
      });
      if (event[0] != undefined) {
        this.toggle;
        this.selected = event;
        this.month =
          "01-" +
          this.selected[0].timestamp.substring(5, 7) +
          "-" +
          this.selected[0].timestamp.substring(0, 4);
      }
    },
    getEventIndex(day) {
      var index = this.dates_data.findIndex(obj => obj === day);

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
     var index = this.getEventIndex(this.selected[0].date);
     var prev_date;
      if (this.dates_data[index - 1]) {
        prev_date = this.dates_data[index - 1];
      } else {
        prev_date = this.dates_data[this.dates_data.length-1];
      }
      this.filterEvent(prev_date);
      this.selectDate(prev_date)
    },
    next_date() {
      var index = this.getEventIndex(this.selected[0].date);
      var next_date;
      if (this.dates_data[index + 1]) {
        next_date = this.dates_data[index + 1]
      } else {
        next_date = this.dates_data[0];
      }
      this.filterEvent(next_date);
      this.selectDate(next_date)
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
      if (value) {
      var time = value.substring(11, 16);
      return time;
    } else {
      return null
    }
    },
    sortEvents(array) {
      var events = array.map(obj => ({
        date: this.formatDate(obj.event.start, true),
        start: this.formatTime(obj.event.start),
        end: this.formatTime(obj.event.end),
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

      var months = this.data.map(obj => get_month(obj.timestamp));
      var months_array = new Set(months);
      this.months_data = [...months_array];

      var dates = this.data.map(obj => obj.date);
      var dates_array = new Set(dates);
      this.dates_data = [...dates_array];

      window.console.log(this.dates_data);

      var latest_event = this.data[this.data.length - 1];
      this.filterEvent(latest_event.date);
      window.console.log('date' + latest_event.date);
      this.$nextTick(() => {
        var date = this.formatDate(latest_event.timestamp);
        this.selectDate(date);
      });

      this.month =
        "01-" +
        latest_event.timestamp.substring(5, 7) +
        "-" +
        latest_event.timestamp.substring(0, 4);

    },
    async getEvents(tag) {
      let count = 0;
      let pages = 1;
      var eventArray = [];
      var self = this;

      while (count < pages) {
        count++;
        window.console.log(count);
        window.console.log(pages);

        let response = await axios.get(
          "https://edgeryders.eu/tags/" + tag + ".json?page=" + count
        );
        if (response.data.topic_list.topics.length) {
          pages++;
          var array = response.data.topic_list.topics.filter(function(el) {
            return el.event;
          });
          var newArray = eventArray.concat(array);
          eventArray = newArray;
        } else {
          break;
        }
      }
      if (count == pages) {
        self.sortEvents(eventArray);
      }
    }
  },
  created() {
    this.getEvents(this.custom.tag);
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
