<template>
  <in-form-control v-bind="$props">
    <div class="in-select" v-bind:class="[`in-select--${size}`, {'in-select--show-error': showError}]">
      <select class="in-select__select" v-bind="$attrs" v-bind:value="value" v-on="inputListeners">
        <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">{{ option.label }}</option>
      </select>
      <in-icon class="in-select__icon" name="chevron-down" size="s" />
    </div>
  </in-form-control>
</template>

<script>
import InFormControl from './InFormControl';
import InIcon from './InIcon';

export default {
  name: 'InSelect',
  components: {
    InFormControl,
    InIcon,
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
  },
  computed: {
    inputListeners() {
      return Object.assign({},
        this.$listeners,
        {
          input: (event) => {
            this.$emit('input', event.target.value);
          }
        }
      )
    }
  }
};
</script>

<style lang="scss">
.in-select {
  --s-bezel-x: #{$input-bezel-x};
  --s-bezel-y: #{$input-bezel-y};
  --s-bezel-icon-y: #{$input-bezel-y};
  --s-focus-width: #{$outline-width};
  --s-border: #{$border-width};
  --c-border: #{$input-border};
  --c-background: #{$input-background};
  --c-focus: #{$interaction-focus};

  position: relative;
}

.in-select--minor {
  --s-bezel-x: #{$input-bezel-x-minor};
  --s-bezel-y: #{$input-bezel-y-minor};
  --s-bezel-icon-y: #{$input-bezel-y * 0.5};
  --s-focus-width: #{$outline-width};
}

.in-select__select {
  @include input;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--s-bezel-y) - var(--s-border)) calc(var(--s-bezel-x) * 3) calc(var(--s-bezel-y) - var(--s-border)) var(--s-bezel-x);
  border: var(--s-border) solid var(--c-border);
  background-color: var(--c-background);
  // remove select arrow
  -webkit-appearance: none;
  -moz-appearance: none;      
  appearance: none;
}

.in-select__select::-ms-expand {
  display: none;
}

.in-select--minor .in-select__select {
  @include small-text;
}

.in-select--show-error {
  --c-border: #{$input-error};
  --c-focus: #{$interaction-focus-error};
}

.in-select__select:focus {
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}

.in-select__icon {
  position: absolute;
  top: var(--s-bezel-icon-y);
  right: var(--s-bezel-x);
}
</style>
