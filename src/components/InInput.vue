<template>
  <in-form-control v-bind="$props">
    <div class="in-input" v-bind:class="[`in-input--type-${type}`, `in-input--${size}`, {'in-input--icon': icon}, {'in-input--show-error': showError}]">
      <input v-bind:type="type" class="in-input__input" v-bind="$attrs" v-bind:value="value" v-on="inputListeners">
      <in-icon class="in-input__icon" v-bind:name="icon" v-if="icon"></in-icon>
    </div>
  </in-form-control>
</template>

<script>
import InFormControl from './InFormControl';
import InIcon from './InIcon';

export default {
  name: 'InInput',
  components: {
    InFormControl,
    InIcon
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
      type: [Number, String],
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
.in-input {
  --s-bezel-x: #{$input-bezel-x};
  --s-bezel-y: #{$input-bezel-y};
  --s-focus-width: #{$outline-width};
  --s-border: #{$border-width};
  --s-max-heigh: #{$input-max-height};
  --s-bezel-icon-x: #{$input-icon-bezel-x};
  --s-bezel-icon-y: #{$input-icon-bezel-y};
  --s-icon: #{$icon-size--m};
  --c-border: #{$input-border};
  --c-focus: #{$interaction-focus};

  position: relative;
}

.in-input--minor {
  --s-bezel-x: #{$input-bezel-x-minor};
  --s-bezel-y: #{$input-bezel-y-minor};
  --s-focus-width: #{$outline-width};
  --s-max-heigh: #{$input-max-height-minor};
  --s-bezel-icon-x: #{$input-icon-bezel-x-minor};
  --s-bezel-icon-y: #{$input-icon-bezel-y-minor};
  --s-icon: #{$icon-size--s};
}

.in-input__input {
  @include input;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--s-bezel-y) - var(--s-border)) var(--s-bezel-x);
  border: var(--s-border) solid var(--c-border);
  max-height: var(--s-max-heigh); // fix inconsistent input heights (date)
}

.in-input--icon .in-input__input {
  padding-left: calc(var(--s-bezel-icon-x) * 1.5 + var(--s-icon));
}

.in-input--minor .in-input__input {
  @include small-text;
}

.in-input--show-error {
  --c-border: #{$input-error};
  --c-focus: #{$interaction-focus-error};
}

.in-input__input:focus {
  position: relative;
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}

.in-input__icon {
  position: absolute;
  top: var(--s-bezel-icon-y);
  left: var(--s-bezel-icon-x);
  width: var(--s-icon);
  height: var(--s-icon);
  z-index: 1;
}

.in-input__input::-webkit-calendar-picker-indicator {
  display: none; // hide datepicker icon
}
</style>
