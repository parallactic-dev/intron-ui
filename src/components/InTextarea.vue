<template>
  <in-form-control v-bind="$props">
    <div class="in-textarea" v-bind:class="[`in-textarea--${size}`, {'in-textarea--show-error': showError}]">
      <textarea class="in-textarea__textarea" v-bind="$attrs" v-bind:value="value" v-on="inputListeners"></textarea>
    </div>
  </in-form-control>
</template>

<script>
import InFormControl from './InFormControl';

export default {
  name: 'InTextarea',
  components: {
    InFormControl,
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
.in-textarea {
  --s-bezel-x: #{$input-bezel-x};
  --s-bezel-y: #{$input-bezel-y};
  --s-focus-width: #{$outline-width};
  --s-border: #{$border-width};
  --s-min-heigh: #{$textarea-min-height};
  --c-border: #{$input-border};
  --c-focus: #{$interaction-focus};
}

.in-textarea--minor {
  --s-bezel-x: #{$input-bezel-x-minor};
  --s-bezel-y: #{$input-bezel-y-minor};
  --s-focus-width: #{$outline-width};
}

.in-textarea__textarea {
  @include input;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--s-bezel-y) - var(--s-border)) var(--s-bezel-x);
  border: var(--s-border) solid var(--c-border);
  min-height: var(--s-min-heigh);
}

.in-textarea--minor .in-textarea__textarea {
  @include small-text;
}

.in-textarea--show-error {
  --c-border: #{$input-error};
  --c-focus: #{$interaction-focus-error};
}

.in-textarea__textarea:focus {
  position: relative;
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}
</style>
