<template>
  <pui-form-control v-bind="$props">
    <div class="pui-input" v-bind:class="[`pui-input--${size}`, {'pui-input--show-error': showError}]">
      <input v-bind:type="type" class="pui-input__input" v-bind:value="value" v-on:input="onInput($event)">
      <pui-icon v-bind:name="icon" v-if="icon"></pui-icon>
    </div>
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
    value: {
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
    size: {
      type: String,
      default: 'major'
    },
  },
  methods: {
    onInput(event) {
      if (event && event.target) {
        this.$emit('input', event.target.value)
      }
    }
  }
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
}

.pui-input--minor {
  --s-bezel-x: #{$input-bezel-x-minor};
  --s-bezel-y: #{$input-bezel-y-minor};
  --s-focus-width: #{$outline-width};
}

.pui-input__input {
  @include input;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--s-bezel-y) - var(--s-border)) var(--s-bezel-x);
  border: var(--s-border) solid var(--c-border);
}

.pui-input--minor .pui-input__input {
  @include small-text;
}

.pui-input--show-error {
  --c-border: #{$input-error};
  --c-focus: #{$interaction-focus-error};
}

.pui-input__input:focus {
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}
</style>
