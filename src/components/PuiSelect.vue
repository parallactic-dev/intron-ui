<template>
  <pui-form-control v-bind="$props">
    <select class="pui-select" v-bind:class="{'pui-select--show-error': showError}" v-bind:value="value" v-on:input="onInput($event)">
      <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">{{ option.label }}</option>
    </select>
  </pui-form-control>
</template>

<script>
import PuiFormControl from './PuiFormControl';

export default {
  name: 'PuiSelect',
  components: {
    PuiFormControl,
  },
  props: {
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    options: {
      type: Array,
      default: () => { return []}
    },
    helpText: {
      type: String,
      default: undefined
    },
    errorMessage: {
      type: String,
      default: undefined
    },
    showError: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onInput(event) {
      console.log(event)
      this.$emit('input', event.target.value)
    }
  }
};
</script>

<style lang="scss">
.pui-select {
  --s-bezel-x: #{$input-bezel-x};
  --s-bezel-y: #{$input-bezel-y};
  --s-focus-width: #{$outline-width};
  --s-border: #{$border-width};
  --c-border: #{$input-border};
  --c-focus: #{$interaction-focus};

  @include input;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--s-bezel-y) - var(--s-border)) var(--s-bezel-x);
  border: var(--s-border) solid var(--c-border);
}

.pui-select--show-error {
  --c-border: #{$input-error};
}

.pui-select:focus {
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}
</style>
