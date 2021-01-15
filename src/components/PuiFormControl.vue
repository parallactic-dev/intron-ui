<template>
  <label class="pui-form-control" v-bind:class="[`pui-form-control--${size}`, {'pui-form-control--show-error': showError}]">
    <span class="pui-form-control__label" v-if="label" v-html="label"></span>
    <slot />
    <span class="pui-form-control__help-text" v-if="helpText" v-html="helpText"></span>
    <span class="pui-form-control__error-message" v-if="errorMessage" v-html="errorMessage"></span>
  </label>
</template>

<script>
export default {
  name: 'PuiFormControl',
  props: {
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
    showError: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'major'
    },
  },
};
</script>

<style lang="scss">
.pui-form-control {
  --s-label-stack: #{$label-stack};
  --c-text: #{$interaction-default};

  display: inline-block;
  min-width: 100%;
}

.pui-form-control--minor {
  --s-label-stack: #{$label-stack-minor};
}

.pui-form-control--show-error {
  --c-text: #{$input-error};
}

.pui-form-control__label {
  display: block;
  margin-bottom: var(--s-label-stack);
  color: var(--c-text);
}

.pui-form-control--minor .pui-form-control__label,
.pui-form-control--minor .pui-form-control__help-text,
.pui-form-control--minor .pui-form-control__error-message {
  @include small-text;
}

.pui-form-control__help-text,
.pui-form-control__error-message {
  display: block;
  margin-top: var(--s-label-stack);
}

.pui-form-control__help-text + .pui-form-control__error-message {
  margin-top: 0;
}

.pui-form-control__error-message {
  color: var(--c-text);
}
</style>
