<template>
  <div>
    <div v-if="multiple == false">
      <a class="event_title" :href="data.url" target="_blank">
        <h3>{{ data.title }}</h3>
      </a>
      <div class="event_excerpt">
         <div class="event_info md:event_info-md">
          <div class="event_date">
            <p class="date">
              <b>{{ data.event.start | formatDateShort }}</b>
            </p>
            <div class="time">
              <p>
                <b>{{ data.event.start | formatTime }}</b>
                <span v-if="data.event.end"
                  > to <b>{{ data.event.end | formatTime }}</b></span
                >
              </p>
            </div>
          </div>

          <a class="permalink" :href="data.url" target="_blank">
            Full details
          </a>
        </div>
        <img class="mt-2" :src="data.image_url" v-if="data.image_url" />

        <div class="px-2" v-html="data.excerpt"></div>
      </div>
    </div>

    <div v-else class="minimize">
      <div
        class="event_title"
        :class="{ minimize: minimize }"
        @click="toggle()"
      >
        <h3>{{ data.title }}</h3>
        <div class="hidden md:inline-block">
          <span class="time">{{ data.event.start | formatTime }}</span>
          <span class="timezone" v-if="data.event.timezone">{{ data.event.timezone }}</span>
        </div>
      </div>

      <div class="event_excerpt" :class="{ expand: !minimize }">
        <div class="event_info md:event_info-md">
          <div class="event_date">
            <p class="date">
              <b>{{ data.event.start | formatDateShort }}</b>
            </p>
            <div class="time">
              <p>
                <b>{{ data.event.start | formatTime }}</b>
                <span v-if="data.end"
                  > to <b>{{ data.event.end | formatTime }}</b></span
                >
              </p>
            </div>
          </div>

          <a class="permalink" :href="data.url" target="_blank">
            Full details
          </a>
        </div>

        <div
          class="pl-4 pr-2 pt-1"
          style="font-size: 14px"
          v-html="data.excerpt"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Event",
  props: ["data", "multiple"],
  data: function() {
    return {
      minimize: true
    };
  },
  methods: {
    toggle() {
      this.minimize = !this.minimize;
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    },
    formatTime: function(value) {
      return moment(value).format("HH:mm");
    },
    formatDateShort: function(value) {
      return moment(String(value)).format("DD/MM/YY");
    }
  }
};
</script>

<style lang="scss">
.event_date {
  @apply flex items-center h-10;
  p.date {
  @apply mr-2 text-xs h-full flex items-center;
  padding-left: 28px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40'%3E%3Cpath d='M23 6h-1a1 1 0 00-2 0h-3a1 1 0 00-2 0h-3a1 1 0 00-2 0H9a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V9a3 3 0 00-3-3zm1 17a1 1 0 01-1 1H9a1 1 0 01-1-1V13h16zm0-12H8V9a1 1 0 011-1h1a1 1 0 002 0h3a1 1 0 102 0h3a1 1 0 002 0h1a1 1 0 011 1zm-11 8h1l-1-1a1 1 0 111-2l1 1v-1a1 1 0 012 0v1l1-1a1 1 0 111 2l-1 1h1a1 1 0 01-1 2l-1-1v1a1 1 0 01-2 0v-1l-1 1a1 1 0 11-1-2z'/%3E%3C/svg%3E")
    no-repeat;
  background-size: 25px;
  background-position: 0 7px !important;
}
.time {
  @apply text-xs h-full flex items-center pl-6 ml-1;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 45'%3E%3Cpath d='M18 3.25C9.87 3.25 3.25 9.87 3.25 18S9.87 32.75 18 32.75c8.13 0 14.75-6.62 14.75-14.75S26.13 3.25 18 3.25zm0 26.5c-6.48 0-11.75-5.27-11.75-11.75S11.52 6.25 18 6.25 29.75 11.52 29.75 18 24.48 29.75 18 29.75z'/%3E%3Cpath d='M18 8.68c-.81 0-1.47.66-1.47 1.47v6.38h-2.45c-.81 0-1.47.66-1.47 1.47 0 .81.66 1.47 1.47 1.47H18c.81 0 1.47-.66 1.47-1.47v-7.85c0-.81-.66-1.47-1.47-1.47z'/%3E%3C/svg%3E")
    no-repeat;
  background-size: 19px;
  background-position: 0 10px !important;
}
}


a.permalink {
  @apply mr-2 ml-1 text-xs h-full flex items-center font-bold;
  padding-left: 22px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 100 125'%3E%3Cpath d='M50 0A50 50 0 110 49.9 50 50 0 0150 0zm-3.8 38h-8.9a7.5 7.5 0 00-2 .3 1.9 1.9 0 00-1.4 1.5 1.8 1.8 0 001 2 9 9 0 003 .9c2.9.1 4 1.4 3.6 4.2-.8 5.4-1.9 10.7-2.8 16-.6 3.6-1 7.2-1.7 10.8-.8 4.9 3.7 9.4 7.3 10a42.7 42.7 0 006.5.4A16.7 16.7 0 0062.9 79a4.6 4.6 0 001.3-2 2.4 2.4 0 00-.5-1.8 1.8 1.8 0 00-1.5-.2c-.9.3-1.6.9-2.4 1.2a14.5 14.5 0 01-2.9 1 2.9 2.9 0 01-3.5-2.5 9.6 9.6 0 01-.1-2.9l1.2-6.9L58 46c.3-1.7.9-3.4.5-5.2a3 3 0 00-3.3-2.8h-9zm5.5-22.2a9 9 0 108.6 9.2 9 9 0 00-8.6-9.2z'/%3E%3C/svg%3E");
  background-size: 15px;
  text-decoration: underline;
  height: 23px;
  background-repeat: no-repeat;
  background-position: 0 4px;
}

.minimize {
  .event_excerpt {
    overflow: hidden;
    max-height: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    transition: all 0.4s ease;
    &.expand {
      max-height: 500px;
      margin: 0px 0 20px 0;
    }
  }
}
.minimize .event_title {
  font-size: 12px !important;
  display: flex;
  padding: 12px 0 12px 20px;
  height: auto;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  position: relative;
  h3 {
    font-size: 15px !important;
    border: none;
    margin: 0 10px 0 10px;
    padding: 0;
    line-height: 20px;
  }
  &:hover {
    cursor: pointer;
    background: #fafafa;
  }
  &:before {
    position: absolute;
    content: "";
    top: 24px;
    left: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 5px 0 5px;
    border-color: #000000 transparent transparent transparent;
    transform: rotate(0deg);
    transition: transform 0.4s ease;
  }
  &.minimize {
    &:before {
      transform: rotate(-90deg);
    }
  }
  div {
    background: #fafafa;
    border-radius: 10px;
    padding: 10px;

    .time {
      @apply font-bold;
    }
    .timezone {
      @apply ml-2;
    }
  }
}

</style>