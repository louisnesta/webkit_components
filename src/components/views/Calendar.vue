<template>
 <div class="container">
  <div class="navigation">
    <div class="nav left" @click="previous"></div>
    <div class="month">{{months[selected][0].format('MMMM YYYY')}}</div> 
    <div class="nav right" @click="next"></div>
  </div>
  <div id="calendar">
    <div v-for="(day, index) in months[selected]" class="date" :style="{ gridColumn: column(index) }" :key="day" @click="select(day)">
      <span :style="marked(day)" class="day" :class="{ active: isActive(day) }">{{ day.format('D') }}</span>
    </div>
  </div>
</div>
</template>

<script>
import moment from "moment";
import { bus } from '@/main'

export default {
  name: 'CalComp',
  data() {
    return {
      months: [],
      eventDates: [],
      selected: 0,
      active: null,
      event: null
    };
  },
  props: ["dates", "config", "items"],
  methods: {
    column(index) {
      if (index == 0) {
        var month = this.months[this.selected];
        return month[0].day() + 1
      }
    },
    isActive(day) {
      if (day == this.active){
        return true
      } else {
        return false
      }
    },
    previous() {
      if (this.selected == 0) {
        this.selected = this.months.length-1
      } else {
        this.selected--
      }
    },
    next() {
      if (this.selected == this.months.length-1) {
        this.selected = 0;
      } else {
        this.selected++
      }
    },
    filterEvent(date) {
      var event = this.items.filter(function(obj) {
          return moment(obj.event.start).format("YYYY-MM-DD") == moment(date).format("YYYY-MM-DD");
      });
      if (event.length) {
        return event[0];
      } else {
        return null;
      }
    },
    select(date) {
      if (this.active == date) {
        bus.$emit('clearDate', null);
        this.active = null
      } else {
        this.active = date;
        var obj = this.filterEvent(date);
        var event_date = moment(obj.event.start).format("YYYYMMDD")
        bus.$emit('setDate', event_date);
        bus.$emit('clearType', null);
      }
    },
    eventColor(type){
      var color = this.config[type];
      if (color) {
        return color;
      } else {
        return "#ddd"
      }
    },
    marked(date) {
      if (this.filterEvent(date) !== null) {
        // var color = this.eventColor(this.filterEvent(date).event_type);
        var obj = {
          "border": ".5px solid #ddd",
          "display": "flex",
          "align-items": "center",
          "justify-content": "center",
          "width": "32px",
          "height": "30px",
          "font-size": "12px",
          "font-weight": "bold",
          "border-radius": "7px"
        }
        return obj;
      } else {
        return null
      }
    }
  },
  mounted() {
    var eventDates = this.items.map(obj => {
      var date = moment(obj.event.start).format("YYYY-MM-01");
      return date;
    })

    var uniqueDates = [...new Set(eventDates)];

    this.eventDates = uniqueDates;

    function getMonths(value) {
      let month = moment(value).startOf();
      return [...Array(month.daysInMonth())].map((_, i) => month.clone().add(i, 'day'))
    }

    this.months = uniqueDates.map(getMonths);
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background: rgba(0,0,0,0.01);
  border-bottom: 1px solid rgba(0,0,0,0.04);
  position: relative;
  border-radius: 4px; 
  overflow: hidden;
  .month {
    font-weight: bold;
    color: rgba(0,0,0,0.75);
    flex-grow: 1;
    text-align: center;
    padding: 10px;
  }
  .nav {
    width: 30px;
    height: 100%;
    display: inline-block;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath d='M38.2 68.2a2.5 2.5 0 003.6 3.6l20-20c1-1 1-2.6 0-3.6l-20-20a2.5 2.5 0 00-3.6 3.6L56.5 50 38.2 68.2z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E") no-repeat center 76%;
    background-size: 20px;
    &.left {
      transform: scaleX(-1);
    }
    &:hover {
    cursor: pointer;
  }
  }
}

.date {
  font-weight: 100;
}
.container {
  align-items: center;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font: 14px;
  width: 100%;
  justify-content: center;
}

#calendar{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-width: 1024px;
  width: 100%;
}

#calendar > *{
  align-items: center;
  display: flex;
  justify-content: center;
}

#calendar > *::before {
  content: "";
  display: inline-block;
  height: 0;
  padding-bottom: 100%;
  width: 1px;
}

#calendar .active{
  background: #fafafa !important;
  border: .5px solid black !important;
}
.day {
  &:hover {
  cursor: pointer;
}
}
</style>
