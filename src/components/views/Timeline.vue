<template>
  <div>
    <div v-for="item in dates" :key="item">

      <div v-for="(date, key) in item" :key="key" class="day">
        <h4>{{ key }} </h4>
        <div class="event" v-for="entry in date" :key="entry">
          <div class="time">{{entry.event.start | formatTime}}</div>
          <div class="title">{{entry.title}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data () {
    return {
      dates: []
    }
  },
  methods: {
    mapDays(){

      const dates = this.custom.reduce((c, v) => {
        let date = this.getDate(v.event.start);
        c[date] = c[date] || [];       //Initiate if key does not exist
        c[date].push(v);                //Push the value
        return c;
    }, {});

      this.dates.push(dates);

    },
    getDate: function(value) {
      return moment(value).format("dddd, MMMM Do");
    }
  },
  created() {
    this.mapDays();
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("HH:mm");
    },
    formatDate: function(value) {
      return moment(value).format("dddd, MMMM Do");
    }
  },
  props: ["custom", "display"]
}
</script>

<style lang="scss" scoped>
.day {
  @apply mb-4;
  h4 {
    @apply mb-4 font-bold;
  }
}
.event {
  @apply flex;
  .time {
    @apply pr-3 py-2 border-r text-xs flex flex-col justify-center items-center;
  }
  .title {
    @apply py-2 pl-3;
  }
}
</style>