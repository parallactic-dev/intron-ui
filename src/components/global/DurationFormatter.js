import Vue from 'vue';

const DurationForatter = Vue.component('duration-formatter', {
  render (h) {
    return h('span', { on: { click: this.handleClick } }, this.value)
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log(event);
    }
  }
})

export default DurationForatter;
