<template>
  <pui-form-control v-bind="$props">
    <input v-bind:type="type" class="pui-input" v-bind:class="{'pui-input--show-error': showError}">
    <pui-icon v-bind:name="icon" v-if="icon"></pui-icon>
  </pui-form-control>
</template>

<script>
import PuiFormControl from './PuiFormControl';
import PuiIcon from './PuiIcon';

export default {
  name: 'PuiInput',
  components: {
    PuiFormControl,
    PuiIcon
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: undefined
    },
    helpText: {
      type: String,
      default: undefined
    },
    errorMessage: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    showError: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style lang="scss">
.pui-input {
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

.pui-input--show-error {
  --c-border: #{$input-error};
}

.pui-input:focus {
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}
</style>
