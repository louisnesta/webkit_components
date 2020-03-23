<template>
  <div class="filters md:filters-md"> 
      <h4 class="border-b font-bold pb-1 text-xl w-full mb-3 mt-2 hidden md:block">Filters</h4>
      <div v-for="option in types" :key="option" class="tag" @click="selectType(option)" :class="{active: type == option}" >
          <span class="event_color" :style="'background: ' + eventColor(option)"></span>
          {{option}}
      </div>
  </div>
</template>

<script>
import { bus } from '@/main'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'Filters',
  data() {
    return {
      location: null,
      type: null,
      locations: [],
      types: [],
      tags: []
    };
  },
  props: ["data", "config", "items"],
  methods: {
    mapLocations(){
      var array = this.items.map(obj => 
        obj.location
      );
      array = this.filterDuplicates(array);
      this.locations = array;
    },
     eventColor(type){
      var color = this.config[type];
      if (color) {
        return color;
      } else {
        return null
      }
    },
    selectType(tag){
      if (this.type == tag) {
        this.type = null
      } else {
        this.type = tag;
      }

    },
    mapTypes(){
      var test = []
      this.items.map(obj => 
          obj.tags.map(obj => test.push(obj.name))
        );
      var newarray = this.filterDuplicates(test);

      this.types = newarray
    },
    filterDuplicates(array){
      let unique = [...new Set(array)];
      let new_array = unique.filter(word => word !== "call");
      return new_array;
    }
  },
  mounted() {
    this.mapTypes();
    this.mapLocations();
    bus.$on('filterType', (data) => {
      this.type = data;
    })
  },
  watch: {
    type() {
      if (this.type) {
       bus.$emit('clearDate', null);
      bus.$emit('filterType', this.type);
    } else {
      bus.$emit('filterType', null);
    }
    },
    location() {
      bus.$emit('filterLocation', this.location);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "vue-select/src/scss/vue-select.scss";

.select {
  display: flex;
  align-items: center;
}
input {
  @apply w-full p-2 mb-2 border;
}

.tag {
  @apply mr-2 py-1 mb-2 font-bold px-2 float-left border;
  border-radius: 3px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    @apply bg-gray-200;
  }
  &.active {
    opacity: 1;
    @apply bg-black;
            border: 1px solid black;

    color: white;
    &:hover {

        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40'%3E%3Cpath fill='white' d='M16 2a14 14 0 100 28 14 14 0 000-28zm6 18a1.5 1.5 0 11-2 2l-4-3.9-4 4a1.5 1.5 0 01-2 0c-.6-.6-.6-1.6 0-2.2l3.9-3.9-4-4a1.5 1.5 0 112.2-2l3.9 3.9 4-4a1.5 1.5 0 112 2.2L18.2 16l4 4z'/%3E%3C/svg%3E") no-repeat 7px 9px #000 !important;
        color: white;
        background-size: 14px !important;
        .event_color {
        opacity: 0
      }
    }
  }
}

.event_color {
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 100%;
  position: relative;
  top: 2px;
  margin: 0 2px 0 0;
}
</style>
