import Vue from 'vue';

const DurationForatter = Vue.component('duration-formatter', {
  render (h) {
    return h('span', this.value)
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
})

export default DurationForatter;
