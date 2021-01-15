<template>
  <pui-form-control v-bind="$props">
    <div class="pui-select" v-bind:class="[`pui-select--${size}`, {'pui-select--show-error': showError}]">
      <select class="pui-select__select" v-bind:value="value" v-on:input="onInput($event)">
        <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">{{ option.label }}</option>
      </select>
      <pui-icon class="pui-select__icon" name="chevron-down" size="s" />
    </div>
  </pui-form-control>
</template>

<script>
import PuiFormControl from './PuiFormControl';
import PuiIcon from './PuiIcon';

export default {
  name: 'PuiSelect',
  components: {
    PuiFormControl,
    PuiIcon,
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
.pui-select {
  --s-bezel-x: #{$input-bezel-x};
  --s-bezel-y: #{$input-bezel-y};
  --s-bezel-icon-y: #{$input-bezel-y};
  --s-focus-width: #{$outline-width};
  --s-border: #{$border-width};
  --c-border: #{$input-border};
  --c-focus: #{$interaction-focus};

  position: relative;
}

.pui-select--minor {
  --s-bezel-x: #{$input-bezel-x-minor};
  --s-bezel-y: #{$input-bezel-y-minor};
  --s-bezel-icon-y: #{$input-bezel-y * 0.5};
  --s-focus-width: #{$outline-width};
}

.pui-select__select {
  @include input;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--s-bezel-y) - var(--s-border)) var(--s-bezel-x);
  border: var(--s-border) solid var(--c-border);
  // remove select arrow
  -webkit-appearance: none;
  -moz-appearance: none;      
  appearance: none;
}

.pui-select__select::-ms-expand {
  display: none;
}

.pui-select--minor .pui-select__select {
  @include small-text;
}

.pui-select--show-error {
  --c-border: #{$input-error};
}

.pui-select__select:focus {
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}

.pui-select__icon {
  position: absolute;
  top: var(--s-bezel-icon-y);
  right: var(--s-bezel-x);
}
</style>
