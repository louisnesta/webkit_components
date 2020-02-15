<template>
  <li :class="klass">
    <textarea
      v-if="isTextarea"
      class="textarea"
      :ref="name"
      :placeholder="placeholder"
      v-model="response[name].value"
      v-on:keyup.meta.enter="next"
      v-on:keyup.ctrl.enter="next"
    />
    <div class="checkbox" v-if="isCheckbox">
        <input type="checkbox" id="check" :ref="name" :name="name" v-model="response[name].value" />
        <label for="check">
          <span></span>{{ placeholder }}
        </label>
    </div>
    <label class="label" v-else>
      <input
        :ref="name"
        :id="name"
        class="input"
        :placeholder="placeholder"
        :type="type"
        v-model="response[name].value"
        v-on:keyup.enter="next"
      />
    </label>
    <Error :error="error" />
  </li>
</template>

<script>
import Error from "./Error";

export default {
  props: {
    response: Object,
    type: String,
    name: String,
    placeholder: String,
    half: Boolean,
    autofocus: Boolean,
    next: Function
  },
  mounted() {
    this.handleFocus();
  },
  updated() {
    this.handleFocus();
  },
  computed: {
    error() {
      return this.response[this.name].error;
    },
    klass() {
      return `${this.half ? "half" : "full"} ${this.type}`;
    },
    isTextarea() {
      return this.type === "textarea";
    },
    isCheckbox() {
      return this.type === "checkbox";
    },
    textarea() {
      return this.$refs[this.name];
    },
    isFocused() {
      return document.activeElement == this.textarea;
    }
  },
  methods: {
    handleFocus() {
      if (this.autofocus && !this.isFocused) {
        this.textarea.focus();
      }
    }
  },
  components: { Error }
};
</script>

<style lang="scss" scoped>
.half {
  float: left;
  width: 47%;
   &:nth-child(2) {
    margin-left: 5%;
  }
}

.textarea {
  padding: 0.4rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 2px;
  min-height: 10rem;
}

.input {
  @apply border;
  width: 100%;
  padding: 1rem .75rem;
  border-radius: 10px;
  font-size: 14px;
  margin: 0 0 10px 0;
}

input:focus, textarea:focus {
  border: 1px solid #00ACC2;
}

.checkbox {
  @apply pt-1 flex items-center mb-0;
 display: flex; // to center the item
    width: 100%;
    height: 100%;
   align-items: center;
  label {
  @apply p-2 pr-4 rounded-lg border;
    display: flex;
    font-size: 13px;
    align-items: center;
    color: #000;
    cursor: pointer;
    position: relative;
    span {
      display: inline-block;
      transform: scale(.8);
      position: relative;
      background-color: transparent;
      width: 30px;
      height: 30px;
      transform-origin: center;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 7px;
      transition: all 450ms 0ms;
    &:before {
      content: "";
      width: 0px;
      height: 2px;
      border-radius: 2px;
      background: #1790b5;
      position: absolute;
      transform: rotate(45deg);
      top: 13px;
      left: 8px;
      transition: width 50ms ease 50ms;
      transform-origin: 0% 0%;
    }
  
    &:after {
      content: "";
      width: 0;
      height: 2px;
      border-radius: 2px;
      background: #1790b5;
      position: absolute;
      transform: rotate(305deg);
      top: 18.0px; 
      left: 10px;
      transition: width 50ms ease;
      transform-origin: 0% 0%;
    }
  }
} 
}


.checkbox input {
    display: none;
  &:checked {
    + label {
      span {
        background-color: #1790b5;
         border: 2px solid #1790b5;       
        &:after {
          width: 12px;
          background: #fff;
          transition: width 150ms ease 200ms; 
        }
        
        &:before {
          width: 6px;
          background: #fff;
          transition: width 150ms ease 100ms;
        }
      }
    }
  }
}
</style>
