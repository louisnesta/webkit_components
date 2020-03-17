<template>
 <div class="container"> 
 <div id="calendar">
  <div>S</div>
  <div>M</div>
  <div>T</div>
  <div>W</div>
  <div>T</div>
  <div>F</div>
  <div>S</div>
  
  <div v-for="(day, index) in days" :style="{ gridColumn: column(index) }" :class="{ today: today(day) }" :key="day">
    {{ day.format('D') }}
  </div>
  </div>
</div>
</template>

<script>
import moment from "moment";

export default {
  name: 'CalComp',
  data() {
    return {
      days: []
    };
  },
  methods: {
    column(index) {
      if (index == 0) {
        return this.days[0].day() + 1
      }
    },
    today(day) {
      return moment().isSame(day, 'day')
    }
  },
  mounted() {
    let monthDate = moment().startOf('month')
    this.days = [...Array(monthDate.daysInMonth())].map((_, i) => monthDate.clone().add(i, 'day'))
  }
};
</script>

<style lang="scss" scoped>

.container {
  align-items: center;
  background: #768768;
  box-sizing: border-box;
  display: flex;
  font: 14px;
  width: 100%;
  height: 400px;
  justify-content: center;
  padding: 2em;
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

#calendar > *.today{
  color: white;
  border: 0.1em solid white;
  border-radius: 100%;
}
</style>
