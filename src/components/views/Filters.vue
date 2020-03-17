<template>
  <div class="filters">    
      <h4 class="border-b font-bold pb-1 text-xl w-full block mb-3">Filter</h4>

        <v-select class="mb-2" v-model="location" :options="locations" placeholder="By Venue">
        </v-select>

        <v-select v-model="type" :options="types" placeholder="By Type">
          <template v-slot:option="option">
            <span class="event_color" :style="'background: ' + option.color"></span>
            {{ option.label }}
          </template>
        </v-select>
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
      types: []
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
    mapTypes(){
      var self = this;
      var array = this.items.map(obj => 
          obj.event_type
        );
      array = this.filterDuplicates(array);

      this.types = array.map(function(entry) {
        return {
          label: entry,
          color: self.config[entry]
        } 
      });
    },
    filterDuplicates(array){
      let unique = [...new Set(array)];
      return unique.filter(Boolean);
    }
  },
  mounted() {
    this.mapTypes();
    this.mapLocations();
  },
  watch: {
    type() {
      if (this.type) {
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

.filters {
  @apply mt-4;
  input {
    @apply p-2 bg-gray-100;
  }
}
.select {
  display: flex;
  align-items: center;
}
input {
  @apply w-full p-2 mb-2 border;
}

.event_color {
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 100%;
  position: relative;
  top: 2px;
  margin: 0 4px 0 0;
}
</style>
