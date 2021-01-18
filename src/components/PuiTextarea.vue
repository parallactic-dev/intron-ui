<template>
  <pui-form-control v-bind="$props">
    <div class="pui-textarea" v-bind:class="[`pui-textarea--${size}`, {'pui-textarea--show-error': showError}]">
      <textarea v-bind:type="type" class="pui-textarea__input" v-bind="$attrs" v-bind:value="value" v-on="inputListeners"></textarea>
    </div>
  </pui-form-control>
</template>

<script>
import PuiFormControl from './PuiFormControl';

export default {
  name: 'PuiInput',
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
.pui-textarea {
  --s-bezel-x: #{$input-bezel-x};
  --s-bezel-y: #{$input-bezel-y};
  --s-focus-width: #{$outline-width};
  --s-border: #{$border-width};
  --s-min-heigh: #{$textarea-min-height};
  --c-border: #{$input-border};
  --c-focus: #{$interaction-focus};
}

.pui-textarea--minor {
  --s-bezel-x: #{$input-bezel-x-minor};
  --s-bezel-y: #{$input-bezel-y-minor};
  --s-focus-width: #{$outline-width};
}

.pui-textarea__input {
  @include input;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--s-bezel-y) - var(--s-border)) var(--s-bezel-x);
  border: var(--s-border) solid var(--c-border);
  min-height: var(--s-min-heigh);
}

.pui-textarea--minor .pui-textarea__input {
  @include small-text;
}

.pui-textarea--show-error {
  --c-border: #{$input-error};
  --c-focus: #{$interaction-focus-error};
}

.pui-textarea__input:focus {
  position: relative;
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}
</style>
