<template>
  <label class="in-form-control" v-bind:class="[`in-form-control--${size}`, {'in-form-control--show-error': showError}]">
    <span class="in-form-control__label" v-if="label" v-html="label"></span>
    <slot />
    <span class="in-form-control__help-text" v-if="helpText" v-html="helpText"></span>
    <span class="in-form-control__error-message" v-if="errorMessage" v-html="errorMessage"></span>
  </label>
</template>

<script>
export default {
  name: 'InFormControl',
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
.in-form-control {
  --s-label-stack: #{$label-stack};
  --c-text: #{$interaction-default};

  display: inline-block;
  min-width: 100%;
}

.in-form-control--minor {
  --s-label-stack: #{$label-stack-minor};
}

.in-form-control--show-error {
  --c-text: #{$input-error};
}

.in-form-control__label {
  display: block;
  margin-bottom: var(--s-label-stack);
  color: var(--c-text);
}

.in-form-control--minor .in-form-control__label,
.in-form-control--minor .in-form-control__help-text,
.in-form-control--minor .in-form-control__error-message {
  @include small-text;
}

.in-form-control__help-text,
.in-form-control__error-message {
  display: block;
  margin-top: var(--s-label-stack);
}

.in-form-control__help-text + .in-form-control__error-message {
  margin-top: 0;
}

.in-form-control__error-message {
  color: var(--c-text);
}
</style>
